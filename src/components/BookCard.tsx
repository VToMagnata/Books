import axios from "axios";
import type { Book } from "./Add";

type Props = {
  item: Book;
  API: string;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

const BookCard = ({ item, API, setBooks }: Props) => {
  return (
    <div className="relative bg-[#555555] w-[100%] text-white rounded-xl flex flex-col p-2">
      <button
        onClick={async () => {
          try {
            await axios.delete(`${API}/${item._id}`);
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book._id !== item._id)
            );
          } catch (err) {
            console.log(err);
          }
        }}
        className="absolute top-2 right-2 text-white font-bold bg-red-600 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 leading-none"
      >
        ×
      </button>

      <h1 className="font-bold">{item.title}</h1>
      <h2 className="italic">{item.author}</h2>

      <div className="flex gap-2 items-center">
        <p>{item.lido ? "Lido" : "Não lido"}</p>
        <img
          src="./reciclar.png"
          alt="recicle"
          className="w-[7%] cursor-pointer"
          onClick={async () => {
            try {
              const atualizado = {
                title: item.title,
                author: item.author,
                lido: !item.lido,
              };

              await axios.put(`${API}/${item._id}`, atualizado);

              setBooks((prevBooks) =>
                prevBooks.map((book) =>
                  book._id === item._id ? { ...book, lido: !book.lido } : book
                )
              );
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </div>
    </div>
  );
};

export default BookCard;
