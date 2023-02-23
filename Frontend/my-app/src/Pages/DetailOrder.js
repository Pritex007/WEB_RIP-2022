import React, {useContext, useEffect} from 'react';
import {Card, Form} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useParams} from "react-router-dom";
import {Context} from "../Supporting Files/context";
import {CHANGE_TRUCK, LOAD_TRUCK, TOGGLE_TRUCK} from "../Supporting Files/reducer";
import {createRoot} from "react-dom/client";
import Button from "react-bootstrap/Button";


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

function DetailOrder() {
    const {id} = useParams();

    const {
        fetchTruck,
        fetchBrand,
        dispatch,
        state
    } = useContext(Context)

    useEffect(() => {
        fetchTruck(id).then(truck => {
            dispatch({
                type: LOAD_TRUCK,
                payload: {
                    truck: truck
                }
            })
        })
        return () => {

        }
    },[])

    return (
        <>
            <Card style={cardStyle}>
                <Form.Group className="mb-2">
                    <Form.Label >Время</Form.Label>
                    <Form.Control type="url" value={state.truck.photo} name="url photo" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { photo: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Брэнд</Form.Label>
                    <Form.Control type="url" value={state.truck.brand} name="brand" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { brand: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Модель</Form.Label>
                    <Form.Control type="url" value={state.truck.title} name="model" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { title: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Вместимость, м<sup>3</sup></Form.Label>
                    <Form.Control type="url" value={state.truck.capacity} name="capacity" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { capacity: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Стоимость, р.</Form.Label>
                    <Form.Control type="url" value={state.truck.price} name="price" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { price: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Описание</Form.Label>
                    <Form.Control type="url" value={state.truck.description} name="discription" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { description: e.target.value } }) }}/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label >Грузоподъемность, т.</Form.Label>
                    <Form.Control type="url" value={state.truck.payload} name="payload" onChange={e => { dispatch({ type: CHANGE_TRUCK, payload: { payload: e.target.value } }) }}/>
                </Form.Group>
                <Button variant="primary"
                        className="mb-2"
                        style={confirmButtonStyle}
                        onClick={
                            () => changeTruck(state.truck)
                        }>
                    Подтвердить изменения
                </Button>
                <Button variant="primary"
                        style={removeButtonStyle}
                        onClick={() => deleteTruck(state.truck.pk)}>
                    Удалить
                </Button>
            </Card>

        </>
    );
}

export default DetailOrder;