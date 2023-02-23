import React, {useEffect, useReducer} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./Components/NaviBar";
import About from "./Pages/About";
import Rent from "./Pages/Rent";
    import DetailedTruck from "./Pages/DetailedTruck";
    import {
        reducer,
        GET_SELECTED_TRUCK_FROM_LOCAL,
        SET_SELECTED_TRUCK_FOR_LOCAL
    } from "./Supporting Files/reducer";
    import {defaultState, Context} from "./Supporting Files/context";
    import History from "./Pages/History";
    import {fetchOrders, fetchTruck, fetchTrucks} from "./Supporting Files/NetworkRequests";
    import Register from "./Pages/register";
    import Login from "./Pages/login";
    import {checkAuthenticated} from "./Supporting Files/auth";
    import AddNewTruck from "./Pages/AddNewTruck";
    import AddTruck from "./Pages/AddNewTruck";

    function App() {
        const [state, dispatch] = useReducer(reducer, defaultState);

    useEffect(() => {
        dispatch({
            type: GET_SELECTED_TRUCK_FROM_LOCAL,
            payload: {}
        })
    }, [state.id])

    useEffect(()=>{
        checkAuthenticated().then(status => {
            console.log("AUTH STATUS", status)
            dispatch({
                type: status.isAuthenticated,
                payload: { userProfileId: status.userProfileId, isManager: status.isManager}
            })
        })
    },[])

    useEffect(()=>{
        console.log("STATE RELOAD IN APP")
        console.log(state)
    },[state])

    useEffect(() => {
        console.log("APP")
        console.log(state)
        dispatch({
            type: SET_SELECTED_TRUCK_FOR_LOCAL,
            payload: {}
        })
    }, [state.selectedTruck])



    return (
        <Context.Provider value={{
            fetchOrders,
            fetchTrucks,
            fetchTruck,
            state, dispatch
        }}>
            <Router>
                    <NaviBar/>
                    <Routes>
                        <Route exact path="/about" element={<About/>}/>
                        <Route  path="/" element={<Rent/>}/>
                        <Route  path="/register" element={<Register/>}/>
                        <Route  path="/login" element={<Login/>}/>
                        <Route exact path="rent/:id" element={<DetailedTruck/>}/>
                        <Route exact path="rent/add" element={<AddTruck/>}/>
                        <Route exact path="history/:id" element={<History/>}/>
                    </Routes>
            </Router>
        </Context.Provider>
);
}

export default App;