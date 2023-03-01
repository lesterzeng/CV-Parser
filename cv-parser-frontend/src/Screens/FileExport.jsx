import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Button, Checkbox, IconButton}
    from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/FileExport.css"

const label = { inputProps: { 'aria-label': 'person name' } };

const mainBox = () => {
    return {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

const mainCard = () => {
    return {
        minWidth: "90vw",
        height: "80vh",
        bgcolor: "#8d69c7"
    }
}

const secCard = () => {
    return {
        minWidth: "90%",
        height: "5%",
        bgcolor: "#af8aeb"
    }
}

const checkboxStyle = () => {
    return {
        color: "#8d69c7",
        '&.Mui-checked': {
            color: "#6a2b8c",
        },
    }
}

const FileExport = () => {

    return (
        <Box sx={mainBox}>
            <Card sx={mainCard}>
                <CardContent>
                    {/* secondary/inner card */}
                    <Card sx={secCard}>
                        <CardContent>
                            <table class="card-table">
                                <tr>
                                    <td>
                                    <Checkbox {...label} defaultChecked
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
                                            <EditRoundedIcon/>
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </td>
                                </tr>
                            </table>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FileExport;