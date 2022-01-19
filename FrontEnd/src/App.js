import React from 'react';
import { Route, Link, Router, Switch } from 'react-router-dom';
import SignupBox from './component/signupComponent/SignupBox';
import Login from './component/loginComponent/Login';
import BeforeLogin from './component/commonComponent/BeforeLogin';

const App = () => {
    return (
        <>
            <Route path="/" exact={true } >
                <BeforeLogin /> 
            </Route>
            <Route path="/signup" >
                <SignupBox />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </>
    )
}
export default App;