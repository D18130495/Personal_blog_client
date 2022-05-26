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
  getToppedArticleByTagId(tagId) {
    return request({
      url: `front/article/getToppedArticleByTagId/${tagId}`,
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
  },
  getPaginatedTagArticleByTagId(current, limit, tagId) {
    return request({
      url: `front/article/getPaginatedTagArticleByTagId/${current}/${limit}/${tagId}`,
      method: 'get'
    })
  },
  getArticleQueryPaginatedList(current, limit, queryForm) {
    return request({
      url: `front/article/getArticleQueryPaginatedList/${current}/${limit}`,
      method: 'get',
      params: queryForm
    })
  }
}