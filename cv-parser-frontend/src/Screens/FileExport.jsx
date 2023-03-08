import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Checkbox, IconButton, FormControl, FormControlLabel }
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
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import NavBar from '../Component/Navbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// importing placeholder data for test
// import pData from '../placeholder.json';

const label = { inputProps: { 'aria-label': 'person name' } };

const mainBox = () =>
{
    return {
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

const topBox = () =>
{
    return {
        margin: "0 0 10px 0",
        display: "flex",
        justifyContent: "space-between"
    }
}

const bottomBox = () =>
{
    return {
        margin: " 10px 0 0 0",
        display: "flex",
        flexDirection: "row-reverse"
    }
}

const mainCard = () =>
{
    return {
        width: "90vw",
        height: "70vh",
        bgcolor: "#8d69c7"
    }
}

const secCard = () =>
{
    return {
        minWidth: "90%",
        height: "5%",
        bgcolor: "#af8aeb",
        margin: "5px 0 5px 0"
    }
}

const checkboxStyle = () =>
{
    return {
        color: "#461d5c",
        '&.Mui-checked': {
            color: "#6a2b8c",
        },
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

const cardHeader = () =>
{
    return {
        marginLeft: "20px"
    }
}

const FileExport = () =>
{

    const location = useLocation();
    const data = location.state.data;

    // from react-dom to reroute
    let navigate = useNavigate()
    const token = sessionStorage.getItem('token');

    // loading state
    const [loading, setLoading] = useState(true);
    // create state to import JSON placeholder
    const [infos, setInfos] = useState([]);
    // create state to store data from parse
    const [successfulData, setSuccessfulData] = useState(data.successList)
    const [duplicateData, setDuplicateData] = useState(data.duplicateList)

    const duplicateDataWithTempKey = duplicateData.map((candidate, index) =>
    {
        return {
            ...candidate,
            tempKey: parseInt(index, 10), // generate temporary key using the index
        };
    });

    const successDataWithTempKey = successfulData.map((candidate, index) =>
    {
        return {
            ...candidate,
            tempKey: parseInt(index, 10), // generate temporary key using the index
        };
    });



    useEffect(() =>
    {
        // simple token check
        if (!token)
        {
            navigate(`/login`);
        }
        else
        {
            retrieveData()
        }
    }, [])

    const retrieveData = async () =>
    {
        // try {
        //     await fetch(process.env.REACT_APP_PARSE_URL, {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //         .then(response => {
        //             return response.json()
        //         })
        //         .then(data => {
        // console.log("retriveData: ", data)
        // const duplicateRows = duplicateDataWithTempKey.filter((row) => !row.email && !row.firstName && !row.lastName);
        // console.log(filterData)
        // const successRows = successDataWithTempKey.filter((row) => row.email && row.firstName && row.lastName);
 
        // setInfos(duplicateRows)
        setLoading(false);
        //         })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const handleExportButton = () =>
    {
        console.log("export")
        if (selectedExportData.length > 0)
        {
            exportingProcess()
            // console.log("selected exports: ", selectedExportData)
        }
        else
        {
            alert("No profiles selected for export.")
        }
    }

    const exportingProcess = () =>
    {
        const doc = new jsPDF()

        const tableData = selectedExportData.map((data) =>
        {
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

    const uniqueGenerator = () =>
    {
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

    const handleCheckbox = (ids) =>
    {
        console.log("handling liao: ", ids)
        const selectedIDs = new Set(ids);
        const selectedRowData = successDataWithTempKey.filter((row) =>
            selectedIDs.has(row.tempKey));
        console.log("selectedRows: ", selectedRowData);
        setSelectedExportData(selectedRowData)
    }

    // for search input
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (event) =>
    {
        setSearchInput(event.target.value);
    };

    const filteredData = infos.filter(
        (row) =>
            row.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.phoneNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            row.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleDashboardRoute = () =>
    {
        navigate(`/dashboard`)
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) =>
    {
        setExpanded(isExpanded ? panel : false);
    };

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
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary style={{ backgroundColor: 'lightblue' }} aria-controls="panel1-content" id="panel1-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span">{loading ? "Loading information..." : ` Successful Created Profiles`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="span">
                                    {loading ? (
                                        'Fetching profiles...'
                                    ) : (
                                            <div style={{ height: 500, width: '100%' }}>
                                                <DataGrid
                                                    getRowId={(row) => row.tempKey}
                                                    rows={successDataWithTempKey}
                                                    columns={columns}
                                                    pageSize={5}
                                                    rowsPerPageOptions={[5]}
                                                    checkboxSelection
                                                    onRowSelectionModelChange={handleCheckbox}
                                                />
                                            </div>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary style={{ backgroundColor: 'lightblue' }} aria-controls="panel2-content" id="panel2-header" expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span">{loading ? "Loading information..." : ` Duplicated Profiles`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="span">
                                    {loading ? (
                                        'Fetching profiles...'
                                    ) : (
                                            <Card sx={secCard}>
                                                <CardContent>
                                                    {loading ? (
                                                        'Fetching profiles...'
                                                    ) : (
                                                        <div style={{ height: 500, width: '100%' }}>
                                                            <DataGrid
                                                                getRowId={(row) => row.tempKey}
                                                                rows={duplicateDataWithTempKey}
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
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <CardContent>
        

                            {/* secondary/inner card */}

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