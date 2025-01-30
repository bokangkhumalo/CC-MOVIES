import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header({ onSearch }) {
  return (
    <div className="header">
      {/* Link to the home page */}
      <Link to="/" className="header-title-link">
        <h1 className="header-title">Movie Database</h1>
      </Link>
      {/* Conditionally render the search bar in the header */}
      {onSearch && <SearchBar onSearch={onSearch} />}
    </div>
  );
}

export default Header;
