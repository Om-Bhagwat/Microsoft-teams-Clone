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
    const createATeam=()=>{
        props.history.push(`/createteam`)
    }

    return(
        <div>
            Homepage
            <p>{email}</p>
            <button onClick={createATeam}>Create Team</button>
            <button className="btn btn-primary" onClick={create}>Call</button><br></br><br></br>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Homepage;
