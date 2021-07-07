
//Module Imports

import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';


//Component Imports
import fire from './Firebase/fire';
import Login from './Components/Login/Login';
import Homepage from './Components/Homepage/Homepage';
import Room from './Components/Room/Room';
import TeamChannel from './Components/TeamChannel/TeamChannel';


function App() {

  //useState hooks for The user Auththenication which is passed on to various components.

  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [name,setName] = useState('');
  const [ emailError , setEmailError ] = useState('');
  const [ passwordError , setPasswordError ] = useState('');
  const [ user , setUser ] = useState(null);
  const [ hasAccount , setHasAccount ] = useState(false);
  

 

  //Firebase userAuthentication Login starts here.

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }


  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }


  const handlelogin = async () => {
   
    clearErrors();

    //*All possible scenarious are checked with switch cases.
    
    fire.auth()
    .signInWithEmailAndPassword( email , password )
    .catch((error)=>{
      // eslint-disable-next-line default-case
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

    //Saving name against Email in the MongoDb.

    try{
      const response = await axios.post('http://localhost:5000/posts/adduser',{
          username:name,
          email
      },);
      console.log(response);
    }catch(error){
      console.log(error);
    }
    
    clearErrors();

    fire.auth()
    .createUserWithEmailAndPassword(email,password)
    .catch((error)=>{
      // eslint-disable-next-line default-case
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log(email);
  //UserAuthentication Logic Ends here.

  //Entire Project Routing is done from here using react-router-dom.
  //In entire Project {val?(if true execute this bracket):(else execute this)} is used.

  return (
    <div>
        {user?(
          <BrowserRouter>
          <Switch>
              <Route path = '/' exact render = {(props)=>(
                  <Homepage {...props}  email={user.email}  handleLogout = {handleLogout}/>
                )}
              />
              <Route path = '/room/:roomID' exact render = {(props)=>(
                  <Room {...props} email={user.email} />
                )}
              />
              <Route path = '/team/:teamname' exact render={(props)=>(
                  <TeamChannel {...props} email={user.email} />
              )}
              />
              </Switch>
          </BrowserRouter>
        ):(
        <Login  email = {email} password = {password} setEmail = {setEmail} setPassword = {setPassword}
            handlelogin = {handlelogin}  handleSignup = {handleSignup} hasAccount={hasAccount} setHasAccount = {setHasAccount}
            emailError = {emailError} passwordError = {passwordError} name={name} setName={setName} 
          />
        )}
    </div>
  );
}

export default App;
