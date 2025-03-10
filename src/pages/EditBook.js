import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddForm from "../components/AddForm";
import toast, { Toaster } from "react-hot-toast";
import { getBooks } from "../context/api";

const EditBook = ({ bookList, onEditedBookList }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  // const editingBook = bookList.find((book) => book.isbn === params.bookId);
  const editingBook = books.find((book) => book.isbn === params.bookId);

  const onEditBook = (editedBook) => {
    console.log(editedBook);
    const updatedBooks = bookList.slice();
    console.log(updatedBooks);
    const indexEditingBook = updatedBooks.findIndex(
      (item) => item.isbn === editedBook.isbn
    );
    updatedBooks[indexEditingBook] = editedBook;

    onEditedBookList(updatedBooks);
    //
    const message = "Our congratulation!!! You've just edited the book";
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        loading: "Processing...",
        success: message,
        error: "Error processing order!",
      }
    );
    //
    setTimeout(() => {
      navigate("/dashboard", {
        state: { message: "Book updated successfully!" },
      });
    }, 0);
  };

  return (
    <>
      <AddForm editingBook={editingBook} onAddBook={onEditBook} />
    </>
  );
};

export default EditBook;
