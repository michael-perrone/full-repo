import React from 'react';
import styles from './NeedToLoginPage.module.css'
import {withRouter} from 'react-router-dom'
import LoginForm from '../LoginScreen/LoginForm/LoginForm'
import UserRegisterForm from '../LoginScreen/LoginScreenRightSide/UserRegisterForm/UserRegisterForm';
import tennisNetCropped from './TennisnetCropped.jpg'
import tennisBall from './tennis-ball.png';

class NeedToLoginPage extends React.Component {
    render() {
        return (
        <div style={{display: "flex", height: '100vh', width: "100vw", backgroundColor: "black"}}>
         <div id={styles.loginFormLeftSide}>
             <div style={{paddingLeft: '100px', paddingRight: "100px"}}>
             <p style={{padding: "20px", fontSize: "14px", boxShadow: "0px 0px 6px black"}}>Hi there! We at Tennis Mate would love to show you the clubs that have signed up with us, but we need you to sign in first. We require this out of respect to each club's privacy. You can sign up to the right or login! We hope you understand. Thanks!</p>
             </div>
             <div style={{position: "relative", top: '50px'}}>
                 <img id={styles.tennisBall} src={tennisBall}></img>
                <img src={tennisNetCropped} alt="net"/>
                </div>
             </div>
             <div id={styles.registerFormRightSide}>
             <LoginForm
             alignSelf={'flex-end'}
            paddingBottom={"30px"}
            borderBottom={"2px solid white"}
            background={"black"}
             />
            <UserRegisterForm/>
            </div>
        </div>
        )
    }
}

export default withRouter(NeedToLoginPage);