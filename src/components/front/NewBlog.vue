<template>
    <div class="whitebg bloglist" >
        <h2 class="htitle" >Latest</h2>
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
                        <router-link :to='"/detail/" + article.id'>
                            {{ article.channel.name }}
                        </router-link>
                    </i>

                    <router-link :to='"/detail/" + article.id' target="_blank">
                       <img v-if="article.titleImg == null || article.titleImg==''" width="130px" height="120px" src="@/assets/images/flower.jpg">
                        <img v-else :src="article.titleImg" width="130px" height="120px" alt="article image">
                    </router-link>
                </span>

                <p class="blogtext">
                    {{ article.summary }}
                </p>

                <p class="bloginfo">
                    <i class="avatar"><img :src="article.user.avatar"></i>
                    <span>{{ article.user.nickName }}</span>
                    <span>{{ article.createTime }}</span>
                </p>

                <router-link :to='"/detail/" + article.id' target="_blank" class="viewmore">More</router-link>
            </li>

            <li v-for="(article, index) in articles" :key="index">
                <a href="#search" name="content"/>
                <h3 class="blogtitle">
                    <router-link :to='"/detail/" + article.id' target="_blank">
                        {{ article.title }}
                    </router-link>
                </h3>
                <span class="blogpic imgscale">
                    <i>
                        <router-link :to='"/detail/" + article.id'>
                            {{ article.channel.name }}
                        </router-link>
                    </i>

                    <router-link :to='"/detail/" + article.id' target="_blank">
                        <img v-if="article.titleImg == null || article.titleImg==''" width="130px" height="120px" src="@/assets/images/flower.jpg">
                        <img v-else :src="article.titleImg" width="130px" height="120px" alt="article image">
                    </router-link>
                </span>
                <p class="blogtext">
                    {{ article.summary }}
                </p>
                <p class="bloginfo">
                    <i class="avatar">
                        <img :src="article.user.avatar">
                    </i>
                    <span>{{ article.user.nickName }}</span>
                    <span>{{ article.createTime }}</span>
                </p>
                <router-link :to='"/detail/" + article.id' target="_blank" class="viewmore">More</router-link>
            </li>
        </ul>

        <div>
            <el-pagination
                    background
                    layout=" total, prev, pager, next, jumper"
                    @current-change = "handleCurrentChange"
                    :current-page = "current"
                    :page-size = "limit"
                    :total = "total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'
    // import evenBus from  '@/utils/evenBus'

    export default {
        name: "NewBlog",
        props:[
            'search',
            'childevenTitle'
        ],
        watch: {
            search: function(newVal, oldVal) {
                this.articles = newVal.records
                this.total = newVal.total
                this.truth = true
            },
            childevenTitle: function(newVal, oldVal) {
               this.queryForm.title = newVal
            },
        },
        data() {
            return {
                articles: [],
                toppedArticles: [],
                searchs: [],
                truth: false,
                current: 1,
                limit: 4,
                total: 0,
                enven: '',
                queryForm: {
                    name: '',
                    userName: '',
                    title: ''
                },
            }
        },
        created() {
            // this.getEvenData()
            this.getToppedArticleList()
            this.getPaginatedArticlesList(this.current)
        },
        methods: {
            getPaginatedArticlesList(current) {
                articleApi.getPaginatedArticlesList(current, this.limit)
                    .then(response => {
                        this.articles = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getToppedArticleList() {
                articleApi.getToppedArticleList()
                    .then(response => {
                        this.toppedArticles = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val) {
                this.current = val

                if(this.truth) {
                    this.getSearchPage(val)
                }else {
                    this.getPaginatedArticlesList(this.current)
                }
            },
            searchPage() {
                articleApi.getArticleQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.articles = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getSearchPage(val) {
                this.current = val
                this.searchPage()
            },
            getEvenData() {
                evenBus.$on('a',function (val) {
                    this.enven = val
                })
            }
        }
    }
</script>

<style scoped/>