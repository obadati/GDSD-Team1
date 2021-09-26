import "./SearchBox.scss";

import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { configureSearcher } from "../../utility/search";
import fuse from "fuse.js";
import { DEBOUNCE_DURATION } from "../../constants/constants";
import { searchForProperties } from "../../api/properties";

interface OwnProps {
  onSearchComplete: Function;
  placeholderText?: string;
  list: any[];
  searchFor: string[];
  searchThreshold?: number;
}
const SearchBoxComponent: React.FC<OwnProps> = ({
  placeholderText,
  list,
  searchFor,
  onSearchComplete,
}) => {
  const [searcher, setSearcher] = useState<fuse<any>>();
  const inputRef = useRef<any>();
  const handleFuzzySearch = debounce((query = "") => {
    if (!query.trim()) {
      onSearchComplete([]);
      return;
    }
    const searchResults = searcher?.search(query);
    onSearchComplete(searchResults?.map((e) => e.item));
  }, DEBOUNCE_DURATION);

  useEffect(() => {
    if (list.length) {
      setSearcher(configureSearcher(list, searchFor));
    }
  }, [list]);

  const handleCustomSearch = async (event: any) => {
    event.preventDefault();
    if (inputRef.current) {
      const query = (inputRef.current as HTMLInputElement).value;
      const { result } = await searchForProperties(query);
      onSearchComplete(result);
    }
  };

  return (
    <div className='search-box-component'>
      <input
        onChange={(e) => handleFuzzySearch(e.target.value)}
        ref={inputRef}
        maxLength={40}
        type='search'
        placeholder={
          placeholderText || "Type to start searching (40 characters max)"
        }
      />
      <button onClick={handleCustomSearch}>Go!</button>
    </div>
  );
};

export default SearchBoxComponent;
