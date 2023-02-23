import React from 'react'


export const defaultState = {
    trucks: [],
    selectedTruck: {},
    openedTruck: {},
    orders: [],
    order: {},
    id: 0,
    time: new Date().toLocaleDateString(),
    minPrice: 0,
    maxPrice: 100000,
    minTime: "2020-01-01T8:00:00",
    maxTime: "2024-01-01T8:00:00",
    isAuthenticated: false,
    isManager: false,
    statusFilter: null,
}

export const Context = React.createContext(defaultState);