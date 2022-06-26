<template>
    <div class="whitebg cloud" v-if="articleTags">
        <h2 class="htitle">Article Related Tags</h2>
        <ul>
            <router-link v-for=" (tag, index) in articleTags" :key="index" :to='"/tag_list/" + tag.id' target="_blank" >
                {{ tag.tagName }}
            </router-link>
        </ul>
    </div>
</template>

<script>
    import tagApi from '@/api/front/tag'
    
    export default {
        name: "ArticleTag",
        props: ["data"],
        data() {
          return{
            articleId: '',
            articleTags: null
          }
        },
        created() {
            this.getArticleRelatedTag()
        },
        methods: {
            getArticleRelatedTag() {
                tagApi.getArticleRelatedTagByArticleId(this.data)
                    .then(response => {
                        this.articleTags = response.data
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>