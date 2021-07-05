import React,{useState,useEffect} from 'react';
import axios from 'axios';

const TeamChannel=(props)=>{

    const teamId = props.match.params.teamname; 
    const {email} = props;
    const [teamName,setTeamName] = useState([]);
    const [team,setTeam] = useState('');

    useEffect(async() => {
        try{
            const response = await axios.post('http://localhost:8000/posts/findteams',{
                email
            },);
            
            console.log(response);
            setTeamName(response.data.data1[0].teams);
        }catch(error){
            console.log(error);
        }

    }, [])
    console.log(teamName);
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
        </>
    )
}

export default TeamChannel;
