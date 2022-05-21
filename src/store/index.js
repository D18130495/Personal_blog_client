import Vue from 'vue'
import Vuex from 'vuex'

import userApi from '@/api/admin/user'
import token from './token'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token: token.get()
    },
    mutations:{
        setToken(state, paramToken) {
            state.token = paramToken
            token.set(paramToken)
        },
        logout() {
            token.clear()
        }
    },
    actions:{
        login({commit}, userInfo){
            return new Promise((resolve, reject) => {
                userApi.login(userInfo)
                    .then(response => {
                        commit('setToken', response.data.token)
                        token.setUser(response.data.user)
                        //处理token 写入vuex状态管理
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
            } )
        }
    }

});

export default store