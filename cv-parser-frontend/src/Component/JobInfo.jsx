import React, {useState}from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const JobInfo = () => {
    const [formData, setFormData] = useState("");

    function handleChange(event)
    {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    return (
        <div>
     
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Job Title"
                        defaultValue="Software Engineer"
                    />
                    <TextField
                        id="outlined-required"
                        label="Start Date "
                        InputLabelProps={{
                            shrink: true,
                        }}
                 
                        variant="filled"
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-required"
                        label="End Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
    
                        variant="filled"
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                    />
     
                </div>
             
            </Box>
           
        </div>
    );
};

export default JobInfo;