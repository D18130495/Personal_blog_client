<template >
    <div v-title data-title="Channel">
        <Header></Header>
        <article>
            <div class="lbox">
                <div class="content_box whitebg">
                    <h2 class="htitle">{{ channel.name }}</h2>

                    <p class="con_info" v-if="channel.summary">{{ channel.summary }}</p>
                    <div class="con_text">
                        <v-md-preview :text="channel.content"></v-md-preview>
                    </div>
                </div>
            </div>
            <div class="rbox">
                <Order/>
                <Tag/>
                <FriendLink/>
            </div>
        </article>
        <Footer/>
    </div>
</template>

<script>
    import  '@/assets/css/base.css'
    import  '@/assets/css/m.css'
    import Header from "../../components/front/Header"
    import Order from "../../components/front/Order"
    import Tag from "../../components/front/Tag"
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"

    import channelApi from '@/api/front/channel'
    
    export default {
        name: "Channel_Detail",
        components: {
            Header,
            Order,
            Tag, 
            FriendLink, 
            Footer
        },
        data() {
            return{
                channel: {}
            }
        },
        created() {
            this.getChannelById()
        },
        beforeRouteUpdate(to, from, next){
            this.getChannelById(to.params.id)
            next()
        },
        methods: {
           getChannelById() {
                channelApi.getChannelByChannelId(this.$route.params.id)
                    .then(response => {
                        this.channel = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>