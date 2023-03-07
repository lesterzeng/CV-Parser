import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NavBar from '../Component/Navbar';
import JobInfo from '../Component/JobInfo';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight'

const ListParseItems = () =>
{
    const location = useLocation();
    const data = location.state.data;

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
    

    const handleCancel = () =>{
        navigate(-1)
    }

    let navigate = useNavigate()

    const token = sessionStorage.getItem('token');
    if (!token)
    {

        navigate(`/login`);
    }

    const [parseData, setParseData] = useState(data);
    const [failedData, setFailedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const dataWithTempKey = parseData.map((candidate, index) =>
    {
        return {
            ...candidate,
            tempKey: `temp_${index}`, // generate temporary key using the index
        };
    });

    useEffect (() => {
        // try {
        //     fetch(process.env.REACT_APP_PARSE_URL, {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //         .then((res) => res.json())
        //         .then((data) =>
        //         {
        //             console.log(data);
        //             const failedRows = data.filter((row) => !row.email || !row.firstName || !row.lastName);
        //             setFailedData(failedRows);
        //             const successfulRows = data.filter((row) => row.email && row.firstName && row.lastName);
        //             setParseData(successfulRows);
        //             setLoading(false);
        //         });
        // } catch (error) {
            
        // }

        try {
            console.log(dataWithTempKey)
            const failedRows = dataWithTempKey.filter((row) => !row.email || !row.firstName || !row.lastName);
                    setFailedData(failedRows);
                    const successfulRows = dataWithTempKey.filter((row) => row.email && row.firstName && row.lastName);
                    setParseData(successfulRows);
                    setLoading(false);
        } catch (error) {
       
        }
    },[])

// console.log(dataWithTempKey)

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) =>
    {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEdit = (id) =>
    {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id, firstName) => {
        try {
            if (window.confirm(`Are you sure you want to delete profile: ${firstName}?`)){
                fetch(process.env.REACT_APP_PARSE_URL + `/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },

                })
                    .then((res) => res.json())
                    .then(data =>
                    {
                        setParseData([...parseData, data])
                        setParseData("")
                    })
            }
        } catch (error) {
            setError(error.message);
        }
    }


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
            valueGetter: (params) =>
                new Date(params.row.createdOn).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }),
        },

        {
            field: 'edit',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(params.row.id)}
                >
                    Edit
                </button>
            ),
        }, 
        {
            field: 'delete',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <button
                    className='btn btn-sm btn-danger'
                    onClick={() => handleDelete(params.row.id, params.row.firstName)}
                >
                    Delete
                </button>
            ),
        },
    ];

    
    

    return (
        <div>
            <NavBar />
            <h1>Parsing Results</h1>
            
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary style={{ backgroundColor: 'lightblue' }} aria-controls="panel1-content" id="panel1-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>{loading ? "Loading information..." : `${parseData.length} File(s) Successful Parsing`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        {loading ? (
                            'Fetching profiles...'
                        ) : (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={parseData}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </div>
                        )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary style={{ backgroundColor: 'lightblue' }} aria-controls="panel2-content" id="panel2-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>{loading ? "Loading information..." : `${failedData.length} File(s) Failed Parsing - Need More Information`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        {loading ? (
                            'Fetching profiles...'
                        ) : (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={failedData}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </div>
                        )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            {error && (
                <Typography style={{ color: 'red' }}>
                    Items failed to parse: {error}
                </Typography>
            )}
            <br/>
            <br/>
                <JobInfo/>
            <br />
            <Box sx={bottomBox}>
                <Button variant="contained" endIcon={<ChevronRight />}
                    size="large" sx={btnStyle} onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
            <Box sx={bottomBox}>
                <Button variant="contained" endIcon={<ChevronRight />}
                    size="large" sx={btnStyle} onClick={handleCreation}>
                    Create Profiles
                </Button>
            </Box>
        </div>
    );
};

export default ListParseItems;