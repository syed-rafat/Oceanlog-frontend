import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchComponent from '../src/components/SearchComponent';

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
      console.log(searchResults)
      setSearchResults(data);

      // router.push({
      //   pathname: "/search",
      //   state: searchResults
      // });

    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <h1>My Page</h1>
      <SearchComponent handleSearch={handleSearch} />
      {(searchResults) && <div>{searchResults.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}</div>}
      {(searchResults.length === 0) && <div>No results found</div>}
    </div>
  );
};

export default Search;