import React, {useContext, useEffect} from 'react';
import {Card, Form} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useParams} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import {Context} from "../Supporting Files/context";
import {CHANGE_TRUCK, LOAD_TRUCK, TOGGLE_TRUCK} from "../Supporting Files/reducer";
import {createRoot} from "react-dom/client";
import Button from "react-bootstrap/Button";
import {changeTruck, deleteTruck, postTruck} from "../Supporting Files/NetworkRequests";


const cardStyle = {
    margin: "8px 30%",
    textColor: "black",
    textAlign: "center"
};

const cardImage = {
    width: "100%",
    height: "500px",
};

const confirmButtonStyle = {
    width: "100%",
    backgroundColor: "green",
    borderColor: "green"
};

const removeButtonStyle = {
    width: "100%",
    backgroundColor: "red",
    borderColor: "red"
};

function AddTruck() {
    const {id} = useParams();

    const {
        fetchTruck,
        fetchBrand,
        dispatch,
        state
    } = useContext(Context)

    return (
        <>
            <Card style={cardStyle}>
                <Form.Group className="mb-2">
                    <Form.Label >Фото</Form.Label>
                    <Form.Control type="url" placeholder="Url photo: http://example.com/image.jpg" name="url photo" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { photo: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Брэнд</Form.Label>
                    <Form.Control type="url" placeholder="Ford" name="brand" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { brand: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Модель</Form.Label>
                    <Form.Control type="url" placeholder="Mustang" name="model" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { title: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Вместимость, м<sup>3</sup></Form.Label>
                    <Form.Control type="url" placeholder="8" name="capacity" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { capacity: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Стоимость, р.</Form.Label>
                    <Form.Control type="url" placeholder="20000" name="price" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { price: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Описание</Form.Label>
                    <Form.Control type="url" placeholder="Лучшее решение для перевозки небольших вещей" name="discription" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { description: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Грузоподъемность, т.</Form.Label>
                    <Form.Control type="url" placeholder="2" name="payload" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { payload: e.target.value } }) }}/>
                </Form.Group>
                <Button variant="primary"
                        className="mb-2"
                        style={confirmButtonStyle}
                        onClick={
                            () => postTruck(state.truck)
                        }>
                    Добавить
                </Button>
            </Card>
        </>
    );
}

export default AddTruck;