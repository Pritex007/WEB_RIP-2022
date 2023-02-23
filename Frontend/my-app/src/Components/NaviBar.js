import { Link, use } from  'react-router-dom'
import { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Nav } from 'react-bootstrap';
import React, {useContext} from "react";
import {Context} from "../Supporting Files/context";
import {Switch} from "@mui/material";
import {SWITCH_ID} from "../Supporting Files/reducer";
import {logout} from "../Supporting Files/auth";

const linkStyle = {
    margin: "6px",
    textDecoration: "none",
    color: "hsla(0,0%,100%,0.55)",
    fontSize: "18px"
};

const brandStyle = {
    margin: "8px",
    textDecoration: "none",
    color: "hsla(0,0%,100%,0.55)",
    fontSize: "24px"
};


function NaviBar() {
    const { state, dispatch } = useContext(Context)

    const authLinks = (
        <>
            <Nav.Link><Link to="/login" style={linkStyle} onClick={() => {logout().then(status => {dispatch({type: status, payload: {}})})}}>LogOut</Link></Nav.Link>
        </>
    );

    const guestLinks = (
        <>
            <Nav.Link><Link to="/login" style={linkStyle}>LogIn</Link></Nav.Link>
            <Nav.Link><Link to="/register" style={linkStyle}>SignUp</Link></Nav.Link>
        </>
    );

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/" style={brandStyle}>Xonest transport</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><Link to="/" style={linkStyle}>Rent</Link></Nav.Link>
                    <Nav.Link><Link to="/about" style={linkStyle}>About</Link></Nav.Link>
                    <Nav.Link><Link to={`/history/${state.id}`} style={linkStyle}>History</Link></Nav.Link>
                </Nav>
                { state.isAuthenticated ? authLinks : guestLinks }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NaviBar;