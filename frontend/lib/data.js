import { Camera, BookOpen, ChefHat, Search } from "lucide-react";

export const SITE_STATS = [
  { label: "Complimentary Scans", val: "10/mo" },
  { label: "Recipes Crafted", val: "1M+" },
  { label: "Entry Cost", val: "$0" },
  { label: "Chef Rating", val: "4.9" },
];

export const FEATURES = [
  {
    title: "Vision-Powered Scanning",
    description:
      "AI-driven photo recognition identifies every ingredient in your pantry with precision.",
    icon: Camera,
    limit: "10 scans/mo free",
  },
  {
    title: "AI Recipe Curation",
    description:
      "Transform random ingredients into restaurant-quality dishes. Minimize waste, maximize flavor.",
    icon: ChefHat,
    limit: "5 recipes/mo free",
  },
  {
    title: "Global Recipe Search",
    description:
      "Access a world of cuisines. Filter by origin, prep time, or dietary preference.",
    icon: Search,
    limit: "Unlimited searches",
  },
  {
    title: "Personal Recipe Vault",
    description:
      "Curate your collection. Export as PDF. Share with loved ones.",
    icon: BookOpen,
    limit: "3 saves/mo free",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Capture",
    desc: "Point your camera at the pantry. Our AI identifies every ingredient instantly.",
  },
  {
    step: "02",
    title: "Curate",
    desc: "Browse AI-crafted recipes tailored to your ingredients and taste preferences.",
  },
  {
    step: "03",
    title: "Create",
    desc: "Follow chef-level instructions. Present a dish worth savoring.",
  },
];

// Helper function for category emojis
export function getCategoryEmoji(category) {
  const emojiMap = {
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🍖",
    Miscellaneous: "🍴",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦐",
    Side: "🥗",
    Starter: "🥟",
    Vegan: "🥬",
    Vegetarian: "🥕",
    Breakfast: "🍳",
    Goat: "🐐",
  };
  return emojiMap[category] || "🍽️";
}

// Helper function for country flags
export function getCountryFlag(country) {
  const emojiMap = {
    American: "🗽",
    British: "👑",
    Canadian: "🍁",
    Chinese: "🐉",
    Croatian: "⚽",
    Dutch: "🌷",
    Egyptian: "🐫",
    Filipino: "🌴",
    French: "🥐",
    Greek: "🏛️",
    Indian: "🪷",
    Irish: "☘️",
    Italian: "🍕",
    Jamaican: "🌴",
    Japanese: "🗾",
    Kenyan: "🦒",
    Malaysian: "🌺",
    Mexican: "🌮",
    Moroccan: "🕌",
    Polish: "🦅",
    Portuguese: "🚢",
    Russian: "❄️",
    Spanish: "💃",
    Thai: "🛕",
    Tunisian: "🏜️",
    Turkish: "🧿",
    Ukrainian: "🌻",
    Vietnamese: "🍜",
    Algerian: "🏜️",
    Argentinian: "⚽",
    Australian: "🦘",
    Norwegian: "❄️",
    "Saudi Arabian": "🕋",
    Slovakian: "🏔️",
    Syrian: "🏛️",
    Uruguayan: "⚽",
    Venezuelan: "🌞",
  };

  return emojiMap[country] ?? "🌍";
}
