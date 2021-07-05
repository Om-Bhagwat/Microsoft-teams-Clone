import React,{useState} from 'react'
import { v1 as uuid } from "uuid";
import axios from 'axios';
import {Link} from 'react-router-dom';

const Homepage = (props) =>{

    const{
        email,
        handleLogout
    } = props;

    const [seeTeams,setSeeTeams] = useState(false);
    const [allteams,setAllteams] = useState([]);

    console.log(email);


    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }
    const createATeam=()=>{
        props.history.push(`/createteam`)
    }

    const seeYourTeams=async(e)=>{
        e.preventDefault();
        setSeeTeams(!seeTeams)

        let allcoms;
        try{
            const response = await axios.post('http://localhost:5000/posts/findteams',{
                email
            },);

            allcoms = response.data.data1[0].teams;
            // setAllteams(allcoms);
            console.log(allcoms);
            
            setAllteams(allcoms);

        }catch(error){
            console.log(error);
        }
    }

    const takeToChannel=(e)=>{
        // e.preventDefault();
        console.log(e);
    }

    console.log(allteams);
    return(
        <div>
            Homepage
            <p>{email}</p>
            <button onClick={seeYourTeams}>See Teams</button>
            <button onClick={createATeam}>Create Team</button>
            {allteams.map((team)=>{
                return(
                    <>
                        <div key={team._id}>
                            <Link to={`/team/${team._id}`}><h4>{team.teamname}</h4></Link>
                        </div>
                    </>
                )
            })}
            <button className="btn btn-primary" onClick={create}>Call</button><br></br><br></br>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Homepage;
