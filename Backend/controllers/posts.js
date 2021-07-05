import PostMessage from '../models/postMessage.js';

import teamDetails from '../models/teams.js';


export const getPosts= async (req,res) =>{


    console.log("yes");
    try{
           const postMessages = await PostMessage.find(); 

           res.status(200).json(postMessages);
           
    }catch(error){
        res.status(404).json({message: error.message});
    }

}




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


export const findMessage= async (req, res) => {

    try {
        const data1= await PostMessage.find({ teamname: req.body.teamname})

        console.log("trying");
        

        res.send({ data1})
    } catch (e) {
        res.status(400).send()
    }
}


export const addTeam= async (req, res) => {

    const post = req.body;

    try {
        const data1= await teamDetails.find({ email: post.email})


        console.log("trying to add");
        
        console.log(post.email);
        console.log(data1[0].teams);

        // teamDetails.col.update(
        //     { email: data1.email }, 
        //     {$push: {'teams.teamname': post.teamname}}
        // )
        data1[0].teams.push({"teamname":post.teamname});
        await data1[0].save();

        // myFirstDatabase.teamdetails.update(
        //     { email: data1.email },
        //     { $push: { teams: teamname:}}
        //  )
        

        res.send(data1[0])
    } catch (e) {
        res.status(400).send()
    }
}

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


export const findTeams= async (req, res) => {

    const post = req.body;

    try {
        const data1= await teamDetails.find({ email: post.email})

        console.log("trying to find teams");

        
        

        res.send({ data1})
    } catch (e) {
        res.status(400).send()
    }
}


