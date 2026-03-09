---
description: Guidelines for implementing server actions and data mutations. Use when creating or modifying server actions, handling form submissions, or performing database operations.
---

# Server Actions

## Core Principles

All data mutations in this application must be performed through server actions.

## Server Action Structure

### File Naming and Location
- Server action files MUST be named `actions.ts`
- Colocate `actions.ts` in the same directory as the component that calls it

### Type Safety
- All data passed to server actions must have appropriate TypeScript types
- DO NOT use the `FormData` TypeScript type

### Data Validation
- All data MUST be validated using Zod schemas
- Perform validation at the start of each server action

### Authentication
- Every server action MUST check for a logged-in user before proceeding
- Perform this check before any database operations

### Database Operations
- Do NOT use Drizzle queries directly in server actions
- Use helper functions that wrap Drizzle queries
- Helper functions are located in the `/data` directory
- Call these helper functions from server actions

### Error Handling
- Server actions MUST NOT throw errors
- Return an object with `success` or `error` properties
- Use try-catch blocks to handle errors gracefully
- Return meaningful error messages for the client

## Client Component Integration

Server actions must be called from client components.

## Summary Checklist

Before submitting a server action, verify:
- [ ] File is named `actions.ts` and colocated with the calling component
- [ ] All input data has proper TypeScript types (not FormData)
- [ ] Data is validated using Zod schemas
- [ ] User authentication is checked before database operations
- [ ] Database operations use helper functions from `/data` directory
- [ ] Errors are caught and returned as objects (not thrown)
- [ ] Returns `{ success: true, data: ... }` or `{ error: 'message' }`

## Examples

### ❌ Incorrect Implementation

```typescript
// actions.ts
'use server'

import { z } from 'zod'
import { db } from '@/db'
import { links } from '@/db/schema'

export async function createLinkAction(data: FormData) {
  // ❌ Using FormData type
  // ❌ No validation
  // ❌ No auth check
  // ❌ Direct Drizzle query
  // ❌ Throws error
  
  const url = data.get('url') as string
  
  if (!url) {
    throw new Error('URL is required')
  }
  
  return await db.insert(links).values({ url })
}
```

### ✅ Correct Implementation

```typescript
// actions.ts
'use server'

import { z } from 'zod'
import { getUserFromSession } from '@/lib/auth'
import { createLink } from '@/data/links'

// Define input schema
const LinkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  slug: z.string().min(1, 'Slug is required').max(50)
})

type LinkInput = z.infer<typeof LinkSchema>

export async function createLinkAction(data: LinkInput) {
  try {
    // 1. Validate data with Zod
    const validated = LinkSchema.parse(data)
    
    // 2. Check authentication
    const user = await getUserFromSession()
    if (!user) {
      return { error: 'You must be logged in to create a link' }
    }
    
    // 3. Call data helper function (not direct Drizzle query)
    const link = await createLink(validated, user.id)
    
    // 4. Return success response
    return { success: true, data: link }
    
  } catch (error) {
    // 5. Handle errors gracefully
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to create link. Please try again.' }
  }
}
```
