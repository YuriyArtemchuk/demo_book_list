import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import BookItem from "./BookItem";
import SortMenu from "./SortMenu";
import "./BookList.scss";
import { getBooks } from "../context/api";

const BookList = ({
  bookList,
  filteringStatus,
  onFilteredQuantityBooks,
  sortedQuantity,
  onUpdatedStatusBook,
  onDeletingBook,
}) => {
  const [filter, setFilter] = useState("Show Active");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, [books]);

  // const filteredBooks = bookList.filter(
  //   (book) =>
  //     filter === "Show All" ||
  //     book.status === (filter === "Show Active" ? "Active" : "Deactivated")
  // );

  const filteredBooks = books.filter(
    (book) =>
      filter === "Show All" ||
      book.status === (filter === "Show Active" ? "Active" : "Deactivated")
  );

  filteringStatus(filter);

  useEffect(() => {
    onFilteredQuantityBooks(filteredBooks.length);
  }, [filteredBooks.length, onFilteredQuantityBooks]);

  return (
    <>
      <Container className="container">
        <h1>Dashboard</h1>
        <SortMenu
          filter={filter}
          setFilter={setFilter}
          sortedQuantity={sortedQuantity}
        />

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author Name</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Created At</th>
              <th>Modified At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <BookItem
              filteredBooks={filteredBooks}
              onUpdatedStatusBook={onUpdatedStatusBook}
              onDeletingBook={onDeletingBook}
            />
          </tbody>
        </Table>

        <Link to="/add-book" className="btn btn-primary">
          Add a Book
        </Link>
      </Container>
    </>
  );
};

export default BookList;
