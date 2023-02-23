import Table from 'react-bootstrap/Table';
import {Button, Form, Row} from "react-bootstrap";
import TruckCard from "../Components/TruckCard";
import React, {useContext, useEffect} from "react";
import {Context} from "../Supporting Files/context";
import {Link, useParams} from "react-router-dom";
import {
    CHANGE_ORDER_DRIVER,
    CHANGE_ORDER_TIME,
    CHANGE_ORDER_TRUCK,
    CHANGE_STATUS, CHANGE_STATUS_FILTER, CHANGE_TRUCK,
    LOAD_ORDERS, LOAD_TRUCKS,
    SET_MAX_PRICE,
    SET_MAX_TIME,
    SET_MIN_PRICE,
    SET_MIN_TIME
} from "../Supporting Files/reducer";
import {changeOrderStatus, changeOrderTime, changeOrderTruck} from "../Supporting Files/NetworkRequests";

export const StatusEnum = {
    Pending: "ожидает подтверждения",
    Confirmed: "подтвержден",
    Denied: "отклонен",
    InProgress: "Выполняется",
    Done: "Выполнен"
}

function History() {
    const {id} = useParams()

    const {
        fetchTrucks,
        fetchOrders,
        dispatch,
        state
    } = useContext(Context)

    useEffect(()=>{
        fetchTrucks(0, 10000000).then(trucks => {
            dispatch({
                type: LOAD_TRUCKS,
                payload: {
                    trucks: trucks
                }
            })
        })
    },[])

    useEffect(()=>{
        fetchOrders(state.minTime, state.maxTime, state.statusFilter).then(orders => {
            console.log("fetchOrders")
            console.log(orders)
            dispatch({
                type: LOAD_ORDERS,
                payload: { orders: orders }
            })
        })
    }, [state.minTime, state.maxTime, state.statusFilter])


    if (state.isAuthenticated) {
        if (!state.isManager) {
            return (
                <>
                    <Row>
                        <Form.Select aria-label="Default select example" style={{
                            width: "12%",
                            margin: "auto auto 0 20%"
                        }} onChange={e => { dispatch({type: CHANGE_STATUS_FILTER, payload: e.target.value}) }}>
                            <option>Все</option>
                            <option>{StatusEnum.Pending}</option>
                            <option>{StatusEnum.Confirmed}</option>
                            <option>{StatusEnum.Denied}</option>
                            <option>{StatusEnum.InProgress}</option>
                            <option>{StatusEnum.Done}</option>
                        </Form.Select>
                        <Form.Group style={{
                            width: "30%",
                            margin: "4px 20% auto auto"
                        }}>
                            <Row>
                                <Form.Group className="col-6">
                                    <Form.Label>Min</Form.Label>
                                    <Form.Control type="date" placeholder="---" onChange={event => dispatch({ type: SET_MIN_TIME, payload: { minTime: event.target.value } })}/>
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label>Max</Form.Label>
                                    <Form.Control type="date" placeholder="---" onChange={event => dispatch({ type: SET_MAX_TIME, payload: { maxTime: event.target.value } })}/>
                                </Form.Group>
                            </Row>
                        </Form.Group>
                    </Row>
                    <Table striped bordered hover style={{
                        width: "60%",
                        textAlign: "center",
                        margin: "24px auto"
                    }}>
                        <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Стоимость р.</th>
                            <th>Авто</th>
                            <th>Водитель</th>
                            <th>Дата заказа</th>
                            <th>Дата завершения</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.orders.map((item) => {
                            return <tr>
                                <th>{item.pk}</th>
                                <th>{item.price}</th>
                                <th>{state.trucks.find(x => x.pk === item.car).brand + " " + state.trucks.find(x => x.pk === item.car).title}</th>
                                <th>{item.driver}</th>
                                <th>{(new Date(item.time)).toLocaleDateString()}</th>
                                { item.date_end != null &&
                                    <th>{(new Date(item.date_end)).toLocaleDateString()}</th>
                                }
                                { item.date_end == null &&
                                    <th> --- </th>
                                }
                                <th>{item.status}</th>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                </>
            );
        } else {
            return (
                <>
                <Row>
                    <Form.Select aria-label="Default select example" style={{
                        width: "12%",
                        margin: "auto auto 0 20%"
                    }} onChange={e => { dispatch({type: CHANGE_STATUS_FILTER, payload: e.target.value}) }}>
                        <option>Все</option>
                        <option>{StatusEnum.Pending}</option>
                        <option>{StatusEnum.Confirmed}</option>
                        <option>{StatusEnum.Denied}</option>
                        <option>{StatusEnum.InProgress}</option>
                        <option>{StatusEnum.Done}</option>
                    </Form.Select>
                    <Form.Group style={{
                        width: "30%",
                        margin: "4px 20% auto auto"
                    }}>
                        <Row>
                            <Form.Group className="col-6">
                                <Form.Label>Min</Form.Label>
                                <Form.Control type="date" placeholder="---" onChange={event => dispatch({ type: SET_MIN_TIME, payload: { minTime: event.target.value } })}/>
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label>Max</Form.Label>
                                <Form.Control type="date" placeholder="---" onChange={event => dispatch({ type: SET_MAX_TIME, payload: { maxTime: event.target.value } })}/>
                            </Form.Group>
                        </Row>
                    </Form.Group>
                </Row>
                    <Table striped bordered hover style={{
                        width: "80%",
                        textAlign: "center",
                        margin: "24px auto"
                    }}>
                        <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Стоимость р.</th>
                            <th>Авто</th>
                            <th>Дата заказа</th>
                            <th>Дата создания</th>
                            <th>Водитель</th>
                            <th>Дата завершения</th>
                            <th>Статус</th>
                            <th>Решить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.orders.map((item, index) => {
                            return <tr>
                                <th>{item.pk}</th>
                                <th>{item.price}</th>
                                <th>
                                    <Form.Select aria-label="Default select example" style={{
                                        width: "100%"
                                    }} onChange={e => { changeOrderTruck(item.pk, e.target.value).then(dispatch({type: CHANGE_ORDER_TRUCK, payload: { index: index, truckId: e.target.value}}))}}>
                                        <option value={state.trucks.find(x => x.pk === item.car).pk}>{state.trucks.find(x => x.pk === item.car).brand + " " + state.trucks.find(x => x.pk === item.car).title}</option>
                                        {state.trucks.filter(x => x.pk != item.car).map(temp => {
                                            return <option value={temp.pk}>{temp.brand + " " + temp.title}</option>
                                        })}
                                    </Form.Select>
                                </th>
                                <th>
                                    <div>{ new Date(item.time).toLocaleDateString() }</div>
                                    <div><Form.Control type="date" onChange={ e => {changeOrderTime(item.pk, e.target.value).then(dispatch({type: CHANGE_ORDER_TIME, payload: {index: index, time: e.target.value }}))}}/></div>
                                </th>
                                <th>{(new Date(item.date_create)).toLocaleDateString()}</th>
                                <th>{item.driver}</th>
                                { item.date_end != null &&
                                    <th>{(new Date(item.date_end)).toLocaleDateString()}</th>
                                }
                                { item.date_end == null &&
                                    <th> --- </th>
                                }
                                <th>{item.status}</th>
                                <th>
                                { item.status == StatusEnum.Pending &&
                                    <>
                                        <Button variant="success" style={{marginRight: "6px"}}
                                                onClick={() => {changeOrderStatus(item.pk, StatusEnum.Confirmed).then(
                                                    dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.Confirmed }})
                                                )}}>Подтвердить</Button>
                                        <Button variant="danger" style={{marginLeft: "6px"}}
                                                onClick={() => {changeOrderStatus(item.pk, StatusEnum.Denied).then(
                                                    dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.Denied }})
                                                )}}>Отклонить</Button>
                                    </>
                                }
                                { item.status == StatusEnum.Confirmed &&
                                    <>
                                        <Button variant="success" style={{marginRight: "6px"}}
                                                onClick={() => {const driver = prompt('Укажите фамилию водителя');
                                                    if (driver != "") {
                                                        changeOrderStatus(item.pk, StatusEnum.InProgress, driver).then(
                                                        dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.InProgress }})
                                                ).then(dispatch({type: CHANGE_ORDER_DRIVER, payload: { index: index, driver: driver }}))
                                                    }}}>Начать выполнение</Button>
                                        <Button variant="danger" style={{marginLeft: "6px"}}
                                                onClick={() => {changeOrderStatus(item.pk, StatusEnum.Denied).then(
                                                    dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.Denied }})
                                                )}}>Отклонить</Button>
                                    </>
                                }
                                { item.status == StatusEnum.InProgress &&
                                    <>
                                        <Button variant="success" style={{marginRight: "6px"}}
                                                onClick={() => {changeOrderStatus(item.pk, StatusEnum.Done).then(
                                                    dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.Done }})
                                                )}}>Завершить</Button>
                                        <Button variant="danger" style={{marginLeft: "6px"}}
                                                onClick={() => {changeOrderStatus(item.pk, StatusEnum.Denied).then(
                                                    dispatch({type: CHANGE_STATUS, payload: { index: index, status: StatusEnum.Denied }})
                                                )}}>Отклонить</Button>
                                    </>
                                }
                                </th>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                </>
            );
        }
    } else {
        return (<h2 style={{
            textAlign: "center",
            marginTop: "16px"
        }}>Авторизируйтесь, чтобы посмотреть список покупок</h2>)
    }
}

export default History;