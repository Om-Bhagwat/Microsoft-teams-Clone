
//importing modules.
import mongoose from 'mongoose';


//Defining schema for storing username,email and teams the user is in.
const teamSchema = mongoose.Schema(
    {
        
        username:String,
        email:String,
        teams:[{
            teamname:String,
        }],
        
        createdAt:{
            type:Date,
            default: new Date()
        },
        visible: {
            type: Boolean,
            default: true
        }
        
        
    }
);

const teamDetails = mongoose.model('teamDetails',teamSchema);

export default teamDetails;