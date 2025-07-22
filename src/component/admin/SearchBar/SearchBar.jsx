import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search guests by name, email, phone, or UUID..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            {searchTerm && (
                <button
                    className="clear-search-btn"
                    onClick={onClearSearch}
                    title="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar; 