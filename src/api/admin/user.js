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
  updateUser(formData) {
    return request({
      url: `/admin/user/updateUser`,
      method: 'put',
      params: formData
    })
  },
  deleteUserById(userId) {
    return request({
      url: `/admin/user/deleteUserById/${userId}`,
      method: 'delete'
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