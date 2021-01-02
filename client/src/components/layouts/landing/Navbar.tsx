import React from "react";
import "../../../styles/landing/navbar.scss";
import Logo from "../../../assets/logo.png";
import {Link} from 'react-router-dom';

type NavbarState = {};

class Navbar extends React.Component<{}, NavbarState> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <input
                    type="checkbox"
                    id="checkbox"
                    style={{display: "none"}}
                />
                <nav
                    className="nav-bar"
                    style={{height: "100px", position: "relative"}}
                >
                    <div
                        className="columns is-mobile"
                        style={{width: "100%"}}
                    >
                        <div
                            className="column is-two-fifths"
                            style={{display: "flex", alignItems: "center"}}
                        >
                            <img
                                src={Logo}
                                className="logo"
                                alt="Doodledrop Logo"
                            />
                            <div className="title">
                                <span style={{color: "#fb2444"}}>doodle</span>
                                <span style={{color: "#542c44"}}>drop</span>
                            </div>
                        </div>
                        {/*<div className="column is-one-fifth"></div>*/}
                        <div className="column" id="navbar-elements">
                            <ul className="nav-bar-list">
                                <li className="nav-bar-item">Home</li>
                                <li className="nav-bar-item">Blank</li>
                                <li className="nav-bar-item">About</li>
                                <li className="nav-bar-item">Contributers</li>
                                <li className="nav-bar-item" id="sign-up-div">
                                    <Link to="/auth/register">
                                        <input
                                            type="button"
                                            value="Sign up"
                                            className="button"
                                        />
                                    </Link>
                                </li>
                                <li className="nav-bar-item" id="sign-in-div">
                                    <Link to="/auth/login">
                                        <input
                                            type="button"
                                            value="Log in"
                                            className="button"
                                        />
                                    </Link>
                                </li>
                            </ul>
                            <div className="nav-bar-icons-container">
                                <div
                                    className="nav-bar-signup-icon"
                                    title="Signup"
                                >
                                    <i
                                        className="fa fa-sign-in"
                                        style={{color: "white"}}
                                        aria-hidden="true"
                                        title="Signup"
                                    ></i>
                                </div>
                                <div
                                    className="nav-bar-login-icon"
                                    title="Signin"
                                >
                                    <i
                                        className="fa fa-sign-out"
                                        style={{color: "white"}}
                                        aria-hidden="true"
                                    ></i>
                                </div>

                                <label
                                    htmlFor="checkbox"
                                    className="nav-bar-burger"
                                >
                                    <i
                                        className="fa fa-caret-down"
                                        style={{color: "white"}}
                                        aria-hidden="true"
                                    ></i>
                                </label>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navbar;
