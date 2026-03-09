import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getLinksByUserId(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLink(data: {
  shortCode: string;
  originalUrl: string;
  userId: string;
}) {
  const [newLink] = await db
    .insert(links)
    .values({
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      userId: data.userId,
    })
    .returning();
  
  return newLink;
}

export async function checkShortCodeExists(shortCode: string) {
  const [existingLink] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return !!existingLink;
}

export async function getLinkById(id: number) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1);
  
  return link;
}

export async function updateLink(id: number, data: {
  shortCode?: string;
  originalUrl?: string;
}) {
  const [updatedLink] = await db
    .update(links)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(links.id, id))
    .returning();
  
  return updatedLink;
}

export async function deleteLink(id: number) {
  await db
    .delete(links)
    .where(eq(links.id, id));
}
