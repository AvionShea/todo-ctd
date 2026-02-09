import { useState, useEffect } from "react";
import styled from "styled-components";

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {

  const [localQueryString, setLocalQueryString] = useState(queryString);

  const StyledSearch = styled.select`
  margin-left: 0.15rem;
  margin-top: 0.7rem;
`;

const StyledLabel = styled.label`
  margin-left: 1rem;
`;

  const preventRefresh = (e) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500)

    return () => {
      clearTimeout(debounce);
    }
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <StyledLabel htmlFor="search">Search todos:</StyledLabel>
        <input
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString("")}>
          Clear
        </button>
      </div>

      <div>
        <StyledLabel htmlFor="sortBy">Sort by</StyledLabel>
        <StyledSearch
          id="sortBy"
          name="sortBy"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSearch>

        <StyledLabel htmlFor="direction">Direction</StyledLabel>
        <StyledSearch
          id="direction"
          name="direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSearch>
      </div>
    </form>
  );
}

export default TodosViewForm;
