---
name: react-tests
description: Generate React/Astro unit tests following project best practices with Vitest and Testing Library
---

# React/Astro Unit Testing Guidelines

This document outlines the standards and best practices for writing unit tests in React and Astro projects. Our testing strategy uses [Vitest](https://vitest.dev/) as the test runner and [React Testing Library](https://testing-library.com/react) for component testing.

## Core Principles

All tests must adhere to these principles:

1. **The Golden Rule**: Test component behavior, not implementation details. Tests should resemble how users interact with your application.

2. **A.A.A. (Arrange, Act, Assert)**: Structure tests clearly:
   - **Arrange**: Set up test conditions (render component, setup mocks)
   - **Act**: Interact with the component (click, type, etc.)
   - **Assert**: Verify expected outcomes

3. **F.I.R.S.T**:
   - **Fast**: Tests run quickly
   - **Independent**: No dependencies between tests
   - **Repeatable**: Consistent results every run
   - **Self-Validating**: Clear pass/fail outcomes
   - **Timely**: Written alongside feature code

---

## File Structure

Tests must be co-located with source files for easy maintenance and refactoring.

**Format**: `[FileName].test.tsx` or `[FileName].test.ts`

**Example Structure:**

```
src/
├── components/
│   ├── Footer.tsx
│   ├── Footer.test.tsx          ✅ Co-located
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.test.tsx      ✅ Co-located
│   │   └── index.ts
│   │
│   └── ui/
│       ├── button.tsx
│       ├── button.test.tsx
│       └── icons/               ❌ No tests (excluded from coverage)
│           └── Instagram.tsx
│
├── hooks/
│   ├── useLanguage.ts
│   └── useLanguage.test.ts      ✅ Co-located
│
└── lib/
    ├── utils.ts
    └── utils.test.ts            ✅ Co-located
```

**Files to EXCLUDE from testing:**

- Icon components (`**/icons/**`, `**/*.icon.tsx`)
- Pure SVG components (no logic)
- Storybook stories (`**/*.stories.tsx`)
- Type definitions (`**/*.d.ts`)
- Config files

---

## Test Setup

### Basic Test Template

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('Given [context], when [action], then [expected outcome]', () => {
    // Arrange
    render(<ComponentName />);

    // Act
    // ... user interactions

    // Assert
    // ... expectations
  });
});
```

### Test File Boilerplate

Every test file should follow this structure:

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ComponentName from "./ComponentName";

// Mock dependencies at the top
vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => ({
    t: {
      footer: {
        tagline: "Test tagline",
        copyright: "© 2024 Test",
      },
    },
  })),
}));

describe("ComponentName", () => {
  // Setup user event for all tests
  const user = userEvent.setup();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup after each test
    vi.resetAllMocks();
  });

  it("Given [initial state], when [action occurs], then [expected result]", async () => {
    // Test implementation
  });
});
```

---

## Test Naming Convention

All tests MUST follow **Given-When-Then** format for clarity:

**Format**: `"Given [context], when [action], then [expected outcome]"`

**Examples:**

```typescript
describe("LoginForm", () => {
  it("Given valid credentials, when user submits form, then it should call login function", async () => {
    // Test implementation
  });

  it("Given invalid email format, when user types in email field, then it should display validation error", async () => {
    // Test implementation
  });

  it("Given loading state, when component renders, then it should display loading spinner", () => {
    // Test implementation
  });

  it("Given empty form, when user clicks submit, then it should show required field errors", async () => {
    // Test implementation
  });
});
```

---

## Queries - Priority Order

Use Testing Library queries in this priority order (from most to least preferred):

### 1. **Accessible Queries** (Preferred)

```typescript
// ✅ BEST: Query by role (most similar to user experience)
const button = screen.getByRole("button", { name: /submit/i });
const heading = screen.getByRole("heading", { name: /welcome/i });
const link = screen.getByRole("link", { name: /home/i });

// ✅ GOOD: Query by label (for form inputs)
const emailInput = screen.getByLabelText(/email address/i);
const passwordInput = screen.getByLabelText(/password/i);
```

### 2. **Text Content Queries**

```typescript
// ✅ Query by visible text
const element = screen.getByText(/hello world/i);
const placeholder = screen.getByPlaceholderText(/search/i);
```

### 3. **Test IDs** (Last Resort)

```typescript
// ⚠️ Use ONLY when other queries don't work
const element = screen.getByTestId('custom-element');

// Add testId to component:
<div data-testid="custom-element">Content</div>
```

### Query Variants

```typescript
// getBy* - Throws error if not found (use for elements that should exist)
const button = screen.getByRole("button");

// queryBy* - Returns null if not found (use to assert element doesn't exist)
const error = screen.queryByText(/error/i);
expect(error).not.toBeInTheDocument();

// findBy* - Returns Promise (use for async elements)
const loadedData = await screen.findByText(/data loaded/i);
```

---

## User Interactions

### Using `userEvent` (Preferred)

```typescript
import userEvent from '@testing-library/user-event';

it('Given a button, when user clicks it, then it should call handler', async () => {
  // Arrange
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  // Act
  await user.click(screen.getByRole('button', { name: /click me/i }));

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Common User Interactions

```typescript
// Clicking
await user.click(element);
await user.dblClick(element);

// Typing
await user.type(input, "Hello World");
await user.clear(input);

// Keyboard
await user.keyboard("{Enter}");
await user.keyboard("{Escape}");

// Hover
await user.hover(element);
await user.unhover(element);

// Form interactions
await user.selectOptions(select, "option-value");
await user.upload(fileInput, file);
```

---

## Async Operations

### Using `findBy*` queries

```typescript
it('Given API call, when component mounts, then it should display fetched data', async () => {
  // Arrange
  const mockData = { name: 'John Doe' };
  vi.mocked(fetchUser).mockResolvedValue(mockData);

  // Act
  render(<UserProfile />);

  // Assert - findBy* waits automatically
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();
});
```

### Using `waitFor`

```typescript
it('Given form submission, when API responds, then it should show success message', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<ContactForm />);

  // Act
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

---

## What to Test

### ✅ DO Test These

- **Conditional Rendering**: Different UI based on props/state
- **User Interactions**: Button clicks, form submissions, typing
- **Form Validation**: Error messages, validation logic
- **Async Operations**: API calls, loading states, error states
- **Accessibility**: Proper roles, labels, keyboard navigation
- **Custom Hooks**: Return values and side effects
- **Navigation**: Route changes, link clicks
- **Internationalization**: Different languages render correctly

**Examples:**

```typescript
// ✅ Test conditional rendering
it('Given isLoading true, when component renders, then it should show spinner', () => {
  render(<MyComponent isLoading={true} />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

// ✅ Test user interaction
it('Given a form, when user submits valid data, then it should call onSubmit', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<Form onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/name/i), 'John');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
});

// ✅ Test async behavior
it('Given API error, when data fetch fails, then it should display error message', async () => {
  vi.mocked(fetchData).mockRejectedValue(new Error('API Error'));
  render(<DataComponent />);

  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});
```

### ❌ DON'T Test These

- **Implementation Details**: Internal state, component methods
- **Third-Party Libraries**: Assume they work correctly
- **Static Styles**: CSS values unless conditionally applied
- **Pure Icon/SVG Components**: No logic to test
- **Constants/Config Files**: Just data, no behavior
- **Type Definitions**: TypeScript handles this

**Examples of what NOT to test:**

```typescript
// ❌ DON'T test internal state
it('should have count state equal to 0', () => {
  const { result } = renderHook(() => useState(0));
  expect(result.current[0]).toBe(0); // Testing implementation!
});

// ❌ DON'T test static styles
it('should have blue color', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toHaveStyle({ color: 'blue' }); // Brittle!
});

// ✅ DO test conditional styles
it('Given error prop, when button renders, then it should have error styling', () => {
  render(<Button error />);
  expect(screen.getByRole('button')).toHaveClass('bg-red-500'); // Testing behavior!
});
```

---

## Mocking

### Mocking Modules

```typescript
// Mock an entire module
vi.mock('@/lib/api', () => ({
  fetchUser: vi.fn(),
  updateUser: vi.fn(),
}));

// Use the mocked functions
import { fetchUser } from '@/lib/api';

it('should call fetchUser with correct id', async () => {
  vi.mocked(fetchUser).mockResolvedValue({ id: 1, name: 'John' });

  render(<UserProfile userId={1} />);

  await waitFor(() => {
    expect(fetchUser).toHaveBeenCalledWith(1);
  });
});
```

### Mocking Custom Hooks

```typescript
// Mock a custom hook
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: vi.fn(() => ({
    t: {
      common: {
        submit: 'Submit',
        cancel: 'Cancel',
      },
    },
    lang: 'en',
  })),
}));

it('Given Spanish language, when component renders, then it should display Spanish text', () => {
  // Override mock for this specific test
  vi.mocked(useLanguage).mockReturnValue({
    t: {
      common: {
        submit: 'Enviar',
        cancel: 'Cancelar',
      },
    },
    lang: 'es',
  });

  render(<MyForm />);

  expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
});
```

### Mocking API Calls

```typescript
// Using fetch mock
global.fetch = vi.fn();

it('Given successful API response, when component mounts, then it should display data', async () => {
  // Arrange
  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => ({ name: 'John Doe' }),
  } as Response);

  // Act
  render(<UserProfile />);

  // Assert
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

---

## Common Patterns

### Testing Forms

```typescript
it('Given empty required field, when user submits form, then it should show validation error', async () => {
  // Arrange
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<ContactForm onSubmit={onSubmit} />);

  // Act
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});
```

### Testing Loading States

```typescript
it('Given API call in progress, when component renders, then it should show loading indicator', () => {
  // Arrange
  vi.mocked(fetchData).mockImplementation(() => new Promise(() => {})); // Never resolves

  // Act
  render(<DataComponent />);

  // Assert
  expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
});
```

### Testing Error States

```typescript
it('Given API failure, when data fetch fails, then it should display error message', async () => {
  // Arrange
  const errorMessage = 'Network error occurred';
  vi.mocked(fetchData).mockRejectedValue(new Error(errorMessage));

  // Act
  render(<DataComponent />);

  // Assert
  expect(await screen.findByRole('alert')).toHaveTextContent(/error/i);
});
```

### Testing with Multiple Scenarios

```typescript
describe('Button', () => {
  it.each([
    { variant: 'primary', expectedClass: 'bg-blue-500' },
    { variant: 'secondary', expectedClass: 'bg-gray-500' },
    { variant: 'danger', expectedClass: 'bg-red-500' },
  ])('Given variant $variant, when button renders, then it should have class $expectedClass',
    ({ variant, expectedClass }) => {
      render(<Button variant={variant}>Click</Button>);
      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    }
  );
});
```

---

## Accessibility Testing

Always test that components are accessible:

```typescript
it('Given form inputs, when rendered, then they should have proper labels', () => {
  render(<LoginForm />);

  // Assert inputs are accessible
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

it('Given button, when rendered, then it should have accessible name', () => {
  render(<IconButton icon={TrashIcon} onClick={vi.fn()} />);

  // Icon buttons need aria-label or accessible text
  expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
});
```

---

## Coverage Configuration

Configure Vitest to exclude non-testable files:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      exclude: [
        "**/icons/**",
        "**/*.icon.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.d.ts",
        "*.config.{js,ts}",
        "node_modules/",
      ],
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
```

---

## Quick Reference Checklist

Before submitting your test, verify:

- [ ] Test file is co-located with source file
- [ ] Test name follows Given-When-Then format
- [ ] Uses A.A.A. structure (Arrange, Act, Assert)
- [ ] Queries follow priority order (role > text > testId)
- [ ] Uses `userEvent` for interactions
- [ ] Tests behavior, not implementation
- [ ] Mocks are properly typed with `vi.mocked()`
- [ ] Async operations use `findBy*` or `waitFor`
- [ ] Accessibility is tested
- [ ] No tests for icons/pure SVG components

---

## Examples

### Complete Component Test

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

// Mock API
vi.mock('@/lib/api', () => ({
  login: vi.fn(),
}));

import { login } from '@/lib/api';

describe('LoginForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Given valid credentials, when user submits form, then it should call login API', async () => {
    // Arrange
    vi.mocked(login).mockResolvedValue({ success: true });
    const onSuccess = vi.fn();
    render(<LoginForm onSuccess={onSuccess} />);

    // Act
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('Given invalid email, when user types, then it should show validation error', async () => {
    // Arrange
    render(<LoginForm />);

    // Act
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.tab(); // Trigger blur event

    // Assert
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('Given API error, when login fails, then it should display error message', async () => {
    // Arrange
    vi.mocked(login).mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm />);

    // Act
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrong-password');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(/invalid credentials/i);
  });
});
```

### Complete Hook Test

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useLanguage } from "./useLanguage";

vi.mock("@/lib/i18n", () => ({
  translations: {
    en: { common: { hello: "Hello" } },
    es: { common: { hello: "Hola" } },
  },
}));

describe("useLanguage", () => {
  it("Given no language param, when hook is called, then it should return default language", () => {
    // Arrange & Act
    const { result } = renderHook(() => useLanguage());

    // Assert
    expect(result.current.lang).toBe("en");
    expect(result.current.t.common.hello).toBe("Hello");
  });

  it("Given Spanish language, when hook is called, then it should return Spanish translations", () => {
    // Arrange & Act
    const { result } = renderHook(() => useLanguage("es"));

    // Assert
    expect(result.current.lang).toBe("es");
    expect(result.current.t.common.hello).toBe("Hola");
  });
});
```

---

## Remember

> "The more your tests resemble the way your software is used, the more confidence they can give you." - Kent C. Dodds

Focus on testing **what the user sees and does**, not **how the code works internally**.
