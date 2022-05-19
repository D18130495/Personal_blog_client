<template>
    <div class="whitebg paihang">
        <h2 class="htitle">Most Viewed</h2>
        <section class="topnews imgscale">
            <router-link :to='"/detail/" + article.id' target="_blank">
                <img src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/043a9cdba949490d9f57239da84cb3c2.jpg"><span>{{ article.title }}</span>
            </router-link>
        </section>
        <ul>
            <li v-for="(article, index) in articles.slice(0, 8)" :key="index">
                <i></i>
                <router-link :to='"/detail/" + article.id' target="_blank">{{ article.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'

    export default {
        name: "Order",
        data(){
            return{
                articles: [],
                article: ''
            }
        },
         created() {
            this.getArticleByViewTime()
        },
        methods:{
            getArticleByViewTime() {
                articleApi.getArticleByViewTime()
                    .then(response => {
                        this.articles = response.data
                        this.article = this.articles[0]
                    }).catch(error=>{
                        console.log(error)
                    })
            }
        } 
    }
</script>

<style scoped/>