# Dark Mode Feature Implementation

## Overview
This contribution adds a dark mode feature to the Accountill application, enhancing user experience by providing a more comfortable viewing option in low-light environments.

## Features Added
1. **Theme Context**: Created a context provider to manage theme state across the application
2. **Theme Toggle Button**: Added a toggle button in the header for easy switching between light and dark themes
3. **Theme Settings**: Added a dedicated theme settings section in the user profile settings
4. **Persistent Preferences**: Theme preference is saved to localStorage and persists across sessions
5. **Smooth Transitions**: Added CSS transitions for a smooth experience when switching themes

## Files Modified
- `/client/src/context/ThemeContext.js` (New file)
- `/client/src/App.js`
- `/client/src/components/Header/Header.js`
- `/client/src/components/Header/Header.module.css`
- `/client/src/components/Settings/Settings.js`
- `/client/src/components/Settings/Settings.module.css`
- `/client/src/index.css`

## Implementation Details

### Theme Context
Created a new context provider that:
- Manages the current theme state (light/dark)
- Provides a toggle function to switch between themes
- Persists theme preference in localStorage

### Material UI Theme Integration
- Configured Material UI to use the selected theme
- Customized primary and secondary colors for both light and dark modes
- Applied CssBaseline for consistent theming across components

### User Interface
- Added a theme toggle button in the header with appropriate icons
- Added a dedicated theme settings section in the user profile
- Ensured all components respect the current theme

## How to Use
1. **Quick Toggle**: Click the sun/moon icon in the header to toggle between light and dark modes
2. **Settings Page**: Go to Settings and use the Appearance section to change the theme

## Benefits
- Reduces eye strain in low-light environments
- Provides a modern feature that many users expect
- Improves accessibility for users with light sensitivity
- Demonstrates the application's attention to user experience

## Future Improvements
- Add system preference detection to automatically match OS theme
- Implement custom theme colors beyond just light/dark
- Add animation effects during theme transitions