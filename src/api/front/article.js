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
  getToppedArticleListByChannelId(channelId) {
    return request({
      url: `front/article/getToppedArticleListByChannelId/${channelId}`,
      method: 'get'
    })
  },
  getPaginatedArticlesList(current, limit) {
    return request({
      url: `front/article/getPaginatedArticlesList/${current}/${limit}`,
      method: 'get'
    })
  },
  getNoticeByChannelId(channelId) {
    return request({
      url: `front/article/getNoticeByChannelId/${channelId}`,
      method: 'get'
    })
  },
  getArticleByViewTime() {
    return request({
      url: `front/article/getArticleByViewTime`,
      method: 'get'
    })
  },
  getRecommendedArticle(articleId) {
    return request({
      url: `front/article/getRecommendedArticle/${articleId}`,
      method: 'get'
    })
  },
  getArticleById(articleId) {
    return request({
      url: `front/article/getArticleById/${articleId}`,
      method: 'get'
    })
  }
}