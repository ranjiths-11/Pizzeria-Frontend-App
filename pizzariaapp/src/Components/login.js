import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";

function Login(){
    let [user, setUser] = useState();
    let [pass, setPass] = useState();
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        var data = {
            username:user,
            password:pass
        };
        axios.post(`${process.env.REACT_APP_API_URL}/login`,data)
        .then(res=>{
            localStorage.setItem('token',res.data.token);
            navigate('/');
        })
        .catch(err=>console.log(err));
    }
    return(
        <div>
            <p><br/><br/><br/><br/></p>
            <h1 style={{color:"SlateBlue", textAlign:"center"}}>LOGIN</h1>
            <p><br/></p>
            <form>
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
                    <input type="password" className="form-control" placeholder="eg. Fg76@fg$5" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                </div>
            </div>

            <p><br/></p>

            <div className="d-flex justify-content-center">
                <button className="btn btn-success" type="submit" onClick={(e)=>handleSubmit(e)}>Login</button>
            </div>

            
            </form>
            <p style={{textAlign:"center"}}>Create a new Account? <Link to="/register">REGISTER</Link></p>
        </div>
    )    
}
export default Login;