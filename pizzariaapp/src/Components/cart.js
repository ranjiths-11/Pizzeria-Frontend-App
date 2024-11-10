import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Final(){
    const [data, setData] = useState([]);
    const [bdata, setBData] = useState([]);
    const [cost, setCost] = useState(0);
    const [address, setAddress] = useState();
    const [pay, setPay] = useState();


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

            axios.get(`${process.env.REACT_APP_API_URL}/user`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setAddress(res.data[0].address);
            })
            .catch(err=>console.log(err));
        }
        fetchCart();
    },[]);

    useEffect(() => {
        let cost = 0;
        for (const t of data) {
            cost += t.count * t.price;
        }
        for (const t of bdata) {
            cost += t.count * t.price;
        }
        setCost(cost);
    }, [data,bdata]);


    function updateCart(data,count){
        const token = localStorage.getItem('token');
        if(count<1){
            deleteCart(data);
        }
        else{
            fetch(`${process.env.REACT_APP_API_URL}/cart/update/${data}/${count}`);

            axios.get(`${process.env.REACT_APP_API_URL}/cart`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setData(res.data[0]);
            })
            .catch(err=>console.log(err));
        }
        
    }

    function updateBCart(data,count){
        const token = localStorage.getItem('token');
        if(count<1){
            deleteBCart(data);
        }
        else{
            fetch(`${process.env.REACT_APP_API_URL}/build/update/${data}/${count}`);

            axios.get(`${process.env.REACT_APP_API_URL}/cart`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setBData(res.data[1]);
            })
            .catch(err=>console.log(err));
        }
        
    }

    function deleteCart(data){
        const token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_URL}/cart/delete/${data}`);

        axios.get(`${process.env.REACT_APP_API_URL}/cart`,{
            headers:{Authorization:token}
        })
        .then(res=>{
            setData(res.data[0]);
        })
        .catch(err=>console.log(err));
    }

    function deleteBCart(data){
        const token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_URL}/build/delete/${data}`);

        axios.get(`${process.env.REACT_APP_API_URL}/cart`,{
            headers:{Authorization:token}
        })
        .then(res=>{
            setBData(res.data[1]);
        })
        .catch(err=>console.log(err));
    }

    function handlePay(e,str){
        if(e.target.checked == true){
            setPay(str);
        }
    }


    return (
        <div>
            <h1 style={{color:"SlateBlue", textAlign:"center"}}><b>CART</b></h1>


            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">


            <table className="table table-bordered table-success table-hover table-striped">
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>REMOVE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((cart,index)=>(
                            <tr>
                                <td>
                                    <img src={cart.image} alt="Bootstrap" width="50" height="50" />
                                    {cart.name}
                                </td>
                                <td>
                                    <button className="btn" onClick={()=>updateCart(cart.id,cart.count-1)} style={{width:"30px", height:"35px", backgroundColor:"Tomato", borderColor:"Tomato"}}><b>-</b></button>
                                    &nbsp; {cart.count} &nbsp;
                                    <button className="btn" onClick={()=>updateCart(cart.id,cart.count+1)} style={{width:"30px", height:"35px", backgroundColor:"MediumSeaGreen", borderColor:"MediumSeaGreen"}}><b>+</b></button>
                                </td>
                                <td>₹ {cart.price * cart.count}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>deleteCart(cart.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

{
                        bdata.map((cart,index)=>(
                            <tr>
                                <td>
                                    <img src={cart.image} alt="Bootstrap" width="50" height="50" />
                                    <b>{cart.name}</b> with {cart.ingredients?.map((ing, ind) => (
                                        <span key={ind}>
                                            {ing}
                                            {ind < cart.ingredients.length - 1 && ', '}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <button className="btn" onClick={()=>updateBCart(cart._id,cart.count-1)} style={{width:"30px", height:"35px", backgroundColor:"Tomato", borderColor:"Tomato"}}><b>-</b></button>
                                    &nbsp;{cart.count} &nbsp;
                                    <button className="btn" onClick={()=>updateBCart(cart._id,cart.count+1)} style={{width:"30px", height:"35px", backgroundColor:"MediumSeaGreen", borderColor:"MediumSeaGreen"}}><b>+</b></button>
                                </td>
                                <td>₹ {cart.price * cart.count}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>deleteBCart(cart._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><h5>Total Price : ₹ {cost}</h5></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

            </div></div>
            <p></p>
            

            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                    <h3 style={{color:"SlateBlue", textAlign:"center"}} ><b>Delivery Location</b></h3>
                    <textarea value={address} className="form-control" onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                    <h3 style={{color:"SlateBlue"}} ><b>Payment Method</b></h3>
                    <sup className="text-muted" style={{textAlign:"center"}}>*due to server issue in online payment, only COD is available !!!</sup>
                    <br/>
                    <input
                        disabled
                        type="radio"
                        id="1"
                        name="options"
                        value="Debit/Credit Card"
                        onChange={(e)=>handlePay(e,"Debit/Credit Card")}
                    /><label className="text-muted">&nbsp;&nbsp;Debit/Credit Card</label><br/>
                    <input
                        type="radio"
                        id="2"
                        name="options"
                        value="Cash on Delivery"
                        onChange={(e)=>handlePay(e,"Cash on Delivery")}
                    /><label>&nbsp;&nbsp;Cash on Delivery</label><br/>
                    <input
                        disabled
                        type="radio"
                        id="3"
                        name="options"
                        value="Net Banking"
                        onChange={(e)=>handlePay(e,"Net Banking")}
                    /><label className="text-muted">&nbsp;&nbsp;Net Banking</label>
                </div>
            </div>

            <p><br/></p>

            <div className="d-flex justify-content-center">
            <Link to="/summary">
            <button className="btn btn-primary">PROCEED TO ORDER</button>
            </Link>
            </div>

            <p><br/><br/></p>
            
        </div>
    );
}
export default Final;

