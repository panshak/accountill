import express from 'express';
import passport from '../config/passport.js';
import { generateToken } from '../middleware/auth.js';
import User from '../models/userModel.js';

const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/login',
        session: false 
    }),
    (req, res) => {
        // Successful authentication
        const token = generateToken(req.user._id);
        
        // Redirect to frontend with token
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
            businessName: req.user.businessName,
        }))}`);
    }
);

// @desc    Get current user
// @route   GET /auth/me
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const jwt = await import('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            businessName: user.businessName,
            authMethod: user.authMethod,
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
});

// @desc    Logout user
// @route   POST /auth/logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

export default router;