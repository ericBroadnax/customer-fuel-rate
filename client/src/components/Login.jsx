import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import NavbarLogin from './NavbarLogin';
import Footer from './Footer';


export default function Login() {

    /*const [user, setUser] = useState({
        user : '',
        password :''
    });

    const handleChange = (event) =>{
        let name = event.target.name
        let value = event.target.value

        setUser({...user, [name]:value})

    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {username, password} = user;

        try{
            const res = await fetch('/login', {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    username, password 
                }) 
        });

        if(res.status === 400 || !res){
            window.alert("Invalid credentials");
        }else{
            window.alert("Login success!");
            window.location.reload();
        }
        }catch(error){
            console.log(error);
        }
    }*/
    return (
        <div className="login-background">
            <NavbarLogin/>

            <section id="login">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mt-2">
                            <div className="card p-lg-5 card-background">
                                <div className="card-body text-white">
                                    <h2>Login</h2>

                                    <form action="/home">
                                        <div className="login-input-box">
                                            <i className="fa fa-envelope"></i>
                                            <input type="text" id="userLogin" placeholder=" " minlength="2" required name = "username"/>
                                            <label>Username</label>
                                        </div>

                                        <div className="login-input-box">
                                            <i className="fa fa-lock"></i>
                                            <input type="password" id="passLogin" placeholder=" " required name = "password" />
                                            <label>Password</label>
                                        </div>

                                        <div className="rememberMe-forgotPass">
                                            <label><input type="checkbox"/> Remember me</label>
                                            
                                            <NavLink to="/login" className="forgotPass">Forgot Password?</NavLink>
                                        </div>

                                        <button type="submit" className="btnSubmitLogin">Login</button>
                                        
                                        <div className="loginToRegister">
                                            <p>Don't have an account? <NavLink to="/register">Register</NavLink></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
