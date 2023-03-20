import React, { useSate } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarLogin from './NavbarLogin';
import Footer from './Footer';
import { useNavigate }  from 'react-router-dom';

export default function Register () {
    const history = useNavigate();
    const [user, setUser] = useState({
        username : "",
        email : "",
        password : ""
    });

    //handle input
    const handleInput = (event) =>{
        let name = event.target.name;
        let value = event.target.value;
        setUser({...user, [name]:value});
    }
    //handle submit
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const {username, email,password} = user;
        try{
            const res = await fetch('/register', {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    username, email, password 
                }) 
        });

        if(res.status === 400 || !res){
            window.alert("Already used deatils");
        }else{
            window.alert("Registered successfully!");
            useNavigate.pushState('/login');
        }
        }catch(error){
            console.log(error);
        }
    }
    

    return (
        <div className="register-background">
            <NavbarLogin/>

            <section id="register">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mt-2">
                            <div className="card p-lg-5 card-background">
                                <div className="card-body text-white">
                                    <h2>Registration</h2>

                                    <form action="/register-complete" onSubmit={handleSubmit} method="POST">
                                        <div className="register-input-box">
                                            <i className="fa fa-envelope"></i>
                                            <input type="text" id="userLogin" placeholder=" " minlength="2" required name = "username" value = {user.username} onChange = {handleInput}/>
                                            <label>Username</label>
                                        </div>

                                        <div className="register-input-box">
                                            <i className="fa fa-envelope"></i>
                                            <input type="text" id="userLogin" placeholder=" " minlength="2" required name = "email" value = {user.email} onChange = {handleInput}/>
                                            <label>Email</label>
                                        </div>

                                        <div className="register-input-box">
                                            <i className="fa fa-lock"></i>
                                            <input type="password" id="passLogin" placeholder=" " minlength="2" required name = "password" value = {user.password} onChange = {handleInput}/>
                                            <label>Password</label>
                                        </div>

                                        <div className="agreeTermsCond">
                                            <label><input type="checkbox" required/> I agree to the Terms & Conditions</label>
                                        </div>

                                        <button type="submit" className="btnSubmitRegister">Register</button>
                                        
                                        <div className="registerToLogin">
                                            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
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
