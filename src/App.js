import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import books from "./context/books";
import "bootstrap/dist/css/bootstrap.min.css";
import EditBook from "./pages/EditBook";

function App() {
  const [bookList, setBookList] = useState([]);
  const [sortedQuantity, setSortedQuantity] = useState(bookList.length);
  // const [updatedStatusBook, setUpdatedStatusBook] = useState("");

  const onAddBook = (book) => {
    setBookList((prevBooks) => [...prevBooks, book]);
  };

  const filteringStatus = (currentStatus) => {
    // console.log(currentStatus);
  };

  const onFilteredQuantityBooks = (quantity) => {
    setSortedQuantity(quantity);
  };

  const onEditedBookList = (editedBooks) => {
    setBookList(editedBooks);
  };

  const onUpdatedStatusBook = (updatedBook) => {
    setBookList((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === updatedBook.isbn ? updatedBook : book
      )
    );
  };

  const onDeletingBook = (deletingBookIsbn) => {
    setBookList((prevBooks) =>
      prevBooks.filter((book) => book.isbn !== deletingBookIsbn)
    );
  };

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                bookList={bookList}
                filteringStatus={filteringStatus}
                onFilteredQuantityBooks={onFilteredQuantityBooks}
                sortedQuantity={sortedQuantity}
                onUpdatedStatusBook={onUpdatedStatusBook}
                onDeletingBook={onDeletingBook}
              />
            }
          />
          <Route path="/add-book" element={<AddBook onAddBook={onAddBook} />} />
          <Route
            path="/edit-book/:bookId"
            element={
              <EditBook
                bookList={bookList}
                onEditedBookList={onEditedBookList}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
