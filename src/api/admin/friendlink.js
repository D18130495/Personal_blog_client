import request from '@/utils/request'

export default {
  getFriendLinkByFriendLinkId(friendLinkId) {
    return request({
      url: `/admin/friendLink/getFriendLinkByFriendLinkId/${friendLinkId}`,
      method: 'get'
    })
  },
  addNewFriendLink(formData) {
    return request({
      url: `/admin/friendLink/addNewFriendLink`,
      method: 'post',
      params: formData
    })
  },
  updateFriendLinkByFriendLinkId(formData) {
    return request({
      url: `/admin/friendLink/updateFriendLinkByFriendLinkId`,
      method: 'put',
      params: formData
    })
  },
  deleteFriendLinkById(friendlinkId) {
    return request({
      url: `/admin/friendLink/deleteFriendLinkById/${friendlinkId}`,
      method: 'delete'
    })
  },
  getFriendLinkQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/friendLink/getFriendLinkQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  }
}