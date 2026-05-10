import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("genre");
  const [genres, setGenres] = useState([
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Romance" },
  ]);
  const [authors, setAuthors] = useState([
    { id: 1, name: "Tere Liye" },
    { id: 2, name: "Andrea Hirata" },
  ]);
  const [newGenre, setNewGenre] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addGenre = () => {
    if (!newGenre.trim()) return;
    setGenres((prev) => [...prev, { id: Date.now(), name: newGenre }]);
    setNewGenre("");
  };

  const addAuthor = () => {
    if (!newAuthor.trim()) return;
    setAuthors((prev) => [...prev, { id: Date.now(), name: newAuthor }]);
    setNewAuthor("");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-white p-6">
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="text-7xl mb-3">🐱</div>
          <h1 className="text-4xl font-extrabold text-blue-700">Flocoo Admin</h1>
          <p className="text-slate-500 mt-2">
            Modern clean dashboard for managing books
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-blue-100">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("genre")}
              className={`px-4 py-2 rounded-xl font-medium ${
                activeTab === "genre"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              }`}
            >
              📚 Genre
            </button>
            <button
              onClick={() => setActiveTab("author")}
              className={`px-4 py-2 rounded-xl font-medium ${
                activeTab === "author"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              }`}
            >
              ✍️ Author
            </button>
          </div>

          {activeTab === "genre" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">📚 Manage Genre</h2>
              <div className="flex gap-2 mb-4">
                <input
                  className="border p-2 rounded-lg flex-1"
                  placeholder="Tambah genre baru"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                />
                <button
                  onClick={addGenre}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition-all shadow-md"
                >
                  Create
                </button>
              </div>
              <div className="grid gap-3">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100 shadow-sm"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "author" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">✍️ Manage Author</h2>
              <div className="flex gap-2 mb-4">
                <input
                  className="border p-2 rounded-lg flex-1"
                  placeholder="Tambah author baru"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
                <button
                  onClick={addAuthor}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition-all shadow-md"
                >
                  Create
                </button>
              </div>
              <div className="grid gap-3">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100 shadow-sm"
                  >
                    {author.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hidden">
            <p>Test Genre Render</p>
            <p>Test Author Render</p>
            <p>Test Create Function</p>
            <p>Test Tab Switch</p>
          </div>
        </div>
      </div>
    </>
  );
}
