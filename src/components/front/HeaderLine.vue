<template>
    <div class="headline">
        <ul>
            <li>
                <router-link :to='"/detail/" + title1.id' :title="title1.title" target="_blank">
                    <img src='@/assets/images/title1.png' alt="">
                    <span>
                        {{ title1.title }}
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to='"/detail/" + title2.id' :title="title2.title" target="_blank">
                    <img src='@/assets/images/title2.jpg' alt="">
                    <span>
                        {{ title2.title }}
                    </span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'

    export default {
        name: "HeaderLine",
        data(){
            return{
                articles: [],
                title1: [],
                title2: []
            }
        },
        created() {
            this.getRandomArticle()
        },
        methods: {
            getRandomArticle() {
                articleApi.getRandomArticle()
                    .then(response => {
                        this.articles = response.data
                        this.title1 = this.articles[0]
                        this.title2 = this.articles[1]
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>