/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName(""); // Reset input when closing
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="hover:text-gold-400 transition-colors flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <ChefHat className="w-4 h-4" />
          How to Cook?
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-gold-400" />
            How to Cook?
          </DialogTitle>
          <DialogDescription>
            Enter any recipe name and our AI chef will guide you through the
            cooking process
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Recipe Input */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              What would you like to cook?
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Chicken Biryani, Chocolate Cake, Pasta Carbonara"
                className="w-full px-4 py-3 pr-12 border border-border bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Examples */}
          <div className="bg-gold-50 dark:bg-gold-900/20 rounded-xl p-4 border border-gold-200 dark:border-gold-800/40">
            <h4 className="text-sm font-semibold text-gold-800 dark:text-gold-300 mb-2">
              💡 Try These:
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Butter Chicken", "Chocolate Brownies", "Caesar Salad"].map(
                (example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setRecipeName(example)}
                    className="px-3 py-1 bg-card text-gold-600 dark:text-gold-400 border border-gold-300 dark:border-gold-700 rounded-full text-sm hover:bg-gold-100 dark:hover:bg-gold-900/40 transition-colors"
                  >
                    {example}
                  </button>
                )
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!recipeName.trim()}
            className="flex-1 w-full bg-gold-400 hover:bg-gold-500 text-gold-900 h-12"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Get Recipe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
