import React,{useState,useEffect} from 'react';
import axios from 'axios';

const TeamChannel=(props)=>{

    const teamId = props.match.params.teamname; 
    const {email} = props;
    const [teamName,setTeamName] = useState([]);
    const [team,setTeam] = useState('');
    const [emailToAdd,setEmailToAdd] = useState('');

    useEffect(() => {

        async function getT(){
            try{
                const response = await axios.post('http://localhost:5000/posts/findteams',{
                    email
                },);
            
                console.log(response);
                setTeamName(response.data.data1[0].teams);
            }catch(error){
                console.log(error);
            }
        }

        getT();

    }, [])
    console.log(teamName);

    const addMembers=async(e)=>{
        e.preventDefault();
        var TEAM = "";
        try{
            for(let i =0;i<teamName.length;i++){
                //console.log(teamName[i]._id);
                if(teamName[i]._id===teamId){
                    setTeam(teamName[i].teamname);
                    TEAM = teamName[i].teamname;
                    break;
                }
            }
        }catch(error){
            console.log(error)
        }
        finally{
            //console.log(TEAM);
            try{
                const response = await axios.post('http://localhost:5000/posts/addTeam',{
                    email:emailToAdd,
                    teamname:TEAM
                },);
                
                console.log(response);
            }catch(error){
                console.log(error);
            }
        }
    }


    return(
        <>
            Hello This is Team Channel.
            {teamName.map((team)=>{
                if(team._id===teamId){
                    return(
                        <>
                            {team.teamname}
                            <br></br>
                        </>
                    )
                }
            })}
            {teamId}
            <br></br>
            <input value={emailToAdd} onChange={(e)=>setEmailToAdd(e.target.value)} type="text"/>
            <button onClick={addMembers}>Add members</button>
        </>
    )
}

export default TeamChannel;
