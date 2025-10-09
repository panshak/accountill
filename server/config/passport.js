import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

// Create User model inline if file doesn't exist
let User;

try {
    // Try to import the User model
    const userModule = await import('../models/userModel.js');
    User = userModule.default;
} catch (error) {
    // If import fails, define User model inline
    console.log('User model not found, creating inline model...');
    
    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        googleId: { type: String, unique: true, sparse: true },
        avatar: { type: String },
        businessName: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        phone: { type: String },
        isVerified: { type: Boolean, default: false },
        authMethod: { type: String, enum: ['local', 'google'], default: 'local' },
    }, { timestamps: true });

    User = mongoose.model('User', userSchema);
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google profile received:', profile.displayName);
        
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            console.log('User found with Google ID:', user.email);
            return done(null, user);
        }

        // Check if user exists with the same email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            console.log('User found with email, linking Google account:', user.email);
            // Link Google account to existing user
            user.googleId = profile.id;
            user.authMethod = 'google';
            await user.save();
            return done(null, user);
        }

        // Create new user
        console.log('Creating new user with Google OAuth');
        user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            isVerified: true,
            authMethod: 'google',
        });

        console.log('New user created:', user.email);
        return done(null, user);
    } catch (error) {
        console.error('Google OAuth Error:', error);
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;