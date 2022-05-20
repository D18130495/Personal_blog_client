<template>
    <div v-title data-title="文章">
        <Header/>
        <article>
           <div class="lbox">
                <div class="content_box whitebg">
                    <h2 class="htitle">
                        <span class="con_nav">
                            Location:
                                <a href="/">
                                    Home
                                </a>
                                &gt;
                                <a href="/">
                                    {{ article.title }}
                                </a>
                        </span>
                        Article
                    </h2>
                    
                    <h1 class="con_tilte">{{ article.title }}</h1>
                    
                    <p class="bloginfo">
                        <i class="avatar">
                            <img :src="user.avatar">
                        </i>
                        <span>
                            {{ user.nickName }}
                        </span>
                        <span>
                            {{ article.createTime }}
                        </span>
                        <span>
                            {{ article.articleView }}
                            Views
                        </span>
                    </p>

                    <p class="con_info">
                        <b>摘要</b>
                        {{ article.summary }}
                    </p>

                    <div class="con_text">
                        <v-md-preview :text="article.content"></v-md-preview>
                    </div>
                </div>

                <div id="comments" class="comments-area" v-if="article.commentStatus == 0 || article.commentStatus == null">
                    <ol class="comment-list">
                        <li class="comments-anchor">
                            <ul id="anchor-comment-40"/>
                            <div id="respond" class="comment-respond">
                                <h3 id="reply-title" class="comment-reply-title">
                                    <span id="reply-title-word">
                                        Comments
                                    </span>
                                </h3>
                                <Form></Form>
                            </div>
                        </li>

                        <!-- <li class="comment fadeInUp" id="comment-2044"
                            v-for=" (item,index) in comments" :key="index">
                            <div id="div-comment-2044" class="comment-body">
                                <div class="comment-author vcard">
                                        <img class="avatarss" src="https://oss.liuyanzhao.com/avatar/84.jpg" alt="avatar">
                                        <div  style="margin-left: 90px">
                                            <a href="/author/aaaaaaaaaaaa@qq.com.html" target="_blank"><strong>{{item.author}}</strong></a>
                                            <span class="comment-meta commentmetadata">
                                                <a href="#comment-2383"></a><br>
                                                <span class="comment-aux">
                                                    {{item.createDate}}
                                                    2019年03月22日 15:09:58
                                                    <a class="comment-edit-link" href="#">编辑</a>
                                                </span>
                                            </span>
                                        <p>{{item.content}}</p>
                                    </div>
                                </div>
                            </div>
                            <div id="anchor-2044"></div>
                            <ul class="children">
                            </ul>
                        </li> -->
                    </ol>
                </div>
           </div>

            <div class="rbox">
                <Order/>
                <Like/>
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
    import Form from "../../components/front/Form"
    import Order from "../../components/front/Order"
    import Like from  '../../components/front/Like'
    import Tag from "../../components/front/Tag"
    import FriendLink from "../../components/front/FriendLink"
    import Footer from "../../components/front/Footer"

    // import {getArticle,getCommentArticle} from "../../api/front";
    import articleApi from '@/api/front/article'
    
    export default {
        name: "Detail",
        components: {
            Header, 
            Form,
            Order,
            Like,
            Tag,
            FriendLink,
            Footer
        },
        data(){
            return{
                article: {},
                user: [],
                comments:[],
                xx: true
            }
        },
        beforeRouteUpdate(to, from, next){
            articleApi.getArticleById(to.params.id)
                .then(response => {
                    this.article = response.data
                    this.user = response.data.user
                })
            
            this.xx = false
            
            this.$nextTick(() => {
                this.xx = true
            })
            
            next()
        },
        created(){
            this.getArticle()
        },
        methods:{
            getArticle() {
                articleApi.getArticleById(this.$route.params.id)
                    .then(response => {
                        this.article = response.data
                        this.user = response.data.user
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            // getCommentArticle(this.$route.params.id).then(data=>{
            //     this.comments=data.data
            // })
        }
    }
</script>

<style scoped>
    .comment-list li {
        position: relative;
        background: #fff;
        margin: 0 0 10px 0;
        padding: 15px 20px 30px 20px;
        border: 1px solid #ddd;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        word-wrap: break-word;
        word-break: break-all;
    }

    .reply a {
        background: #fff;
        line-height: 25px;
        display: block;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 2px;
    }

    .avatarss{
        position: relative;
        float: left;
        width: 60px;
        height: 60px;
        padding: 5px;
        display: block;
        background: -webkit-linear-gradient(bottom left, rgba(0,153,255,.9),
        rgba(42,228,197,.7)); background: -o-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: linear-gradient(to top right, rgba(0,153,255,.9), rgba(42,228,197,.7));
    }

    #respond {
        background: #fff;
        margin: 0 0 10px 0;
        padding: 10px 20px;
        border: 1px solid #ddd;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
        border-radius: 2px;
    }
</style>