/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


import './Login.css';

const Login = (props) => {

    const{
        email,
        password,
        setEmail,
        setPassword,
        handlelogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;



    return(
        <div>
            <section className="login">
                <div className="loginContainer">
                    <>
                        {hasAccount?(
                            <>
                                <div class="container-fluid">
                                    <div class="row mh-100vh">
                                        <div class="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
                                            id="login-block">
                                            <div class="m-auto w-lg-75 w-xl-50">
                                                <h2 class="text-color font-weight-light mb-5"><i class="fab fa-microsoft"></i>&nbsp;Create Teams Account</h2>
                                                <form>
                                                    <div class="form-group"><label class="text-secondary">Name</label><input class="form-control"
                                                            type="text" required="" inputmode="text"/>
                                                    </div>
                                                    <div class="form-group"><label class="text-secondary">Email</label><input class="form-control"
                                                            type="text" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                                                            inputmode="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                                            <p className="errorMsg">{emailError}</p>
                                                    </div>
                                                    <div class="form-group"><label class="text-secondary">Password</label><input
                                                            class="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                                            <p className="errorMsg">{passwordError}</p>
                                                    </div>
                                                    <button class="button-color btn btn-info mt-2" onClick={handleSignup} type="submit">Sign Up</button>
                                                </form>
                                                <p class="mt-3 mb-0"><a class="text-color small" href="#">Have an Account ?<span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></a></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 d-flex align-items-end" id="bg-block">
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <div class="container-fluid">
                                    <div class="row mh-100vh">
                                        <div class="col-10 col-sm-8 col-md-6 col-lg-6 
                                                    offset-1 offset-sm-2 offset-md-3 offset-lg-0 
                                                    align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white 
                                                    p-5 rounded rounded-lg-0 my-5 my-lg-0"
                                            id="login-block">
                                            <div class="m-auto w-lg-75 w-xl-50">
                                                <h2 class="text-color font-weight-light mb-5"><i class="fab fa-microsoft"></i>&nbsp;Team Login</h2>
                                                <form>
                                                    <div class="form-group"><label class="text-secondary">Email</label><input class="form-control"
                                                            type="text" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                                                            inputmode="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                                            <p className="errorMsg">{emailError}</p>
                                                    </div>
                                                    <div class="form-group"><label class="text-secondary">Password</label><input
                                                            class="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                                            <p className="errorMsg">{passwordError}</p>
                                                    </div>
                                                    <button class="button-color btn btn-info mt-2" onClick={handlelogin} type="submit">Sign In</button>
                                                </form>
                                                <p class="mt-3 mb-0"><a class="text-color small" href="#">Don't have an Account ?
                                                <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span></a></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 d-flex align-items-end" id="bg-block">
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </section>
        </div>
    )
}

export default Login;
