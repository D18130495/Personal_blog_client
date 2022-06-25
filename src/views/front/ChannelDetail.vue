<template >
    <div v-title data-title="Category Detail">
        <Header></Header>
        <article>
            <div class="lbox">
                <ChannelInfo :channel = "channel"/>

                <div class="content_box whitebg">
                    <h2 class="htitle">{{ channel.name }}</h2>
                    <!-- <p class="con_info" v-if="channel.summary">{{ channel.summary }}</p> -->
                    <div class="con_text">
                        <v-md-preview :text="channel.content"/>
                    </div>
                </div>

                <div class="whitebg bloglist" v-if="childrenChannelList">
                    <h2 class="htitle">Related Channel</h2>

                    <ul>
                        <li v-for="(children, index) in childrenChannelList" :key="index">
                            <h3 class="blogtitle">
                                <router-link :to='"/list/" + children.id' target="_blank">
                                    {{ children.name }}
                                </router-link>
                            </h3>

                            <span class="blogpic imgscale">
                                <i>
                                    <router-link :to='"/list/" + children.id' target="_blank">
                                        {{ children.name }}
                                    </router-link>
                                </i>

                                <router-link :to='"/list/" + children.id' target="_blank">
                                    <img v-if="children.channelImg == null || children.channelImg ==''" width="130px" height="120px" src="@/assets/images/flower.jpg" alt="">
                                    <img v-else :src="children.channelImg" alt="channel image" width="130px">
                                </router-link>
                            </span>

                            <p class="blogtext">{{ children.summary }}</p>
                            <router-link :to='"/detail/" + children.id' target="_blank" class="viewmore">More</router-link >
                        </li>
                    </ul>
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
    import '@/assets/css/base.css'
    import '@/assets/css/m.css'
    import Header from "../../components/front/Header"
    import ChannelInfo from '../../components/front/ChannelInfo'
    import Order from "../../components/front/Order"
    import Tag from "../../components/front/Tag"
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"

    import channelApi from '@/api/front/channel'
    
    export default {
        name: "Channel_Detail",
        components: {
            Header,
            ChannelInfo,
            Order,
            Tag, 
            FriendLink, 
            Footer
        },
        data() {
            return{
                channel: {},
                childrenChannelList: {}
            }
        },
        created() {
            this.getChannelById()
            this.getChildrenChannelListByParentChannelId()
        },
        beforeRouteUpdate(to, from, next) {
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
            },
            getChildrenChannelListByParentChannelId() {
                channelApi.getChildrenChannelListByParentChannelId(this.$route.params.id)
                    .then(response => {
                        this.childrenChannelList = response.data
                        console.log(this.childrenChannelList)
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>