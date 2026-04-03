import express from "express";
import { createNote, getMyNotes, deleteNote } from '../controllers/noteController.js'
import userAuth from '../middlewares/auth.js'

const router = express.Router();


/**
 * @desc Create a new note
 * @route POST /api/notes
 * @access Private
 */
router.post("/", userAuth, createNote);


/**
 * @desc Get my notes
 * @route GET /api/notes
 * @access Private
 */
router.get("/", userAuth, getMyNotes);


/**
 * @desc Delete a note
 * @route DELETE /api/notes/:id
 * @access Private
 */
router.delete("/:id", userAuth, deleteNote);



export default router;