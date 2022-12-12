import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import User from './User';
import App from './App';

const RootRoute = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/user/:id" element={<User />} />
        </Routes>
    </BrowserRouter>
  )
}

export default RootRoute