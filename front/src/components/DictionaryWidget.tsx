"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaBook, FaTimes, FaSearch } from "react-icons/fa";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictResult {
  word: string;
  meanings: Meaning[];
}

export default function DictionaryWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const word = query.trim();
    if (!word) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      if (!res.ok) {
        setError("Termin nije pronađen. Pokušaj na engleskom (npr. API, server, algorithm).");
        return;
      }
      const data = await res.json();
      setResult(data[0]);
    } catch {
      setError("Greška pri pretrazi. Provjeri internet konekciju.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-999 fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-[#1a1a2e] border border-purple-700 rounded-2xl w-80 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-purple-800 bg-[#16213e]">
            <div className="flex items-center gap-2">
              <FaBook className="text-purple-400" />
              <span className="font-mono font-semibold text-sm text-white">IT Rečnik</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <FaTimes />
            </button>
          </div>

          {/* Search */}
          <form onSubmit={search} className="flex items-center gap-2 px-3 py-3 border-b border-purple-900">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Pretraži termin (eng)..."
              className="flex-1 bg-[#0f0f1a] border border-purple-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <FaSearch className="text-sm" />
            </button>
          </form>

          {/* Results */}
          <div className="px-4 py-3 max-h-72 overflow-y-auto text-sm">
            {loading && (
              <p className="text-gray-400 text-center py-4">Pretražujem...</p>
            )}
            {error && (
              <p className="text-red-400 text-xs leading-relaxed">{error}</p>
            )}
            {result && (
              <div className="flex flex-col gap-3">
                <h3 className="font-mono font-bold text-purple-300 text-base">{result.word}</h3>
                {result.meanings.slice(0, 2).map((meaning, i) => (
                  <div key={i}>
                    <span className="text-xs text-gray-500 italic">{meaning.partOfSpeech}</span>
                    <ul className="mt-1 flex flex-col gap-1">
                      {meaning.definitions.slice(0, 2).map((def, j) => (
                        <li key={j} className="text-gray-200 leading-relaxed">
                          <span className="text-purple-400 mr-1">▸</span>
                          {def.definition}
                          {def.example && (
                            <p className="text-gray-500 text-xs mt-0.5 italic">"{def.example}"</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {!loading && !error && !result && (
              <p className="text-gray-500 text-xs text-center py-3">
                Unesi IT termin — npr. <span className="text-purple-400">API</span>, <span className="text-purple-400">algorithm</span>, <span className="text-purple-400">cache</span>...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-purple-700 hover:bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title="IT Rečnik"
      >
        {open ? <FaTimes /> : <FaBook />}
      </button>
    </div>
  );
}
