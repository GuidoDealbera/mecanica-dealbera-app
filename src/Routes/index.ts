import { RouteObject } from "react-router-dom";
import Home from "../Pages/Home.page";
import React from "react";
import Cars from "../Pages/Cars.page";
import NewJob from "../Pages/NewJob.page";
import Clients from "../Pages/Clients.page";
import AddCar from "../Pages/AddCar.page";
import CarDetail from "../Pages/CarDetail.page";
import ClientDetail from "../Pages/ClientDetail.page";

const routes: RouteObject[] = [
    {
        path: '/',
        element: React.createElement(Home)
    },
    {
        path: '/cars/new',
        element: React.createElement(AddCar)
    },
    {
        path: '/cars/add-job',
        element: React.createElement(NewJob)
    },
    {
        path: '/clients',
        element: React.createElement(Clients)
    },
    {
        path: '/cars',
        element: React.createElement(Cars)
    },
    {
        path: '/cars/:license',
        element: React.createElement(CarDetail)
    },
    {
        path: '/clients/:id',
        element: React.createElement(ClientDetail)
    }
]

export default routes