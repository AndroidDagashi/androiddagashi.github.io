# Project Overview

**Android Dagashi** is a Nuxt 4-based static site that aggregates and displays Android development news and resources.

## Key Characteristics
- Uses GitHub Issues (AndroidDagashi/AndroidDagashi repo) as a CMS
- Fetches data via GitHub API, generates JSON files, then builds static pages
- Deployed to GitHub Pages (master branch) via GitHub Actions from development branch

## Tech Stack
- **Frontend**: Nuxt 4, Vue 3, Tailwind CSS, Pinia (state management)
- **Language**: TypeScript (strict mode)
- **Package Manager**: Yarn 4 with workspaces (PnP mode)
- **Node.js**: v24.14.0 (managed via mise)
- **Build/Deploy**: GitHub Actions → GitHub Pages
- **Code Quality**: ESLint, Prettier

## Monorepo Structure (Yarn Workspaces)
- `packages/site` - Main Nuxt 4 application
- `packages/site-api` - Generates JSON API files from GitHub Issues
- `packages/site-api-github` - GitHub API integration layer
- `packages/site-rss` - RSS feed generation
- `packages/sns-updater` - Social media update automation
- `packages/site-config` - Shared configuration
- `packages/site-types` - TypeScript type definitions
- `packages/site-common` - Shared utilities

## Data Flow
1. GitHub Issues serve as CMS
2. `yarn api:generate` fetches issues and creates JSON in `packages/site/public/api/`
3. Nuxt reads JSON during build to generate static pages
4. Static site deployed to GitHub Pages on master branch
