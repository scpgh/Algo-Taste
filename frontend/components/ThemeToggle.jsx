"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gold-400/30 bg-gold-50 dark:bg-gold-900/30 hover:bg-gold-100 dark:hover:bg-gold-800/40 transition-all duration-300"
    >
      {dark ? (
        <Sun className="w-4 h-4 text-gold-400 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-gold-600 transition-transform duration-300" />
      )}
    </button>
  );
}
