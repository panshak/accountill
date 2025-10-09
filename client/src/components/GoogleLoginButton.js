import React from 'react';
import './GoogleLoginButton.css';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`, '_self');
    };

    return (
        <button 
            type="button" 
            className="google-login-btn"
            onClick={handleGoogleLogin}
        >
            <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google logo" 
            />
            Continue with Google
        </button>
    );
};

export default GoogleLoginButton;