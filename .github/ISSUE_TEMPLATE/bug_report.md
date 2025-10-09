---
name: 🐛 Bug Report
about: Report a bug to help us improve Accountill
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## 🐛 Bug Description
Provide a clear and concise description of the bug.

## 🔴 Severity Level
- [ ] **Critical** - Application crashes, data loss, security vulnerability
- [ ] **High** - Major feature broken, significant user impact
- [ ] **Medium** - Feature partially working, workaround available
- [ ] **Low** - Minor issue, cosmetic problem

## 📦 Affected Module
Which part of the application is affected?
- [ ] Invoice Generation/Management
- [ ] Client Management
- [ ] Payment Tracking
- [ ] PDF Generation
- [ ] Email Functionality (Nodemailer)
- [ ] User Authentication (JWT/Google OAuth)
- [ ] Dashboard/Analytics
- [ ] Database Operations
- [ ] File Upload (Cloudinary)
- [ ] API Endpoints
- [ ] UI/UX Components
- [ ] Other: _______

## 🔄 To Reproduce
Detailed steps to reproduce the behavior:

1. Navigate to '...'
2. Perform action '...'
3. Enter data '...'
4. Click on '...'
5. Observe error '...'

**Sample Data (if applicable):**
```json
{
  "example": "data used to reproduce"
}
```

## ✅ Expected Behavior
Describe what you expected to happen.

## ❌ Actual Behavior
Describe what actually happened instead.

## 📸 Screenshots/Videos
Add screenshots or screen recordings to help explain the problem.

**Before the bug:**


**After the bug occurred:**


## 💻 Environment Details

### Deployment Type
- [ ] Hosted version (accountill.com)
- [ ] Self-hosted (Docker)
- [ ] Self-hosted (Manual installation)
- [ ] Local development

### Client Environment
**Desktop:**
- OS: [e.g., Windows 11, macOS 13.0, Ubuntu 22.04]
- Browser: [e.g., Chrome, Firefox, Safari, Edge]
- Browser Version: [e.g., 120.0.6099.109]
- Screen Resolution: [e.g., 1920x1080]
- Viewport Size: [e.g., Desktop, Tablet, Mobile]

**Mobile (if applicable):**
- Device: [e.g., iPhone 14 Pro, Samsung Galaxy S23]
- OS: [e.g., iOS 17.1, Android 14]
- Browser: [e.g., Safari, Chrome, Samsung Internet]
- Browser Version: [e.g., 17.1]

### Server Environment (Self-hosted only)
- Node.js Version: [e.g., v18.17.0]
- npm/yarn Version: [e.g., npm 9.6.7]
- MongoDB Version: [e.g., 5.0.14]
- OS: [e.g., Ubuntu 22.04, Windows Server 2022]
- Docker Version (if applicable): [e.g., 24.0.5]
- Memory Available: [e.g., 4GB]
- CPU: [e.g., 2 cores]

### Application Version
- Commit Hash/Tag: [e.g., abc1234 or v1.2.3]
- Branch: [e.g., main, develop]
- Last Updated: [e.g., 2 weeks ago]

## 🔍 Error Logs & Console Output

### Browser Console Errors
```javascript
// Paste browser console errors here (F12 > Console)
// Include the full stack trace
```

### Network Errors
```
// Paste Network tab errors here (F12 > Network)
// Include request/response details, status codes, headers
Request URL: 
Status Code: 
Response Body:
```

### Server Logs
```
// Paste server-side errors from terminal/logs
// Include timestamps and full stack traces
```

### MongoDB Errors (if applicable)
```
// Paste any database errors or warnings
```

## 🔧 Technical Details

### Redux State (if applicable)
```javascript
// Paste relevant Redux state that might be causing the issue
// Use Redux DevTools to export state
```

### API Request/Response
**Request:**
```http
POST /api/endpoint HTTP/1.1
Content-Type: application/json

{
  "data": "example"
}
```

**Response:**
```json
{
  "error": "error message"
}
```

### Component Affected (Frontend issues)
- Component Name: [e.g., `InvoiceForm.jsx`]
- Component Path: [e.g., `client/src/components/Invoice/InvoiceForm.jsx`]
- Parent Component: [e.g., `Dashboard.jsx`]

### Route/Controller Affected (Backend issues)
- Route: [e.g., `POST /invoices`]
- Controller: [e.g., `invoiceController.js`]
- Middleware: [e.g., `auth.js`]

## 🔐 Security Implications
- [ ] This bug exposes sensitive data
- [ ] This bug could lead to unauthorized access
- [ ] This bug affects authentication/authorization
- [ ] This bug could be exploited (please describe how)
- [ ] No security implications

**Security Details (if applicable):**
```
// Describe security concerns privately if needed
```

## ⚡ Performance Impact
- [ ] Application becomes unresponsive
- [ ] Page load time increases significantly
- [ ] Memory leak detected
- [ ] High CPU usage
- [ ] Database queries are slow
- [ ] No performance impact

**Performance Metrics (if available):**
- Page Load Time: [e.g., 5 seconds]
- Time to Interactive: [e.g., 8 seconds]
- Memory Usage: [e.g., 500MB]
- Network Requests: [e.g., 50 requests]

## 📊 Frequency & Impact
- **Occurrence:** 
  - [ ] Always (100%)
  - [ ] Frequently (>50%)
  - [ ] Sometimes (10-50%)
  - [ ] Rarely (<10%)
  - [ ] Only once

- **User Impact:**
  - [ ] Affects all users
  - [ ] Affects specific user roles: _______
  - [ ] Affects only admin users
  - [ ] Affects only new users
  - [ ] Affects users with specific data

- **Data Impact:**
  - [ ] Data loss occurred
  - [ ] Data corruption occurred
  - [ ] Incorrect calculations/totals
  - [ ] No data impact

## 🕐 Timeline
- When did this start happening? [e.g., After update on Jan 15, 2025]
- Did this work before? **Yes / No**
- Recent changes made:
  - [ ] Updated dependencies
  - [ ] Changed environment variables
  - [ ] Modified database
  - [ ] Updated browser
  - [ ] Changed configuration
  - [ ] No recent changes

## 🔄 Workaround
Is there a temporary workaround for this issue?
```
Describe any workaround you found
```

## 🧪 Attempted Debugging Steps
What have you tried to fix this issue?
- [ ] Cleared browser cache and cookies
- [ ] Tried in incognito/private mode
- [ ] Tried different browser
- [ ] Restarted server
- [ ] Checked database connection
- [ ] Reviewed environment variables
- [ ] Checked network connectivity
- [ ] Reviewed logs
- [ ] Updated dependencies
- [ ] Other: _______

## 💡 Possible Root Cause
If you have insights into what might be causing this:
```
Describe your hypothesis about the root cause
```

## 🛠️ Suggested Solution
If you have ideas on how to fix this:
```
Describe your proposed solution
Include code snippets if applicable
```

## 📋 Additional Context

### Related Issues
- Related to issue #______
- Duplicate of issue #______
- Blocks issue #______

### Business Impact
How does this affect business operations?
```
Describe the business impact
```

### User Feedback
Any user complaints or feedback related to this?
```
Paste relevant user feedback
```

### Database Query (if applicable)
```javascript
// Paste the problematic database query
```

### Environment Variables Used
```bash
# List relevant environment variables (REDACT sensitive values)
REACT_APP_API=http://localhost:5000
PORT=5000
# DO NOT include secrets, tokens, or passwords
```

## ✅ Acceptance Criteria
What should be verified when this bug is fixed?
- [ ] Issue no longer reproduces
- [ ] No regression in other features
- [ ] Unit tests added
- [ ] Integration tests pass
- [ ] Performance not degraded
- [ ] Security review passed (if applicable)

---
**📌 Note:** For security vulnerabilities, please report privately to ipanshak@gmail.com instead of creating a public issue.
