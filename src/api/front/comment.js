import request from '@/utils/request'

export default {
  newComment(commentObj) {
    return request({
        url: `/front/comment/newComment`,
        method: 'get',
        params: commentObj
    })
  }
}