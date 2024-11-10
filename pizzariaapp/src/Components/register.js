import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";

function Register(){
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [phone, setPhone] = useState();
    let [user, setUser] = useState();
    let [pass, setPass] = useState();
    let [address, setAddress] = useState();
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        var data = {
            name: name,
            email: email,
            phone: phone,
            username: user,
            password: pass,
            address: address
        };
        axios.post(`${process.env.REACT_APP_API_URL}/register`,data)
        .then(res=>{
            localStorage.setItem('token',res.data.token);
            navigate('/login');
        })
        .catch(err=>console.log(err));
    }
    return(
        <div>
            <p><br/></p>
            <h1 style={{color:"SlateBlue", textAlign:"center"}}>REGISTERATION</h1>
            <p></p>
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
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>USERNAME</label>
                </div>
                <div className="col-sm-3">
                    <input type="text" className="form-control" placeholder="eg. john123" value={user} onChange={(e)=>setUser(e.target.value)}/>
                </div>   
            </div>

            <p></p>

            <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-2">
                    <label style={{color:"blue", textAlign:"center", fontWeight:"bold", fontSize:"23px"}}>PASSWORD</label>
                </div>
                <div className="col-sm-3">
                    <input type="password" className="form-control" placeholder="eg. Fg5kI98@23g6" value={pass} onChange={(e)=>setPass(e.target.value)}/>
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
                <button className="btn btn-success" type="submit" onClick={(e)=>handleSubmit(e)}>Sign up</button>
            </div>

            
            </form>
            <p style={{textAlign:"center"}}>Already have an Account? <Link to="/login">Login</Link></p>
            
        </div>
    )    
}
export default Register;