import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useEffect, useState} from "react";
import axios from "axios";
const AddFoodItem = () => {

    let res = {};
    let token = localStorage.getItem('token');
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const[result, setResult] = useState({});

    useEffect(() => {

        const request = async() => {
            const url = `https://restaurant-app-devops.herokuapp.com/foodItem/getById?token=${token}&id=${params.get('id')}`;
            res = await axios.get(url);
            setResult(res.data);
            console.log(res.data);
        }
        request();
    },[]);

    function post(){
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');

        let raw = JSON.stringify({"name":name,"type":type, "price":price, "description":description, "rating":0,"url":null});

        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: headers,
            redirect: 'follow'
        };

        let method = "new";

        if (params.get('id') != null){
            method = "update";
        }

        fetch("https://restaurant-app-devops.herokuapp.com/foodItem/"+method+"?token="+token+"&id="+params.get('id'), requestOptions)
            .then(result => {
                console.log(result.status);
                console.log(result.body);
                if (result.status === 200) {
                    window.location.href = "update";
                }
                else {
                    alert("Oops! an error occurred");
                }
            })
            .catch(error => {
                alert("Oops! an error occurred" + error)
            });
    }


    return (
        <>
            <div class="container-fluid table-responsive">
                <h3>ORDER SUMMARY</h3>

                <form>
                    <label htmlFor="name">Item name:</label><br/>
                    <input type="text" id="name" name="name" defaultValue={result.name}/><br/>
                    <label htmlFor="type">Item type:</label><br/>
                    <input type="text" id="type" name="type" defaultValue={result.type}/><br/>
                    <label htmlFor="description">Description:</label><br/>
                    <input style={{width: "600px", height: "50px"}} type="text" id="description" name="description" defaultValue={result.description}/><br/>
                    <label htmlFor="price">Price:</label><br/>
                    <input type="text" id="price" name="price" defaultValue={result.price}/><br/>
                </form>
                <a onClick={post} class="btn">Save</a>
            </div>
        </>
    )
}
export default AddFoodItem;