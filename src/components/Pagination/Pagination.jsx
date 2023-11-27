import styled from "./styles.module.css";

export const Pagination = ({
  totalTodos,
  postsPerPage,
  pageToggleHandler,
  currentPage,
}) => {
  let pages = [];
  // In this 'for' we calculating and pushing all numbers of pages in variable and rendering buttons below.
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
