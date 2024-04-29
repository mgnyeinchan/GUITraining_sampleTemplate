import React, { useEffect, useState } from "react";
import CommonCss from '../../css/common.module.css';
import Navigation from "../Navigation/Navigation";
import BackgroundImg from "../../Images/backgroundImg.png";
import ShowRoom from "../../Images/showroom.jpg";
import ShowRoom1 from "../../Images/showroom1.jpg";
import ShowRoom2 from "../../Images/showroom2.jpg";
import ShowRoom3 from "../../Images/showroom3.jpg";
import { Container, Row, Col } from 'react-grid-system';
import Cookie   from "js-cookie";
import axios from "axios";

const Home = () => {

    const [Shops,setShops] = useState([]);
    const [ShopName,setShopName] = useState("");
    const shopNameHandleChange = (event)=> {
        setShopName(event.target.value);
    }
    const [ShopAddress,setShopAddress] = useState("");
    const ShopAddressHandleChange = (event)=> {
        setShopAddress(event.target.value);
    }
    const [ShopPhone,setShopPhone] = useState("");
    const ShopPhoneHandleChange = (event)=> {
        setShopPhone(event.target.value);
    }
    const [ShopBio,setShopBio] = useState("");
    const ShopBioHandleChange = (event)=> {
        setShopBio(event.target.value);
    }
    const [ShopImage,setShopImage] = useState("");
    const ShopImageHandleChange = (event)=> {
        setShopImage(event.target.value);
    }
    
    const CreateShop = () => {
        
        axios.post("http://localhost:8000/insert", {
            name : ShopName,
            address : ShopAddress,
            phone : ShopPhone,
            bio : ShopBio,
            image : ShopImage,
            }).then((response) => {
            alert("New Shop is inserted")
            console.log("Post successful!")
            axios.get("http://localhost:8000/getAllShops").then(response => {
                setShops(response.data)
            });
            }).catch(() => {
            alert("not")
            console.log("Oops, request failed!")
        })
        // window.location.reload();
    }
    const BuyNow = () => {
        
    }
    const EDITFunction = (event,shopID)=> {
        axios.post("http://localhost:8000/EDITFunction", {
            id : shopID,
            name : ShopName,
            address : ShopAddress,
            phone : ShopPhone,
            bio : ShopBio,
            image : ShopImage,
            }).then((response) => {
            alert("New Shop is EDITED!!!")
            console.log("Post successful!")
            axios.get("http://localhost:8000/getAllShops").then(response => {
                setShops(response.data)
            });
            }).catch(() => {
            alert("not")
            console.log("Oops, request failed!")
        })
    }
    const DELETEFunction = (event,shopID)=> {
        // axios.delete(`http://localhost:8000/DELETEFunction/${shopID}`).then((response) => {
        //     alert("New Shop is DELETEED!!!")
        //     }).catch(() => {
        //     alert("not")
        //     console.log("Oops, request failed!")
        // })
        try{
            axios.delete('http://localhost:8000/DELETEFunction/', {
            data: {
                id: shopID
                }
            });
            alert("Successfully deleted!")
            axios.get("http://localhost:8000/getAllShops").then(response => {
                setShops(response.data)
            });
        }catch(e){
            alert(JSON.stringify(e));
        }
        
    }
// browser refresh
useEffect(()=>{
    axios.get("http://localhost:8000/getAllShops").then(response => {
        setShops(response.data)
    });
},[]);
    return (
        <div>
            <Navigation/>

            <div style={{backgroundColor: "white",
            height: window.innerHeight+"px"}}>
                <div className={CommonCss.MainText}>
                    <p className={CommonCss.title}>Our Apple Products Avaiable Today</p>
                    <p className={CommonCss.bodyText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3><a onClick={BuyNow}>Buy now</a></h3>
                    <br/>
                    <br/>
                    <img src={BackgroundImg} style={{width: "400px"}}/>
                </div>
            </div>

            <div style={{backgroundColor: "#f2f2f2",height: "600px"}}>
                <img src={ShowRoom} style={{width: "50%",float: "left"
                ,height: "600px"}}/>
                <div style={{padding: "3%",float: "right",
                width: "50%",boxSizing: "border-box"}}> 
                    <h3>Our Services</h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercit
ation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                </div>
            </div>
            <div style={{backgroundColor: "white",
            }}>
                <br/>
                <Container>
                    <Row>
                    {Shops.map((data,index)=>(
                        <Col sm={4} style={{padding: "10px",position: "relative"}}>
                            {Cookie.get('auth_role') == 'admin'?(
                                <div>
                                    <p className={CommonCss.GalleryEdit} onClick={(e)=>EDITFunction(e,data.id)}>EDIT</p>
                                    <p className={CommonCss.GalleryDelete} onClick={(e)=>DELETEFunction(e,data.id)}>DELETE</p>
                                </div>
                            ):(
                                <span></span>
                            )}
                            <div className={CommonCss.GalleryContainer}>
                                <img src={`./images/${data.image}`} 
                                className={CommonCss.GalleryImgs}/>    
                            </div>
                            <div className={CommonCss.GalleryDesc}>
                            <p><b>{data.name}</b></p>
                            <p><i>{data.address}</i></p>
                            <p>Phone : {data.phone}</p>
                            </div>
                            <button className={CommonCss.GalleryBtn}>
                                Shop Now
                            </button>
                        </Col>
                    ))}
                    </Row>
                </Container>
                <div style={{width: "80%",display: "block",
                margin: "auto",paddingTop: "10px"}}>
                <p>
                <h3>Lorem ipsum dolor sit amet</h3>, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                <h3>Lorem ipsum dolor sit amet</h3> consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        .
                </p>
                </div>
                {Cookie.get('auth_role') == 'admin'?(
                    <div className={CommonCss.GalleryFormContainer}>
                            <h3>Create New Shop</h3>
                            <p><input type="text" placeholder="name" onChange={shopNameHandleChange}></input></p>
                            <p><input type="text" placeholder="address" onChange={ShopAddressHandleChange}></input></p>
                            <p><input type="text" placeholder="phone" onChange={ShopPhoneHandleChange}></input></p>
                            <p><input type="text" placeholder="bio" onChange={ShopBioHandleChange}></input></p>
                            <p><input type="text" placeholder="image" onChange={ShopImageHandleChange}></input></p>
                            <p><button onClick={CreateShop}>Create</button></p>
                    </div>
                ):(
                    <span></span>
                )}
                
            </div>
            <div style={{backgroundColor: "rgb(53, 52, 52)",
            height: window.innerHeight+"px",color: "#A2AAAD",
            paddingTop: "20px"}}>
                <Container>
                    <Row>
                    <Col sm={3}>
                        <h3>Shop and Learn</h3>
                        <p>Store</p>
                        <p>Mac</p>
                        <p>iPad</p>
                        <p>iPhone</p>
                        <p>Watch</p>
                        <p>Vision</p>
                        <p>AirPods</p>
                        <p>TV & Home</p>
                        <p>AirTag</p>
                        <p>Accessories</p>
                        <p>Gift Cards</p>
                        <p>Apple Wallet</p>
                        <p>Wallet</p>
                    </Col>
                    <Col sm={3}>
                        <h3>Account</h3>
                        <p>Manage Your Apple ID</p>
                        <p>Apple Store Account</p>
                        <p>iCloud.com</p>
                        <h3>Entertainment</h3>
                        <p>Apple One</p>
                        <p>Apple TV+</p>
                        <p>Apple Music</p>
                        <p>Apple Arcade</p>
                        <p>Apple Fitness+</p>
                        <p>Apple News+</p>
                        <p>Apple Podcasts</p>
                        <p>Apple Books</p>
                        <p>App Store</p>
                    </Col>
                    <Col sm={3}>
                        <h3>Apple Store</h3>
                        <p>Find a Store</p>
                        <p>Genius Bar</p>
                        <p>Today at Apple</p>
                        <p>Apple Camp</p>
                        <p>Apple Store App</p>
                        <p>Certified Refurbished</p>
                        <p>Apple Trade In</p>
                        <p>Financing</p>
                        <p>Carrier Deals at Apple</p>
                        <p>Order Status</p>
                        <p>Shopping Help</p>
                    </Col>
                    <Col sm={3}>
                    <h3>For Business</h3>
                    <p>Apple and Business</p>
                    <p>Shop for Business</p>
                    <h3>For Education</h3>
                    <p>Apple and Education</p>
                    <p>Shop for K-12</p>
                    <p>Shop for College</p>
                    <h3>For Healthcare</h3>
                    <p>Apple in Healthcare</p>
                    <p>Health on Apple Watch</p>
                    <p>Health Records on iPhone</p>
                    <h3>For Government</h3>
                    <p>Shop for Government</p>
                    </Col>
                    </Row>
                </Container>
                <p style={{textAlign: "center"}}><i>Copyright © 2023 Apple Inc. All rights reserved.</i></p>
            </div>
        </div>
    )
}
export default Home;