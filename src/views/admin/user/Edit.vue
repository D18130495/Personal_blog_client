<template>
    <div v-title data-title="HuaruoYM | Edit User">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="130px">
                <el-form-item label="User Name" prop="userName" style=" width: 90%">
                    <el-input v-model="formData.userName"  placeholder="Please enter username"/>
                </el-form-item>

                <el-form-item label="Nick Name" prop="nickName" style=" width: 90%">
                    <el-input v-model="formData.nickName" placeholder="Please enter nickname" clearable/>
                </el-form-item>

                <el-form-item label="Email" prop="email" style=" width: 90%">
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
                    <el-button type="primary" :loading="loading" @click="submitForm">Update</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import userApi from '@/api/admin/user'
    import status from "../../../utils"

    export default {
        name: "Edit",
        props:['data'],
        data() {
            return {
                formData: {
                    id: '',
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
            this.formData = JSON.parse(JSON.stringify(this.data))
        },
        methods: {
            submitForm() {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true
                        userApi.updateUser(this.formData)
                            .then(response => {
                                this.loading = false
                                this.$refs['formData'].resetFields()
                                this.$emit("after")
                                this.$emit("hideDialog")
                            }).catch(error => {
                                this.loading = true
                                this.$message.error(error)
                            })
                    }
                })
            },
            close() {
                this.$emit("hideDialog")
            }
        }
    }
</script>

<style scoped/>