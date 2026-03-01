import React from "react";
import { Check } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection({ subscriptionTier = "free" }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Membership Tiers
        </h2>
        <p className="text-xl text-muted-foreground font-light">
          Begin complimentary. Ascend to culinary mastery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Essentials</CardTitle>
            <div className="text-5xl font-bold text-foreground">
              $0
              <span className="text-lg font-normal text-muted-foreground">
                /mo
              </span>
            </div>
            <CardDescription className="text-muted-foreground font-light text-base">
              Ideal for the aspiring home chef.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "10 pantry scans per month",
                "5 AI recipe generations",
                "Standard recipe access",
                "Community support",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className={"mt-auto"}>
            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="w-full border border-foreground/20 hover:bg-foreground hover:text-background"
              >
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border border-gold-400/40 bg-gold-50 dark:bg-gold-900/10">
          <Badge className="absolute top-0 right-0 rounded-none rounded-bl-lg bg-gold-400 text-gold-900 font-bold uppercase tracking-wide border-none">
            RECOMMENDED
          </Badge>

          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gold-800 dark:text-gold-300">
              Premier
            </CardTitle>
            <div className="text-5xl font-bold text-gold-600 dark:text-gold-400">
              $7.99
              <span className="text-lg font-normal text-gold-500/70">
                /mo
              </span>
            </div>
            <CardDescription className="text-gold-700/70 dark:text-gold-400/70 font-light text-base">
              For the dedicated culinary artisan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "Unlimited pantry scans",
                "Unlimited AI recipes",
                "Priority concierge support",
                "Full nutritional analysis",
                "Chef's tips & techniques",
                "Ingredient substitutions",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gold-900 dark:text-gold-200">
                  <Badge className="bg-gold-200 dark:bg-gold-800/50 p-1 rounded-full h-6 w-6 flex items-center justify-center border-none">
                    <Check className="h-4 w-4 text-gold-700 dark:text-gold-400" />
                  </Badge>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <SignedIn>
              <CheckoutButton
                planId="cplan_37y5uChZ9uYauQyTlDkXDh997ht"
                planPeriod="month"
                newSubscriptionRedirectUrl="/dashboard"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  disabled={subscriptionTier === "pro"}
                  className="w-full bg-gold-400 hover:bg-gold-500 disabled:bg-gold-300 dark:disabled:bg-gold-800 disabled:cursor-not-allowed text-gold-900"
                >
                  {subscriptionTier === "pro" ? "Subscribed" : "Subscribe Now"}
                </Button>
              </CheckoutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full bg-gold-400 hover:bg-gold-500 text-gold-900 font-semibold">
                  Login to Subscribe
                </Button>
              </SignInButton>
            </SignedOut>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
