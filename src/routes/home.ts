import express from 'express';
import {checkAuth} from '../middlewares/auth';


const router = express.Router();

router.get('/', checkAuth, (_req,res)=>{
res.send(`Welcome ${res.locals.user.firstName}`)
});

export default router;

