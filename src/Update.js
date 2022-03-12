import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useEffect, useState} from "react";
import axios from "axios";
const Update = () => {

  const[result, setResult] = useState({});

  let token = localStorage.getItem('token');
  console.log(token);

  const updateItem = (id) => {
    window.location.href = 'addItem?id='+id;
  }

  const deleteItem = (id) => {
    console.log(id);
    const requestDelete = async() => {
      const url = `https://restaurant-app-devops.herokuapp.com/foodItem/delete?token=${token}&id=${id}`;
      console.log(url);
      const res = await axios.get(url);
      console.log(res);
      setResult(res);
    }
    requestDelete();
    window.location.href = 'update'
  }

  useEffect(() => {
    const request = async() => {
      const url = `https://restaurant-app-devops.herokuapp.com/foodItem?token=${token}`;
      const res = await axios.get(url);
      setResult(res);
    }
    request();
  },[]);

  return (
      <>
        <div class="container-fluid table-responsive">
          <a href="#update" class="btn btn-light mt-3">UPDATE MENU</a>
          <br /><br />
          <h3>ORDER SUMMARY</h3>

          <table class="table table-bordered">
            <thead>
            <th>Food Item</th>
            <th>Type</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
            </thead>
            <tbody>
            {
              result.data?.map((value) => {
                return(
                    <tr>
                      <td>{value.name}</td>
                      <td>{value.type}</td>
                      <td>{value.description}</td>
                      <td>{value.price}</td>
                      <td>
                        <a onClick={() => deleteItem(value.id)} className="btn btn-danger">delete</a>
                        <a onClick={() => updateItem(value.id)} className="btn btn-primary">update</a>
                      </td>
                    </tr>
                )
              })
            }
            </tbody>
          </table>
          <a href="/additem" class="btn btn-success">Add Item</a>
        </div>
      </>
  )
}
export default Update;