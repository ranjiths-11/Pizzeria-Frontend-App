import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Order(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/pizzas`)
        .then(res=>{
            setData(res.data);
        })
        .catch(err=>console.log(err))
    },[]);

    function addCart(data){
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_API_URL}/cart/add/${data}/1`,{
            headers:{Authorization:token}
        })
        .then()
        .catch(err=>console.log(err));
    }

    return (
        <div>
            <div className="row">

{/* card-start */}
            {
                data.map((pizza,index)=>(

                <div className="col-sm-6 w-50 h-100 mt-1" key={index}>
                    <div className="card">
                    <div className="row" >

                        <div className="col-sm-3">
                            <div className="card-body justify-content-center align-items-center">
                                <p className="card-text fw-bold">{pizza.name}</p>
                                <button style={{width:'20px', height:'20px', backgroundColor: pizza.type==="veg" ? "green":"red", borderColor:pizza.type==="veg" ? "green":"red"}}></button>
                                <p className="card-text"><br/>₹{pizza.price}</p>
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="card-body">
                                <p className="card-text">{pizza.description}</p>
                                <p className="card-text"><b>Ingredients : </b> 
                                {pizza.ingredients?.map((ing, ind) => (
                                <span key={ind}>
                                    {ing}
                                    {ind < pizza.ingredients.length - 1 && ', '}
                                </span>
                                ))}
                                </p>
                                <p className="card-text"><b>Toppings : </b>
                                {pizza.topping?.map((ing, ind) => (
                                <span key={ind}>
                                    {ing}
                                    {ind < pizza.topping.length - 1 && ', '}
                                </span>
                                ))}
                                </p>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card-body">
                                <img src={pizza.image} alt="Bootstrap" width="150" height="150" />
                                <Link to="/cart">
                                    <button className="btn btn-warning" onClick={()=>addCart(pizza.id)}>Add to Cart</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

                ))
            }             
                
{/* card-end */}



            </div>
            
        </div>
    );
}
export default Order;