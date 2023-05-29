import { useState } from "react";
import { useRouter } from "next/router";
import SearchComponent from "../src/components/SearchComponent";
import HomeArticle from "../src/components/articleList";

/**
 * @description Search Component used in Search.js
 * @param {function} handleSearch - function to handle search
 * @returns {JSX.Element} - Search Component
 * @example
 * import SearchComponent from '../components/SearchComponent';
 */
const Search = () => {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState(false);

  const searchUrl = process.env.BACKEND_ROOT + "/content/search/";

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${searchUrl}?search=${query}`);
      const data = await response.json();
      console.log(searchResults);
      setSearchResults(data);

    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div className="h-80 bg-zinc-400 p-10 pt-[10rem]">
      <h1 className="mx-auto w-60 pb-5 text-xl font-pangram">You are searching for -</h1>
      <SearchComponent handleSearch={handleSearch} />
      </div>
      <div className="m-10 mt-20">
        {searchResults && (
          <div className="w-1/2 mx-auto lg:w-2/3">
            <HomeArticle data={searchResults} />
          </div>
        )}
        {searchResults.length === 0 && <div>No results found</div>}
      </div>
    </div>
  );
};

export default Search;
