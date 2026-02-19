import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null; // Middleware will handle redirect
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
