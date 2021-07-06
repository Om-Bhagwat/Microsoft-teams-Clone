import express from 'express';

import {getPosts,createPost,findMessage,addTeam,adduser,findTeams} from '../controllers/posts.js'
const router = express.Router();

router.post('/find',findMessage);
router.post('/create',createPost);

router.post('/adduser',adduser);
router.post('/addteam',addTeam);
router.post('/findteams',findTeams);

 export default router;

