import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ordersummary from './Ordersummary';
import Update from './Update';
import Login from './Login';
import View from './View';
import AddFoodItem from "./AddFoodItem";
import React from "react";
import { Route , Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route exact path = '/summary' element = {<Ordersummary/>}/>
                <Route path = '/update' element = {<Update/>}/>
                <Route path = '/addItem' element = {<AddFoodItem/>}/>
                <Route path = '/' element = {<Login/>}/>
                <Route exact path="/view" element = {<View />} />
            </Routes>
        </>
    );
}

export default App;
