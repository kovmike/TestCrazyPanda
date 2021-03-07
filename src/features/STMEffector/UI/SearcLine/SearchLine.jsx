

export const SearchLine = ({ searchingName, search}) => {
  return (
    <>
      <label htmlFor="input">type name</label>
      <input id="input" value={searchingName} onChange={(e) => search(e.target.value)}></input>
    </>
  );
};
