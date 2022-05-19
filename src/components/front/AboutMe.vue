<template>
    <div class="card">
        <h2>My resume</h2>
        <p><i class="el-icon-postcard"/> Yushun Zeng | Jim</p>
        <p><i class="el-icon-location-outline"/> Ireland, Dublin</p>
        <p><i class="el-icon-school"/> Technological University Dublin</p>
        <p><i class="el-icon-message"/> 990415zys@gmail.com</p>
        <ul class="linkmore">
            <li><a href="/" class="iconfont icon-zhuye" title="Home"/></li>
            <li id="weixin">
                <a class="iconfont icon-weixin" title="Wechat"/>
                <i>
                    <img src="@/assets/images/WeChat.jpg">
                </i>
            </li>
            <li id="weixin">
                <a class="iconfont icon-whatsapp" title="WhatsApp"/>
                <i>
                    <img src="@/assets/images/WhatsApp.jpg">
                </i>
            </li>        
        </ul>
    </div>
</template>

<script>
    export default {
        name: "AboutMe"
    }
</script>

<style scoped/>