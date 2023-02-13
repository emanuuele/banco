import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/home/index'
import Login from './pages/login/login'

export const router = createBrowserRouter([
    {
        path: "/:cpf?",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
