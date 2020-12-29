import axios from 'axios'
import Order from '../models/OrderModel.js'
import User from '../models/UserModel.js'
import Utility from '../utils/Utility.js'
import ApiCall from '../network/ApiCall.js'
const util = new Utility()
const api = new ApiCall()
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      deliveryMethod,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      return util.failureResponse(res, 400, 'no order items')
    } else {
      const order = new Order({
        orderItems,
        user: req.user,
        shippingAddress,
        paymentMethod,
        deliveryMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      })
      const { email, name } = await User.findById(req.user)
      const {
        data: { data },
      } = await api.initTransaction({
        email,
        name,
        amount: totalPrice * 100,
      })
      console.log(data)
      const createdOrder = await order.save()

      return util.successResponse(res, 201, createdOrder)
    }
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const getorderByid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (!order) return util.failureResponse(res, 404, 'order not found')
    return util.successResponse(res, 200, order)
  } catch (error) {
    console.log(error)
    if (error.kind == 'ObjectId')
      return util.failureResponse(res, 404, 'order not found')
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return util.failureResponse(res, 404, 'order not found')
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      reference: req.body.reference,
      status: req.body.status,
    }
    const updatedOrder = await order.save()
    return util.successResponse(res, 200, updatedOrder)
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user,
    }).populate('user', 'name email')
    if (!orders) return util.failureResponse(res, 404, 'No order found')
    return util.successResponse(res, 200, orders)
  } catch (error) {
    console.log(error)

    return util.failureResponse(res, 500, 'internal server error')
  }
}
