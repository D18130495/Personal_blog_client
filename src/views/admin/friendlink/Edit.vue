<template>
    <div v-title data-title="HuaruoYM | Edit Link">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="150px">
                <el-form-item label="Title" prop="title" style="width: 40%">
                    <el-input v-model="formData.title"  placeholder="Please enter title" clearable/>
                </el-form-item>

                <el-form-item label="URL" prop="url" style="width: 40%">
                    <el-input v-model="formData.url" placeholder="Please enter URL" clearable/>
                </el-form-item>

                <el-form-item label="Open Method" prop="url" style="width: 40%">
                    <el-radio v-model="formData.target" label="_blank">New Tab</el-radio>
                    <el-radio v-model="formData.target" label="_self">Current Tab</el-radio>
                </el-form-item>
     
                <el-form-item>
                    <el-button @click="$router.back()">Cancel</el-button>
                    <el-button type="primary" :loading="loading" @click="submitForm">Save</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import friendlinkApi from '@/api/admin/friendlink'
    
    export default {
        name: "Edit",
         data() {
            return {
                formData: {
                    title: '',
                    url: '',
                    target: '_blank'
                },
                loading: false,
                rules: {
                    title: [{required: true, message: 'Please enter title', trigger: 'blur'}],
                    url: [{required: true, message: 'Please enter URL', trigger: 'blur'}]
                },
                friendLinkId: ''
            }
        },
        created() {
            this.friendLinkId = this.$route.query.id
            this.getFriendLinkByFriendLinkId()
        },
        methods: {
            getFriendLinkByFriendLinkId() {
                friendlinkApi.getFriendLinkByFriendLinkId(this.friendLinkId)
                    .then(response => {
                        this.formData = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            submitForm() {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true

                        friendlinkApi.updateFriendLinkByFriendLinkId(this.formData)
                            .then(response => {
                                this.loading = false
                                this.$message.success(response.message)
                                this.$refs['formData'].resetFields()
                                this.$router.push('/friend')
                            }).catch(error => {
                                this.loading = false
                                console.log(error)
                            })
                    }
                })
            }
        }
    }
</script>

<style scoped/>