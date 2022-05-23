<template>
    <div class="guoshun-info" v-title data-title="HuaruoYM | Information">
        <el-row :gutter="15">
            <el-form ref="defForm" :model="defForm" :rules="rules"  label-width="250px">
                    <el-form-item label="Avatar">
                        <pan-thumb :image="image"/>
                        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">Change your avatar</el-button>
                        <image-cropper
                            v-show="imagecropperShow"
                            :width="300"
                            :height="300"
                            :key="imagecropperKey"
                            :url="'/admin/user/upload'"
                            field="file"
                            @close="closeImage"
                            @crop-upload-success="cropSuccess"
                        />
                    </el-form-item>

                    <el-form-item label="User Name"  prop="userName">
                        <el-input v-model="defForm.userName" placeholder="Please enter user name" :disabled="true" clearable style="width: 40%"/>
                    </el-form-item>

                    <el-form-item label="Nick Name" prop="nickName">
                        <el-input v-model="defForm.nickName" placeholder="Please enter nick name" clearable style="width: 40%"/>
                    </el-form-item>

                    <el-form-item label="Email" prop="email">
                        <el-input v-model="defForm.email" placeholder="Please enter email" clearable style="width: 40%"/>
                    </el-form-item>

                    <el-form-item >
                        <el-button type="primary" :loading="loading" @click="submitForm">Update</el-button>
                        <el-button @click="close">Cancel</el-button>
                    </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import token from '@/store/token'
    
    import userApi from '@/api/admin/user'
    
    import PanThumb from '@/components/admin/PanThumb'
    import ImageCropper from '@/components/admin/ImageCropper'

    export default {
        name: "Info",
        components: {
            PanThumb,
            ImageCropper
        },
        data() {
            return {
                defForm: {
                    id: '',
                    userName: '',
                    nickName: '',
                    avatar: '',
                    email: ''
                },
                loading: false,
                showDialog: false,
                imagecropperShow: false,
                imagecropperKey: 0,
                image: '',
                rules: {
                    nickname: [{required: true, message: 'Please enter nick name', trigger: 'blur'}],
                    email: [{required: true, message: 'Please enter email', trigger: 'blur'}],
                },
                field101Action: 'https://jsonplaceholder.typicode.com/posts/',
            }
        },
        created() {
            this.defForm = token.getUser()
            this.image = this.defForm.avatar
            if (this.defForm.avatar == null){
                this.image = 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
            }
        },
        methods: {
            onClose() {
                this.$refs['elForm'].resetFields()
                this.$emit('changeShow', 'false')
            },
            close() {
                // this.$emit('changeShow', 'false')
                this.$router.push("/index")
            },
            submitForm(){
                this.$refs['defForm'].validate(valid => {
                    if(valid) {
                        this.loading = true
                        userApi.updateUser(this.defForm)
                            .then(response => {
                                this.loading = false
                                this.$message.success(response.message)
                                token.setUser(response.data)
                                this.defForm = response.data
                            }).catch(error => {
                                this.loading = false
                                console.log(error)
                            })
                    }
                })
            },
            cropSuccess(data) {
                this.imagecropperShow = false
                this.defForm.avatar = this.image = data
                this.imagecropperKey = this.imagecropperKey + 1
            },
            closeImage() {
                this.imagecropperShow = false
                // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
                this.imagecropperKey = this.imagecropperKey + 1
            }
        }
    }
</script>

<style scoped>
    .guoshun-info{
        margin-left: 250px;
        margin-top: 30px;
        height: 550px;
    }
</style>