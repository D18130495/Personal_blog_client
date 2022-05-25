import request from '@/utils/request'

export default {
  getArticleDataByArticleId(articleId) {
    return request({
      url: `/admin/article/getArticleDataByArticleId/${articleId}`,
      method: 'get'
    })
  },
  addNewArticle(formData) {
    return request({
      url: `/admin/article/addNewArticle`,
      method: 'post',
      data: formData
    })
  },
  updateTagByTagId(formData) {
    return request({
      url: `/admin/tag/updateTagByTagId`,
      method: 'put',
      params: formData
    })
  },
  deleteTagById(tagId) {
    return request({
      url: `/admin/tag/deleteTagById/${tagId}`,
      method: 'delete'
    })
  },
  getArticleQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/article/getArticleQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  },
  uploadArticleImageAndFile(formData) {
    return request({
      url: `/admin/article/uploadArticleImageAndFile`,
      method: 'post',
      data: formData
    })
  }
}