import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { addBook, updateBook } from "../context/api";
import "./AddForm.scss";

const AddForm = ({ onAddBook, editingBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [status, setStatus] = useState("Active");
  const [categoryError, setCategoryError] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setCategory(editingBook.category);
      setIsbn(editingBook.isbn);
      setStatus(editingBook.status);
    }
  }, [editingBook]);

  useEffect(() => {
    if (!category) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  }, [category]);

  const titleChangingHandler = (event) => setTitle(event.target.value);
  const authorChangingHandler = (event) => setAuthor(event.target.value);
  const categoryChangingHandler = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const isbnChangingHandler = (event) => setIsbn(event.target.value);
  const statusChangingHandler = (selectedStatus) => setStatus(selectedStatus);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!category) {
      setCategoryError(false);
      return;
    }

    const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    console.log(category);
    //
    setCategoryError(false);
    //
    // onAddBook({
    //   title,
    //   author,
    //   category,
    //   isbn,
    //   status,
    //   createdAt: !editingBook ? createdAt : editingBook.createdAt,
    //   modifiedAt: editingBook ? createdAt : null,
    // });
    //

    const bookData = {
      ...(editingBook ? { id: editingBook.id } : {}),
      title,
      author,
      category,
      isbn,
      status,
      createdAt: !editingBook ? createdAt : editingBook.createdAt,
      modifiedAt: editingBook ? createdAt : null,
    };
    //
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookData);
        toast.success("Book updated successfully!");
      } else {
        await addBook(bookData);
        toast.success("Book added successfully!");
      }
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  //

  useEffect(() => {
    if (isSubmitted) {
      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");
      setStatus("Active");

      navigate("/dashboard", {
        state: { message: "Book added successfully!" },
      });
    }
  }, [isSubmitted, navigate]);
  //
  // if (!editingBook) {
  //   const message = "Our congratulation!!! You've just added the book";
  //   toast.promise(
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve();
  //       }, 1000);
  //     }),
  //     {
  //       loading: "Processing...",
  //       success: message,
  //       error: "Error processing order!",
  //     }
  //   );
  // }

  //
  // setTimeout(() => {
  //   navigate("/dashboard");
  // }, 0);

  return (
    <Container className="container-form">
      <form className="form" onSubmit={submitFormHandler}>
        <div className="control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={titleChangingHandler}
            required
          />
        </div>
        <div className="control">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={authorChangingHandler}
            required
          />
        </div>
        <div className="control">
          <label htmlFor="category">Category</label>
          <DropdownButton
            id="dropdown-category"
            title={category || "Select a category"}
            onSelect={categoryChangingHandler}
            className={` ${categoryError || editingBook ? "" : "error"}`}
          >
            <Dropdown.Item eventKey="Non-Fiction">Non-Fiction</Dropdown.Item>
            <Dropdown.Item eventKey="Fiction">Fiction</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="control">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="number"
            id="isbn"
            value={isbn}
            onChange={isbnChangingHandler}
            required
          />
        </div>
        <div className="control">
          <label htmlFor="status">Status</label>
          <DropdownButton
            id="dropdown-status"
            title={status}
            onSelect={statusChangingHandler}
          >
            <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
            <Dropdown.Item eventKey="Deactivated">Deactivated</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="actions">
          {editingBook ? (
            <button className="btn-book">Edit Book</button>
          ) : (
            <button className="btn-book">Add Book</button>
          )}
        </div>
      </form>
      <div className="redirect-btn">
        <Link to="/dashboard" className="btn btn-primary ">
          Dashboard
        </Link>
      </div>
    </Container>
  );
};

export default AddForm;
