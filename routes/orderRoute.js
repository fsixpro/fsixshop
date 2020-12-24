import express from 'express'
import {
  createOrder,
  getMyOrders,
  getorderByid,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { auth } from '../middleware/auth.js'
const router = express.Router()

router.route('/').post(auth, createOrder)
router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getorderByid)
router.route('/:id/pay').put(auth, updateOrderToPaid)

export default router
