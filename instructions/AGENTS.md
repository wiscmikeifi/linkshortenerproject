# Link Shortener Project - Agent Instructions

## 🎯 Purpose

This file serves as the primary reference for AI coding assistants (LLMs) working on the Link Shortener project. It provides quick access to all coding standards, architectural patterns, and best practices.

## 📚 Comprehensive Documentation

All detailed agent instructions have been organized into the `/docs` directory for better maintainability and clarity.

### Quick Links to Documentation

- **[Main Agent Guide](/docs/AGENTS.md)** - Start here for project overview
- **[Coding Standards](/docs/coding-standards.md)** - Code style, naming conventions, formatting
- **[Architecture](/docs/architecture.md)** - Project structure, routing, data flow
- **[Component Guidelines](/docs/component-guidelines.md)** - React/Next.js patterns, styling
- **[Database Guidelines](/docs/database-guidelines.md)** - Drizzle ORM, queries, schema design
- **[TypeScript Standards](/docs/typescript-standards.md)** - Type safety, patterns, best practices

## ⚡ Quick Start

Before working on this project:

1. **Read** [/docs/AGENTS.md](/docs/AGENTS.md) for project overview
2. **Familiarize** yourself with the tech stack:
   - Next.js 16 (App Router)
   - TypeScript (strict mode)
   - Tailwind CSS v4
   - Drizzle ORM + Neon PostgreSQL
   - Clerk Authentication
   - shadcn/ui Components

3. **Reference** the specific guides as needed:
   - Adding components? → [Component Guidelines](/docs/component-guidelines.md)
   - Database work? → [Database Guidelines](/docs/database-guidelines.md)
   - Type issues? → [TypeScript Standards](/docs/typescript-standards.md)
   - Code style? → [Coding Standards](/docs/coding-standards.md)

## 🏗️ Project Structure

```
linkshortenerproject/
├── app/              # Next.js App Router
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── db/              # Database (Drizzle ORM)
│   ├── schema.ts    # Schema definitions
│   └── index.ts     # DB connection
├── lib/             # Utility functions
├── actions/         # Server Actions
├── types/           # TypeScript types
├── hooks/           # Custom React hooks
├── public/          # Static assets
└── docs/            # 📖 Comprehensive agent docs
```

## 🎨 Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Auth | Clerk |
| UI Components | shadcn/ui (Radix UI) |
| Icons | Lucide React |

## 📋 Core Principles

1. **Server Components First** - Use React Server Components by default
2. **Type Safety** - Strict TypeScript, no `any`
3. **Database Type Safety** - Leverage Drizzle ORM's type inference
4. **Accessibility** - Follow WCAG guidelines
5. **Performance** - Optimize for Core Web Vitals
6. **Code Quality** - Consistent, clean, well-documented code

## 🔍 When to Use Each Guide

### Use [Coding Standards](/docs/coding-standards.md) when:
- Writing new code (naming, formatting)
- Reviewing code quality
- Setting up ESLint rules
- Determining file structure

### Use [Architecture](/docs/architecture.md) when:
- Creating new routes/pages
- Deciding server vs client components
- Setting up data fetching
- Implementing state management
- Understanding app structure

### Use [Component Guidelines](/docs/component-guidelines.md) when:
- Building React components
- Styling with Tailwind CSS
- Handling forms and events
- Managing component state
- Creating custom hooks

### Use [Database Guidelines](/docs/database-guidelines.md) when:
- Designing database schema
- Writing queries
- Creating migrations
- Setting up relations
- Optimizing database performance

### Use [TypeScript Standards](/docs/typescript-standards.md) when:
- Defining types/interfaces
- Working with generics
- Typing React components
- Using utility types
- Ensuring type safety

## 🚀 Common Tasks

### Add a New Page
1. Create `app/your-route/page.tsx`
2. Use Server Component by default
3. Fetch data directly in component
4. See [Architecture Guide](/docs/architecture.md#routing-architecture)

### Create a Component
1. Create in `components/` directory
2. Follow naming: `PascalCase.tsx`
3. Add 'use client' only if needed
4. See [Component Guidelines](/docs/component-guidelines.md#component-structure)

### Add Database Table
1. Define schema in `db/schema.ts`
2. Export types with `InferSelectModel`
3. Run `npx drizzle-kit generate`
4. Run `npx drizzle-kit migrate`
5. See [Database Guidelines](/docs/database-guidelines.md#schema-design)

### Create API Route
1. Create `app/api/your-route/route.ts`
2. Export GET, POST, etc. functions
3. Use `NextRequest` and `NextResponse`
4. See [Architecture Guide](/docs/architecture.md#data-flow-architecture)

### Add Server Action
1. Create in `actions/` directory
2. Add `'use server'` directive
3. Return success/error object
4. Use `revalidatePath` when needed
5. See [Database Guidelines](/docs/database-guidelines.md#server-actions)

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit migrate     # Apply migrations
npx drizzle-kit push        # Push schema (dev only)
npx drizzle-kit studio      # Open Drizzle Studio
```

## ⚠️ Important Notes

- **Never commit secrets** - Use environment variables
- **Always validate input** - Both client and server side
- **Use Server Components** - Unless you need interactivity
- **Type everything** - No `any` types
- **Run migrations** - Don't modify schema directly
- **Revalidate paths** - After data mutations
- **Follow conventions** - Check existing code patterns

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 📞 Need Help?

1. Check the relevant documentation file in `/docs`
2. Review existing code for patterns
3. Consult official documentation
4. Ask for clarification if requirements are unclear

---

**Remember**: The `/docs` directory contains comprehensive guides for all aspects of this project. Always refer to the appropriate guide when working on specific features or following coding standards.

**Last Updated**: February 2026
