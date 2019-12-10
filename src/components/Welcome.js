import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './../assets/logo.svg';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebaseui from 'firebaseui';
import Footer from './Footer';
import 'firebase/auth';
import AnimatedBackground from './AnimatedBackground';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const uiConfig = {
    signInFlow: 'popup',
    // signInSuccessUrl:'/dashboard',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account'
            },
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
};

class Welcome extends Component {
    componentDidMount() {
        const { getAuthentication } = this.props;
        firebase.auth().onAuthStateChanged(user => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function () {
                    if (user) {
                        getAuthentication(user);
                    }
                    return true;
                })
        })
    }
    render() {

        const {loggedIn} = this.props;

        if (loggedIn) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
                <div className='welcomeSplash'>
                    <div className='wrapper'>
                        <img className='logo bounce-in-fwd' src={logo}></img>
                        <div className='userLoginHome'>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            {/* <Link className='guestLoginButton' to='guest/dashboard'><FontAwesomeIcon className="userIcon" icon={faUser} /> Continue as guest</Link> */}
                        </div>
                    </div>
                </div>
                <Footer />
                <AnimatedBackground />
            </div>
        );
    }
}

export default Welcome;