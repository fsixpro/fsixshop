import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import Utility from '../utils/Utility.js'
const util = new Utility()
const auth = (req, res, next) => {
  let token = req.headers.authorization
  if (!token)
    return util.failureResponse(res, 401, 'no token, authorization denied')
  try {
    const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET)
    req.user = decoded.id
    console.log(req.user)
    next()
  } catch (error) {
    return util.failureResponse(res, 401, 'invalid token')
  }
}
const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user)

    if (user && user.isAdmin) {
      next()
    } else {
      return util.failureResponse(res, 401, 'Admin only route')
    }
  } catch (error) {
    console.log(error)
  }
}
export { auth, admin }
