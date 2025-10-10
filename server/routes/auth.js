import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// === Configure session ===
router.use(
  session({
    secret: "secretkey123", // change to something secure
    resave: false,
    saveUninitialized: true,
  })
);

// === Initialize Passport ===
router.use(passport.initialize());
router.use(passport.session());

// === Passport Google Strategy ===
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can save user info to DB if needed
      console.log("✅ Google profile:", profile);
      return done(null, profile);
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// === Routes ===

// Step 1: Redirect to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects back here after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000"); // send back to frontend after success
  }
);

export default router;
