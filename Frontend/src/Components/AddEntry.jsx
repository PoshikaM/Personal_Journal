import { useState } from "react";
import { addEntry } from "../api";
import { useNavigate } from "react-router-dom";

function AddEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEntry({ title, content });
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default AddEntry;