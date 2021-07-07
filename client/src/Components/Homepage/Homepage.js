import React,{useState,useEffect} from 'react'
import { v1 as uuid } from "uuid";
import axios from 'axios';
import {Link} from 'react-router-dom';

import './Homepage.css';

const Homepage = (props) =>{

    const{
        email,
        handleLogout
    } = props;

    const [allteams,setAllteams] = useState([]);
    const [teamn,setTeamn] = useState('');
    const [newTeam,setNewTeam] = useState('');
    const [flag,setFlag] = useState(true);

    console.log(email);


    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }
    // const createATeam=()=>{
    //     props.history.push(`/createteam`)
    // }

    useEffect(()=>{
        async function seeYourTeams(){
            let allcoms;
            try{
                const response = await axios.post('http://localhost:5000/posts/findteams',{
                    email
                },);
    
                allcoms = response.data.data1[0].teams;
                setTeamn(response.data.data1[0].username);
                // setAllteams(allcoms);
                console.log(allcoms);
                
                setAllteams(allcoms);
    
            }catch(error){
                console.log(error);
            }
        }

        seeYourTeams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const createNewTeam=async(e)=>{
        e.preventDefault();
        setFlag(!flag);
        try{
            const response = await axios.post('http://localhost:5000/posts/addteam',{
                email,
                teamname:newTeam,
            },);
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    console.log(allteams);
    return(
        <div>
            {/* <button type="button"  data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
            </button> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create A Team</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input value={newTeam} onChange={(e)=>setNewTeam(e.target.value)} type="text" required placeholder="Enter Name of the Team." />
                        </div>
                        <div class="modal-footer">
                            {(newTeam!=='' && flag)?(
                                <>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={createNewTeam} class="btn btn-primary">Create New</button>
                                </>
                            ):(
                                <>
                                    <p>Please Refresh your Browser.</p>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <header>
                <h4>Teams</h4>
                <h5>Welcome,&nbsp;{teamn}</h5>
                <button className="logout-btn"  onClick={handleLogout}>Logout</button>
            </header>

            <div className="main-container">
                <div className="option-btns">
                    <button type="button" data-toggle="modal" data-target="#exampleModal" className="create-team">
                        <i className="material-icons">group_add</i>
                        <span>Create&nbsp;Team</span>
                    </button>
                    <button onClick={create} class="make-call">
                        <i class="material-icons">call</i>
                        <span>Call</span>
                    </button>
                </div>

                <div className="team-list">
                    {allteams.map((team)=>{
                        return(
                            <Link to={`/team/${team._id}`} key={team._id}>
                                <div className="team">
                                    <div className="team-icon">
                                    </div>
                                    <h6 className="teamName">{team.teamname}</h6>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Homepage;
