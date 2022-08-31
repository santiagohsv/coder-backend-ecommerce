import express from 'express';

import authController from '../controllers/auth'
import verifyUser from '../middlewares/user'

const router = express.Router();

router.post('/login', verifyUser, authController.login); 
router.post('/signup', authController.signup); 


export default router;

