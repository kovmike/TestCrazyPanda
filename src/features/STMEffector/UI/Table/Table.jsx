export const Table = ({
  book,
  loading,
  ageDirection,
  balanceDirection,
  sortAge,
  sortBalance
}) => {
  const prepareData = (page) => {
    return page.map((person, i) => (
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
  const direction = (where) => {
    if (where < 0) return " ▲";
    return where === 0 ? "⬍" : " ▼";
  };

  return loading ? (
    <div>Loading</div>
  ) : (
    <table cellSpacing={"0"} border={1} cellPadding={7} align={"center"}>
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th onClick={() => sortAge()}>{"Age" + direction(ageDirection)}</th>
          <th onClick={() => sortBalance()}>
            {"Balance" + direction(balanceDirection)}
          </th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>{prepareData(book)}</tbody>
    </table>
  );
};
