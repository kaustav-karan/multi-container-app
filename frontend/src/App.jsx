import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  const createNote = async () => {
    if (!title || !content) return;
    await axios.post("http://localhost:5000/api/notes", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const updateNote = async (id) => {
    const newTitle = prompt("Enter new title");
    const newContent = prompt("Enter new content");
    if (newTitle && newContent) {
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title: newTitle,
        content: newContent,
      });
      fetchNotes();
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Notes</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ marginRight: "1rem" }}
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ marginRight: "1rem" }}
        />
        <button onClick={createNote}>Add Note</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note._id} style={{ marginBottom: "1rem" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => updateNote(note._id)}
              style={{ marginRight: "0.5rem" }}
            >
              Edit
            </button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
