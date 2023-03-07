import React from 'react';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import "../Component/ExportButton.css"

const ExportButton = () =>
{
    const handleExport = () =>
    {
        // logic to export data
    };

    return (
        <Button className="export-button" variant="contained" color="primary" endIcon={<CloudDownloadIcon />} onClick={handleExport}>
            Export
        </Button>
    );
};

export default ExportButton;
