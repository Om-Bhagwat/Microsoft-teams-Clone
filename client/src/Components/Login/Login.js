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
            {hasAccount?(
                <>
                    <div className="container-fluid">
                        <div className="row mh-100vh">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-6 
                                    offset-1 offset-sm-2 offset-md-3 offset-lg-0 
                                    align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch 
                                    bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
                                id="login-block">
                                <div className="m-auto w-lg-75 w-xl-50">
                                    <h2 className="text-color font-weight-light mb-5"><i className="fab fa-microsoft"></i>&nbsp;Team Login</h2>
                                    <div>
                                        <div className="form-group">
                                            <label className="text-secondary">Email</label>
                                            <input 
                                                className="form-control"
                                                type="text" 
                                                required
                                                onChange={(e)=>setEmail(e.target.value)}
                                                value={email} 
                                            />
                                            <p className="text-center" style={{color:"red"}}>{emailError}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-secondary">Password</label>
                                            <input
                                                 className="form-control"
                                                 type="password" 
                                                 required 
                                                 onChange={(e)=>setPassword(e.target.value)} 
                                                 value={password}
                                            />
                                            <p className="text-center" style={{color:"red"}}>{passwordError}</p>
                                        </div>
                                        <button className="button-color btn btn-info mt-2" onClick={handlelogin} >Log In</button>
                                    </div>
                                    <p className="mt-3 mb-0">Don't have an Account ? 
                                        <span onClick={()=>setHasAccount(!hasAccount)} style={{color:"red",cursor:"pointer"}}> Sign up</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex align-items-end" id="bg-block">
                            </div>
                        </div>
                    </div>
                </>
            ):(
                <>
                    <div className="container-fluid">
                        <div className="row mh-100vh">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-6 
                                    offset-1 offset-sm-2 offset-md-3 offset-lg-0 
                                    align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch 
                                    bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
                                id="login-block">
                                <div className="m-auto w-lg-75 w-xl-50">
                                    <h2 className="text-color font-weight-light mb-5"><i className="fab fa-microsoft"></i>&nbsp;Create Teams Account</h2>
                                    <div>
                                        <div className="form-group">
                                            <label className="text-secondary">Name</label>
                                            <input className="form-control"
                                                type="text" required 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-secondary">Email</label>
                                            <input className="form-control"
                                                type="text" 
                                                required 
                                                value={email}
                                                onChange={(e)=>setEmail(e.target.value)}
                                            />
                                            <p className="text-center" style={{color:"red"}}>{emailError}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-secondary">Password</label>
                                            <input
                                                className="form-control" 
                                                type="password" 
                                                required
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)} 
                                            />
                                            <p className="text-center" style={{color:"red"}}>{passwordError}</p>
                                        </div>
                                        <button className="button-color btn btn-info mt-2" onClick={handleSignup}>Create Account</button>
                                    </div>
                                    <p className="mt-3 mb-0">Already a user ? 
                                        <span onClick={()=>setHasAccount(!hasAccount)} style={{color:"red",cursor:"pointer"}}> Sign in</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex align-items-end" id="bg-block">
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login;
