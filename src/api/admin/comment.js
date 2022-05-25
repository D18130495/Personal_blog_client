import request from '@/utils/request'

export default {
  updateTagByTagId(formData) {
    return request({
      url: `/admin/tag/updateTagByTagId`,
      method: 'put',
      params: formData
    })
  },
  deleteCommentById(commentId) {
    return request({
      url: `/admin/comment/deleteCommentById/${commentId}`,
      method: 'delete'
    })
  },
  getCommentQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/comment/getCommentQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  },
  getAllUnacceptCommentPaginatedList(current, limit) {
    return request({
        url: `/admin/comment/getAllUnacceptCommentPaginatedList/${current}/${limit}`,
        method: 'get'
      })
  },
  getCommentStatus() {
    return request({
      url: `/admin/comment/getCommentStatus`,
      method: 'get'
    })
  },
}