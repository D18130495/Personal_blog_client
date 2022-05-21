import request from '@/utils/request'

export default {
  login(userInfo) {
    return request({
        url: `/admin/user/login`,
        method: 'get',
        params: userInfo
    })
  },
  
}