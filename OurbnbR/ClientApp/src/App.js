import React, { Component } from 'react';
import { Route, Routes, RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './custom.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
            })}
        </Route>
    )
);
export default function App (){
    return (
        <RouterProvider router={router} />
    );
}
