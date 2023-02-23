import React, {useContext, useEffect} from 'react';
import {Col, Row, Button, Form} from "react-bootstrap";
import TruckCard from "../Components/TruckCard";
import IntervalSelector from "../Components/IntervalSelector";
import {LOAD_TRUCKS, SET_MAX_PRICE, SET_MIN_PRICE, SWITCH_ID} from "../Supporting Files/reducer";
import {Context} from "../Supporting Files/context";
import {checkUserIsAuth} from "../App";
import {postOrder} from "../Supporting Files/NetworkRequests";
import {Link} from "react-router-dom";
import {StatusEnum} from "./History";
import {Breadcrumbs} from "@mui/material";
import {cardStyle} from "./DetailedTruck";

const TableBlockStyle = {
    margin: "20px 15%",
    textAlign: 'center',
}

const TableCardStyle = {
    display: "inline-block",
    margin: "8px 8px 8px 0px",
}

function Rent() {
    const {
        fetchTrucks,
        state,
        dispatch
    } = useContext(Context)

    const tryPost = () => {
        if (state.isAuthenticated) {
            postOrder({
                price: state.trucks.find(element => element.pk == state.selectedTruck).price,
                address_take: "Москва",
                time: state.time,
                car: state.selectedTruck,
                userProfile: state.id,
                status: StatusEnum.Pending
            })
        } else {
            alert("Авторизируйтесь, чтобы оформить заказ")
        }
    }

    useEffect(()=>{
        fetchTrucks(state.minPrice, state.maxPrice).then(trucks => {
            dispatch({
                type: LOAD_TRUCKS,
                payload: {
                    trucks: trucks
                }
            })
        })
    },[state.minPrice, state.maxPrice])

    useEffect(()=>{
    },[state])

    return (
        <>
            <IntervalSelector/>
            <Breadcrumbs style={TableBlockStyle} aria-label='breadcrumb'>
                <Link style={{textDecoration: 'none'}} to='/'>Rent</Link>
            </Breadcrumbs>
            <div style={TableBlockStyle}>
                <Form.Group>
                    <Row>
                        <Form.Group className="mb-3" style={{width: "160px"}}>
                            <Form.Label>Min</Form.Label>
                            <Form.Control type="number" placeholder="---" onChange={event => dispatch({ type: SET_MIN_PRICE, payload: { minPrice: event.target.value} })}/>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{width: "160px"}}>
                            <Form.Label>Max</Form.Label>
                            <Form.Control type="number" placeholder="---" onChange={event => dispatch({ type: SET_MAX_PRICE, payload: { maxPrice: event.target.value} })}/>
                        </Form.Group>
                        {
                            state.isManager &&
                            <Link to="/rent/add" style={{width: "160px", height: "40px", margin: "auto 0 auto auto", text: "right"}}>Добавить авто</Link>
                        }
                    </Row>
                </Form.Group>
                <Row className="g-4">
                    {state.trucks.map((item, index)=>{
                        console.log(state.selectedTruck)
                        return<Col>
                            <TruckCard
                                key={item.pk}
                                id={item.pk}
                                name={item.title}
                                price={item.price}
                                brand={item.brand}
                                capacity={item.capacity}
                                image={item.photo}
                                isSelected={state.selectedTruck == item.pk}/>
                        </Col>
                    })}
                </Row>
                { state.isAuthenticated &&
                    <Button variant="primary"
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "160px",
                                height: "80px",
                                fontSize: "30px"}}
                            onClick={tryPost}
                    >
                        Заказать
                    </Button>
                }
            </div>
        </>
    );
}

export default Rent;