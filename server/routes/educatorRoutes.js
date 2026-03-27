import express from 'express'
import { requireAuth } from '@clerk/express'
import { updateRoleToEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router()

// Add Educator Role
educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator)

export default educatorRouter;