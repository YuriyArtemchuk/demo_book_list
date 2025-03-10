import { Link } from "react-router-dom";
import AddForm from "../components/AddForm";

const AddBook = ({ onAddBook }) => {
  const addBookHandler = (book) => {
    console.log(book);
    onAddBook(book);
  };
  return (
    <>
      <AddForm onAddBook={addBookHandler} />;
    </>
  );
};

export default AddBook;
