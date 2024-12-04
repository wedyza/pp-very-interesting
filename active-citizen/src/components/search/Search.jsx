import React, { useState } from 'react'
import './search.css'

function Search({ list, onResults, placeholder }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        const filtered = list.filter((item) => {
            const titleMatch = item.title?.toLowerCase().includes(searchQuery);
            const descMatch = item.description?.toLowerCase().includes(searchQuery);
            const themeMatch = item.theme?.toLowerCase().includes(searchQuery);
            return titleMatch || descMatch || themeMatch;
        });

        onResults(filtered);
    };

    return (
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="search__input"
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 17L21 21" stroke="#5415C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#5415C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}

export default Search;
