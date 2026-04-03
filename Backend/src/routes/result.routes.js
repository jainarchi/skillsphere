import express from 'express'
import userAuth from '../middlewares/auth.js'
import { createResult , listResult } from '../controllers/resultController.js';



const resultRouter = express.Router();

/**
 * @desc Create a new result
 * @route POST /api/results
 * @access Private
 */

resultRouter.post('/' , userAuth , createResult );


/**
 * @desc List all results
 * @route GET /api/results
 * @access Private
 */
resultRouter.get('/' , userAuth , listResult);


export default resultRouter ;