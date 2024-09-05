import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles/GlobalSearch.css';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', query);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <FaSearch className="search-icon" onClick={handleSearch} />
        </div>
    );
};

export default GlobalSearch;
