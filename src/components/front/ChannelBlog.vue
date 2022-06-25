<template>
    <div class="whitebg bloglist">
        <h2 class="htitle">
            <span class="con_nav">
                Location:
                    <a href="/">
                        Home
                    </a>
                    &gt;
                    <router-link :to='"/channel_detail/" + parentChannel.id'>
                        {{ parentChannel.name }}
                    </router-link>
                    &gt;
                    <router-link :to='"/list/" + channel.id'>
                        {{ channel.name }}
                    </router-link>
            </span>
            {{ channel.name }} related articles
        </h2>

        <ul>
            <li v-for="(toppedArticle, index) in toppedArticles" :key="index.id">
                <h3 class="blogtitle">
                    <router-link :to='"/detail/" + toppedArticle.id' target="_blank">
                        <b>【Topped】</b>
                        {{ toppedArticle.title }}
                    </router-link>
                </h3>
                
                <span class="blogpic imgscale"><i><router-link :to='"/detail/" + toppedArticle.id'>{{ toppedArticle.channel.name}}</router-link></i>
                    <router-link :to='"/detail/" + toppedArticle.id' target="_blank">
                        <img v-if="toppedArticle.titleImg == null || toppedArticle.titleImg == '' " width="130px" height="120px" src="@/assets/images/flower.jpg" alt="">
                        <img v-else :src="toppedArticle.titleImg" height="120px" alt="">
                    </router-link>
                </span>
                
                <p class="blogtext">{{ toppedArticle.summary }}</p>
                
                <p class="bloginfo">
                    <i class="avatar"><img :src="toppedArticle.user.avatar"></i>
                    <span>{{ toppedArticle.user.nickName }}</span>
                    <span>{{ toppedArticle.createTime }}</span>
                </p>
                
                <router-link :to='"/detail/" + toppedArticle.id' target="_blank" class="viewmore">More</router-link>
            </li>

            <li v-for="(article, index) in articles" :key="index">
                <h3 class="blogtitle">
                    <router-link :to='"/detail/" + article.id' target="_blank">
                        {{ article.title }}
                    </router-link>
                </h3>
                
                <span class="blogpic imgscale">
                    <i>
                        <router-link :to='"/detail/" + article.id' target="_blank">
                            {{ article.channel.name }}
                        </router-link>
                    </i>
                    
                    <router-link :to='"/detail/" + article.id' target="_blank">
                        <img v-if="article.titleImg == null || article.titleImg=='' " width="130px" height="120px" src="@/assets/images/flower.jpg" alt="">
                        <img v-else  :src="article.titleImg"  height="120px" alt="">
                    </router-link>
                </span>

                <p class="blogtext">{{ article.summary }}</p>
                <p class="bloginfo">
                    <i class="avatar">
                        <img v-if="article.user.avatar == null || article.user.avatar == '' " src="@/assets/images/avatar1.jpg">
                        <img v-else :src="article.user.avatar">
                    </i>
                    <span>{{ article.user.nickName }}</span>
                    <span>{{ article.createTime }}</span>
                </p>
                <router-link :to='"/detail/" + article.id' target="_blank" class="viewmore">More</router-link >
            </li>
        </ul>

        <div>
            <el-pagination
                    background
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-size="limit"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'
    import channelApi from '@/api/front/channel'

    export default {
        name: "ChannelBlog",
        data(){
            return{
                articles: [],
                channelId : '',
                channel: {},
                parentChannel: {},
                toppedArticles: [],
                current: 1,
                limit: 5,
                total: 0,
            }
        },
        beforeRouteUpdate(to, from, next){
            this.channelId = to.params.id
            this.getToppedArticleList()
            this.getChannelArticleList()
            this.getChannelByChannelId()
            next()
        },
        created() {
            this.channelId = this.$route.params.id
            this.getToppedArticleList()
            this.getChannelArticleList()
            this.getChannelByChannelId()
        },
        methods: {
            getToppedArticleList() {
                articleApi.getToppedArticleListByChannelId(this.channelId)
                    .then(response =>{
                        this.toppedArticles = response.data
                    }).catch(error=>{
                        console.log(error)
                    })
            },
            getChannelArticleList() {
                channelApi.getPaginatedChannelArticleByChannelId(this.current, this.limit, this.channelId)
                    .then(response => {
                        this.articles = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getChannelByChannelId() {
                channelApi.getChannelByChannelId(this.channelId)
                    .then(response => {
                        this.channel = response.data
                        this.getParentChannelByParentId()
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getParentChannelByParentId() {
                channelApi.getChannelByChannelId(this.channel.parentId)
                    .then(response => {
                        this.parentChannel = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val){
                this.current = val
                this.getChannelArticleList()
            }
        }
    }
</script>

<style scoped/>