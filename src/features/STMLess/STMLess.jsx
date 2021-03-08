import { useEffect, useState } from "react";
import { SearchLine, Pagination } from "./UI";

export const STMLess = () => {
  const [book, setBook] = useState([]);
  const [sorter, setSorter] = useState({ age: 0, balance: 0 });
  const [searchingName, setSearchigName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(10);

  //get data
  useEffect(() => {
    fetch("https://next.json-generator.com/api/json/get/NkcCg0Tf9")
      .then((r) => r.json())
      .then((data) => setBook(data));
  }, []);

  //sort direction
  const direction = (where) => {
    if (where < 0) return " ▲";
    return where === 0 ? "⬍" : " ▼";
  };

  //parsing balance to num with out fractional part
  const parseBalance = (stringBalance) => {
    return +stringBalance.match(/(?<=\$)[\d,]+/g)[0].replace(",", "");
  };

  //
  const pagesCount = (list, rowsCount) => {
    return Math.ceil(list.length / rowsCount);
  };

  //page slice
  const pageContent = (list, currentPage, rowsCount) => {
    return list.slice(
      currentPage * rowsCount - rowsCount,
      currentPage * rowsCount
    );
  };

  //sorting list
  const sortedBook = (list, { age, balance }) => {
    if (age === 0 && balance === 0) return list;
    if (age) return [...list].sort((a, b) => age * (b.age - a.age));
    if (balance)
      return [...list].sort(
        (a, b) => balance * (parseBalance(b.balance) - parseBalance(a.balance))
      );
  };

  //filter
  const filteredBook = (list) => {
    return searchingName
      ? list.filter(
          (person) =>
            person.name.first
              .toLowerCase()
              .includes(searchingName.toLowerCase()) ||
            person.name.last.toLowerCase().includes(searchingName.toLowerCase())
        )
      : list;
  };

  const prepareData = (list) => {
    return list.map((person, i) => (
      <tr
        key={person.name.first + Math.random() * 1000 + i}
        style={
          person.isActive
            ? { background: "rgba(2,45,129,0.2)" }
            : { background: "white" }
        }
      >
        <td>{person.index + 1}</td>
        <td>{`${person.name.first} ${person.name.last}`}</td>
        <td>{person.age}</td>
        <td>{person.balance}</td>
        <td>{person.isActive + ""}</td>
      </tr>
    ));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <SearchLine name={searchingName} setName={setSearchigName} />
      <Pagination
        pagesCount={pagesCount(
          filteredBook(sortedBook(book, sorter)),
          rowsCount
        )}
        currentPage={currentPage}
        setRowsCount={setRowsCount}
        setPage={setCurrentPage}
      />
      <table cellSpacing={"0"} border={1} cellPadding={7} align={"center"}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th
              onClick={() => {
                setCurrentPage(1);
                sorter.age
                  ? setSorter({ ...sorter, balance: 0, age: -sorter.age })
                  : setSorter({ ...sorter, balance: 0, age: 1 });
              }}
            >
              {"Age" + direction(sorter.age)}
            </th>
            <th
              onClick={() => {
                setCurrentPage(1);
                sorter.balance
                  ? setSorter({ ...sorter, age: 0, balance: -sorter.balance })
                  : setSorter({ ...sorter, age: 0, balance: 1 });
              }}
            >
              {"Balance" + direction(sorter.balance)}
            </th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {pageContent(
            prepareData(filteredBook(sortedBook(book, sorter))),
            currentPage,
            rowsCount
          )}
        </tbody>
      </table>
    </div>
  );
};
