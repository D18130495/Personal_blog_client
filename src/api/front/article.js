import request from '@/utils/request'

export default {
  getRandomArticle() {
    return request({
        url: `/front/article/getRandomArticle`,
        method: 'get'
    })
  }
}