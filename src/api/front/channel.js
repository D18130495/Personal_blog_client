import request from '@/utils/request'

export default {
    search() {

    },
    getChannelByPos(pos) {
      return request({
        url: `front/channel/getChannelByPos/${pos}`,
        method: 'get'
      })
    },
    getArticleByChannelId(channelId) {
      return request({
        url: `front/channel/getArticleByChannelId/${channelId}`,
        method: 'get'
      })
    },
    getChannelByChannelId(channelId) {
      return request({
        url: `front/channel/getChannelByChannelId/${channelId}`,
        method: 'get'
      })
    },
    getPaginatedChannelArticleByChannelId(current, limit, channelId) {
      return request({
        url: `front/channel/getPaginatedChannelArticleByChannelId/${current}/${limit}/${channelId}`,
        method: 'get'
      })
    },
    getChildrenChannelListByParentChannelId(channelId) {
      return request({
        url: `front/channel/getChildrenChannelListByParentChannelId/${channelId}`,
        method: 'get'
      })
    }
}