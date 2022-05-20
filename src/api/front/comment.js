import request from '@/utils/request'

export default {
  newComment(commentObj) {
    return request({
        url: `/front/comment/newComment`,
        method: 'get',
        params: commentObj
    })
  },
  getArticleAllComments(articleId) {
    return request({
        url: `/front/comment/getArticleAllComments/${articleId}`,
        method: 'get'
    })
  }
}