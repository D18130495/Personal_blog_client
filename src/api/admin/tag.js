import request from '@/utils/request'

export default {
  addNewTag(formData) {
    return request({
      url: `/admin/tag/addNewTag`,
      method: 'post',
      params: formData
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
  getTagQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `/admin/tag/getTagQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  },
  getTagList() {
    return request({
      url: `/admin/tag/getTagList`,
      method: 'get'
    })
  },
}