/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
//* Import React, and react hooks as we are going to use it here.
//* React router provided by react-router-dom also needs to be installed.
//! npm install react-router-dom

import React, { useState , useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//* Now we need fire variable from Firebase folder to start with our functions for Login/Register.
//! note: In react we need not give .js extension while importing in the new version.

import fire from './Firebase/fire';
import Login from './Components/Login/Login';
import Homepage from './Components/Homepage/Homepage';

function App() {

  //*Let's define usestate hooks for email,password and error one to handle errors incase of errors.

  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ emailError , setEmailError ] = useState('');
  const [ passwordError , setPasswordError ] = useState('');
  const [ user , setUser ] = useState('');
  const [ hasAccount , setHasAccount ] = useState(false);


  //*Function to clear the inputs before filling the form again.

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  //*Function to clear errors shown on the form.

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  //* Login function to send the email and password to firebase and authenticate.
  //! Aysnc function is used because we are dealing with firebase and we dont't want to wait the entire time.

  const handlelogin = async () => {
   
    //* When a Person had an error and is trying to fill the form again,
    //* Previous error must be cleaned.
    clearErrors();


    //*All possible scenarious are checked with switch cases.
    fire.auth()
    .signInWithEmailAndPassword( email , password )
    .catch((error)=>{
      switch(error.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
      
      }
    });

  }

  //* Function to register new user.

  const handleSignup = async () => {
    
    clearErrors();

    fire.auth()
    .createUserWithEmailAndPassword(email,password)
    .catch((error)=>{
      switch(error.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(error.message);
          break;
        
        case "auth/weak-password":
          setPasswordError(error.message);
          break;
      }
    });
  }

  //*Function to logout a user from the account.

  const handleLogout = () =>{
    fire.auth().signOut();
  }

  const authListener=()=>{
    fire.auth().onAuthStateChanged(user=>{
        if(user){
          clearInputs();
          setUser(user);
        }else{
          setUser("");
        }
    })
  }

  useEffect(()=>{
    authListener();
  },[])

  return (
    <div>
        {user?(
          <Router>
              <Route path = '/' render = {(props)=>(
                  <Homepage {...props}  email={user.email}  handleLogout = {handleLogout}/>
                )}
              />
          </Router>
        ):(
        <Login  email = {email} password = {password} setEmail = {setEmail} setPassword = {setPassword}
            handlelogin = {handlelogin}  handleSignup = {handleSignup} hasAccount={hasAccount} setHasAccount = {setHasAccount}
            emailError = {emailError} passwordError = {passwordError}
          />
        )}
    </div>
  );
}

export default App;
