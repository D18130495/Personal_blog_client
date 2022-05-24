<template>
    <el-row :gutter="15">
        <div v-title data-title="HuaruoYM | New User">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="130px">
                <el-form-item label="User Name" prop="userName" style="width: 90%">
                    <el-input v-model="formData.userName" placeholder="Please enter username" clearable/>
                </el-form-item>
                
                <el-form-item label="Nick Name" prop="nickName" style="width: 90%">
                    <el-input v-model="formData.nickName" placeholder="Please enter nickname" clearable/>
                </el-form-item>

                <el-form-item label="Password" prop="password" style="width: 90%">
                    <el-input v-model="formData.password" placeholder="Please enter password" clearable/>
                </el-form-item>

                <el-form-item label="Email" prop="email" style="width: 90%">
                    <el-input v-model="formData.email" placeholder="Please enter Email" clearable/>
                </el-form-item>

                <el-form-item label="Status" prop="status">
                    <el-select v-model="formData.status" placeholder="Please choose status">
                        <el-option v-for="item in this.status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button @click="close">Cancel</el-button>
                    <el-button type="primary" :loading="loading" @click="submitForm">Save</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-row>
</template>

<script>
    import userApi from '@/api/admin/user'
    import status from "../../../utils"

    export default {
        name: "Add",
        data() {
            return{
                formData: {
                    userName: '',
                    password: '',
                    nickName: '',
                    email: '',
                    status: 'T'
                },
                loading: false,
                rules: {
                    userName: [{required: true, message: 'Please enter username', trigger: 'blur'}],
                    nickName: [{required: true, message: 'Please enter nickname', trigger: 'blur'}],
                    password: [{required: true, message: 'Please enter password', trigger: 'blur'}],
                    email: [{required: true, message: 'Please enter Email', trigger: 'blur' },
                            {type: 'email', message: 'Email format is incorrect', trigger: ['blur', 'change']}],
                    status: [{required: true, message: 'Please choose status', trigger: 'change'}]
                },
                status: {}
            }
        },
        created() {
            this.status = status.status
        },
        methods: {
            submitForm(form) {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true
                        userApi.addNewUser(this.formData)
                            .then(response => {
                                this.$message.success(response.message)
                                this.loading = false
                                this.$refs['formData'].resetFields()
                                this.$emit("after")
                                this.$emit("hideDialog")
                            }).catch(error => {
                                this.loading = false
                                console.log(error)
                            })
                    }
                })
            },
            close(){
                this.$emit("hideDialog")
            }
        }
    }
</script>

<style scoped/>