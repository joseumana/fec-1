import React, { useState, useEffect, useRef } from "react";
import debounce from "../../lib/debounce.js";

const Search = ({ reviews, setReviews, allReviews }) => {
  const [searchInput, setSearchInput] = useState("");
  // const [searchResult, setSearchResult] = useState(null);
  // const [searchActive, setSearchActive] = useState(false);

  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value);
  };

  const searcher = (searchInput, allReviews) => {
    if (searchInput.trim().length < 3 && allReviews.length > 0) {
      setReviews(allReviews);
    }
    if (searchInput.trim().length >= 3 && allReviews.length > 0) {
      const searchResult = allReviews.filter(review => {
        return review.summary.includes(searchInput) || review.reviewer_name.includes(searchInput) || review.body.includes(searchInput)
      })
      setReviews(searchResult)
    }
  };

  // const debouncedSearch = useRef(debounce(searcher, 500)).current;

  const handleSearch = debounce(() => {
    searcher(searchInput, allReviews);
  }, 500);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(searchInput)
    // setReviews(searchResult);
    // setSearchInput('')
  };

  useEffect(() => {
    // console.log(searchInput.length, 'SEARCHINPUT')
    // console.log(reviews, 'REVIEWS')
    handleSearch(searchInput, allReviews)
  }, [searchInput])

  return (
    <div className="flex items-center mb-4">
      <div className="flex space-x-1">
        <input
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={searchInput}
          onChange={handleChange}
        />
        <button className="px-4 text-white bg-purple-600 rounded-full" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
