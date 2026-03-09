# Authentication Instructions

## Overview

All authentication in this application is handled exclusively by **Clerk**. No other authentication methods should be implemented or used.

## Core Rules

### 1. Clerk Exclusive
- **ONLY** use Clerk for authentication
- Do not implement custom auth logic, JWT handling, or session management
- All auth-related imports must come from `@clerk/nextjs`

### 2. Protected Routes
- The `/dashboard` page is a protected route
- Users must be logged in to access `/dashboard`
- Implement protection using Clerk's middleware or route protection

### 3. Authenticated Redirects
- If a logged-in user attempts to access the homepage (`/`), redirect them to `/dashboard`
- Use Clerk's auth state to determine user authentication status

### 4. Sign In/Sign Up Modal
- Sign in and sign-up flows **MUST** launch as modals
- Do not create separate pages for authentication
- Configure Clerk to use modal mode for all auth interactions

## Implementation Guidelines

### Protecting Routes
```typescript
// Use Clerk middleware in middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
```

### Checking Auth Status
```typescript
// In Server Components
import { auth } from '@clerk/nextjs/server';

const { userId } = await auth();
if (!userId) {
  // User is not authenticated
}
```

```typescript
// In Client Components
import { useAuth } from '@clerk/nextjs';

const { isSignedIn, userId } = useAuth();
```

### Clerk Components
```typescript
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

// Use these components for auth UI
<SignInButton mode="modal" />
<SignUpButton mode="modal" />
<UserButton />
```

## Configuration Checklist

- [ ] Clerk API keys configured in `.env.local`
- [ ] Clerk middleware set up to protect routes
- [ ] Homepage redirects authenticated users to `/dashboard`
- [ ] Sign in/sign up buttons use `mode="modal"`
- [ ] UserButton component available for signed-in users

## Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Do Not

- ❌ Implement custom authentication logic
- ❌ Use NextAuth, Auth0, or any other auth provider
- ❌ Create custom sign-in/sign-up pages
- ❌ Manually handle JWT tokens or sessions
- ❌ Bypass Clerk for any authentication needs

## Quick Reference

| Scenario | Solution |
|----------|----------|
| Protect a route | Use Clerk middleware with route matcher |
| Check if user is signed in | Use `auth()` (server) or `useAuth()` (client) |
| Sign in/up button | `<SignInButton mode="modal" />` |
| User profile button | `<UserButton />` |
| Get current user ID | `const { userId } = await auth()` |

---

**Remember:** Clerk handles everything auth-related. Keep it simple and use Clerk's built-in features.
