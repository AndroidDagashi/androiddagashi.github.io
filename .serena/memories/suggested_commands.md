# Suggested Commands

## Setup
```bash
make bootstrap              # Initial project setup (requires mise and direnv)
yarn install                # Install all dependencies
```

## Development
```bash
yarn api:generate           # Fetch GitHub issues and generate JSON API files (run before dev/build)
yarn rss:generate           # Generate RSS feed
yarn site:dev               # Start dev server at localhost:3000
yarn site:generate          # Build static site for production
```

## Code Quality
```bash
yarn site:lint              # Run ESLint
yarn site:format            # Fix ESLint issues (eslint --fix)
```

## Social Media
```bash
yarn sns:update             # Update social media with new content
```

## System Utils (macOS / Darwin)
```bash
git                         # Version control
ls                          # List directory contents
cd                          # Change directory
grep                        # Search file contents
find                        # Find files
```

## Important Notes
- Always run `yarn api:generate` before `yarn site:dev` or `yarn site:generate`
- Environment requires `.envrc` with `GH_READONLY_TOKEN` (GitHub Personal Access Token)
- Development branch is `development`, deployment target is `master`
