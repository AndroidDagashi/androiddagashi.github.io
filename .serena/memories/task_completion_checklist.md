# Task Completion Checklist

When a coding task is completed, run the following checks:

1. **Lint**: `yarn site:lint` — Ensure no ESLint errors
2. **Format**: `yarn site:format` — Auto-fix formatting issues
3. **Type Check**: TypeScript strict mode is enabled; ensure no type errors
4. **Build Test**: If changes affect the site, run `yarn site:generate` to verify static build succeeds
5. **Dev Server**: If UI changes, verify with `yarn site:dev` (requires `yarn api:generate` first)

## Git Workflow
- Development branch: `development`
- Deployment branch: `master`
- PRs target `development` branch
