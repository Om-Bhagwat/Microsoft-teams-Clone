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
                                <label>Email</label>
                                <input
                                    type="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                />
                                <p className="errorMsg">{emailError}</p>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />
                                <p className="errorMsg">{passwordError}</p>

                            <div className="btnContainer">
                                <button onClick={handleSignup}>Sign Up</button>
                                <p style={{textAlign:"center"}}>Have an Account ?
                                    <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span>
                                </p>
                            </div>
                            </>
                        ):(
                            <>
                                <label>Email</label>
                                <input
                                    type="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                />
                                <p className="errorMsg">{emailError}</p>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />
                                <p className="errorMsg">{passwordError}</p>

                                <div className="btnContainer">
                                    <button onClick={handlelogin}>Sign In</button>
                                        <p style={{textAlign:"center"}}>Don't have an account ?
                                            <span onClick={()=>setHasAccount(!hasAccount)}>Sign up</span>
                                        </p>
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
