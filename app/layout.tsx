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

const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_');

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
    <ClerkProvider>
      {content}
    </ClerkProvider>
  ) : content;
}
