import React, {useState} from 'react';

const Login = () => {

    const [userInput, setUserInput] = useState({
        userId:"",
        password:""
    })

const handleSubmit = () => {
    try {
        
    } catch (error) {
        
    }
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
                    <input type="email" className="form-control" onChange={e => setUserInput({ ...userInput, userId: e.target.value })} />

                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" className="form-control" onChange={e => setUserInput({ ...userInput, password: e.target.value })} />

                </div>

                {/* <!-- Submit button --> */}
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>
            </form>
        </div>
    );
};

export default Login;