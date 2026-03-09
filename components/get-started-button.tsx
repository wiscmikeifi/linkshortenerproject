"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

export function GetStartedButton({ 
  variant = "default", 
  size = "default",
  children,
  className 
}: GetStartedButtonProps) {
  const { isSignedIn } = useAuth();

  // If user is logged in, navigate to dashboard
  if (isSignedIn) {
    return (
      <Link 
        href="/dashboard" 
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );
  }

  // If user is not logged in, show sign-in modal
  return (
    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
      <Button variant={variant} size={size} className={className}>
        {children}
      </Button>
    </SignInButton>
  );
}
