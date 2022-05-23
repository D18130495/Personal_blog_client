<template>
        <el-row>
            <el-col :span="20">
                <table class="logo">
                    <tr>
                        <td>
                            HuaruoYM Blog
                        </td>
                    </tr>
                </table>
            </el-col>

            <el-col :span="4" align="right">
                <el-dropdown trigger="click" @command="handleCommand" >
                    <el-link class="user" :underline="false">
                        <table>
                            <tr>
                                <td valign="middle">{{ nickName }}</td>
                                <td valign="middle" style="padding-right: 10px">
                                    <el-icon class="el-icon-caret-bottom"></el-icon>
                                </td>
                                <td></td>
                                <td valign="middle" style="height: 57px">
                                    <img :src="avatar" alt="">
                                </td>
                            </tr>
                        </table>
                    </el-link>

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="index">Home</el-dropdown-item>
                        <el-dropdown-item command="info">Information</el-dropdown-item>
                        <el-dropdown-item command="password">Password</el-dropdown-item>
                        <el-dropdown-item command="logout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
</template>

<script>
    import token from '../../store/token'

    export default {
        name: "Header",
        data() {
            return {
                userName :token.getUser().userName,
                nickName: token.getUser().nickName,
                avatar: token.getUser().avatar
            }
        },
        created() {
            if(!token.get()) {
                this.$router.push('/login')
            }
          
            if (token.getUser().avatar == null) {
                this.avatar = 'http://localhost:9000/images/6eb28bd4-c2a2-4b6d-82b1-16faff0ebc74.png'
            }
        },
        methods:{
            handleCommand(command){
                if (command == 'index') {
                    this.$router.push("/")
                }

                if (command == 'info') {
                    this.$router.push("/info")
                }

                if (command == 'password') {
                    this.$router.push("/password")
                }

                if (command == 'logout') {
                    this.$store.commit('logout')
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped>
    .logo{
        height: 60px;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
    }

    .logo img{
        width: 40px;
        height: 40px;
    }
    
    .user{
        color: #ffffff !important;
    }

    .user img{
        width: 46px;
        height: 46px;
        border-radius: 50%;
    }
</style>