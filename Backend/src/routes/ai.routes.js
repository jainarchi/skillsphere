import express from 'express'
import { aiAnalyzeWrongAnswers } from '../controllers/aiAnalyzeWrongAnsController.js'
import userAuth from '../middlewares/auth.js'


const router = express.Router();

/**
 * @desc Analyze wrong answers
 * @route POST /api/ai/analyze/wrongans
 * @access Private
 */

router.post('/wrongans', userAuth ,aiAnalyzeWrongAnswers)


export default router ;

