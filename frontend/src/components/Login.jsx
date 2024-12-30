import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credential

        try {
            const response = await fetch('http://localhost:5100/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const json = await response.json()
            console.log("this is our response", json);
            if (response.ok) {
                localStorage.setItem('token', json.authToken);
                const username = json.user.name;
                props.onlogin(username);
                navigate('/');
                props.showAlert('Login successful', 'success')
            }
            else {
                props.showAlert('Invalid credential', 'danger')
            }
        }
        catch (error) {
            console.log('error during login',error);
            props.showAlert('Error occured during login','danger')
        }
    };
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='full-page'>
            <div className='full'>
                <div className='container my-5 col-3'>
                    <form onSubmit={handleSubmit}>
                        <h3 className='mb-3'>Login</h3>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={handleChange} value={credential.email} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={handleChange} value={credential.password} name='password' id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <h6>Not registered ?</h6>
                    <Link className="nav-link" to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
