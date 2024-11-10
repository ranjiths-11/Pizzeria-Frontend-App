import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart(){
    const [data, setData] = useState([]);
    const [bdata, setBData] = useState([]);
    const [cost, setCost] = useState(0);
    const [icost, setICost] = useState(0);


    useEffect(()=>{
        const fetchCart = ()=>{
            const token = localStorage.getItem('token');
            axios.get(`${process.env.REACT_APP_API_URL}/cart`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setData(res.data[0]);
                setBData(res.data[1]);
            })
            .catch(err=>console.log(err));
        }
        fetchCart();
    },[]);

    useEffect(() => {
        let cost = 0;
        let icost = 0;
        for (const t of data) {
            cost += t.count * t.price;
        }
        for (const t of bdata) {
            icost += t.price;
        }
        setICost(icost);
        setCost(cost);
    },[data,bdata]);    

    return (
        <div>
            <p><br/></p>
            <h1 style={{color:"SlateBlue", textAlign:"center"}}><b>ORDER SUMMARY</b></h1>

            <div className="row">
            <div className="col-sm-3">
            </div>

            <div className="col-sm-6">
            <table className="table ">
                    <tbody>
                    {
                        data.map((bd,index)=>(
                            <tr key={index}>
                                <td> {bd.name} </td>
                                <td>$ {bd.count * bd.price}</td>
                            </tr>
                        ))
                    }
                    {
                        bdata.map((bd,index)=>(
                            <tr key={index}>
                                <td> <b>{bd.name}</b> with {bd.ingredients?.map((ing, ind) => (
                                        <span key={ind}>
                                            {ing}
                                            {ind < bd.ingredients.length - 1 && ', '}
                                        </span>
                                    ))}</td>
                                <td>$ {bd.count * bd.price}</td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table>
            </div>

            <div className="col-sm-3">
            </div>
            </div>
            <p><br/></p>

            <div className="row">
            <div className="col-sm-5">
            </div>

            <div className="col-sm-3">
            <table className="table">
                    <tbody>
                    <tr>
                        <th style={{color:"black"}}><h3><b>Total Cost : </b></h3></th>
                        <th style={{color:"SlateBlue"}}><h3><b>$ {cost+icost}</b></h3></th>
                    </tr>
                    </tbody>
            </table>
            </div>

            <div className="col-sm-4">
            </div>
            </div>
            <p><br/></p>

            <footer>
            <p className="text-secondary" style={{textAlign:"center"}}><b>Thanks</b> for building and ordering Pizza with <b>PIZZERIA</b> !!!</p>
            </footer>
            
            
        </div>
    );
}
export default Cart;

