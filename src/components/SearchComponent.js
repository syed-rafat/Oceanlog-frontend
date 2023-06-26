import React, { useState } from 'react';

const SearchComponent = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className='p-5 w-3/5 mx-auto'>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      <button type="submit" className='font-pangram mt-3 pl-5'>Search</button>
    </form>
  );
};

export default SearchComponent;