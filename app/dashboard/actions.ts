'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { createLink, checkShortCodeExists, updateLink, deleteLink, getLinkById } from '@/data/links';

// Define input schema
const CreateLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters')
    .max(20, 'Short code must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Short code can only contain letters, numbers, hyphens, and underscores'
    ),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export async function createLinkAction(data: CreateLinkInput) {
  try {
    // Validate input data
    const validatedData = CreateLinkSchema.parse(data);

    // Check authentication
    const { userId } = await auth();
    
    if (!userId) {
      return {
        error: 'You must be logged in to create a link',
      };
    }

    // Check if short code already exists
    const shortCodeExists = await checkShortCodeExists(validatedData.shortCode);
    
    if (shortCodeExists) {
      return {
        error: 'This short code is already taken. Please choose a different one.',
      };
    }

    // Create the link using the helper function
    const newLink = await createLink({
      shortCode: validatedData.shortCode,
      originalUrl: validatedData.originalUrl,
      userId,
    });

    return {
      success: true,
      data: newLink,
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0].message,
      };
    }

    // Handle other errors
    console.error('Error creating link:', error);
    return {
      error: 'Failed to create link. Please try again.',
    };
  }
}

// Define update link schema
const UpdateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters')
    .max(20, 'Short code must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Short code can only contain letters, numbers, hyphens, and underscores'
    ),
});

type UpdateLinkInput = z.infer<typeof UpdateLinkSchema>;

export async function updateLinkAction(data: UpdateLinkInput) {
  try {
    // Validate input data
    const validatedData = UpdateLinkSchema.parse(data);

    // Check authentication
    const { userId } = await auth();
    
    if (!userId) {
      return {
        error: 'You must be logged in to update a link',
      };
    }

    // Get the existing link to verify ownership
    const existingLink = await getLinkById(validatedData.id);
    
    if (!existingLink) {
      return {
        error: 'Link not found',
      };
    }

    if (existingLink.userId !== userId) {
      return {
        error: 'You do not have permission to update this link',
      };
    }

    // Check if the new short code is taken by another link
    if (existingLink.shortCode !== validatedData.shortCode) {
      const shortCodeExists = await checkShortCodeExists(validatedData.shortCode);
      
      if (shortCodeExists) {
        return {
          error: 'This short code is already taken. Please choose a different one.',
        };
      }
    }

    // Update the link using the helper function
    const updatedLink = await updateLink(validatedData.id, {
      shortCode: validatedData.shortCode,
      originalUrl: validatedData.originalUrl,
    });

    return {
      success: true,
      data: updatedLink,
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0].message,
      };
    }

    // Handle other errors
    console.error('Error updating link:', error);
    return {
      error: 'Failed to update link. Please try again.',
    };
  }
}

// Define delete link schema
const DeleteLinkSchema = z.object({
  id: z.number(),
});

type DeleteLinkInput = z.infer<typeof DeleteLinkSchema>;

export async function deleteLinkAction(data: DeleteLinkInput) {
  try {
    // Validate input data
    const validatedData = DeleteLinkSchema.parse(data);

    // Check authentication
    const { userId } = await auth();
    
    if (!userId) {
      return {
        error: 'You must be logged in to delete a link',
      };
    }

    // Get the existing link to verify ownership
    const existingLink = await getLinkById(validatedData.id);
    
    if (!existingLink) {
      return {
        error: 'Link not found',
      };
    }

    if (existingLink.userId !== userId) {
      return {
        error: 'You do not have permission to delete this link',
      };
    }

    // Delete the link using the helper function
    await deleteLink(validatedData.id);

    return {
      success: true,
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0].message,
      };
    }

    // Handle other errors
    console.error('Error deleting link:', error);
    return {
      error: 'Failed to delete link. Please try again.',
    };
  }
}
