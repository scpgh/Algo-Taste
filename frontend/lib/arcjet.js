// Safe Arcjet wrapper — gracefully degrades on Vercel or when Arcjet is unavailable
let aj = null;
let requestFn = null;

// Dynamically import Arcjet to prevent module-level crashes
async function initArcjet() {
  if (aj !== null || aj === false) return; // already attempted
  try {
    const arcjetModule = await import("@arcjet/next");
    const arcjet = arcjetModule.default;
    const { shield, tokenBucket, detectBot, request } = arcjetModule;

    requestFn = request;

    const key = process.env.ARCJET_KEY;
    if (!key) {
      aj = false;
      return;
    }

    aj = arcjet({
      key,
      rules: [
        shield({ mode: "LIVE" }),
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
      ],
    });
  } catch {
    console.warn("Arcjet not available, rate limiting disabled");
    aj = false;
  }
}

// Create rate-limited clients lazily
function createRateLimiter(ruleFactory) {
  let client = null;
  return {
    async getClient() {
      await initArcjet();
      if (!aj) return null;
      if (!client) {
        try {
          const { tokenBucket } = await import("@arcjet/next");
          client = aj.withRule(ruleFactory(tokenBucket));
        } catch {
          client = null;
        }
      }
      return client;
    },
  };
}

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = createRateLimiter((tokenBucket) =>
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 10,
    interval: "30d",
    capacity: 10,
  })
);

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = createRateLimiter((tokenBucket) =>
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  })
);

// Pro tier - effectively unlimited
export const proTierLimit = createRateLimiter((tokenBucket) =>
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 1000,
    interval: "1d",
    capacity: 1000,
  })
);

// Safe protect — call this from server actions
export async function safeProtect(limiter, options) {
  try {
    const client = await limiter.getClient();
    if (!client) {
      return { isDenied: () => false, reason: { isRateLimit: () => false } };
    }
    await initArcjet();
    const req = requestFn ? await requestFn() : null;
    if (!req) {
      return { isDenied: () => false, reason: { isRateLimit: () => false } };
    }
    return await client.protect(req, options);
  } catch (error) {
    console.warn("Arcjet protect failed:", error.message);
    return { isDenied: () => false, reason: { isRateLimit: () => false } };
  }
}
