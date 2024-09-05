import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles/GlobalSearch.css';

const GlobalSearch = ({ placeholder = "Search...", onSearch }) => {
    return (
        <div className="global-search-container">
            <input
                type="text"
                placeholder={placeholder}
                className="global-search-input"
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        onSearch(e.target.value);
                    }
                }}
            />
            <button
                className="global-search-button"
                onClick={() => onSearch(document.querySelector('.global-search-input').value)}
            >
                <FaSearch className="icon" />
            </button>
        </div>
    );
};

export default GlobalSearch;
