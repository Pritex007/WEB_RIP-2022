import {defaultState} from "./context";
import {StatusEnum} from "../Pages/History";

export const
    TOGGLE_TRUCK = 'TOGGLE_TRUCK',
    LOAD_TRUCKS = 'LOAD_TRUCKS',
    LOAD_TRUCK = 'LOAD_TRUCK',
    GET_SELECTED_TRUCK_FROM_LOCAL = 'GET_SELECTED_TRUCK_FROM_LOCAL',
    SET_SELECTED_TRUCK_FOR_LOCAL = 'SET_SELECTED_TRUCK_FROM_LOCAL',
    LOAD_ORDERS = "LOAD_ORDERS",
    SWITCH_ID = "SWITCH_ID",
    POST_ORDER = "POST_ORDER",
    DATETIME_CHANGE = "DATETIME_CHANGE",
    SET_MIN_PRICE = "SET_MIN_PRICE",
    SET_MAX_PRICE = "SET_MAX_PRICE",

    CHANGE_ORDER_TRUCK = "CHANGE_ORDER_TRUCK",

    SET_MIN_TIME = "SET_MIN_TIME",
    SET_MAX_TIME = "SET_MAX_TIME",

    CHANGE_STATUS = "CHANGE_STATUS",
    CHANGE_STATUS_FILTER = "CHANGE_STATUS_FILTER",

    DELETE_TRUCK = "DELETE_TRUCK",
    CHANGE_TRUCK = "CHANGE_TRUCK",

    CHANGE_ORDER_DRIVER = "CHANGE_ORDER_DRIVER",
    CHANGE_ORDER_TIME = "CHANGE_ORDER_TIME",

    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAIL = "LOGIN_FAIL",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_FAIL = "LOGOUT_FAIL",
    AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS",
    AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL",

    LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS",
    LOAD_USER_PROFILE_FAIL = "LOAD_USER_PROFILE_FAIL"

export const reducer = (state, action) => {
// type, payload
    const { type, payload } = action
    console.log("REDUCER", type)
    switch(type) {
        case CHANGE_ORDER_DRIVER:
            var result = state.orders
            result[payload.index].driver = payload.driver
            return {
                ...state,
                orders: result
            }
        case CHANGE_ORDER_TIME:
            var result = state.orders
            result[payload.index].time = payload.time
            return {
                ...state,
                orders: result
            }
        case CHANGE_ORDER_TRUCK:
            var result = state.orders
            result[payload.index].truck = payload.truckId
            return {
                ...state,
                orders: result
            }
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                statusFilter: payload
            }
        case SET_MAX_TIME:
            return {
                ...state,
                maxTime: payload.maxTime
            }
        case SET_MIN_TIME:
            return {
                ...state,
                minTime: payload.minTime
            }
        case CHANGE_STATUS:
            var result = state.orders
            result[payload.index].status = payload.status
            if (payload.status == StatusEnum.Denied || payload.status == StatusEnum.Done) {
                result[payload.index].date_end = new Date()
            }
            return {
                ...state,
                orders: result
            }
        case CHANGE_TRUCK:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    ...payload
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                id: payload.userProfileId ?? 0,
                isManager: payload.isManager,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            console.log("REGISTER_SUCCESS")
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS ID", payload)
            return {
                ...state,
                id: payload.id,
                isAuthenticated: true,
                isManager: payload.isManager
            }
        case SET_MIN_PRICE:
            return {
                ...state,
                minPrice: payload.minPrice
            }
        case SET_MAX_PRICE:
            return {
                ...state,
                maxPrice: payload.maxPrice
            }
        case DATETIME_CHANGE:
            console.log("DATETIME_CHANGE")
            const newTime = new Date(payload.time).toJSON()
            return {
                ...state,
                time: newTime
            }
        case POST_ORDER:
            console.log("POST_ORDER")
            return {
                state
            }
        case SWITCH_ID:
            console.log("SWITCH_ID")
            return {
                ...state,
                selectedTruck: {},
                id: state.id == 0 ? 1 : 0
            }
        case LOAD_ORDERS:
            console.log("LOAD_ORDERS")
            return {
                ...state,
                orders: payload.orders
            }
        case LOAD_TRUCKS:
            console.log("LOAD_TRUCKS")
            return {
                ...state,
                trucks: payload.trucks
            }
        case LOAD_TRUCK:
            console.log("LOAD_TRUCK SUCCESS")
            return {
                ...state,
                truck: payload.truck
            }
        case TOGGLE_TRUCK:
            console.log("TOGGLE_TRUCK")
            if (state.selectedTruck == payload.id) {
                return {
                    ...state,
                    selectedTruck: {}
                }
            } else {
                return {
                    ...state,
                    selectedTruck: payload.id,
                }
            }

        case GET_SELECTED_TRUCK_FROM_LOCAL:
            console.log(`GET_SELECTED_TRUCK_FROM_LOCAL`)
            try {
                const raw = localStorage.getItem(`BMSTU USER: ${state.id}`) || {}
                const prepared = JSON.parse(raw)
                if (prepared.id == state.id) {
                    return {
                        ...state,
                        selectedTruck: prepared.selectedTruck,
                    }
                } else {
                    return state
                }
            } catch { return state }

        case SET_SELECTED_TRUCK_FOR_LOCAL:
            try {
            console.log(`SET_SELECTED_TRUCK_FOR_LOCAL`)
            localStorage.setItem(`BMSTU USER: ${state.id}`, JSON.stringify({
                id: state.id,
                selectedTruck: state.selectedTruck
            }))
            return state
            } catch { return state }
        default:
            return state
    }
}