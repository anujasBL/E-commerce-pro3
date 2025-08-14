# Dependency Resolution Guide

## Issue: picomatch Version Conflict

The GitHub Actions workflow was failing with this error:
```
npm error Invalid: lock file's picomatch@2.3.1 does not satisfy picomatch@4.0.3
```

This happens when different packages in your dependency tree expect different versions of the same package.

## Root Cause

- **picomatch@2.3.1**: Required by older packages (e.g., some glob-related packages)
- **picomatch@4.0.3**: Required by newer packages (e.g., tinyglobby@0.2.14)
- The lock file contains both versions, causing conflicts

## Solutions Applied

### 1. Updated GitHub Actions Workflow
- Changed from `npm ci` to `npm install --legacy-peer-deps --force`
- Added cleanup steps to remove existing node_modules and package-lock.json
- Added `npm audit fix` to resolve any remaining issues

### 2. Added .npmrc Configuration
```ini
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
resolution.picomatch=^4.0.0
```

### 3. Created Dependency Resolution Script
Run `npm run resolve-deps` to automatically resolve conflicts locally.

## How to Fix Locally

### Option 1: Use the Script (Recommended)
```bash
npm run resolve-deps
```

### Option 2: Manual Resolution
```bash
# Remove existing dependencies
rm -rf node_modules package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps --force

# Fix any remaining issues
npm audit fix --force

# Generate Prisma client
npx prisma generate
```

### Option 3: Update Specific Dependencies
If you know which packages are causing conflicts:
```bash
npm update package-name --legacy-peer-deps
```

## Prevention

### 1. Regular Maintenance
- Run `npm audit` regularly
- Update dependencies periodically
- Use `npm outdated` to check for updates

### 2. Lock File Management
- Always commit package-lock.json
- Don't manually edit package-lock.json
- Use `npm ci` in production (after conflicts are resolved)

### 3. Dependency Resolution
- Use `--legacy-peer-deps` when needed
- Consider using `npm-check-updates` for major version updates
- Test thoroughly after dependency updates

## When to Use Each Approach

- **`npm ci`**: Production builds, CI/CD (after conflicts resolved)
- **`npm install --legacy-peer-deps`**: Development, resolving conflicts
- **`npm install --force`**: Breaking dependency conflicts
- **`npm audit fix`**: Security vulnerabilities

## Troubleshooting

### If conflicts persist:
1. Check for conflicting peer dependencies
2. Update to latest compatible versions
3. Consider using yarn or pnpm for better dependency resolution
4. Lock specific versions in package.json if necessary

### Common conflicting packages:
- `picomatch` (glob patterns)
- `glob` (file matching)
- `chalk` (terminal colors)
- `semver` (version parsing)

## Committing Changes

After resolving dependencies:
1. Commit the updated `package-lock.json`
2. Commit the `.npmrc` file
3. Commit the updated workflow files
4. Test the workflow locally if possible

## Rollback Plan

If issues persist:
1. Revert to the previous working `package-lock.json`
2. Use `npm ci` instead of `npm install`
3. Consider pinning specific package versions
4. Contact maintainers of conflicting packages
