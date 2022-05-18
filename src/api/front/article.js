import request from '@/utils/request'

export default {
  getRandomArticle() {
    return request({
        url: `/front/article/getRandomArticle`,
        method: 'get'
    })
  },
  getToppedArticleList() {
    return request({
      url: `front/article/getToppedArticleList`,
      method: 'get'
    })
  },
  getPaginatedArticlesList(current, limit) {
    return request({
      url: `front/article/getPaginatedArticlesList/${current}/${limit}`,
      method: 'get'
    })
  }
}