import React from "react";
import CommonCss from '../../css/common.module.css';
import Cookie   from "js-cookie";

const Navigation = () => {
    const Logout = ()=>{
        Cookie.remove("auth_username");
        Cookie.remove("auth_email");
        Cookie.remove("auth_role");
        window.location.reload();
    }
    return (
        <ul className={CommonCss.NavigationContainer}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            {Cookie.get("auth_username")?(
                <li style={{float: "right"}}>
                <span style={{color: "#A2AAAD"}}>
                {Cookie.get("auth_username")} | 
                </span>
                <a onClick={Logout} 
                style={{cursor: "pointer"}}>Logout</a></li>
            ):(
                <li style={{float: "right"}}>
                    <a href="/login">Login</a></li>
            )}
            
        </ul>
    )
}
export default Navigation;