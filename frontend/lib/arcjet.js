import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

const ARCJET_KEY = process.env.ARCJET_KEY;

// Only initialize Arcjet if the key is available
let aj = null;

if (ARCJET_KEY) {
  try {
    aj = arcjet({
      key: ARCJET_KEY,
      rules: [
        shield({ mode: "LIVE" }),
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
      ],
    });
  } catch {
    console.warn("Arcjet initialization failed, rate limiting disabled");
    aj = null;
  }
}

// Helper: create rate-limited client or return null
function withRuleSafe(rule) {
  if (!aj) return null;
  try {
    return aj.withRule(rule);
  } catch {
    return null;
  }
}

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = withRuleSafe(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 10,
    interval: "30d",
    capacity: 10,
  })
);

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = withRuleSafe(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  })
);

// Pro tier - effectively unlimited
export const proTierLimit = withRuleSafe(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 1000,
    interval: "1d",
    capacity: 1000,
  })
);

// Safe protect helper — skips rate limiting if Arcjet isn't available
export async function safeProtect(client, req, options) {
  if (!client) {
    return { isDenied: () => false, reason: "arcjet_disabled" };
  }
  try {
    return await client.protect(req, options);
  } catch (error) {
    console.warn("Arcjet protect failed:", error.message);
    return { isDenied: () => false, reason: "arcjet_error" };
  }
}
