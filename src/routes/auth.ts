import express from 'express';

import authController from '../controllers/auth';
import verifyUser from '../middlewares/user';
import signupCheck from '../middlewares/signup';

const router = express.Router();

router.post('/login', verifyUser, authController.login); 
router.post('/signup', signupCheck , authController.signup); 


export default router;

