
import React, { useState } from "react";


const NoteCard = ({ note }) => {
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${note._id}/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setFlashcards(data.flashcards || []);
    } catch (error) {
      console.error("Failed to generate flashcards", error);
    }
  };

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleGenerate}>Generate Flashcards</button>

      {flashcards.length > 0 && (
        <div className="flashcards">
          <h4>Flashcards:</h4>
          <ul>
            {flashcards.map((card, index) => (
              <li key={index}>
                <strong>Q:</strong> {card.question}<br />
                <strong>A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
