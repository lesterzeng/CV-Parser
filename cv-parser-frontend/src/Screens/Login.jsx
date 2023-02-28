import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    let navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        username:"",
        password:""
    })

const handleSubmit = () => {
    try {
        fetch(process.env.REACT_APP_AUTH_URL + `/login`,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userInput.username,
                password: userInput.password
            }),
        })
            .then((res) => res.json())
            .then((data) =>
            {
<<<<<<< HEAD
                const token = data.accessToken
                sessionStorage.setItem('token', token)
                console.log("Logged in and token is in sessionStorage")
                //navigate(/cvparse/cand)
=======
                
>>>>>>> 7769897 (Created basic template for file export route:)
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
            <br></br>
            <br></br>
            <h4>CV Parser</h4>
            <br></br>
            <h1>Welcome Administrator</h1>
            <br></br>
            <h5>Sign into your account</h5>
            <br></br>
            <form>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" >UserID</label>
                    <input type="email" className="form-control" onChange={e => setUserInput({ ...userInput, username: e.target.value })} />

                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" className="form-control" onChange={e => setUserInput({ ...userInput, password: e.target.value })} />

                </div>

                {/* <!-- Submit button --> */}
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogout}>Test Log Out</button>
            </form>
        </div>
    );
};

export default Login;