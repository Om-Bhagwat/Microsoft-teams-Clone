
//import models.
import PostMessage from '../models/postMessage.js';
import teamDetails from '../models/teams.js';



//function to get Messages along with username and teamname.
export const getPosts= async (req,res) =>{


    console.log("yes");
    try{
           const postMessages = await PostMessage.find(); 

           res.status(200).json(postMessages);
           
    }catch(error){
        res.status(404).json({message: error.message});
    }

}



//function to save Messages along with username and teamname.
export const createPost = async (req,res)=>{
    
    const post = req.body;

    const newPost = new PostMessage(post);
    
    try{
           await newPost.save(); 

           res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({message:error.message});
    }
}

//function to find the messages with teamname.
export const findMessage= async (req, res) => {

    try {
        const data1= await PostMessage.find({ teamname: req.body.teamname})

        //console.log("trying");
        

        res.send({ data1})
    } catch (e) {
        res.status(400).send()
    }
}



//function to create a new team.
export const addTeam= async (req, res) => {

    const post = req.body;

    try {
        const data1= await teamDetails.find({ email: post.email})


        //console.log("trying to add");
        
        //console.log(post.email);
        //console.log(data1[0].teams);

        
        data1[0].teams.push({"teamname":post.teamname});
        await data1[0].save();
        

        res.send(data1[0])
    } catch (e) {
        res.status(400).send()
    }
}


//fucntion to add new user to the Application which saves the name.
export const adduser = async (req,res)=>{
    
    const post = req.body;

    const newPost = new teamDetails(post);
    
    try{
           await newPost.save(); 

           res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({message:error.message});
    }
}



//function to find the teams based on the user's email.
export const findTeams= async (req, res) => {

    const post = req.body;

    try {
        const data1= await teamDetails.find({ email: post.email})

        //console.log("trying to find teams");

        
        

        res.send({ data1})
    } catch (e) {
        res.status(400).send()
    }
}


