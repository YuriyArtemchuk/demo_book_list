import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { getBooks, updateBook, deleteBook } from "../context/api";
import toast, { Toaster } from "react-hot-toast";

const BookItem = ({ filteredBooks, onUpdatedStatusBook, onDeletingBook }) => {
  const [changedBookId, setChangedBookId] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  const statusChangingHandler = async (id, currentStatus) => {
    // const updatingBook = filteredBooks.find((book) => book.isbn === isbn);
    const updatingBook = books.find((book) => book.id === id);
    const updatedBook = {
      ...updatingBook,
      status: currentStatus === "Active" ? "Deactivated" : "Active",
    };
    try {
      await updateBook(id, updatedBook);
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
    // onUpdatedStatusBook(updatedBook);

    // highlighting record
    // ???????????????????????????????????????????????????????????????????????????
    setChangedBookId(id);
    setTimeout(() => {
      setChangedBookId(null);
    }, 300);
  };

  // const deletingBookHandler = (deletingBookIsbn) => {
  //   const deletingBook = filteredBooks.find(
  //     (book) => book.isbn === deletingBookIsbn && book.status === "Deactivated"
  //   );
  //   if (deletingBook) {
  //     onDeletingBook(deletingBook.isbn);
  //   }
  // };

  const deletingBookHandler = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {filteredBooks.map((book, index) => (
        <tr
          key={index}
          className={`${changedBookId === book.isbn ? "highlighted" : ""}`}
        >
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {book.title}
          </td>
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {book.author}
          </td>
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {book.category}
          </td>
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {book.isbn}
          </td>
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {book.createdAt}
          </td>
          <td className={`${changedBookId === book.isbn ? "highlighted" : ""}`}>
            {!book.modifiedAt ? "-" : book.modifiedAt}
          </td>
          <td className="actions">
            <Link
              to={`/edit-book/${book.isbn}`}
              className="btn btn-warning mr-2"
            >
              Edit
            </Link>

            <Button
              variant="danger"
              className="mr-2 button"
              // disabled={book.status === "Active"}
              style={{
                visibility: book.status === "Active" ? "hidden" : "visible",
              }}
              onClick={() => deletingBookHandler(book.id)}
            >
              Delete
            </Button>

            <Button
              onClick={() => statusChangingHandler(book.id, book.status)}
              variant={book.status === "Active" ? "success" : "secondary"}
              className="mr-2 button deactivate"
            >
              {book.status === "Active" ? "Re-Activate" : "Deactivate"}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default BookItem;
