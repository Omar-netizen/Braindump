const express = require("express");
const router = express.Router();
const { getNotes, createNote,generateFlashcards } = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", createNote);
router.post("/:id/flashcards", generateFlashcards);


module.exports = router;
