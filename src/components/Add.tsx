import axios from "axios";
import { useState } from "react";

export type Book = {
  _id?: string;
  title: string;
  author: string;
  lido: boolean;
};

const API = "https://crudcrud.com/api/8fcf19e6bce0434384fd0275e7f28594/books";

const Add = ({ onAddBook }: { onAddBook: (book: Book) => void }) => {
  const [dados, setDados] = useState<Book>({
    title: "",
    author: "",
    lido: false,
  });

  const handleAdd = async () => {
    if (!dados.title.trim() || !dados.author.trim()) {
      alert("Preencha título e autor antes de adicionar!");
      return;
    }

    try {
      const res = await axios.post(API, dados);
      onAddBook(res.data);
      setDados({ title: "", author: "", lido: false });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="bg-[#999999] flex flex-col justify-start items-center w-[20em] h-[20em] gap-4 p-8 rounded-xl">
      <h1 className="text-[1.6em] font-bold">Adicionar Livro</h1>
      <input
        type="text"
        className="w-[90%] h-[1.7em] bg-[#555555] shadow-lg rounded-xl outline-none text-center text-white"
        placeholder="Título"
        value={dados.title}
        onChange={(e) => setDados({ ...dados, title: e.target.value })}
      />
      <input
        type="text"
        className="w-[90%] h-[1.7em] bg-[#555555] shadow-lg rounded-xl outline-none text-center text-white"
        placeholder="Autor"
        value={dados.author}
        onChange={(e) => setDados({ ...dados, author: e.target.value })}
      />
      <select
        className="w-[90%] h-[1.7em] bg-[#555555] shadow-lg rounded-xl outline-none text-center text-white"
        value={dados.lido ? "true" : "false"}
        onChange={(e) =>
          setDados({ ...dados, lido: e.target.value === "true" })
        }
      >
        <option value="false">Não lido</option>
        <option value="true">Lido</option>
      </select>
      <button
        onClick={handleAdd}
        className="outline-none w-[90%] h-[2em] bg-[#BBBBBB] shadow-lg rounded-xl text-center font-bold"
      >
        ADICIONAR
      </button>
    </main>
  );
};

export default Add;
