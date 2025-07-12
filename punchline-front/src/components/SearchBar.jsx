import React from 'react';

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onSearchSubmit, 
  placeholder = "Search quotes or authors..." 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <span className="search-icon">🔍</span>
        </button>
      </div>
    </form>
  );
};