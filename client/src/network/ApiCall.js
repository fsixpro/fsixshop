import Axios from 'axios'

const BASE_URL = '/api'
export default class Apicall {
  AxiosInstance() {
    const instance = Axios.create({
      baseURL: BASE_URL,
      validateStatus: status => {
        return status >= 200 && status <= 404
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    instance.defaults.timeout = 60000
    instance.defaults.maxRedirects = 1
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    instance.defaults.headers.post['Accept'] = 'application/json'
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'

    return instance
  }

  AxiosInstance1() {
    const instance = Axios.create({
      baseURL: BASE_URL,
      validateStatus: status => {
        return status >= 200 && status <= 404
      },
    })

    instance.defaults.timeout = 60000
    instance.defaults.maxRedirects = 1
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
    instance.defaults.headers.post['Accept'] = 'application/json'
    instance.interceptors.request.use(config => {
      const { token } = JSON.parse(localStorage.getItem('userInfo'))
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    return instance
  }
  AxiosInstanceImageUpload() {
    const instance = Axios.create({
      baseURL: BASE_URL,
      validateStatus: status => {
        return status >= 200 && status <= 404
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    instance.defaults.timeout = 60000
    instance.defaults.maxRedirects = 1
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    //instance.defaults.headers.post['Content-Type'] =
    //  'application/x-www-form-urlencoded'

    return instance
  }

  async signin(params) {
    try {
      const res = await this.AxiosInstance().post('/user/login', params)
      return res
    } catch (error) {
      console.log('signin error', error.response)
    }
  }

  async updateUser(params) {
    try {
      const res = await this.AxiosInstance1().put('/user/profile', params)
      return res
    } catch (error) {
      console.log('upadete user error', error)
    }
  }

  async register(params) {
    try {
      const res = await this.AxiosInstance().post('/user/register', params)
      return res
    } catch (error) {
      console.log('register error', error.response)
    }
  }

  async getProducts(keyword = '', pageNumber = '') {
    try {
      const res = await this.AxiosInstance().get(
        `/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )
      return res
    } catch (error) {
      console.log('register error', error.response)
    }
  }
  async getProductsAdmin() {
    try {
      const res = await this.AxiosInstance().get(`/products/admin`)
      return res
    } catch (error) {
      console.log('register error', error.response)
    }
  }

  async getProductById(id) {
    try {
      const res = await this.AxiosInstance().get(`/products/${id}`)
      return res
    } catch (error) {
      console.log('register error', error.response)
    }
  }

  async getuser() {
    try {
      const res = await this.AxiosInstance1().get(`/user/profile`)
      return res
    } catch (error) {
      console.log('register error', error.response)
    }
  }

  async createOrder(order) {
    try {
      const res = await this.AxiosInstance1().post(`/order`, order)
      return res
    } catch (error) {
      console.log('create order error', error.response)
    }
  }

  async orderDetail(orderId) {
    try {
      const res = await this.AxiosInstance1().get(`/order/${orderId}`)
      return res
    } catch (error) {
      console.log('order detail error', error.response)
    }
  }

  async orderPay(orderId, paymentResult) {
    try {
      const res = await this.AxiosInstance1().put(
        `/order/${orderId}/pay`,
        paymentResult
      )
      return res
    } catch (error) {
      console.log('order pay error', error.response)
    }
  }

  async getMyOrders() {
    try {
      const res = await this.AxiosInstance1().get('/order/myorders')
      return res
    } catch (error) {
      console.log('get my orders error', error.response)
    }
  }
  async getAllUsers() {
    try {
      const res = await this.AxiosInstance1().get('/user')
      return res
    } catch (error) {
      console.log('get all users error', error.response)
    }
  }
  async deleteUser(id) {
    try {
      const res = await this.AxiosInstance1().delete(`/user/${id}`)
      return res
    } catch (error) {
      console.log('delete user error', error.response)
    }
  }
  async deleteProduct(id) {
    try {
      const res = await this.AxiosInstance1().delete(`/products/${id}`)
      return res
    } catch (error) {
      console.log('delete user error', error.response)
    }
  }
  async updateProduct(id, data) {
    try {
      const res = await this.AxiosInstance1().put(`/products/${id}`, data)
      return res
    } catch (error) {
      console.log('delete product error', error.response)
    }
  }

  // async upload(data) {
  //   try {
  //     const res = await this.AxiosInstanceImageUpload().post('/uploads', data)
  //     return res
  //   } catch (error) {
  //     console.log('delete product error', error.response)
  //   }
  // }

  async createProductReview(id, data) {
    try {
      const res = await this.AxiosInstance1().post(
        `/products/${id}/review`,
        data
      )
      return res
    } catch (error) {
      console.log('create product Review error', error.response)
    }
  }

  async getTopProducts() {
    try {
      const res = await this.AxiosInstance().get(`/products/top`)
      return res
    } catch (error) {
      console.log('get top product error', error.response)
    }
  }

  async uploadProductImage(imageURI) {
    try {
      const res = await this.AxiosInstance1().post(`/upload`, { imageURI })
      return res
    } catch (error) {
      console.log('get top product error', error.response)
    }
  }
  async createProduct() {
    try {
      const res = await this.AxiosInstance1().post(`/products`)
      return res
    } catch (error) {
      console.log('createProduct error', error.response)
    }
  }
}
