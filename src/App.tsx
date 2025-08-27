// App.tsx
import Add from "./components/Add";
import BookCard from "./components/BookCard";
import type { Book } from "./components/Add";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://crudcrud.com/api/8fcf19e6bce0434384fd0275e7f28594/books";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const startSearch = async () => {
      try {
        const res = await axios.get(API);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    startSearch();
  }, []);

  const handleAddBook = (newBook: Book) => {
    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <main className="w-screen h-screen flex flex-col sm:flex-row justify-center items-center gap-8 bg-gray-900 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Add onAddBook={handleAddBook} />
      <aside className="bg-[#999999] flex flex-col justify-start items-center w-[20em] h-[20em] gap-4 p-8 rounded-xl overflow-y-auto">
        {books.map((item) => (
          <BookCard key={item._id} item={item} API={API} setBooks={setBooks} />
        ))}
      </aside>
    </main>
  );
};

export default App;
