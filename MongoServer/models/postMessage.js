
//import modules.
import mongoose from 'mongoose';

//schema Defined for message storing.
const postSchema = mongoose.Schema(
    {
        username:String,
        teamname:String,
        message:String,
        
        createdAt:{
            type:Date,
            default: new Date()
        },
    }
);

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;