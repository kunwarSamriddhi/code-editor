import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { VscRunAll } from "react-icons/vsc";
import { AiOutlineSave } from 'react-icons/ai';

const Navbar = (props) => {

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme} ${props.border} height`} style={{ border: "1px solid" }}>
                <div className="container-fluid">
                    <div className='d-flex me-5'>
                        <img src={logo} style={{ width: "100px" }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                        <div className='ms-5 me-5'>
                            <button className='btn btn-warning me-3' onClick={props.toggleMode} style={{ color: "white" }}>{props.text}</button>
                            <button className='btn btn-warning me-3' onClick={props.handleRunCode} style={{ color: "white" }}><VscRunAll />Run</button>
                            <button className='btn btn-warning' onClick={props.handleSaveCode} style={{ color: "white" }}><AiOutlineSave />Save</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
