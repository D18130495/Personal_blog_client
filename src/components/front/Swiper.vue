<template>
    <div class="banbox">
        <swiper :options="swiperOption" style="height: 260px;">
            <swiper-slide v-for="(item,index) in sliders" :key="index">
                <router-link :to="item.url" target="_blank">
                    <img :src="item.img" width="100%" alt="">
                </router-link>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import SwiperCore, { Autoplay } from 'swiper'
    SwiperCore.use([ Autoplay ])

    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'

    export default {
        name: "SwiperHeader",
        components:{
            Swiper,
            SwiperSlide
        },
        data(){
            return{
                swiperOption: {
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    autoplay: true,
                    loop:true
                },
                sliders:[
                    {
                       "img": "https://www.lego.com/cdn/cs/set/assets/bltee88e5e65f00bd00/42115.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1",
                        url:"www.baidu.com "
                    },
                    {
                       "img": "https://www.lego.com/cdn/cs/set/assets/bltee88e5e65f00bd00/42115.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1",
                        url:"www.baidu.com "
                    },
                    {
                       "img": "https://www.lego.com/cdn/cs/set/assets/bltee88e5e65f00bd00/42115.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1",
                        url:"www.baidu.com "
                    }
                ],
            }
        }
    }
</script>

<style scoped/>