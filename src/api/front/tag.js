import request from '@/utils/request'

export default {
  getAllTag() {
    return request({
        url: `/front/tag/getAllTag`,
        method: 'get'
    })
  }
}