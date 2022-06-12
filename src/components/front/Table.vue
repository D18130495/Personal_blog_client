<template>
    <div class="tab_box whitebg">
        <template>
            <div class="tab_buttons">
                <ul>
                    <li v-for="(channel, index) in channels" :key="index" @click="curlist(channel.id)" :class="{newscurrent: cur == channel.id}">
                        {{ channel.name }}
                    </li>
                </ul>
            </div>

            <div class="newstab">
                <div class="newsitem" :v-show="cur == cur">
                    <div class="newspic">
                        <ul>
                            <li v-for="(article, index) in articles" :key="index">
                                <router-link :to='"/detail/" + article.id' :title="article.title" target="_blank">
                                    <img :src="article.titleImg">
                                    <span>{{ article.title }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <ul class="newslist">
                        <li v-for="(article, index) in articles" :key="index">
                            <router-link :to='"/detail/" + article.id' target="_blank">
                                <i/>
                                {{ article.title }}
                            </router-link>
                            <p>{{ article.summary }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import channelApi from '@/api/front/channel'

    export default {
        name: "Table",
        data(){
            return{
                articles:[],
                channels : [],
                cur:''
            }
        },
        created() {
            this.getChannelB()            
        },
        methods:{
            getChannelB() {
                channelApi.getChannelByPos('b')
                    .then(response => {
                        this.channels = response.data
                        this.curlist(this.channels[0].id)
                    }).catch(error => {
                        console.log(error)
                    })
            },
            curlist(channelId){
                this.cur = channelId
                
                channelApi.getArticleByChannelId(channelId)
                    .then(response => {
                        this.articles = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>