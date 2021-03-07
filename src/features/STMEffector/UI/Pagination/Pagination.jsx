export const Pagination = ({ pagesCount, currentPage, setRowsCount, setPage }) => {
  const pagesStack = (count) => {
    return new Array(count).fill("").map((_, i) => (
      <button key={"key" + i} style={i + 1 === currentPage ? { fontWeight: "bold", color: "red" } : {}} onClick={() => setPage(i + 1)}>
        {i + 1}
      </button>
    ));
  };

  return (
    <div>
      <label htmlFor="select">show by</label>
      <select id="select" onChange={(e) => setRowsCount(e.target.value)}>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>

      <div>{pagesStack(pagesCount)}</div>
    </div>
  );
};
