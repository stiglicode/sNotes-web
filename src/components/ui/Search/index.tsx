import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import debounce from "../../../utilities/debounce";

const SearchField = ({ width, placeholder }: { width?: string; placeholder: string }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: { target: HTMLInputElement }) => {
    const value = event?.target.value;
    setInputValue(value);
  };
  const handleSubmit = () => {
    console.log(inputValue);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    handleSubmit();
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  return (
    <div className={"search-field"} style={{ width: !width ? "100%" : width }}>
      <button type={"submit"} aria-label={"submit-button"} className={"search-field_button"} onClick={handleSubmit}>
        <Search />
      </button>
      <input
        className={"search-field_input"}
        type={"search"}
        name={"search-field"}
        onChange={debounce(handleChange, 350)}
        autoComplete={"off"}
        autoCorrect={"off"}
        placeholder={placeholder}
        onKeyDown={handleEnter}
      />
    </div>
  );
};

export default SearchField;
