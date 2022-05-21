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
                        <img v-if="article.titleImg == null || article.titleImg == ''" width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else width="130px" height="130px" :src="article.titleImg" alt="">
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

            <li v-for="(item, index) in articles" :key="index">
                <a href="#search" name="content"/>
                <h3 class="blogtitle">
                    <router-link :to='"/detail/" + item.id' target="_blank">
                        {{ item.title }}
                    </router-link>
                </h3>
                <span class="blogpic imgscale">
                    <i>
                        <router-link :to='"/detail/" + item.id'>
                            {{ item.channel.name }}
                        </router-link>
                    </i>

                    <router-link :to='"/detail/" + item.id' target="_blank">
                        <img v-if="item.titleImg == null || item.titleImg == ''" width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else width="130px" height="130px" :src="item.titleImg" alt="">
                    </router-link>
                </span>
                <p class="blogtext">
                    {{ item.summary }}
                </p>
                <p class="bloginfo">
                    <i class="avatar">
                        <img :src="item.user.avatar">
                    </i>
                    <span>{{ item.user.nickName }}</span>
                    <span>{{ item.createTime }}</span>
                </p>
                <router-link :to='"/detail/" + item.id' target="_blank" class="viewmore">More</router-link>
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
    // import {getPageList, getNewBlogTop, search} from "@/api/front";
    // import evenBus from  '@/utils/evenBus'

    export default {
        name: "NewBlog",
        props:['search', 'childevenTitle'],
        watch: {
            search: function(newVal, oldVal){
                this.articles=newVal.list
                this.total=newVal.total
                this.truth=true
            },
            childevenTitle: function(newVal,oldVal){
               this.queryForm.title = newVal
            },
        },
        data(){
            return{
                articles: [],
                toppedArticles: [],
                searchs: [],
                truth: false,
                current: 1,
                limit: 5,
                total: 0,
                enven: '',
                queryForm: {
                    name: '',
                    userName: ''
                },
            }
        },
        created() {
            // this.getEvenData()
            this.getToppedArticleList()
            this.getPaginatedArticlesList(this.current)
        },
        methods:{
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
                    .then(response =>{
                        this.toppedArticles = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val){
                this.current = val

                if (this.truth) {
                    this.getSearchPage(val)
                }else {
                    this.getPaginatedArticlesList(this.current)
                }
            },
            searchPage(param){
                search(param).then(data=>{
                    this.articles=data.list
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            getSearchPage(val){
                console.log('向父组件传值')
                let  param =this.queryForm
                this.pageNo =val
                param.page=this.pageNo
                this.searchPage(param)
                console.log('传参数的里面')
                console.log(this.articles)
            },
            getEvenData(){
                evenBus.$on('a',function (val) {
                    this.enven=val
                })
            }
        }
    }
</script>

<style scoped/>