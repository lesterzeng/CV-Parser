import React, {useState}from 'react';

const SearchBox = ({ handleSearch }) => {

    return (
        <div className="search-box">
            <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
    );
};




export default SearchBox;