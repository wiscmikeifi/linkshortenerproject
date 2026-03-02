import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener - Create Short URLs Instantly",
  description: "Free link shortener with analytics. Create short, memorable links in seconds and track performance with our powerful dashboard.",
};

// Minimum length for a valid Clerk publishable key (pk_test_... or pk_live_...)
const CLERK_KEY_MIN_LENGTH = 10;

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys = clerkPublishableKey?.startsWith('pk_') && 
  (clerkPublishableKey?.length ?? 0) > CLERK_KEY_MIN_LENGTH;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Link Shortener</h1>
            <div className="flex items-center gap-4">
              {hasClerkKeys ? (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="ghost">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button>
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </>
              ) : (
                <>
                  <Button variant="ghost">
                    Sign In
                  </Button>
                  <Button>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );

  return hasClerkKeys ? (
    <ClerkProvider appearance={{ baseTheme: shadcn }}>
      {content}
    </ClerkProvider>
  ) : content;
}
