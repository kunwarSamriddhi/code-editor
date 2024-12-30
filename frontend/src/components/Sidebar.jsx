import React from 'react';
import { Link } from 'react-router-dom';
import { FcSynchronize } from "react-icons/fc";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { LiaFileSolid } from "react-icons/lia";
import { FaFolderOpen } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import Page from './Page';
import { IoIosLogOut } from "react-icons/io";

const Sidebar = (props) => {
    const textColorClass = props.theme === 'dark' ? 'text-white' : 'text-dark';
    return (
        <div>
            <div className='row'>
                <div className={`col-md-2`}>
                    <div className={`row ${props.border} sidebar`} style={{ border: "1px solid" }}>
                        <div className={`bg-${props.theme} min-vh-100 d-flex justify-content-between flex-column `} style={{ overflowY: "auto" }}>
                            <div className=''>
                                <div className="d-flex align-itemcenter" >
                                    <ul className={`nav nav-pills flex-column mt-4 ${textColorClass}`}>
                                        <li className='nav-item fs-4'>
                                            <a href='#' className={`nav-link ${textColorClass} fs-6 my-1`} aria-current="page">
                                                <LiaFileSolid style={{ color: "red" }} />
                                                <span className='ms-2'>Your recent fiddles</span>
                                            </a>
                                        </li>
                                        <li className='nav-item fs-4'>
                                            <a href='#' className={`nav-link ${textColorClass} fs-6 my-1`} aria-current="page">
                                                <MdOutlineCollectionsBookmark style={{ color: "orange" }} />
                                                <span className='ms-2'>Collections</span>
                                            </a>
                                        </li>
                                        <li className='nav-item fs-4'>
                                            <a href='#' className={`nav-link ${textColorClass} fs-6 my-1`} aria-current="page">
                                                <FaFolderOpen style={{ color: "green" }} />
                                                <span className='ms-2'>Resources</span>
                                            </a>
                                        </li>
                                        <li className='nav-item fs-4'>
                                            <a href='#' className={`nav-link ${textColorClass} fs-6 my-1`} aria-current="page">
                                                <FcSynchronize />
                                                <span className='ms-2'>Async requests</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`mt-5 ${textColorClass} bg-${props.theme}`}>
                                    <hr />
                                    {props.authenticate ?
                                        (
                                            <div>
                                                <span className="ms-4 me-3">{props.userName}</span>
                                                <button className="btn btn-outline-danger" onClick={props.onLogout}>
                                                    <IoIosLogOut />
                                                </button>
                                            </div>
                                        ) : <Link className="nav-link ms-4" to='/login'><FaRegCircleUser />Sign in</Link>}
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-md-10'>
                    <Page theme={props.theme} handleRunCode={props.handleRunCode} outputRef={props.outputRef} html={props.html} js={props.js} css={props.css} setHtml={props.setHtml} setJs={props.setJs} setCss={props.setCss} textColorClass={textColorClass} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
