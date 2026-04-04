import express from 'express';
import {login , register , getMe , logout} from '../controllers/authController.js'
import userAuth from '../middlewares/auth.js';
import {registerValidator , loginValidator} from '../validators/authValidator.js'
import { validate } from '../middlewares/validator.js';


const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

router.post('/register' , registerValidator , validate , register)
/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */

router.post('/login' , loginValidator, validate ,  login)


/**
 * @desc Get current user
 * @route GET /api/auth/getMe
 * @access Private
 */

router.get('/get-me' , userAuth , getMe )

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Private
 */
router.post('/logout' , userAuth , logout)

export default router;

