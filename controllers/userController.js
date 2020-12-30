import bcrypt from 'bcryptjs'
import User from '../models/UserModel.js'
import Utility from '../utils/Utility.js'
import jwt from 'jsonwebtoken'

const util = new Utility()
export const login = async (req, res) => {
  const valid = util.loginCheck(req.body)

  if (valid !== true) return util.failureResponse(res, 400, valid.msg)

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user)
      return util.failureResponse(
        res,
        404,
        `user with email ${email} does not exist`
      )
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch)
      return util.failureResponse(res, 404, `password incorrect`)
    const payload = {
      id: user.id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    setTimeout(() => {
      return util.successResponse(res, 200, {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      })
    }, 1000)
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal serer error')
  }
}

export const register = async (req, res) => {
  const valid = util.signupCheck(req.body)

  if (valid !== true) return util.failureResponse(res, 400, valid.msg)

  try {
    const { email, password, name } = req.body

    const user = await User.findOne({ email })

    if (user) return util.failureResponse(res, 400, `user already exist`)

    const newUser = new User({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)

    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save()

    const payload = {
      id: newUser.id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    setTimeout(() => {
      return util.successResponse(res, 200, {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token,
      })
    }, 1000)
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user)

    if (!user) return util.failureResponse(res, 404, 'user not found')

    return util.successResponse(res, 200, {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (password === undefined || password === '')
      return util.failureResponse(res, 400, 'input password')
    const user = await User.findById(req.user)
    if (user) {
      const matchPass = await bcrypt.compare(password, user.password)
      if (!matchPass) {
        return util.failureResponse(res, 400, 'incorrect password')
      }
      user.name = name || user.name
      user.email = email || user.email

      await user.save()

      return util.successResponse(res, 200, {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    if (users.length === 0)
      return util.failureResponse(res, 404, 'no user found')

    return util.successResponse(res, 200, users)
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal server error')
  }
}
export const deleteUser = async (req, res) => {
  try {
    if (await User.findByIdAndDelete(req.params.id)) {
      return util.successResponse(res, 200)
    }
  } catch (error) {
    console.log(error)

    return util.failureResponse(res, 500, 'internal server error')
  }
}
