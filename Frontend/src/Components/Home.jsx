import { useEffect, useState } from "react";
import { getEntries, deleteEntry } from "../api";

function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries().then(setEntries);
  }, []);

  const handleDelete = async (id) => {
    await deleteEntry(id);
    setEntries(entries.filter(entry => entry._id !== id));
  };

  return (
    <div>
      <h1>Journal Entries</h1>
      {entries.map((entry) => (
        <div key={entry._id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          <button onClick={() => handleDelete(entry._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
