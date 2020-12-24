class Utility {
  constructor() {
    this.emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]){2,5}$/
  }
  response(status, msg) {
    return {
      status: status,
      msg: msg,
    }
  }

  loginCheck(req) {
    if (req.email === undefined || req.email === '') {
      return this.response(false, 'email is required')
    }
    if (!this.emailPattern.test(req.email)) {
      return this.response(false, 'please input a valid email')
    }

    if (req.password === undefined || req.password === '') {
      return this.response(false, 'password is required')
    }
    return true
  }

  signupCheck(req) {
    if (req.name === undefined || req.name === '') {
      return this.response(false, 'name is required')
    }
    if (req.email === undefined || req.email === '') {
      return this.response(false, 'email is required')
    }
    if (!this.emailPattern.test(req.email)) {
      return this.response(false, 'please input a valid email')
    }

    if (req.password === undefined || req.password === '') {
      return this.response(false, 'password is required')
    }
    return true
  }

  successResponse(res, status, data = {}) {
    return res.status(status).json({
      status: true,
      msg: 'Success',
      data: data,
    })
  }

  failureResponse(res, status, msg, data = {}) {
    return res.status(status).json({
      status: false,
      msg,
      data: data,
    })
  }
}

export default Utility
