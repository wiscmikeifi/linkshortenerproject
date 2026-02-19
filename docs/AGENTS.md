# Agent Instructions - Link Shortener Project

## Overview

This document serves as the main entry point for AI coding assistants working on this link shortener project. All agent instructions are organized into separate markdown files for clarity and maintainability.

## ⚠️ CRITICAL REQUIREMENT - READ THIS FIRST ⚠️

**BEFORE GENERATING ANY CODE, YOU MUST:**

1. **ALWAYS read the relevant instruction files** in the `/docs` directory that pertain to the task at hand
2. **NEVER generate code** without first consulting the appropriate documentation
3. **UNDERSTAND the standards and patterns** defined in those files completely

**This is NOT optional. This is a MANDATORY requirement for all code generation.**

Failure to follow these instructions will result in code that does not meet project standards and will need to be rewritten.

## Project Summary

**Project Type:** Link Shortener Web Application  
**Tech Stack:** Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS v4  
**Database:** Neon PostgreSQL with Drizzle ORM  
**Authentication:** Clerk  
**UI Components:** shadcn/ui (Radix UI primitives)  
**Package Manager:** npm

## Purpose

This is a modern link shortener application that allows users to:
- Create shortened URLs
- Track link analytics
- Manage their shortened links
- Authenticate securely using Clerk

## Instruction Files

**⚠️ MANDATORY: Read the relevant files below BEFORE writing ANY code ⚠️**

The following instruction files contain critical standards, patterns, and guidelines that MUST be followed:

- **[AUTHENTICATION.md](AUTHENTICATION.md)** - **REQUIRED** for any authentication-related code (Clerk integration, protected routes, sign-in/sign-up modals, redirects)
- **[UI_COMPONENTS.md](UI_COMPONENTS.md)** - **REQUIRED** for any UI components (shadcn/ui usage, component patterns, styling conventions, animations)

### When to Read Which File:

| Task Type | Required Reading |
|-----------|------------------|
| Adding authentication/protected routes | [AUTHENTICATION.md](AUTHENTICATION.md) |
| Creating sign-in/sign-up flows | [AUTHENTICATION.md](AUTHENTICATION.md) |
| Creating UI components | [UI_COMPONENTS.md](UI_COMPONENTS.md) |
| Styling components | [UI_COMPONENTS.md](UI_COMPONENTS.md) |
| Using shadcn/ui | [UI_COMPONENTS.md](UI_COMPONENTS.md) |

**Remember: Reading the docs FIRST saves time and ensures code quality!**

## Quick Reference

### Tech Stack Versions
- Next.js: 16.1.6 (App Router)
- React: 19.2.3
- TypeScript: 5.x
- Node: 20+
- Tailwind CSS: 4.x
- Drizzle ORM: 0.45.1

### Key Dependencies
- `@clerk/nextjs` - Authentication
- `@neondatabase/serverless` - Database connection
- `drizzle-orm` - Database ORM
- `lucide-react` - Icons
- `class-variance-authority` - Component variants
- `tailwind-merge` - Tailwind class merging

### Path Aliases
- `@/*` - Root directory imports

### Development Commands
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Core Principles

1. **Type Safety First**: Always use TypeScript with strict mode enabled
2. **Server Components by Default**: Use React Server Components unless client interactivity is needed
3. **Database Type Safety**: Use Drizzle ORM's type inference for all queries
4. **Accessibility**: Follow WCAG guidelines, use semantic HTML
5. **Performance**: Optimize images, use Next.js features (Image, Font)
6. **Consistent Styling**: Use Tailwind CSS utility classes, follow project conventions
7. **Error Handling**: Implement proper error boundaries and user feedback

## File Organization

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── db/                   # Database files
│   ├── schema.ts         # Drizzle schema
│   └── index.ts          # Database connection
├── lib/                  # Utility functions
│   └── utils.ts          # Helper utilities
├── public/               # Static assets
├── docs/                 # Agent instructions (this directory)
└── instructions/         # Additional instructions
```

## Before Making Changes

**STEP 1️⃣ (MANDATORY):** Read the relevant instruction files in `/docs` for the area you're working on  
   - This is **NON-NEGOTIABLE** and must be done BEFORE any code generation
   - Identify which instruction file(s) apply to your task using the table above
   - Read and understand ALL guidelines in those files

**STEP 2️⃣:** Understand the existing code patterns and conventions

**STEP 3️⃣:** Ensure TypeScript types are properly defined

**STEP 4️⃣:** Test your changes thoroughly

**STEP 5️⃣:** Follow the established file structure

## Getting Help

- Check the specific instruction files for detailed guidelines
- Review existing code for patterns and conventions
- Refer to official documentation:
  - [Next.js Docs](https://nextjs.org/docs)
  - [Drizzle ORM Docs](https://orm.drizzle.team)
  - [Clerk Docs](https://clerk.com/docs)
  - [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Environment Setup

Required environment variables (see `.env.local` example):
```env
DATABASE_URL=            # Neon PostgreSQL connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

**Last Updated:** February 2026  
**Maintainer:** Project Team
