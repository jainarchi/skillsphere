import express from "express";
import { getRandomQuestions } from "../controllers/questionController.js";
import userAuth from "../middlewares/auth.js";
const router = express.Router();


/**
 * @desc Get random questions
 * @route GET /api/questions
 * @access Private
 * params { technology , level , limit }
 */
router.get("/", userAuth , getRandomQuestions);

export default router;
