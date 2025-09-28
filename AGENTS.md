# CLAUDE.md

This file provides guidance to AI Coding Agents(Claude Code, Codex, etc) when working with code in this repository.

## Project Overview

Android Dagashi is a Nuxt 3-based static site that aggregates and displays Android development news and resources. The site uses GitHub Issues as a CMS, fetching data via GitHub API and generating static pages.

## Architecture

### Monorepo Structure (Yarn Workspaces)

- **packages/site** - Main Nuxt 3 application with Vue 3, Tailwind CSS
- **packages/site-api** - Generates JSON API files from GitHub Issues
- **packages/site-api-github** - GitHub API integration layer
- **packages/site-rss** - RSS feed generation
- **packages/sns-updater** - Social media update automation
- **packages/site-config** - Shared configuration
- **packages/site-types** - TypeScript type definitions
- **packages/site-common** - Shared utilities

### Key Technologies

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS, Pinia (state management)
- **Build**: Yarn 4 with workspaces, TypeScript, ESLint, Prettier
- **Deployment**: GitHub Actions → GitHub Pages (master branch)

## Essential Commands

```bash
# Initial setup (requires mise and direnv)
make bootstrap

# Development workflow
yarn install                  # Install all dependencies
yarn api:generate             # Fetch GitHub issues and generate JSON API files
yarn rss:generate             # Generate RSS feed
yarn site:dev                 # Start dev server at localhost:3000
yarn site:generate            # Build static site for production

# Code quality
yarn site:lint                # Run ESLint
yarn site:format              # Fix ESLint issues

# Social media
yarn sns:update               # Update social media with new content
```

## Development Requirements

1. **Environment Setup**:
   - Copy `envrc.template` to `.envrc`
   - Add GitHub Personal Access Token to `GH_READONLY_TOKEN` in `.envrc`
   - Install direnv and allow the `.envrc` file

2. **Prerequisites**:
   - Node.js (managed via mise)
   - Yarn 4 (via corepack)
   - GitHub Personal Access Token (read-only permissions sufficient)

## Data Flow

1. GitHub Issues in AndroidDagashi/AndroidDagashi repo serve as CMS
2. `yarn api:generate` fetches issues via GitHub API and creates JSON files in `packages/site/public/api/`
3. Nuxt reads these JSON files during build to generate static pages
4. Static site deployed to GitHub Pages on master branch

## Configuration Files

- **nuxt.config.ts** - Main Nuxt configuration, defines routes from JSON data
- **site-config** package - Shared configuration across workspaces
- **mise.toml** - Node.js version management
- **.yarnrc.yml** - Yarn 4 configuration with PnP mode

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):

- Triggers on push to development branch
- Builds static site with `nuxi build --preset github_pages`
- Deploys to master branch for GitHub Pages hosting

## Important Patterns

- All API data must be generated before running dev server or building
- The site uses static generation with pre-rendered routes based on issue IDs
- Custom OGP meta tag generation for social sharing
- TypeScript strict mode is enabled across all packages
