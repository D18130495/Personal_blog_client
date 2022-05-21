<template>
    <div>
        <Header/>
        <article>
            <div class="lbox">
                <TagBlog/>
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
    import TagBlog from "../../components/front/TagBlog"
    import Order from "../../components/front/Order"
    import Tag from "../../components/front/Tag"
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"
    export default {
        name: "TagList",
        components: {
            Header,
            TagBlog,
            Order,
            Tag,
            FriendLink,
            Footer
        },
        data(){
            return{
            }
        },
        beforeRouteUpdate(to, from, next){
            next()
        }
    }
</script>

<style scoped/>