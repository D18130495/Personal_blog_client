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
  updateArticleByArticleId(formData) {
    return request({
      url: `/admin/article/updateArticleByArticleId`,
      method: 'put',
      data: formData
    })
  },
  deleteArticleById(articleId) {
    return request({
      url: `/admin/article/deleteArticleById/${articleId}`,
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