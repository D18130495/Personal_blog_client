<template>
    <div>
        <header id="header">
            <div class="navbox">
                <h2 id="mnavh" >
                    <span class="navicon"/>
                </h2>
                <div class="logo">
                    <a href="/">HuaruoYM Blog</a>
                </div>
                <nav>
                    <ul id="starlist">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li v-for="(channel, index) in channels" :key="index" :class="{menu: channel.children}">
                            <router-link v-if="channel.single"  :to='"/channel_detail/" + channel.id' target="_blank">{{ channel.name }}</router-link>
                            <router-link v-else :to='"/list/" + channel.id' target="_blank">{{ channel.name }}</router-link>

                            <ul class="sub" v-if="channel.children">
                                <li v-for="(sub, sindex) in channel.children" :key="sindex">
                                    <router-link :to='"/list/" + sub.id' target="_blank">{{ sub.name }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li >
                            <router-link to="/index" target="_blank">后台管理</router-link>
                        </li>
                    </ul>
                </nav>
                <div class="searchico"/>
            </div>
        </header>

        <div class="searchbox">
            <div class="search">
                <div>
                    <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                        <el-form-item>
                            <el-input v-model="queryForm.title" style="width: 330px" placeholder="Search by article title"/>
                        </el-form-item>
                        <el-form-item>
                            <a href="#content" name="search">
                                <el-button icon="el-icon-search" @click="search" type="primary" >Search</el-button>
                            </a>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="searchclose"/>
        </div>
    </div>
</template>

<script>
    import articleApi from '@/api/front/article'
    import channelApi from '@/api/front/channel'
    import $ from 'jquery'

    export default {
        data() {
            return{
                channels: [],
                queryForm: {
                    title: ''
                },
                articles: [],
                current: 1,
                limit: 4
            }
        },
        created() {
            this.getChannelA()
        },
        mounted() {
            $("#mnavh").click(function() {
                $("#starlist").toggle();
                $("#mnavh").toggleClass("open");
            })
            
            //search
            $(".searchico").click(function() {
                $(".search").toggleClass("open");
            })

            //searchclose
            $(".searchclose").click(function() {
                $(".search").removeClass("open");
            })
        },
        methods:{
            getChannelA() {
                channelApi.getChannelByPos('a')
                    .then(response => {
                        this.channels = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            search() {
                this.current = 1
                this.list()
            },
            list() {
                articleApi.getArticleQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.articles = response.data
                        this.$emit('child-even', this.articles)
                        this.$emit('child-evenTitle', this.queryForm.title)
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped/>