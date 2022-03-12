import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios  from 'axios';
import React from "react";
const Ordersummary = () =>{

  const[result, setResult] = useState({});

  let token = localStorage.getItem('token');
  console.log(token);
  
  useEffect(() => {
    const request = async() => {
      const url =`https://restaurant-app-devops.herokuapp.com/order/getAll?&token=${token}`;
      const res = await axios.get(url);
      setResult(res);
    }
    request();
  },[])

  const toView = (id) => {
    window.location.href = 'view?id='+id;
  }
    return(
        <div class="container-fluid table-responsive">
      <a href="/update" class="btn btn-light mt-3">UPDATE MENU</a>
      <br /><br />
      <h3>ORDER SUMMARY</h3>

      <table class="table table-bordered">
        <thead>
          <th>Order.ID</th>
          <th>Customer ID</th>
          <th>Amount</th>
          <th>Date</th>
          <th></th>
        </thead>
        <tbody>
        {result.data?.map((item) => {
            return (<tr>
                <td>{item.id}</td>
                <td>{item.customerId}</td>
                <td>{item.totalPrice}</td>
                <td>{item.createdAt}</td>
                <td><a href="#view" class="btn btn-danger" onClick={() => toView(item.id)}>View</a></td>
            </tr>)
        })}
        </tbody>
      </table>
      <h3>Total Sales=</h3>
      </div>
    )
}

export default Ordersummary;
