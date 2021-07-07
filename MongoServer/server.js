
//importing Modules.
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//importing Routes.
import postRoutes from './routes/posts.js';

//initialze a express app.
const app = express();



app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

app.use('/posts',postRoutes);



const CONNECTION_URL = 'mongodb+srv://Om:WbiidEkQuX7zPc6a@teams.hchbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT =process.env.PORT || 5000;
// extra parameters so that we don't get warnings
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,() => console.log(`Server running on port : ${PORT} and Database is connected`)))
    .catch((error) => console.log(error.message));

    //So we dont get warnings in console
mongoose.set('useFindAndModify',false);