import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const View = () => {
  let res = {};
  let token = localStorage.getItem('token');
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const[result, setResult] = useState({});
  const[custid, setCustid] = useState(null);
  const[totalprice, setTotalprice] = useState(0);
  const[orderdate, setOrderdate] = useState(null);
  const[fooditem, setFooditem] = useState([]);

  useEffect(() => {

    const request = async() => {
        const url = `https://restaurant-app-devops.herokuapp.com/order/getById?id=${params.get('id')}&token=${token}`;
        res = await axios.get(url);
        setResult(res.data);
        console.log(res.data);
        setCustid(res.data.customerId);
        setTotalprice(res.data.totalPrice);
        setOrderdate(res.data.createdAt);
        setFooditem(res.data.foodItem);
    }
    request();
},[]);

  return(
    <div class="container">
    <h1>Order Id: </h1>
    <table class="table table-bordered">
      <thead>
        <th>Name</th>
        <th>Quantity</th>
      </thead>
      <tbody>
      {fooditem?.map((item) => {
            return (<tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
            </tr>)
        })}
      </tbody>
    </table>
    <h4>Customer ID: {custid}</h4>
    <h4>Total Price:{totalprice}</h4>
    <h4>Order Date:{orderdate}</h4>
  </div>
  )
};

export default View;
