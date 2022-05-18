import request from '@/utils/request'

export default {
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
    }
}