import express from 'express'; 
import User from '../models/User.js';
import verify from '../helpers/verify.js';
import { getUserCenter } from '../controllers/userCenterController.js';

const router = express.Router(); 

router.get('/:id',getUserCenter);

export default router;