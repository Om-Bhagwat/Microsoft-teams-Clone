
//importing modules.
import express from 'express';

//importing the functions defined in controllers.
import {getPosts,createPost,findMessage,addTeam,adduser,findTeams} from '../controllers/posts.js'
const router = express.Router();

router.post('/find',findMessage);
router.post('/create',createPost);
router.post('/adduser',adduser);
router.post('/addteam',addTeam);
router.post('/findteams',findTeams);

 export default router;

