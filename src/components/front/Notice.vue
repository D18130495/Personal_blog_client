<template>
    <div class="whitebg notice">
        <h2 class="htitle">{{ channel.name }}</h2>
        <ul>
            <li v-for="(article, index) in articles" :key="index">
                <router-link :to='"/detail/" + article.id' target="_blank">
                    {{ article.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'
    import channelApi from '@/api/front/channel'

    export default {
        name: "Notice",
        data() {
            return{
                articles:[],
                channel: {}
            }
        },
        created() {
            this.getChannelC()
        },
        methods: {
            getChannelC() {
                channelApi.getChannelByPos('c')
                    .then(response => {
                        this.channel = response.data[0]
                        articleApi.getNoticeByChannelId(this.channel.id)
                            .then(response => {
                                this.articles = response.data
                            })
                    }).catch(error=>{
                        console.log(error)
                    })
            }       
        }
    }
</script>

<style scoped/>