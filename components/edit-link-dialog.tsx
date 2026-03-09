'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateLinkAction } from '@/app/dashboard/actions';

interface EditLinkDialogProps {
  link: {
    id: number;
    shortCode: string;
    originalUrl: string;
  };
  children: React.ReactNode;
}

export function EditLinkDialog({ link, children }: EditLinkDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState(link.originalUrl);
  const [shortCode, setShortCode] = useState(link.shortCode);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setOriginalUrl(link.originalUrl);
      setShortCode(link.shortCode);
      setError(null);
    }
  }, [open, link.originalUrl, link.shortCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await updateLinkAction({
        id: link.id,
        originalUrl,
        shortCode,
      });

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        // Close dialog
        setOpen(false);
        
        // Refresh the page to show the updated link
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the URL or short code for this link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-originalUrl">Original URL</Label>
              <Input
                id="edit-originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-shortCode">Short Code</Label>
              <Input
                id="edit-shortCode"
                type="text"
                placeholder="my-link"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                required
                disabled={loading}
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9-_]+"
                title="Only letters, numbers, hyphens, and underscores allowed"
              />
              <p className="text-sm text-muted-foreground">
                3-20 characters. Letters, numbers, hyphens, and underscores only.
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
