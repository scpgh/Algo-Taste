"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";

const TRENDING = [
  "Butter Chicken",
  "Pasta Carbonara",
  "Chocolate Lava Cake",
  "Pad Thai",
  "Tiramisu",
];

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (value) => {
    const term = (value || query).trim();
    if (!term) return;
    router.push(`/recipe?cook=${encodeURIComponent(term)}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full text-muted-foreground hover:border-gold-400/50 hover:text-gold-400 transition-all text-sm"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border px-1.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 border-b border-border">
              <Search className="w-5 h-5 text-gold-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search any dish or recipe..."
                className="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              )}
            </div>

            {/* Quick Results / Trending */}
            <div className="p-4">
              {query.trim() ? (
                /* Search action */
                <button
                  onClick={() => handleSearch()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors group text-left"
                >
                  <div className="p-2 rounded-lg bg-gold-100 dark:bg-gold-900/30">
                    <ArrowRight className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      Get recipe for &ldquo;{query.trim()}&rdquo;
                    </p>
                    <p className="text-sm text-muted-foreground">
                      AI will generate step-by-step instructions
                    </p>
                  </div>
                </button>
              ) : (
                /* Trending suggestions */
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Trending
                    </span>
                  </div>
                  <div className="space-y-1">
                    {TRENDING.map((dish) => (
                      <button
                        key={dish}
                        onClick={() => handleSearch(dish)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors group text-left"
                      >
                        <Search className="w-4 h-4 text-muted-foreground group-hover:text-gold-400 transition-colors" />
                        <span className="text-foreground group-hover:text-gold-400 transition-colors">
                          {dish}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
