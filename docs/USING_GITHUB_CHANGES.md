# Using Cloud Agent Changes from GitHub

This guide explains how to use changes made by a cloud agent (like GitHub Copilot) in your GitHub repository and run the application locally with those changes.

## Table of Contents

1. [Getting Changes from GitHub](#getting-changes-from-github)
2. [Setting Up the Application](#setting-up-the-application)
3. [Running the Application](#running-the-application)
4. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Getting Changes from GitHub

### If You Don't Have the Repository Yet

If you haven't cloned the repository to your local machine:

```bash
# Clone the repository
git clone https://github.com/wiscmikeifi/linkshortenerproject.git

# Navigate into the project directory
cd linkshortenerproject
```

### If You Already Have the Repository

If you already have the repository cloned locally:

```bash
# Navigate to your project directory
cd linkshortenerproject

# Make sure you're on the correct branch (usually main or master)
git checkout main

# Fetch the latest changes from GitHub
git fetch origin

# Pull the changes made by the cloud agent
git pull origin main
```

### Working with Pull Requests

If the cloud agent created a Pull Request (PR) with changes:

```bash
# View all remote branches
git fetch origin

# Check out the PR branch (replace <branch-name> with actual branch name)
git checkout <branch-name>

# Or if the branch doesn't exist locally, create and track it
git checkout -b <branch-name> origin/<branch-name>

# Pull the latest changes from that branch
git pull origin <branch-name>
```

**Tip:** You can find the branch name in the GitHub Pull Request page, usually shown as something like `copilot/feature-name` or `agent/task-name`.

---

## Setting Up the Application

After pulling the changes, you need to set up the application locally.

### 1. Install Node.js

Ensure you have Node.js 20 or higher installed:

```bash
# Check your Node.js version
node --version

# If you need to install Node.js, visit: https://nodejs.org/
```

### 2. Install Dependencies

Install all the required npm packages:

```bash
# Install dependencies
npm install
```

This will install all the packages listed in `package.json`, including:
- Next.js (the web framework)
- React (the UI library)
- Clerk (authentication)
- Drizzle ORM (database)
- Tailwind CSS (styling)
- And many more...

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Create the environment file
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Database Connection
DATABASE_URL=your_neon_database_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

**Where to get these values:**

- **DATABASE_URL**: Get this from your [Neon](https://neon.tech/) dashboard
  - Sign in to Neon
  - Select your project
  - Go to Connection Details
  - Copy the connection string

- **Clerk Keys**: Get these from your [Clerk](https://clerk.com/) dashboard
  - Sign in to Clerk
  - Select your application
  - Go to API Keys
  - Copy the Publishable Key and Secret Key

**Important:** Never commit `.env.local` to GitHub. It's already in `.gitignore` to prevent this.

### 4. Set Up the Database (If Needed)

If the cloud agent made database changes, you may need to push schema changes:

```bash
# Push database schema changes to your database
npm run db:push

# Or if using Drizzle migrations
npx drizzle-kit push
```

**Note:** Check if there's a `drizzle.config.ts` file and database migration scripts that the agent may have added.

---

## Running the Application

### Development Mode

To run the application in development mode (with hot-reload):

```bash
npm run dev
```

The application will start at `http://localhost:3000`

**What you should see:**
- Terminal output showing "Ready" and the local URL
- No compilation errors
- The application running in your browser at http://localhost:3000

### Production Build

To test a production build:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

The production application will start at `http://localhost:3000`

### Running Linters

To check code quality:

```bash
npm run lint
```

---

## Common Issues and Solutions

### Issue 1: "Module not found" errors

**Solution:** Install dependencies
```bash
npm install
```

### Issue 2: Environment variable errors

**Symptoms:**
- "DATABASE_URL is not defined"
- "Clerk publishable key is missing"

**Solution:** Ensure `.env.local` exists and contains all required variables:
```bash
# Check if .env.local exists
ls -la .env.local

# If it doesn't exist, create it and add the required variables
```

### Issue 3: Database connection errors

**Symptoms:**
- "Failed to connect to database"
- "Connection timeout"

**Solution:**
1. Check your `DATABASE_URL` is correct in `.env.local`
2. Ensure your Neon database is running
3. Verify your IP address is allowed in Neon's settings

### Issue 4: Port 3000 already in use

**Symptoms:**
- "Port 3000 is already in use"

**Solution:**
```bash
# Find and kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
PORT=3001 npm run dev
```

### Issue 5: TypeScript errors after pulling changes

**Solution:**
```bash
# Clean build artifacts
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### Issue 6: Git merge conflicts

**Symptoms:**
- Git shows merge conflicts when pulling

**Solution:**
```bash
# See which files have conflicts
git status

# For each conflicted file, choose one of:

# Option 1: Keep your changes
git checkout --ours <file>

# Option 2: Keep the agent's changes
git checkout --theirs <file>

# Option 3: Manually edit the file to resolve conflicts
# (Open the file and look for <<<<<<, ======, >>>>>> markers)

# After resolving all conflicts:
git add .
git commit -m "Resolved merge conflicts"
```

---

## Verifying the Changes

After setting up and running the app, verify the cloud agent's changes:

1. **Check the Git Log:**
   ```bash
   git log --oneline -10
   ```
   This shows recent commits made by the agent

2. **View Changed Files:**
   ```bash
   git diff HEAD~1
   ```
   This shows what changed in the last commit

3. **Test the Functionality:**
   - Navigate through the application
   - Test the features that were added/modified
   - Check the browser console for errors
   - Verify the changes work as expected

---

## Next Steps

Once you have the application running with the cloud agent's changes:

1. **Review the Changes:** Carefully review what the agent changed
2. **Test Thoroughly:** Test all functionality to ensure nothing broke
3. **Merge the PR:** If satisfied, merge the Pull Request on GitHub
4. **Deploy:** Consider deploying the changes to your production environment

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pull Requests Guide](https://docs.github.com/en/pull-requests)
- [Clerk Setup Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Neon Database Setup](https://neon.tech/docs/get-started-with-neon)

---

## Need Help?

If you encounter issues not covered here:

1. Check the project's other documentation files in `/docs`
2. Review the README.md for basic setup instructions
3. Check GitHub Issues for similar problems
4. Create a new GitHub Issue with:
   - What you were trying to do
   - What error you encountered
   - Steps to reproduce the issue
   - Your environment (OS, Node version, etc.)

---

**Last Updated:** February 2026
