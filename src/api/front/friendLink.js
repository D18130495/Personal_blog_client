import request from '@/utils/request'

export default {
  getAllFriendLinkList() {
    return request({
        url: `/front/friendLink/getAllFriendLinkList`,
        method: 'get'
    })
  }
}