import React,{ Component } from "react";
import { render } from "react-dom";  
import LoginFormContainer from './containers/LoginFormContainer';
import { Router, Route, IndexRoute, browserHistory} from "react-router";

class RootComponent extends Component {
    render(){
        return(
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <LoginFormContainer />
                    
                        <div className="text-center">
                            <a className="d-block small mt-3" href="register.html">Register an Account</a>
                            <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<RootComponent/>,window.document.getElementById("RootApp"));
