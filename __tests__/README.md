# Testing Suite Documentation

## Overview

This testing suite provides comprehensive coverage for Phase 1 Iteration 1.1 of the QuickCart Pro E-commerce platform. It includes unit tests, integration tests, API route tests, and end-to-end (E2E) tests.

## Test Structure

```
__tests__/
├── unit/                    # Unit tests for individual components and functions
│   ├── components/         # UI component tests
│   │   └── ui/            # shadcn/ui component tests
│   └── lib/               # Utility function tests
├── integration/            # Integration tests for page-level functionality
│   └── pages/             # Page component tests
├── api/                    # API route tests
│   └── auth/              # Authentication API tests
├── e2e/                    # End-to-end tests using Playwright
├── utils/                  # Test utilities and helpers
├── mocks/                  # Mock service worker setup
└── README.md              # This documentation
```

## Test Categories

### 1. Unit Tests
- **Purpose**: Test individual components and functions in isolation
- **Framework**: Jest + React Testing Library
- **Coverage**: Component rendering, props, user interactions, edge cases

**Examples**:
- Button component variants and states
- ProductCard component rendering and interactions
- Utility functions for data manipulation

### 2. Integration Tests
- **Purpose**: Test how components work together within pages
- **Framework**: Jest + React Testing Library + MSW
- **Coverage**: Page-level functionality, data flow, component interactions

**Examples**:
- Products page with product grid
- Search and filtering functionality
- Navigation between pages

### 3. API Route Tests
- **Purpose**: Test API endpoints and authentication flows
- **Framework**: Jest + MSW + node-mocks-http
- **Coverage**: HTTP methods, request/response handling, error cases

**Examples**:
- NextAuth.js authentication endpoints
- Product API routes
- Error handling and validation

### 4. End-to-End Tests
- **Purpose**: Test complete user workflows in real browser environment
- **Framework**: Playwright
- **Coverage**: User journeys, cross-browser compatibility, responsive design

**Examples**:
- Complete authentication flow
- Product browsing and cart interactions
- Navigation and responsive behavior

## Running Tests

### Prerequisites
- Node.js 22.18.0
- npm or yarn package manager

### Installation
```bash
npm install
```

### Test Commands

#### All Tests
```bash
npm test                    # Run all tests once
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

#### Specific Test Categories
```bash
npm run test:unit          # Run only unit tests
npm run test:integration   # Run only integration tests
npm run test:api           # Run only API tests
```

#### E2E Tests
```bash
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Run E2E tests with Playwright UI
npm run test:e2e:headed    # Run E2E tests in headed mode
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration with `next/jest`
- TypeScript support with `ts-jest`
- Coverage thresholds (80% minimum)
- Custom module mapping for `@/` imports

### Playwright Configuration (`playwright.config.ts`)
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Automatic dev server startup
- Screenshot and video capture on failure

### MSW (Mock Service Worker)
- API mocking for consistent test environment
- Browser and Node.js support
- Predefined mock handlers for common endpoints

## Test Utilities

### `test-utils.tsx`
- Custom render function with providers (NextAuth, React Query)
- Mock data generators
- Common test setup and cleanup functions

### Mock Data
- Product data with realistic variations
- User data with different roles
- Order data for testing workflows

## Best Practices

### Writing Tests
1. **Arrange-Act-Assert**: Structure tests with clear sections
2. **Descriptive Names**: Use test names that describe the behavior
3. **Single Responsibility**: Each test should verify one specific thing
4. **Mock External Dependencies**: Use MSW for API calls, mock Next.js features

### Component Testing
1. **Test User Interactions**: Focus on user behavior, not implementation details
2. **Accessibility**: Use semantic queries (`getByRole`, `getByLabelText`)
3. **Edge Cases**: Test error states, loading states, empty states

### E2E Testing
1. **Realistic Scenarios**: Test complete user workflows
2. **Cross-Browser**: Ensure compatibility across different browsers
3. **Mobile Testing**: Test responsive behavior on mobile devices

## Coverage Requirements

- **Overall Coverage**: 80% minimum
- **Branches**: 80% minimum
- **Functions**: 80% minimum
- **Lines**: 80% minimum
- **Statements**: 80% minimum

## Continuous Integration

### GitHub Actions
- Run tests on every push and pull request
- Generate coverage reports
- Upload test results to GitHub

### Vercel Integration
- Pre-deployment test execution
- Build-time test validation
- Deployment blocking on test failure

## Debugging Tests

### Jest Debugging
```bash
# Run specific test file
npm test -- products.test.tsx

# Run tests with verbose output
npm test -- --verbose

# Debug specific test
npm test -- --testNamePattern="should display products"
```

### Playwright Debugging
```bash
# Run tests with debug mode
npx playwright test --debug

# Run specific test with debug
npx playwright test products.spec.ts --debug

# Open Playwright UI
npx playwright test --ui
```

### VS Code Integration
- Install Jest and Playwright extensions
- Set breakpoints in test files
- Use integrated debugging for both test types

## Common Issues and Solutions

### 1. Next.js Image Component
- Mock `next/image` in tests to avoid build issues
- Use `jest.mock('next/image')` in test files

### 2. NextAuth.js Testing
- Mock session data for different user states
- Use MSW to intercept authentication API calls

### 3. Prisma Client
- Mock Prisma client methods for database operations
- Use `mockPrismaClient` utility for consistent mocking

### 4. Environment Variables
- Set test environment variables in `jest.setup.js`
- Use `.env.test` for test-specific configuration

## Performance Considerations

### Test Execution Time
- Unit tests: < 1 second per test
- Integration tests: < 5 seconds per test
- E2E tests: < 30 seconds per test

### Parallel Execution
- Jest runs tests in parallel by default
- Playwright supports parallel test execution
- Use `--maxWorkers` to control concurrency

## Future Enhancements

### Planned Improvements
1. **Visual Regression Testing**: Add Percy or similar tool
2. **Performance Testing**: Lighthouse CI integration
3. **Accessibility Testing**: axe-core integration
4. **Contract Testing**: API contract validation

### Test Data Management
1. **Database Seeding**: Automated test data setup
2. **Test Factories**: More sophisticated mock data generation
3. **Snapshot Testing**: Component output comparison

## Contributing

### Adding New Tests
1. Follow existing naming conventions
2. Add appropriate test categories
3. Update coverage requirements if needed
4. Document new test utilities

### Test Maintenance
1. Update tests when components change
2. Refactor tests for better maintainability
3. Remove obsolete tests
4. Keep mock data up to date

## Support

For questions about the testing suite:
1. Check this documentation
2. Review existing test examples
3. Consult Jest and Playwright documentation
4. Contact the development team
