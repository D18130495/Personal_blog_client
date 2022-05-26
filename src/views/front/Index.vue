<template>
    <div v-title data-title="HuaruoYM博客">
        <Header @child-even="parentEven" @child-evenTitle="parentEvenTitle"/>
        <article>
            <div class="lbox">
                <Swiper/>
                <HeaderLine/>
                <Table v-if="xx"/>
                <NewBlog v-if="xx" :search="newData" :childevenTitle="title"/>
            </div>
            <div class="rbox">
                <AboutMe/>
                <Notice/>
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
    import Swiper from "../../components/front/Swiper"
    import HeaderLine from "../../components/front/HeaderLine"
    import Table from "../../components/front/Table"
    import NewBlog from "../../components/front/NewBlog"
    import AboutMe from "../../components/front/AboutMe"
    import Notice from "../../components/front/Notice"
    import Order from "../../components/front/Order"
    import Tag from  '../../components/front/Tag'
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"

    export default {
        name: "Index",
        components: {
            Header, 
            Swiper,
            HeaderLine,
            Table,
            NewBlog,
            AboutMe,
            Notice,
            Order,
            Tag,
            FriendLink,
            Footer
        },
        data() {
            return{
                articles: [],
                pages: '',
                total: 0,
                pageNo: '',
                xx: true,
                newData: '',
                title: ''
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.xx = false
            this.$nextTick(() => {
                this.xx = true
            })
            next()
        },
        methods: {
            parentEven(data) {
                this.newData = data
            },
            parentEvenTitle(data) {
                this.title = data
            }
        }
    }
</script>

<style scoped/>