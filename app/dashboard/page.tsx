import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getLinksByUserId } from '@/data/links';
import { CreateLinkDialog } from '@/components/create-link-dialog';
import { EditLinkDialog } from '@/components/edit-link-dialog';
import { DeleteLinkDialog } from '@/components/delete-link-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect to home if not authenticated
  if (!userId) {
    redirect('/');
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <CreateLinkDialog />
      </div>
      
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
                    <span className="text-blue-600 font-mono">
                      {link.shortCode}
                    </span>
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
                  
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <time dateTime={link.createdAt} className="text-sm text-muted-foreground">
                      Created: {new Date(link.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                    
                    <div className="flex items-center gap-2">
                      <EditLinkDialog
                        link={{
                          id: link.id,
                          shortCode: link.shortCode,
                          originalUrl: link.originalUrl,
                        }}
                      >
                        <Button variant="outline" size="icon" title="Edit link">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </EditLinkDialog>
                      
                      <DeleteLinkDialog
                        linkId={link.id}
                        shortCode={link.shortCode}
                      >
                        <Button variant="destructive" size="icon" title="Delete link">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteLinkDialog>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
