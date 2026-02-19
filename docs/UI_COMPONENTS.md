# UI Components Guidelines

## Overview

This document outlines the UI component standards for the link shortener project. All user interface elements must use shadcn/ui components exclusively.

## Core Principle

**DO NOT create custom UI components from scratch.** Always use shadcn/ui components built on Radix UI primitives.

## shadcn/ui Component Library

This project uses [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components built with:
- **Radix UI** - Unstyled, accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **class-variance-authority (CVA)** - Component variant management

### Available Components

Common shadcn/ui components in this project:
- `Button` - Buttons with multiple variants
- `Card` - Container components with header, content, footer
- `Input` - Form input fields
- `Label` - Form labels
- `Dialog` - Modal dialogs
- `Dropdown Menu` - Contextual menus
- `Tooltip` - Hover information
- `Badge` - Status indicators
- `Separator` - Visual dividers
- `Tabs` - Tabbed interfaces
- `Toast` - Notifications

### Component Location

All shadcn/ui components are located in:
```
components/ui/
```

## Adding New Components

If you need a UI component that doesn't exist in the project:

1. **Check shadcn/ui first**: Visit [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)
2. **Install via CLI**:
   ```bash
   npx shadcn@latest add [component-name]
   ```
3. **Use the component**: Import from `@/components/ui/[component-name]`

### Example - Adding a Select Component

```bash
npx shadcn@latest add select
```

Then use it:
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MyComponent() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## Component Usage Guidelines

### 1. Import Correctly
```tsx
// ✅ Good
import { Button } from "@/components/ui/button"

// ❌ Bad - Don't create custom buttons
import { CustomButton } from "../custom-button"
```

### 2. Use Variants
shadcn/ui components support variants for different styles:
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### 3. Extend with Tailwind
Customize using Tailwind classes via `className`:
```tsx
<Button className="w-full mt-4">Full Width Button</Button>
```

### 4. Composition Over Creation
Compose existing components rather than creating new ones:
```tsx
// ✅ Good - Compose existing components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Action</Button>
  </CardContent>
</Card>

// ❌ Bad - Don't create custom card-like components
```

## Styling Conventions

- **Use Tailwind utilities** for spacing, colors, and layout
- **Follow project theme** defined in `tailwind.config` and `globals.css`
- **Maintain consistency** with existing component usage
- **Leverage CSS variables** for theme colors (e.g., `bg-primary`, `text-muted-foreground`)

## Accessibility

shadcn/ui components are built with accessibility in mind:
- ARIA attributes included automatically
- Keyboard navigation supported
- Screen reader friendly
- Focus management handled

**Always preserve these accessibility features** when customizing components.

## Common Patterns

### Form Component
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <form>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" />
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
```

### Dialog Pattern
```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description text.</DialogDescription>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  )
}
```

## Key Reminders

1. ✅ **ALWAYS use shadcn/ui components**
2. ❌ **NEVER create custom UI components from scratch**
3. 🔍 **Check ui.shadcn.com** before implementing any UI element
4. 📦 **Install missing components** via shadcn CLI
5. 🎨 **Customize with Tailwind** classes, not custom CSS
6. ♿ **Preserve accessibility** features in all implementations

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated:** February 2026
