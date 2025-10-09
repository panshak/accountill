# Contributing to Accountill 🎉

First off, thank you for considering contributing to Accountill! It's people like you that make Accountill such a great tool for freelancers and small businesses worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to uphold this standard. Please be respectful and constructive in all interactions.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them get started
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members
- ❌ No harassment, trolling, or discriminatory language
- ❌ No personal attacks or political arguments

---

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Found a bug? Please help us fix it by:

1. **Search existing issues** to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Provide detailed information:**
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Environment details (OS, browser, versions)
   - Error logs and console output

[Create a Bug Report](../../issues/new?template=bug_report.md)

### Suggesting Features ✨

Have an idea to make Accountill better?

1. **Check existing feature requests** to see if it's already suggested
2. **Use the feature request template** when creating a new issue
3. **Provide detailed information:**
   - Problem statement and use case
   - Proposed solution
   - Alternative approaches considered
   - Who would benefit from this feature
   - Technical implementation ideas (optional)

[Create a Feature Request](../../issues/new?template=feature_request.md)

### Improving Documentation 📚

Documentation improvements are always welcome:

- Fix typos, grammar, or unclear explanations
- Add examples or tutorials
- Improve API documentation
- Translate documentation (future)
- Create video tutorials or guides

### Contributing Code 💻

Want to contribute code? Awesome! See the sections below for guidelines.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/accountill.git
   cd accountill
   ```
3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/Panshak/accountill.git
   ```

### Installation

#### Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # (if available) or create manually

# Edit .env with your configuration
# Required variables:
# DB_URL=mongodb://localhost:27017/accountill
# PORT=5000
# SECRET=your-jwt-secret
# SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for email features)
```

#### Client Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # (if available) or create manually

# Edit .env with your configuration
# Required variables:
# REACT_APP_API=http://localhost:5000
# REACT_APP_URL=http://localhost:3000
# REACT_APP_GOOGLE_CLIENT_ID= (optional, for Google OAuth)
```

### Running the Application

#### Start MongoDB (if running locally)

```bash
mongod
```

#### Start the Server

```bash
cd server
npm start
```

Server will run at `http://localhost:5000`

#### Start the Client

```bash
cd client
npm start
```

Client will run at `http://localhost:3000`

### Verify Installation

1. Open `http://localhost:3000` in your browser
2. You should see the Accountill application
3. Try creating an account and logging in

---

## 🔄 Development Workflow

### Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/invoice-templates`)
- `fix/` - Bug fixes (e.g., `fix/pdf-generation-error`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)
- `refactor/` - Code refactoring (e.g., `refactor/auth-middleware`)
- `test/` - Test additions/updates (e.g., `test/invoice-controller`)
- `perf/` - Performance improvements (e.g., `perf/database-queries`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Making Changes

1. **Write clean, readable code** following our coding standards
2. **Test your changes** thoroughly
3. **Add/update tests** for your changes
4. **Update documentation** if needed
5. **Commit regularly** with meaningful messages

### Keep Your Branch Updated

Regularly sync with the upstream repository:

```bash
git checkout main
git pull upstream main
git checkout your-feature-branch
git rebase main
```

---

## 📏 Coding Standards

### JavaScript/React Style Guide

We follow industry-standard best practices:

#### General Rules

- Use **ES6+ syntax** (const/let, arrow functions, destructuring)
- Use **meaningful variable and function names**
- Keep functions **small and focused** (single responsibility)
- **Avoid deep nesting** (max 3 levels)
- **Remove commented-out code** before committing
- **No console.log** in production code (use proper logging)

#### React Conventions

```javascript
// ✅ Good - Functional component with hooks
import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ invoice, onSubmit }) => {
  const [formData, setFormData] = useState(invoice || {});

  useEffect(() => {
    // Side effects here
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* JSX here */}
    </form>
  );
};

export default InvoiceForm;
```

#### Redux Conventions

```javascript
// Action Types - Use constants
export const CREATE_INVOICE = 'CREATE_INVOICE';
export const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';
export const CREATE_INVOICE_FAIL = 'CREATE_INVOICE_FAIL';

// Action Creators - Clear and descriptive
export const createInvoice = (invoiceData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVOICE });
    const response = await api.post('/invoices', invoiceData);
    dispatch({ type: CREATE_INVOICE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_INVOICE_FAIL, payload: error.message });
  }
};
```

#### Node.js/Express Conventions

```javascript
// ✅ Good - Clear controller structure
export const createInvoice = async (req, res) => {
  try {
    const { userId } = req.user;
    const invoiceData = req.body;

    // Validate input
    if (!invoiceData.client) {
      return res.status(400).json({ message: 'Client is required' });
    }

    // Business logic
    const invoice = await Invoice.create({
      ...invoiceData,
      creator: userId,
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

### CSS/Styling

- Use **Material-UI** components where possible
- Follow **BEM naming convention** for custom CSS
- Use **CSS Modules** for component-specific styles
- Ensure **responsive design** (mobile-first approach)
- Maintain **accessibility** (color contrast, focus states)

### File Organization

```
client/src/
├── components/          # Reusable components
│   ├── Invoice/
│   │   ├── InvoiceForm.jsx
│   │   ├── InvoiceList.jsx
│   │   └── styles.module.css
├── actions/            # Redux actions
├── reducers/           # Redux reducers
├── api/                # API calls
├── utils/              # Utility functions
└── constants/          # Constants

server/
├── routes/             # Express routes
├── controllers/        # Route controllers
├── models/             # Mongoose models
├── middleware/         # Custom middleware
└── utils/              # Utility functions
```

---

## 📝 Commit Guidelines

### Commit Message Format

Use the **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `build` - Build system changes
- `ci` - CI/CD changes

#### Examples

```bash
# Feature
git commit -m "feat(invoice): add invoice template selector"

# Bug fix
git commit -m "fix(pdf): resolve PDF generation error for special characters"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Multiple lines
git commit -m "feat(payment): add payment history tracking

- Add payment model and schema
- Create payment history component
- Update invoice model with payment references
- Add payment filtering and sorting

Closes #123"
```

### Commit Best Practices

- **One logical change per commit**
- **Write clear, descriptive messages**
- **Reference issues** when applicable (e.g., "Fixes #123")
- **Keep commits atomic** (easy to revert if needed)
- **Avoid huge commits** (break them down)

---

## 🔀 Pull Request Process

### Before Submitting

1. ✅ **Self-review your code**
2. ✅ **Run all tests** and ensure they pass
3. ✅ **Update documentation** if needed
4. ✅ **Ensure no linting errors** (`npm run lint`)
5. ✅ **Test in multiple browsers**
6. ✅ **Rebase on latest main** branch
7. ✅ **Write meaningful commit messages**

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR** on GitHub from your fork to `Panshak/accountill:main`

3. **Fill out the PR template** completely:
   - Clear description of changes
   - Related issue references
   - Type of change checkboxes
   - Testing details
   - Screenshots (for UI changes)
   - All relevant checklists

4. **Request review** from maintainers

### PR Title Format

Use the same format as commit messages:

```
feat(invoice): add invoice template selector
fix(auth): resolve JWT token expiration issue
docs(api): update API endpoint documentation
```

### Review Process

- **Maintainers will review** your PR within a few days
- **Address feedback** promptly and respectfully
- **Update your PR** based on review comments
- **Be patient** - thorough reviews take time
- **Discuss** if you disagree with feedback

### After Approval

Once approved:
- Your PR will be **merged** by a maintainer
- Your branch can be **deleted**
- You'll be added to the **contributors list**! 🎉

---

## 🧪 Testing Guidelines

### Writing Tests

We use **Jest** for testing. All new features should include tests.

#### Unit Tests

```javascript
// Example unit test
import { calculateTotal } from '../utils/invoice';

describe('Invoice Utils', () => {
  describe('calculateTotal', () => {
    it('should calculate total correctly with tax', () => {
      const items = [
        { quantity: 2, unitPrice: 100 },
        { quantity: 1, unitPrice: 50 },
      ];
      const tax = 0.1; // 10%
      
      const total = calculateTotal(items, tax);
      
      expect(total).toBe(275); // (200 + 50) * 1.1
    });
  });
});
```

#### Integration Tests

```javascript
// Example API test
import request from 'supertest';
import app from '../app';

describe('POST /api/invoices', () => {
  it('should create a new invoice', async () => {
    const invoiceData = {
      client: 'Test Client',
      items: [{ description: 'Service', amount: 100 }],
    };

    const response = await request(app)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invoiceData)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.client).toBe('Test Client');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test InvoiceController.test.js
```

### Test Coverage

- Aim for **>80% coverage** for new code
- All **critical paths** must be tested
- Test **edge cases** and error scenarios
- Test **user interactions** in React components

---

## 📚 Documentation

### Code Documentation

- **Add JSDoc comments** for functions and classes
- **Explain complex logic** with inline comments
- **Document API endpoints** with clear descriptions
- **Include examples** where helpful

```javascript
/**
 * Creates a new invoice for the authenticated user
 * @param {Object} invoiceData - The invoice data
 * @param {string} invoiceData.client - Client name or ID
 * @param {Array} invoiceData.items - Array of invoice items
 * @param {number} invoiceData.tax - Tax percentage (0-1)
 * @returns {Promise<Object>} Created invoice object
 * @throws {ValidationError} If invoice data is invalid
 */
export const createInvoice = async (invoiceData) => {
  // Implementation
};
```

### README Updates

Update the README if you:
- Add new features
- Change setup/installation process
- Add new dependencies
- Modify configuration

### API Documentation

Document new endpoints:
- HTTP method and path
- Authentication requirements
- Request body schema
- Response format
- Error responses
- Example requests/responses

---

## 💬 Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion (if enabled)
- **Email** - Contact the maintainer at ipanshak@gmail.com

### Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes for significant contributions
- Special mentions in documentation

---

## 🎯 Good First Issues

New to the project? Look for issues labeled:
- `good first issue` - Perfect for newcomers
- `help wanted` - Need community help
- `documentation` - Documentation improvements

---

## 🙏 Thank You!

Your contributions make Accountill better for everyone. Whether it's code, documentation, bug reports, or feature ideas - every contribution matters!

**Happy Contributing!** 🚀

---

## 📞 Contact

- **Author:** Panshak Solomon
- **Email:** ipanshak@gmail.com
- **Twitter:** [@panshak_](https://twitter.com/panshak_)
- **GitHub:** [@panshak](https://github.com/panshak)

---

**License:** This project is [MIT](LICENSE.md) licensed.
