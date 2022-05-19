<template>
    <div class="whitebg cloud">
        <h2 class="htitle">Tags</h2>
        <ul>
            <router-link  v-for=" (tag, index) in tags" :key="index" :to='"/tag_list/" + tag.id' target="_blank" >
                {{ tag.tagName }}
            </router-link>
        </ul>
    </div>
</template>

<script>
    import tagApi from '@/api/front/tag'
    
    export default {
        name: "Tag",
        data() {
          return{
              tags: []
          }
        },
        created() {
            this.getAllTag()
        },
        methods: {
            getAllTag() {
                tagApi.getAllTag()
                    .then(response => {
                        this.tags = response.data
                        console.log(this.tags)
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>