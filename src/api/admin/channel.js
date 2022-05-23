import request from '@/utils/request'

export default {
  getChannelByChannelId(channelId) {
    return request({
      url: `/admin/channel/getChannelByChannelId/${channelId}`,
      method: 'get'
    })
  },
  addNewChannel(formData) {
    return request({
      url: `/admin/channel/addNewChannel`,
      method: 'post',
      params: formData
    })
  },
  updateChannelByChannelId(formData) {
    return request({
      url: `/admin/channel/updateChannelByChannelId`,
      method: 'put',
      params: formData
    })
  },
  deleteChannelById(channelId) {
    return request({
      url: `/admin/channel/deleteChannelById/${channelId}`,
      method: 'delete'
    })
  },
  getChannelQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/channel/getChannelQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  },
  getParentTreeDate() {
    return request({
      url: `/admin/channel/getParentTreeDate`,
      method: 'get'
    })
  },
  uploadChannelImage(formData) {
    return request({
      url: `/admin/channel/uploadChannelImage`,
      method: 'post',
      data: formData
    })
  }
}