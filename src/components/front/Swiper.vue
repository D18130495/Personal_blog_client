<template>
    <div class="banbox">
        <el-carousel height="260px" interval="5000" direction="vertical">
            <el-carousel-item v-for="(slider, index) in sliders" :key="index">      
                <div class="back">
                    <span class="text" v-if="hover">{{ slider.text }}</span> 
                    <img :class="hover? 'image-hover' : 'image'" :src="slider.img" width="100%" 
                    @mouseover="hover=true" @mouseleave="hover=false">
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- <swiper :options="swiperOption" style="height: 260px;">
            <swiper-slide v-for="(slider, index) in sliders" :key="index">
                <router-link :to="slider.url" target="_blank">
                    <img :src="slider.img" width="100%" alt="">
                </router-link>
            </swiper-slide>
        </swiper> -->
    </div>
</template>

<script>
    import title1 from '../../assets/images/title1.png'
    import title2 from '../../assets/images/title2.jpg'
    import title3 from '../../assets/images/title3.jpg'
    // import SwiperCore, { Autoplay } from 'swiper'
    // SwiperCore.use([ Autoplay ])

    // import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    // import 'swiper/swiper-bundle.css'

    export default {
        name: "SwiperHeader",
        components:{
            // Swiper,
            // SwiperSlide
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
                        text: "Title1",
                        img: title1,
                        url: "www.baidu.com "
                    },
                    {
                        text: "Title2",
                       "img": title2,
                        url:"www.baidu.com "
                    },
                    {
                        text: "Title3",
                       "img": title3,
                        url:"www.baidu.com "
                    }
                ],
                hover: false
            }
        }
    }
</script>

<style scoped>
.back {
    background: #000;
}

.text {
    line-height: 100px;
    font-size: 40px;
    margin-left: 6%;
    color: #ffffff;
    position: absolute;
}

.image-hover {
    opacity: 0.55;
    filter: alpha(opacity=60);
}

.image2 {
    opacity: 1;
}
</style>