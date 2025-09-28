import { useEffect, useState } from "react";
import { getEntries, deleteEntry } from "../api";

function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries().then(setEntries);
  }, []);

  const handleDelete = async (id) => {
    await deleteEntry(id);
    setEntries(entries.filter((entry) => entry._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Journal Entries</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {entries.length === 0 ? (
          <p className="text-gray-400 text-center">No entries yet. Start writing your thoughts!</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                {entry.title}
              </h3>
              <p className="text-gray-300 mb-4">{entry.content}</p>
              <button
                onClick={() => handleDelete(entry._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;