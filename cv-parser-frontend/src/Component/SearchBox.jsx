import React, {useState}from 'react';
import { FormControl }
    from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search'

const SearchBox = ({ handleSearch }) => {

    return (
        <div className="search-box">
            <FormControl>
                <InputLabel htmlFor="search-input">
                    Search
                </InputLabel>
                <OutlinedInput
                    id="search-input"
                    type="text"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    label="Search"
                    onChange={handleSearch}
                />
            </FormControl>
        </div>
    );
};




export default SearchBox;