import { useEffect } from "react";
import { useStore } from "effector-react";
import { Table, SearchLine, Pagination } from "./UI";
import { setRowsCount, $pagesCount, setPage, $currentPage } from "./model";
import { $pageContent, getData, $loading, sortAge, sortBalance, $sortAge, $sortBalance } from "./model";
import { search, $searchingName } from "./model";

export const STMEffector = () => {
  useEffect(() => getData(), []);

  //pagination
  const pagesCount = useStore($pagesCount);
  const currentPage = useStore($currentPage);
  //table
  const book = useStore($pageContent);
  const loading = useStore($loading);
  const ageDirection = useStore($sortAge);
  const balanceDirection = useStore($sortBalance);
  //search
  const searchingName = useStore($searchingName);

  return (
    <div style={{textAlign: 'center'}}>
      <SearchLine searchingName={searchingName} search={search} />
      <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={setPage} setRowsCount={setRowsCount} />
      <Table
        book={book}
        loading={loading}
        ageDirection={ageDirection}
        balanceDirection={balanceDirection}
        getData={getData}
        sortAge={sortAge}
        sortBalance={sortBalance}
      />
    </div>
  );
};
