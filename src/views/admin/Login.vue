<template>
    <div class="login-page" v-title data-title="HuaruoYM Blog | Login">
        <div class="login-page-bg">
            <h2 style="font-weight: 300;">HuaruoYM Blog Login</h2>
            <el-form ref="userInfo" :model="userInfo" :rules="rules">
               <el-form-item prop="userName">
                     <el-input placeholder="Please enter username" v-model="userInfo.userName"></el-input>
                </el-form-item>

                <el-form-item  prop="password">
                    <el-input placeholder="Please enter password" type="password" v-model="userInfo.passWord"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%" type="primary" :loading="loading" @click="submit()">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                userInfo:{
                    userName:'',
                    passWord:''
                },
                loading :false,
                rules:{
                    userName:[{required:true,message:'Please enter username'}],
                    passWord:[{required:true,message:'Please enter password'}],
                }
            }
        },
        methods:{
            submit(){
                this.$refs['userInfo'].validate(valid => {
                    if(valid) {
                        this.loading = true
                        this.$store.dispatch('login', this.userInfo)
                            .then(() => {
                                this.$router.push('/index')
                            }).catch(() => {
                                this.loading = false
                            })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-page{
        height: 100%;
        background: url("../../assets/image/login-bg2.jpg")no-repeat;
        background-size: cover;
    }

    .login-page-bg{
        position: absolute;
        top: 30%;
        left: 33%;
        right: 33%;
        bottom: 30%;

        height: 300px;
        background-color: rgba(0,0,0,0.4);
        border-radius:5px;
        padding-top: 20px;
        color: white;
        text-align: center;
        padding-right: 70px;
        padding-left: 70px;
        box-shadow: #666 0px 0px 10px;
        -webkit-box-shadow: #666 0px 0px 10px;
        -moz-box-shadow: #666 0px 0px 10px;
    }

    .login-page-bg h2{
        margin-bottom: 30px;
    }
</style>