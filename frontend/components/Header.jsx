import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";
import ThemeToggle from "./ThemeToggle";
import NavSearch from "./NavSearch";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-border bg-background/80 glass z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <span className="text-xl font-bold tracking-tight text-foreground">
            Algo<span className="text-gold-400">Taste</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
          <Link
            href="/recipes"
            className="hover:text-gold-400 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-gold-400 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <NavSearch />
          <HowToCookModal />

          <SignedIn>
            {/* Pricing Modal with Built-In Trigger */}
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-gradient-to-r from-gold-400 to-gold-300 text-gold-900 border-none shadow-sm"
                      : "bg-secondary text-muted-foreground border-border cursor-pointer hover:bg-accent hover:border-gold-400/30"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-gold-900 fill-gold-900/20"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span>
                    {user.subscriptionTier === "pro"
                      ? "Premier"
                      : "Essentials"}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-full px-6 bg-gold-400 hover:bg-gold-500 text-gold-900 font-semibold">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
