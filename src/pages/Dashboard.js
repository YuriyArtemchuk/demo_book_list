import { Toaster } from "react-hot-toast";
import BookList from "../components/BookList";

const Dashboard = ({
  bookList,
  filteringStatus,
  onFilteredQuantityBooks,
  sortedQuantity,
  onUpdatedStatusBook,
  onDeletingBook,
  currentBookList,
}) => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          closeOnClick: true,
          error: {
            style: {
              background: "pink",
              color: "red",
            },
          },
          success: {
            style: {
              color: "green",
            },
          },
        }}
      />
      <BookList
        bookList={bookList}
        filteringStatus={filteringStatus}
        onFilteredQuantityBooks={onFilteredQuantityBooks}
        sortedQuantity={sortedQuantity}
        onUpdatedStatusBook={onUpdatedStatusBook}
        onDeletingBook={onDeletingBook}
      />
    </>
  );
};

export default Dashboard;
