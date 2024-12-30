import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        
        const response = await fetch('http://localhost:5100/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log("this is our response", json);
        if (json) {
            localStorage.setItem('token', json.authToken)
            navigate('/login');
            props.showAlert('account created', 'success')
        }
        else {
            props.showAlert('Invalid credential', 'danger')
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='full-page'>
            <div className='full'>
                <div className='container my-5 col-3'>
                    <div className='' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <form onSubmit={handleSubmit}>
                            <h3 className='login-title mb-3'>Register to continue</h3>

                            <div className="mb-3 signup-form">
                                <i className='fa fa-user'></i>
                                <input type="name" className="form-control login-form" onChange={handleChange} value={credentials.name} name='name' id="name" aria-describedby="emailHelp" placeholder='Name' />
                            </div>

                            <div className="mb-3 signup-form">
                                <i className='fa fa-envelope'></i>
                                <input type="email" className="form-control login-form" onChange={handleChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder='Email' />
                            </div>

                            <div className="mb-3 signup-form" >
                                <i className='fa fa-key'></i>
                                <input type="password" className="form-control login-form" onChange={handleChange} value={credentials.password} name='password' id="password" minLength={6} required placeholder='Password' />
                            </div>

                            <div className="mb-3 signup-form" >
                                <i className='fa fa-key'></i>
                                <input type="password" className="form-control login-form" onChange={handleChange} value={credentials.cpassword} name='cpassword' id="cpassword" minLength={6} required placeholder='Confirm Password' />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <p>Already have an account ?<Link to='/login'>Login</Link></p>

                        </form>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Signup
