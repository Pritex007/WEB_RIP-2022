import axios from "axios";
import Cookies from "js-cookie";
import {StatusEnum} from "../Pages/History";

export const postOrder = async (order) => {
    console.log(order)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = { ...order, date_create: new Date() }

    axios.post('http://localhost:8000/api/orders/', body, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const changeOrderTruck = async (orderId, truckId) => {
    console.log(orderId)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    var body = { car: truckId }

    console.log("CHANGE ORDER TRUCK", body)

    axios.patch(`http://localhost:8000/api/orders/${orderId}/`, body, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const changeOrderTime = async (orderId, time) => {
    console.log(orderId)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    var body = { time: time }

    console.log("CHANGE ORDER TRUCK", body)

    axios.patch(`http://localhost:8000/api/orders/${orderId}/`, body, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const changeOrderStatus = async (orderId, status, driver = null, date) => {
    console.log(orderId)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const current_date = new Date()

    var dateBody = {}

    switch(status) {
        case StatusEnum.Pending, StatusEnum.Confirmed:
        case StatusEnum.InProgress:
            dateBody = { date_start: current_date }
        case StatusEnum.Done, StatusEnum.Denied:
            dateBody = { date_end: current_date }
    }

    var body = {}

    if (driver != null)     {
        body  = { status: status, driver: driver, ...dateBody }
    } else {
        body  = { status: status, ...dateBody }
    }

    console.log("CHANGE ORDER", body)

    axios.patch(`http://localhost:8000/api/orders/${orderId}/`, body, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const postTruck = async (truck) => {
    console.log("try to POST TRUCK", truck)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    axios.post('http://localhost:8000/api/cars/', truck, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не заполнили одно из полей.")
        });
}

export const changeTruck = async (truck) => {
    console.log(truck)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    axios.put(`http://localhost:8000/api/cars/${truck.pk}/`, truck, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const deleteTruck = async (truckId) => {
    console.log(truckId)

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    axios.delete(`http://localhost:8000/api/cars/${truckId}/`, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const fetchTrucks = async (min, max) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    var res = await axios.get(`http://localhost:8000/api/cars/?price_min=${min}&price_max=${max}`, config)
        .then(function (response) {
            console.log("CARS", response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return {resultCount:0, results:[]}
        });
    return res
}

// export const fetchBrands = async (tempTrucks) => {
//     const res = []
//     console.log(tempTrucks)
//     for (const element of tempTrucks) {
//         const tempRes = await fetch(`http://localhost:8000/api/brands/${element.brand}`)
//             .then((response) => {
//                 return response.json();
//             }).catch(() => {
//                 return {resultCount: 0, results: []}
//             })
//         res.push(tempRes.title)
//     }
//     console.log(res)
//     return res
// }

export const fetchTruck = async (truckID) => {
    const res = await fetch(`http://localhost:8000/api/cars/${truckID}`)
        .then((response) => {
            return response.json();
        }).catch(() => {
            return {resultCount: 0, results: []}
        })
    console.log("fetchTruck")
    console.log(res)
    return res
}

// export const fetchBrand = async (brandID) => {
//     const res = await fetch(`http://localhost:8000/api/brands/${brandID}`)
//         .then((response) => {
//             return response.json();
//         }).catch(()=>{
//             return {resultCount:0, results:[]}
//         })
//     console.log("fetchBrand")
//     console.log(res)
//     return res
// }

export const fetchOrders = async (min, max, status) => {
    // var res = await fetch(`http://localhost:8000/api/orders`)
    //     .then((response) => {
    //         return response.json();
    //     }).catch(()=>{
    //         return {resultCount:0, results:[]}
    //     })
    // res = res.filter(order => order.userProfile == userID)
    // res = res.sort((a,b) => a.time < b.time)
    // console.log("fetchOrders")
    // console.log(res)
    // return res

    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };
    const stringStatus = status == "Все" || status == null ? "" : status
    var res = await axios.get(`http://localhost:8000/api/orders/?time_after=${min}&time_before=${max}&status=${stringStatus}`, config)
        .then(function (response) {
            console.log("ORDER", response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return {resultCount:0, results:[]}
        });
    console.log("RESULT ARRAY ORDER", res);
    res = res.sort(function(a,b){
        return new Date(b.time) - new Date(a.time);
    });
    return res
}