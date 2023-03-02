import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Button, Checkbox, IconButton, FormControl }
    from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'
import ChevronRight from '@mui/icons-material/ChevronRight'
import "../css/FileExport.css"

// importing placeholder data for test
import pData from '../placeholder.json';

const label = { inputProps: { 'aria-label': 'person name' } };

const mainBox = () => {
    return {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

const topBox = () => {
    return {
        margin: "0 0 10px 0",
        display: "flex",
        justifyContent: "space-between"
    }
}

const bottomBox = () => {
    return {
        margin: " 10px 0 0 0",
        display: "flex",
        flexDirection: "row-reverse"
    }
}

const mainCard = () => {
    return {
        width: "90vw",
        height: "70vh",
        bgcolor: "#8d69c7"
    }
}

const secCard = () => {
    return {
        minWidth: "90%",
        height: "5%",
        bgcolor: "#af8aeb",
        margin:"5px 0 5px 0"
    }
}

const checkboxStyle = () => {
    return {
        color: "#461d5c",
        '&.Mui-checked': {
            color: "#6a2b8c",
        },
    }
}

const btnStyle = () => {
    return {
        margin: "0 10px 0 10px",
        height: "100%",
        bgcolor: "#461d5c",
        '&:hover': {
            bgcolor: "#6a2b8c",
        }
    }
}

const cardHeader = () => {
    return {
        marginLeft: "20px"
    }
}

const FileExport = () => {
    // create state to import JSON placeholder
    const [infos, setInfos] = useState([]);

    // read and update state
    useEffect(() => {
        setInfos(pData)
    }, [])

    console.log("look here [infos]: ", infos)
    return (
        <div>
            <Box sx={mainBox}>
                <div>
                    <Box sx={topBox}>
                        <Button variant="contained" startIcon={<HomeIcon />}
                            size="large" sx={btnStyle}>
                            Back to Dashboard
                        </Button>
                        <div>
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
                                />
                            </FormControl>
                            <Button variant="contained" size="large"
                                sx={btnStyle}>
                                Search
                            </Button>
                        </div>
                    </Box>
                    <Card sx={mainCard}>
                        <CardContent>
                            <Box sx={cardHeader}>
                                <h1>1 / 4 Profiles Created</h1>
                                <Checkbox {...label}
                                    defaultChecked
                                    sx={checkboxStyle} />
                                <span>Select All</span>
                            </Box>

                            {/* secondary/inner card */}
                            {infos.candidates.map((candidate) => {
                                return (
                                    <Card sx={secCard} key={candidate.id}>
                                        <CardContent>
                                            <table class="card-table">
                                                <tbody>
                                                    <tr>
                                                        <td className="col-width">
                                                            <Checkbox {...label}
                                                                defaultChecked
                                                                sx={checkboxStyle} />
                                                        </td>
                                                        <td className="col-width">
                                                            <p>
                                                                {candidate.firstName} 
                                                                <span> </span>
                                                                {candidate.midName} 
                                                                <span> </span>
                                                                {candidate.lastName}
                                                            </p>
                                                        </td>
                                                        <td className="col-width">
                                                            <p>
                                                            {candidate.email}
                                                            </p>
                                                        </td>
                                                        <td className="col-width">
                                                            <p>
                                                            {candidate.phoneNumber}
                                                            </p>
                                                        </td>
                                                        <td align="center" className="col-width">
                                                            <IconButton aria-label="edit">
                                                                <EditRoundedIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CardContent>
                                    </Card>
                                )
                            })
                            }
                            {/* <Card sx={secCard}>
                                <CardContent>
                                    <table class="card-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Checkbox {...label}
                                                        defaultChecked
                                                        sx={checkboxStyle} />
                                                </td>
                                                <td>
                                                    <p>John Doe</p>
                                                </td>
                                                <td>
                                                    <p>
                                                        johndoe@email.com
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        98762345
                                                    </p>
                                                </td>
                                                <td align="center">
                                                    <IconButton aria-label="edit">
                                                        <EditRoundedIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card> */}
                        </CardContent>
                    </Card>
                    <Box sx={bottomBox}>
                        <Button variant="contained" endIcon={<ChevronRight />}
                            size="large" sx={btnStyle}>
                            Export
                        </Button>
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default FileExport;