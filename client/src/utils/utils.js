import React, { useState, useEffect } from 'react';

export function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Custom hook for theme toggling
export function useThemeToggle() {
    const [darkMode, setDarkModeState] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Sync state and body class
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
        // Notify all listeners
        window.dispatchEvent(new Event('theme-changed'));
    }, [darkMode]);

    // Listen for theme changes from other components
    useEffect(() => {
        const handler = () => {
            setDarkModeState(localStorage.getItem('theme') === 'dark');
        };
        window.addEventListener('theme-changed', handler);
        return () => window.removeEventListener('theme-changed', handler);
    }, []);

    // Toggle and sync everywhere
    const setDarkMode = (val) => {
        setDarkModeState(val);
        // localStorage and body class will be updated by effect
    };

    return [darkMode, setDarkMode];
}

// Reusable Theme Toggle Button
export function ThemeToggleButton({ className = '', style = {} }) {
    const [darkMode, setDarkMode] = useThemeToggle();
    return (
        <button
            className={`theme-toggle nav-theme-toggle ${className}`}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '20px',
                background: darkMode ? '#222' : '#f5f5f5',
                color: darkMode ? '#f5f5f5' : '#222',
                border: darkMode ? '1px solid #444' : '1px solid #ddd',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s, border 0.2s',
                outline: 'none',
                minWidth: '110px',
                boxShadow: darkMode ? '0 2px 8px 0 rgba(0,0,0,0.18)' : '0 2px 8px 0 rgba(0,0,0,0.06)',
            }}
            onClick={() => setDarkMode(!darkMode)}
            onMouseOver={e => e.currentTarget.style.background = darkMode ? '#333' : '#e0e0e0'}
            onMouseOut={e => e.currentTarget.style.background = darkMode ? '#222' : '#f5f5f5'}
        >
            <span style={{display: 'flex', alignItems: 'center'}}>
                {darkMode ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: 6}}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: 6}}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                )}
            </span>
            <span style={{transition: 'color 0.2s'}}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
    );
}
