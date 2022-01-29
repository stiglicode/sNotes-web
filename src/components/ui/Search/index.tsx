import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import debounce from "../../../utilities/debounce";
import { RecoilState, useRecoilState } from "recoil";
import { CachedTreeType } from "../../../utilities/types/tree.type";
import { search } from "../../../utilities/search-algo";
import generateTree from "../Tree/render/tree";

interface SearchFieldProps {
  width?: string;
  placeholder: string;
  atom: RecoilState<CachedTreeType>;
}

const SearchField: React.FC<SearchFieldProps> = ({ atom, width, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [{ flat }, updateGlobalState] = useRecoilState(atom);

  const doSearch = (input: string): void => {
    const results = search(input, flat, "title");
    if (input !== "") {
      return updateGlobalState((prev) => ({
        ...prev,
        tree: generateTree(
          results.filter((result) => result.type !== "folder"),
          0,
          true
        ),
      }));
    } else {
      return updateGlobalState((prev) => ({
        ...prev,
        tree: generateTree(results, 0),
      }));
    }
  };

  const handleChange = (event: { target: HTMLInputElement }) => {
    const value = event?.target.value;
    setInputValue(value);

    return doSearch(value);
  };

  return (
    <div className={"search-field"} style={{ width: !width ? "100%" : width }}>
      <button type={"submit"} aria-label={"submit-button"} className={"search-field_button"}>
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
      />
    </div>
  );
};

export default SearchField;
