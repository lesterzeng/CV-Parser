import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const UploadButton = () => {

    let navigate = useNavigate()

    const handleUpload = () => {
        navigate(`/upload`);
        // navigate to Upload Screen
    }

    return (
        <div>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpload}>
                Upload CVs
            </Button>
        </div>
        
    );
};

export default UploadButton;