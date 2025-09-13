import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const Pagination = ({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) => {
  if (pageCount <= 0) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="←"
      nextLabel="→"
    />
  );
};

export default Pagination;
