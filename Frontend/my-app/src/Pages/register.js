import React, {useContext, useEffect, useState} from 'react';
import {Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from "../Supporting Files/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Context} from "../Supporting Files/context";
import {REGISTER_FAIL} from "../Supporting Files/reducer";
import CSRFToken from '../Components/CSRFToken';

export default function Register() {
    const { state, dispatch } = useContext(Context)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
        email: ''
    });
    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            console.log(username, password, re_password, email)
            register(username, password, re_password, email).then(status => {
                dispatch({ type: status, payload: {} })
            })
            setAccountCreated(true);
        }
    };

    if (state.isAuthenticated)
        return <Navigate to='/'/>;
    else if (accountCreated)
        return <Navigate to='/login'/>;

    return (
        <Form onSubmit={event => onSubmit(event)} style={{'margin':'20px auto', 'width':'400px'}}>
            <CSRFToken />
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" name="username" onChange={e => onChange(e)}/>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => onChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={e => onChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" name="re_password" onChange={e => onChange(e)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}