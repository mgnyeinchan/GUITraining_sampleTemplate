import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import CommonCss from "../../css/common.module.css";
import Cookie   from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [username,setusername] = useState("");
    const usernameHandleChange = (event)=>{
        setusername(event.target.value);
    }
    const [password,setpassword] = useState("");
    const passwordHandleChange = (event)=>{
        setpassword(event.target.value);
    }
    const [Error,setError] = useState("");
    const Login = () => {
        axios.post("http://localhost:8000/login", {
            username : username,
            password : password,
            }).then((response) => {
                if(response.data.status == 200){
                    Cookie.set("auth_username",response.data.data[0].username);
                    Cookie.set("auth_email",response.data.data[0].email);
                    Cookie.set("auth_role",response.data.data[0].role);
                    navigate("/");
                }else{
                    // login fail
                    setError(response.data);
                }
                // if(response.data.status == 200){
                //     Cookie.set("auth_username",response.data[0].username);
                //     Cookie.set("auth_email",response.data[0].email);
                //     Cookie.set("auth_role",response.data[0].role);
                //     navigate("/");
                //     setError("");
                // }else{
                //     alert(response.data)
                // }
            }).catch(() => {
            alert("Login Request faild");
            console.log("Oops, request failed!")
        });

        // var tbl_user = [{"username":"mgmg","password":"123456","email":"mgmg@gmail.com","phone": 93332,"role":"admin"},
        // {"username":"kyaw","password":"654321","email":"kyaw@gmail.com","phone": 93332,"role":"user"}];
        
        
        // for(var i=0;i<tbl_user.length;i++){
        //     if(username == tbl_user[i].username){
        //         if(password == tbl_user[i].password){
        //             Cookie.set("auth_username",username);
        //             Cookie.set("auth_email",tbl_user[i].email);
        //             Cookie.set("auth_role",tbl_user[i].role);
        //             navigate("/");
        //             setError("");
        //             break;
        //         }else{
        //             setError("Password does not match!");break;
        //         }
        //     }else{
        //         setError("User not found!");
        //     }
        // }
    }
    return (
        <div>
            <Navigation/>
            <div className={CommonCss.LoginContainer}>
                <h3>Login</h3>
                <p style={{color: "red"}}>{Error}</p>
                <p><input type="text" onChange={(e)=>usernameHandleChange(e)}></input></p>
                <p><input type="password" onChange={(e)=>passwordHandleChange(e)}></input></p>
                <p><button onClick={Login}>Login</button></p>
                
            </div>
        </div>
    )
}
export default Login;