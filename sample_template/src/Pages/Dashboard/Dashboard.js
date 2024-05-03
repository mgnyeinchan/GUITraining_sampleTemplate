import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { Container, Row, Col } from 'react-grid-system';
import CommonCss from '../../css/common.module.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import axios from "axios";
import Cookie   from "js-cookie";
import Authenticate from '../../Pages/Authentication/Authenticate';

const Dashboard = () =>{
    const [UserTotalCount,setUserTotalCount] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:8000/getTotalUserCount").then(response => {
            setUserTotalCount(response.data[0].count)
        });
    },[]);
    return (
        <div>
            <Navigation/>
            <div style={{paddingTop: "60px"}}>
            <Container>
                <Row>
                    <Col sm={3} >
                        <div className={CommonCss.DashbardCards}>
                        <Container>
                            <Row>
                                <Col sm={4} >
                                    <PeopleAltIcon className={CommonCss.DashbardCardsIcons} fontSize="large"/>
                                </Col>
                                <Col sm={8} >
                                    <p className={CommonCss.DashbardCardsTitle}>
                                        Total <br/> User
                                    </p>
                                    <div className={CommonCss.DashbardCardsBody}>
                                        {UserTotalCount}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        </div>                       
                    </Col>
                    <Col sm={3} >
                        <div className={CommonCss.DashbardCards}>
                            <Container>
                            <Row>
                                <Col sm={4} >
                                    <StoreIcon className={CommonCss.DashbardCardsIcons} fontSize="large"/>
                                </Col>
                                <Col sm={8} >
                                    <p className={CommonCss.DashbardCardsTitle}>
                                        Total <br/> Shop
                                    </p>
                                    <div className={CommonCss.DashbardCardsBody}>
                                        65
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        </div>                       
                    </Col>
                    <Col sm={3} >
                        <div className={CommonCss.DashbardCards}>
                            <Container>
                            <Row>
                                <Col sm={4} >
                                    <AccountBoxIcon className={CommonCss.DashbardCardsIcons} fontSize="large"/>
                                </Col>
                                <Col sm={8} >
                                    <p className={CommonCss.DashbardCardsTitle}>
                                        Total <br/> Staff
                                    </p>
                                    <div className={CommonCss.DashbardCardsBody}>
                                        65
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        </div>                       
                    </Col>
                    <Col sm={3} >
                        <div className={CommonCss.DashbardCards}>
                            <Container>
                            <Row>
                                <Col sm={4} >
                                    <AccessibilityNewIcon className={CommonCss.DashbardCardsIcons} fontSize="large"/>
                                </Col>
                                <Col sm={8} >
                                    <p className={CommonCss.DashbardCardsTitle}>
                                        Total Customer
                                    </p>
                                    <div className={CommonCss.DashbardCardsBody}>
                                        65
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        </div>                       
                    </Col>
                </Row>
            </Container>
            </div>
            {Authenticate.isAuthenticated()}
        </div>
    )
}
export default Dashboard;