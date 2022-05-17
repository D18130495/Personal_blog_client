import request from '@/utils/request'

export default {
    queryByPos(pos) {
      return request({
          url: `front/channel/queryByPos/${pos}`,
          method: 'get'
      })
    }
}