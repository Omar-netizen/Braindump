import React, { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes from backend on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  // Handle form submission to add a new note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const newNote = await res.json();
      setNotes((prev) => [...prev, newNote]); // Update notes list with new one
      setTitle(""); // Clear input
      setContent("");
    } catch (err) {
      console.error("Error creating note", err);
    }
  };

  return (
    <div className="app">
      <h1>🧠 Smart Notes + Flashcards App</h1>

      {/* Note creation form */}
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display notes and flashcards */}
      <div className="notes-container">
        {notes.length === 0 ? (
          <p>No notes yet. Add one above ⬆️</p>
        ) : (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        )}
      </div>
    </div>
  );
}

export default App;
