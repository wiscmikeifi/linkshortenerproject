import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getLinksByUserId } from '@/data/links';

export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect to home if not authenticated
  if (!userId) {
    redirect('/');
  }

  const userLinks = await getLinksByUserId(userId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Links</h2>
        
        {userLinks.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't created any links yet. Start by creating your first shortened link!
          </p>
        ) : (
          <div className="space-y-4">
            {userLinks.map((link) => (
              <div
                key={link.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-muted-foreground">
                      Short URL:
                    </span>
                    <a
                      href={`${baseUrl}/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-mono"
                    >
                      {baseUrl}/{link.shortCode}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-sm text-muted-foreground whitespace-nowrap">
                      Original URL:
                    </span>
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:underline break-all"
                    >
                      {link.originalUrl}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Created:</span>
                    <time dateTime={link.createdAt}>
                      {new Date(link.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* TODO: Add link shortening form here */}
    </div>
  );
}
