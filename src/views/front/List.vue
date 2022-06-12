<template>
    <div v-title data-title="Channel Detail">
        <Header></Header>
        <article>
            <div class="lbox">
                <ChannelInfo :channel = "channel"/>
                <ChannelBlog v-if="xx"/>
            </div>
            <div class="rbox">
                <Order/>
                <Tag/>
                <FriendLink/>
            </div>
        </article>
        <Footer></Footer>
    </div>
</template>

<script>
    import  '@/assets/css/base.css'
    import  '@/assets/css/m.css'
    import Header from "../../components/front/Header"
    import ChannelInfo from '../../components/front/ChannelInfo'
    import ChannelBlog from "../../components/front/ChannelBlog"
    import Order from "../../components/front/Order"
    import Tag from "../../components/front/Tag"
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"
    
    import channelApi from '@/api/front/channel'
    
    export default {
        name: "List",
        components: {
            Header,
            ChannelInfo,
            ChannelBlog,
            Order,
            Tag,
            FriendLink,
            Footer
        },
        data() {
          return{
              channelId: 0,
              channel: {},
              xx:true,
          }
        },
        created() {
            this.getChannelById()
        },
        beforeRouteUpdate(to, from, next){
            this.channelId = to.params.id
            this.getChannel(to.params.id)
            this.xx = false
            this.$nextTick(() => {
                this.xx = true
            })
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