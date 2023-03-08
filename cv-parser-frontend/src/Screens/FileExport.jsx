import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Typography, Button, Checkbox, IconButton, FormControl, FormControlLabel }
    from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRight from '@mui/icons-material/ChevronRight';
import "../css/FileExport.css";
// psPDF library
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import NavBar from '../Component/Navbar';

// importing placeholder data for test
// import pData from '../placeholder.json';

const label = { inputProps: { 'aria-label': 'person name' } };

const mainBox = () => {
    return {
        height: "90vh",
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
        margin: "5px 0 5px 0"
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
    // from react-dom to reroute
    let navigate = useNavigate()
    const token = sessionStorage.getItem('token');

    // loading state
    const [loading, setLoading] = useState(true);
    // create state to import JSON placeholder
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        // simple token check
        if (!token) {
            navigate(`/login`);
        }
        else {
            retrieveData()
        }
    }, [])

    const retrieveData = async () => {
        try {
            await fetch(process.env.REACT_APP_PARSE_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // console.log("retriveData: ", data)
                    // const filterData = data.filter((row) => !row.email && !row.firstName && !row.lastName);
                    // console.log(filterData)
                    const successfulRows = data.filter((row) => row.email && row.firstName && row.lastName);
                    setInfos(successfulRows)
                    setLoading(false);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleExportButton = () => {
        console.log("export")
        if (selectedExportData.length > 0) {
            exportingProcess()
            // console.log("selected exports: ", selectedExportData)
        }
        else {
            alert("No profiles selected for export.")
        }
    }

    const exportingProcess = () => {
        const doc = new jsPDF()

        const tableData = selectedExportData.map((data) => {
            const fullName = data.firstName + " " + data.midName + " " + data.lastName
            return [fullName, data.email, data.phoneNumber, data.workExp, data.recentCompanies]
        })

        console.log("print :", tableData)

        autoTable(doc, {
            head: [['Full Name', 'Email', 'Phone Number', 'Work Exp.', 'Skills', 'Recent Companies']],
            body: tableData,
        })

        const uniqueName = uniqueGenerator();
        doc.save(`Candidates_${uniqueName}.pdf`)
    }

    const uniqueGenerator = () => {
        const date = new Date()

        let day = ("0" + date.getDate()).slice(-2)
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()

        let currentDate = year + month + day
        // console.log(currentDate)

        let hours = ("0" + date.getHours()).slice(-2)
        let minutes = ("0" + date.getMinutes()).slice(-2)
        let seconds = ("0" + date.getSeconds()).slice(-2)
        let milliseconds = date.getMilliseconds()

        let currentTime = hours + minutes + seconds + milliseconds
        // console.log(currentTime)
        return `${currentDate}_${currentTime}`
    }

    // console.log(infos)

    // const handleEdit = (id) =>
    // {
    //     navigate(`/edit/${id}`);
    // };

    // const handleDelete = (id, firstName) =>
    // {
    //     try
    //     {
    //         if (window.confirm(`Are you sure you want to delete profile: ${firstName}?`))
    //         {
    //             fetch(process.env.REACT_APP_PARSE_URL + `/${id}`, {
    //                 method: "DELETE",
    //                 headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },

    //             })
    //                 .then((res) => res.json())
    //                 .then(data =>
    //                 {
    //                     setParseData([...parseData, data])
    //                     setParseData("")
    //                 })
    //         }
    //     } catch (error)
    //     {
    //         setError(error.message);
    //     }
    // }

    const columns = [

        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 140,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        {
            field: 'email',
            headerName: 'Email',
            width: 220,
        },

        {
            field: 'phoneNumber',
            headerName: 'Contact',
            width: 120,
        },

        {
            field: 'createdOn',
            headerName: 'Date Uploaded',
            width: 180,
        },

        {
            field: 'edit',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <IconButton aria-label="edit"
                // onClick={() => handleEdit(params.row.id)}
                >
                    <EditRoundedIcon />
                </IconButton>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <IconButton aria-label="delete"
                // onClick={() => handleDelete(params.row.id, params.row.firstName)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    const [selectedExportData, setSelectedExportData] = useState()

    const handleCheckbox = (ids) => {
        console.log("handling liao: ", ids)
        const selectedIDs = new Set(ids);
        const selectedRowData = infos.filter((row) =>
            selectedIDs.has(row.id));
        console.log("selectedRows: ", selectedRowData);
        setSelectedExportData(selectedRowData)
    }

    // for search input
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredData = infos.filter(
        (row) =>
            row.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.phoneNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleDashboardRoute = () => {
        navigate(`/dashboard`)
    }

    return (
        <div>
            <NavBar />
            <Box sx={mainBox}>
                <div>
                    <Box sx={topBox}>
                        <Button variant="contained" startIcon={<HomeIcon />}
                            size="large" sx={btnStyle}
                            onClick={handleDashboardRoute}
                        >
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
                                    onChange={handleSearch}
                                />
                            </FormControl>
                        </div>
                    </Box>
                    <Card sx={mainCard}>
                        <CardContent>
                            <Box sx={cardHeader}>
                                <h1>1 / 4 Profiles Created</h1>
                            </Box>

                            {/* secondary/inner card */}
                            <Card sx={secCard}>
                                <CardContent>
                                    {loading ? (
                                        'Fetching profiles...'
                                    ) : (
                                        <div style={{ height: 500, width: '100%' }}>
                                            <DataGrid
                                                rows={filteredData}
                                                columns={columns}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                checkboxSelection
                                                onRowSelectionModelChange={handleCheckbox}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                    <Box sx={bottomBox}>
                        <Button variant="contained" endIcon={<ChevronRight />}
                            size="large" sx={btnStyle}
                            onClick={handleExportButton}
                        >
                            Export
                        </Button>
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default FileExport;