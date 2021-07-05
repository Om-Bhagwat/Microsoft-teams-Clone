import mongoose from 'mongoose';

// const postSchema = mongoose.Schema(
//     {
//         title:String,
//         creator:String,
//         tags:[String],
//         selectedFile:String,
//         likeCount:{
//             type:Number,
//             default:0
//         },
//         createdAt:{
//             type:Date,
//             default: new Date()
//         },
//     }
// );



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