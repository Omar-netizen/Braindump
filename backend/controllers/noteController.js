const Note = require("../models/noteModel");

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

// @desc    Generate flashcards from a note
// @route   POST /api/notes/:id/flashcards
// @access  Public
const generateFlashcards = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Split note content into individual sentences
    const sentences = note.content
      .split(". ")
      .filter((s) => s.length > 10); // remove short/empty parts

    // Select first 5 meaningful sentences as flashcard answers
    const flashcards = sentences.slice(0, 5).map((sentence, index) => ({
      question: `What is the key point ${index + 1}?`,
      answer: sentence.trim(),
    }));

    res.json({ flashcards });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
};

module.exports = {
  getNotes,
  createNote,
  generateFlashcards,
};
