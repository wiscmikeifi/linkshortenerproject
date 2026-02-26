import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null; // Middleware will handle redirect
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your link management dashboard. This page will contain your link shortening interface and analytics.
        </p>
        {/* TODO: Add link shortening form and links list here */}
      </div>
    </div>
    
  );
}
