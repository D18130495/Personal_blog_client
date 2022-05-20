<template>
    <div class="whitebg wenzi">
        <h2 class="htitle">Recommended For You</h2>
        <ul>
            <li v-for="(article, index) in articles.slice(0, 8)" :key="index">
                <router-link :to='"/detail/" + article.id' target="_blank">
                    {{ article.title }}
                </router-link >
            </li>
        </ul>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'

    export default {
        name: "Like",
        data(){
            return{
                articles: []
            }
        },
        beforeRouteUpdate(to, from ,next){
            articleApi.getRecommendedArticle(to.$route.params.id)
                .then(response => {
                    this.articles = response.data.articleVo
                })

            this.xx = false
            
            this.$nextTick(() => {
                this.xx = true
            })
            
            next()
        },
        created() {
            this.getLikeArticle()    
        },
        methods: {
            getLikeArticle() {
                articleApi.getRecommendedArticle(this.$route.params.id)
                    .then(response => {
                        this.articles = response.data.articleVo
                    })
            }
        }
    }
</script>

<style scoped/>