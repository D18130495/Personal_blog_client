<template>

    <div>
        <div class="ad whitebg imgscale">
            <ul>
                <a href="/">
                    <img src="@/assets/images/title1.png">
                </a>
            </ul>
        </div>

        <div class="links whitebg">
            <h2 class="htitle">
                <span class="sqlink"/>
                Related Links
            </h2>
            <ul>
                <li v-for="(friendLink, index) in friendLinks" :key="index">
                    <a :href="friendLink.url" :target="friendLink.target">
                        {{ friendLink.title }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import frendLinkApi from '@/api/front/friendLink'

    export default {
        name: "FriendLink",
        data(){
            return{
                friendLinks: []
            }
        },
        created() {
            this.getAllFriendLinkList()
        },
        methods: {
            getAllFriendLinkList() {
                frendLinkApi.getAllFriendLinkList()
                    .then(response => {
                        this.friendLinks = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>