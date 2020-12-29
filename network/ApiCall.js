import Axios from 'axios'

const BASE_URL = 'https://api.paystack.co'
export default class Apicall {
  AxiosInstance() {
    const instance = Axios.create({
      baseURL: BASE_URL,
      validateStatus: status => {
        return status >= 200 && status <= 404
      },
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    })

    instance.defaults.timeout = 60000
    instance.defaults.maxRedirects = 1
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    instance.defaults.headers.post['Accept'] = 'application/json'
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'

    return instance
  }

  async initTransaction(data) {
    try {
      const res = await this.AxiosInstance().post(
        '/transaction/initialize',
        data
      )
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
