<template>
    <div class="guoshun-form">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="24">
                    <el-form-item prop="content">
                        <el-input type="textarea" :rows="8" v-model="formData.content" height=130px></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item  prop="author">
                        <el-input v-model="formData.author" placeholder="Please enter your nickname" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>

                    <el-form-item  prop="email">
                        <el-input v-model="formData.email" placeholder="Please enter your Email" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="15">
                    <el-form-item>
                        <el-button type="primary" style="width:379px; height: 43px;margin-bottom:20px;font-size: 17px" :loading="loading" @click="submitForm">Submit</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import commentApi from '@/api/front/comment'

    export default {
        name: "Form",
        data() {
            return{
                formData: {
                    author: '',
                    email: '',
                    content: '',
                    articleId: ''
                },
                loading: false,
                rules: {
                    author: [{required: true, message: 'Please enter your nickname', trigger: 'blur'}],
                    content: [{required: true, message: 'Please enter your comment', trigger: 'blur'}],
                    email: [{ required: true, message: 'Please enter your Email', trigger: 'blur'},
                            { type: 'email', message: 'Email format is not correct', trigger: ['blur', 'change']}],
                }
            }
        },
        created(){
            this.formData.articleId = this.$route.params.id
        },
        methods: {
            submitForm(){
                this.$refs['formData'].validate((valid) => {
                    if(valid) {
                        commentApi.newComment(this.formData)
                            .then(response =>{
                                this.$message.success(response.message)
                                this.$refs['formData'].resetFields()
                            }).catch(error => {
                                this.$message.error(error)
                            })
                    }else {
                        console.log('error submit')
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .guoshun-form{
        margin-left: -80px;
        margin-top: 20px;
    }
</style>