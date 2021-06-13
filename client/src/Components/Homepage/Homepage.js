import React from 'react'

const Homepage = (props) =>{

    const{
        email,
        handleLogout
    } = props;

    console.log(email);

    return(
        <div>
            Homepage
            <p>{email}</p>
            <button onClick={handleLogout}></button>
        </div>
    )
}

export default Homepage;
