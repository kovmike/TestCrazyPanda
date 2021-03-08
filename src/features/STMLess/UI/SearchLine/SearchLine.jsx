export const SearchLine = ({ name, setName }) => {
  return (
    <div>
      <label htmlFor="stmlessinput">type name</label>
      <input
        id="stmlessinput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
    </div>
  );
};
