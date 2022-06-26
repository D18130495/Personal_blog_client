import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store'
import token from '../store/token'

// create an axios instance
const service = axios.create({
  // baseURL: 'https://www.huaruoyumu.online:9002',
  baseURL: 'http://localhost:9001',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.state.token){
      config.headers['token'] = store.state.token
    }

    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    let token = response.headers['token']

    if(token) {
        store.commit('setToken', token)
    }

    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
