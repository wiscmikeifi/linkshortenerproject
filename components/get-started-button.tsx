"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <Link href="/dashboard">
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      </Link>
    );
  }

  // If user is not logged in, show sign-in modal
  return (
    <SignInButton mode="modal">
      <Button variant={variant} size={size} className={className}>
        {children}
      </Button>
    </SignInButton>
  );
}
