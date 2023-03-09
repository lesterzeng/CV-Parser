import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import NavBar from '../Component/Navbar';

// styling for box
const mainBox = () => {
    return {
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

// styling for button
const btnStyle = () => {
    return {
        margin: "20px 0 0 0",
        bgcolor: "#461d5c",
        '&:hover': {
            bgcolor: "#6a2b8c",
        }
    }
}

// styling for inputs
const inputStyle = () => {
    return {
        margin: "10px",
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            }
        }
    }
}

// styling for card
const loginCard = () => {
    return {
        padding: "0 20px 30px 20px",
        bgcolor: "#8d69c7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}

const Login = () => {

    let navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = () => {
        try {
            fetch(process.env.REACT_APP_AUTH_URL + `/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: userInput.username,
                        password: userInput.password
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    const token = data.accessToken
                    sessionStorage.setItem('token', token)
                    console.log("Logged in and token is in sessionStorage")

                    navigate(`/dashboard`)

                    //navigate(/cvparse/cand)
                });
        } catch (error) {
            console.log("Invalid Username / Password")
            // to include Toastify 
            navigate(`/login`)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        console.log("Logged out")

    }
    return (
        <div>
            <NavBar />
            <Box sx={mainBox}>
                <Card sx={loginCard}>
                    <h1>Login Page</h1>
                    <FormControl sx={inputStyle}>
                        <InputLabel htmlFor="user-id">
                            User ID
                        </InputLabel>
                        <OutlinedInput
                            id="user-id"
                            type="text"
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            label="User ID"
                            onChange={e => setUserInput({ ...userInput, username: e.target.value })}
                        />
                    </FormControl>
                    <FormControl sx={inputStyle}>
                        <InputLabel htmlFor="password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="password"
                            type="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={e => setUserInput({ ...userInput, password: e.target.value })}
                        />
                    </FormControl>
                    <Button variant="contained"
                        size="large" sx={btnStyle}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Card>
            </Box>
        </div>
    );
};

export default Login;