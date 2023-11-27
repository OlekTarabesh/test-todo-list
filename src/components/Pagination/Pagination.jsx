import styled from "./styles.module.css";

const Pagination = ({
  totalTodos,
  postsPerPage,
  pageToggleHandler,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalTodos / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className={styled.wrapper}>
      {pages.map((page, i) => {
        return (
          <button
            className={page === currentPage ? styled.active : ""}
            key={i}
            onClick={() => pageToggleHandler(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
