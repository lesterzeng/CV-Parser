import React from 'react';
import JobInfo from '../Component/JobInfo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight'

const EnterJobInfo = () => {

    const bottomBox = () =>
    {
        return {
            margin: " 10px 0 0 0",
            display: "flex",
            flexDirection: "row-reverse"
        }
    }

    const btnStyle = () =>
    {
        return {
            margin: "0 10px 0 10px",
            height: "100%",
            bgcolor: "#461d5c",
            '&:hover': {
                bgcolor: "#6a2b8c",
            }
        }
    }

    const handleCreation = () =>
    {
        return null
    }

    return (
        
        <div>
            <h2>Enter Job Information</h2>
            <JobInfo/>
            <Box sx={bottomBox}>
                <Button variant="contained" endIcon={<ChevronRight />}
                    size="large" sx={btnStyle} onClick={handleCreation}>
                    Start Automated Creation
                </Button>
            </Box>
            
        </div>
    );
};

export default EnterJobInfo;