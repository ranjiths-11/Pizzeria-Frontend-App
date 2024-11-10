import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile(){
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [phone, setPhone] = useState();
    let [user, setUser] = useState();
    let [address, setAddress] = useState();

    useEffect(()=>{
        const fetchCart = ()=>{
            const token = localStorage.getItem('token');
            axios.get(`${process.env.REACT_APP_API_URL}/user`,{
                headers:{Authorization:token}
            })
            .then(res=>{
                setName(res.data[0].name);
                setEmail(res.data[0].email);
                setPhone(res.data[0].phone);
                setUser(res.data[0].username);
                setAddress(res.data[0].address);
            })
            .catch(err=>console.log(err));
        }
        fetchCart();
    },[]);

    function handleSubmit(e){
        e.preventDefault();
        var data = {
            name: name,
            email: email,
            phone: phone,
            username: user,
            address: address
        };
        axios.post(`${process.env.REACT_APP_API_URL}/profile/update`,data)
        .then(res=>{
            alert("Profile Updated Successfully");
        })
        .catch(err=>console.log(err));
    }
    return(
        <div>
            <p><br/><br/><br/></p>
            <h1 style={{color:"SlateBlue", textAlign:"center"}}><b>Profile Page</b></h1>
            <p><br/></p>
            <form>

            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>NAME</label>
                </div>
                <div className="col-sm-3">
                    <input type="text" className="form-control" placeholder="eg. John"  value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>   
            </div>

            <p></p>

            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>EMAIL</label>
                </div>
                <div className="col-sm-3">
                    <input type="mail" className="form-control" placeholder="eg. abc@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>   
            </div>

            <p></p>

            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>Phone (+91)</label>
                </div>
                <div className="col-sm-3">
                    <input type="tel" placeholder="eg. 0123456789" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>   
            </div>

            <p></p>

            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>ADDRESS</label>
                </div>
                <div className="col-sm-3">
                    <textarea className="form-control" value={address} rows="2" placeholder="eg. 123, Gandhi Nagar, New Delhi, India" onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>   
            </div>

            <p><br/></p>

            <div className="d-flex justify-content-center">
                <button className="btn btn-success" type="submit" onClick={(e)=>handleSubmit(e)}>Update</button>
            </div>

            
            </form>
        </div>
    )    
}
export default Profile;