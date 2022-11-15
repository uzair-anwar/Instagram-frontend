import React, { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField } from "@material-ui/core";

const SearchField = (props) => {
  const { options, onInputChange, onClickInput } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      if (ulRef != null) ulRef.current.style.display = "flex";
      onInputChange(event);
    });
    document.addEventListener("click", (event) => {
      if (ulRef != null)
        if (ulRef?.current != null) ulRef.current.style.display = "none";
    });
  }, []);

  return (
    <div className="search-bar-dropdown">
      <TextField
        id="search-bar"
        type="text"
        placeholder="Search user"
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
