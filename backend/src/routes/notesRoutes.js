import express from "express";
import {
  getAllNotes,
  createNote,
  updateNoteById,
  deleteNoteById,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

export default router;
