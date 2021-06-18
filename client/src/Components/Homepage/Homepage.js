import React from 'react'
import { v1 as uuid } from "uuid";

const Homepage = (props) =>{

    const{
        email,
        handleLogout
    } = props;

    console.log(email);

    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return(
        <div>
            Homepage
            <p>{email}</p>
            <button className="btn btn-primary" onClick={create}>Call</button><br></br><br></br>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Homepage;
