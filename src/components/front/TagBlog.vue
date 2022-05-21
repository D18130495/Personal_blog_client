<template>
    <div class="whitebg bloglist">
        <h2 class="htitle">
            <span class="con_nav">
                Location:
                    <a href="/">
                        Home
                    </a>
                    &gt;
                    <router-link :to='"/tag_list/" + tag.id'>
                        {{ tag.tagName }}
                    </router-link>
            </span>
            {{ tag.tagName }} tag related articles
        </h2>

        <ul>
            <li v-for="(article, index) in toppedArticles" :key="index.id">
                <h3 class="blogtitle">
                    <router-link :to='"/detail/" + article.id' target="_blank">
                        <b>【Topped】</b>
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
                        <img v-if="article.titleImg == null || article.titleImg == ''" width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else width="130px" height="130px" :src="article.titleImg" alt="">
                    </router-link>
                </span>

                <p class="blogtext">{{ article.summary }}</p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="article.user.avatar"></i>
                    <span>{{ article.user.nickName }}</span>
                    <span>{{ article.createTime }}</span>
                </p>
                
                <router-link :to='"/detail/" + article.id' target="_blank" class="viewmore">More</router-link>
            </li>

            <li v-for="(article, index) in articles" :key="index.id">
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
                        <img v-if="article.titleImg == null || article.titleImg == ''" width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else width="130px" height="130px" :src="article.titleImg" alt="">
                    </router-link>
                </span>

                <p class="blogtext">{{ article.summary }}</p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="article.user.avatar"></i>
                    <span>{{ article.user.nickName }}</span>
                    <span>{{ article.createTime }}</span>
                </p>
                <router-link :to='"/detail/" + article.id' target="_blank" class="viewmore">More</router-link>
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
    import tagApi from '@/api/front/tag'

    export default {
        name: "NewBlog",
        data() {
            return{
                articles: [],
                tag: [],
                tagId: '',
                toppedArticles: [],
                current: 1,
                limit: 2,
                total: 0,
            }
        },
       created() {
            this.tagId = this.$route.params.id
            this.getToppedArticleList()
            this.getTagArticleList()
            this.getTagByTagId()
        },
        methods: {
            getToppedArticleList() {
                articleApi.getToppedArticleByTagId(this.tagId)
                    .then(response => {
                        this.toppedArticles = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getTagArticleList() {
                articleApi.getPaginatedTagArticleByTagId(this.current, this.limit, this.tagId)
                    .then(response => {
                        this.articles = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getTagByTagId() {
                tagApi.getTagByTagId(this.tagId)
                    .then(response => {
                        this.tag = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
             handleCurrentChange(val){
                this.current = val
                this.getTagArticleList()
            },
        },
    }
</script>

<style scoped/>