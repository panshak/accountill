import React, { useEffect } from 'react';

const AuthSuccess = () => {
    useEffect(() => {
        // Get URL parameters from current URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const user = urlParams.get('user');

        console.log('Auth Success - Token:', token ? 'Received' : 'Missing');
        console.log('Auth Success - User:', user ? 'Received' : 'Missing');

        if (token && user) {
            try {
                localStorage.setItem('token', token);
                localStorage.setItem('user', user);
                
                // Parse user data for better handling
                const userData = JSON.parse(decodeURIComponent(user));
                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('profile', JSON.stringify(userData)); // For existing app compatibility
                
                console.log('User authenticated:', userData.email);
                
                // Redirect to dashboard using window.location
                window.location.href = '/dashboard';
            } catch (error) {
                console.error('Error processing auth data:', error);
                window.location.href = '/login?error=auth_failed';
            }
        } else {
            console.error('Missing token or user data');
            window.location.href = '/login?error=missing_data';
        }
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            blockSize: '100vh', // replaces height
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div style={{ fontSize: '18px', fontWeight: '500' }}>
                ✅ Authentication Successful
            </div>
            <div style={{ color: '#666' }}>
                Redirecting to dashboard...
            </div>
            <div style={{ 
                inlineSize: '40px', // replaces width
                blockSize: '40px', // replaces height
                border: '4px solid #f3f3f3',
                borderBlockStart: '4px solid #3498db', // replaces borderTop
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}>
            </div>
            
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default AuthSuccess;
