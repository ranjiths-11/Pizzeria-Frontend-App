import React, { useEffect, useState } from "react";
import logo from "../assets/images/PizzeriaLogo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar(){
    let [data, setData] = useState("");
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    var code;
    if(token){
       code =  <div className="dropdown">
        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
          {data}
        </button>
        <ul class="dropdown-menu" >
            <li><button className="dropdown-item btn-success" onClick={()=>navigate("/profile")}>Profile</button></li>
            <li><button style={{backgroundColor:"red"}} className="dropdown-item" onClick={()=>handleLog()}>Log Out</button></li>
        </ul>
      </div>;
    }
    else{
        code = <Link className="btn btn-primary" to="/login">LOGIN</Link>;
    }

    function handleLog(){
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(()=>{
        const fetchCart = ()=>{
            const token = localStorage.getItem('token');
            axios.get(`${process.env.REACT_APP_API_URL}/user`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setData(res.data[0].name);
            })
            .catch(err=>console.log(err));
        }
        fetchCart();
    },[]);

    return (
        <div>
            <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
                <div className="container">

                    <Link className="navbar-brand" to="/">
                        
                        <img src={logo} alt="Bootstrap" width="30" height="30" /><b>Pizzeria</b>
                        </Link>
                    <Link className="navbar-brand" to="/order">Order Pizza</Link>
                    <Link className="navbar-brand" to="/build">Build Your Pizza</Link>

                    <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
                    <Link className="btn btn-warning" to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    Shopping Cart
                    </Link>

                    {code}

                </div>
            </nav>
        </div>
    );
}
export default Navbar;