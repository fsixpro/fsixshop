import express from 'express'
import {
  login,
  register,
  userProfile,
  updateProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js'
import { auth, admin } from '../middleware/auth.js'
const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/profile').get(auth, userProfile).put(auth, updateProfile)
router.route('/').get(auth, admin, getUsers)
router.route('/:id').delete(auth, admin, deleteUser)

export default router
