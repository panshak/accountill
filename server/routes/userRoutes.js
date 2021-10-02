import express from 'express'
import { signin, signup, forgotPassword, resetPassword } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

export default router