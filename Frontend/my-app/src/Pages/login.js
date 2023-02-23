import React, {useContext, useState} from 'react';
import {Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from "../Supporting Files/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Context} from "../Supporting Files/context";
import CSRFToken from '../Components/CSRFToken';

export default function Login() {
    const { state, dispatch } = useContext(Context)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        console.log(username, password)
        login(username, password).then(status => {
            console.log('DISPATCH LOGIN', status)
            dispatch(status)
        })
    };

    if (state.isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (
        <Form onSubmit={event => onSubmit(event)} style={{'margin':'20px auto', 'width':'400px'}}>
            <CSRFToken />
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" name="username" onChange={e => onChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={e => onChange(e)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}