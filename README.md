# Web application project XonestTransport

XonestTransport - service for ordering cargo transportation. Customers can choose the transport according to the parameters and price they need.

## Backend
* Language: **Python3**
* Main framework: **Django REST framework**
* Data Base: **SQLite**


Additional functionality:
* REST API methods: **GET/POST/PUT/DELETE/PATCH** available by address _http://\<your IP>:\<you port>/api/
* Snippets API: `http://127.0.0.1:8000/swagger/`
* Autorization by generating **CSRF token** using **Сookie** session
* Using Django **ORM** to interact with the database

## Frontend
* Main framework: **React**
* Language: **Java Script + HTML + CSS**

Additional functionality:
* Using **useContext, useReducer** to store and processing temporary data
* **Autorization / Registration** functionality
* Supports additional functionality to **edit truck, edit clients orders, edit truck collection** title if you logged in as an **admin**
* Caching chosen types in browser local storage

Also implemented **Progressive Web Application** that connects to the web service from phone.
