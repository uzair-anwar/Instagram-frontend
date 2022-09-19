import React, { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchField = (props) => {
  const { options, onInputChange, onClickInput } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
      onInputChange(event);
    });
    document.addEventListener("click", (event) => {
      ulRef.current.style.display = "none";
    });
  }, []);

  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options?.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={onClickInput}
              className="list-group-item list-group-item-action"
            >
              {option.username}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchField;
