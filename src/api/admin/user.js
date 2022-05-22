import request from '@/utils/request'

export default {
  login(userInfo) {
    return request({
      url: `/admin/user/login`,
      method: 'get',
      params: userInfo
    })
  },
  addNewUser(formData) {
    return request({
      url: `/admin/user/addNewUser`,
      method: 'post',
      params: formData
    })
  },
  getUserQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/user/getUserQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  }
}