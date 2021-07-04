import React,{useState} from 'react';
import axios from 'axios';


const CreateTeam=(props)=>{
    const {email} = props;
    const [teamname,setteamname] = useState();

    console.log(email);
    const oncreateteam =async (e)=>{
        e.preventDefault();
        //logic to do on submitting the email and teamname.

        try{
            // const response = await axios.post('',{
            //     email,
            //     teamname,
            // },);
            // console.log(response);
        }catch(error){
            console.log(error);
        }finally{
            window.location="http://localhost:3000/";
        }
    }

    return(
        <>
            <input value={teamname} type="text" onChange={(e)=>setteamname(e.target.value)} required />
            <button type="submit" onClick={oncreateteam}>Create</button>
        </>
    )

}

export default CreateTeam;