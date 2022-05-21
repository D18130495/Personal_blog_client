import request from '@/utils/request'

export default {
  getAllTag() {
    return request({
        url: `/front/tag/getAllTag`,
        method: 'get'
    })
  },
  getTagByTagId(tagId) {
    return request({
        url: `/front/tag/getTagByTagId/${tagId}`,
        method: 'get'
    })
  }
}