import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar= () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Search Term:', searchTerm);
        // Add your search logic here
        
    };

    return (
        <div style={{ margin: '20px' }}>
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: { 
                        borderRadius: '20px', 
                        backgroundColor: '#f0f0f0' 
                    } // Custom styling
                }}
                fullWidth
            />
        </div>
    );
};

export default SearchBar;
