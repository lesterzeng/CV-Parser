import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import "../css/FileExport.css"

const mainBox = () => {
    return {
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
}

const mainCard = () =>{
    return {
        minWidth: 275,
        bgcolor: "#8d69c7"
    }
}

const FileExport = () => {

    return (
        <Box sx={mainBox}>
            <Card sx={mainCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        benevolent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default FileExport;