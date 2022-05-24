<template>
    <div v-title data-title="HuaruoYM | Edit Tag">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-form-item label="Tag name" prop="tagName" style=" width: 90%">
                    <el-input v-model="formData.tagName"  placeholder="Please enter tag name" clearable/>
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
    import tagApi from '@/api/admin/tag'

    export default {
        name: "Edit",
        props:['data'],
        data() {
            return{
                formData: {
                    id: '',
                    tagName: '',
                },
                loading: false,
                rules: {
                    tagName: [{required: true, message: 'Please enter tag name', trigger: 'blur'}]
                }
            }
        },
        created() {
           this.formData = JSON.parse(JSON.stringify(this.data))
        },
        methods: {
            submitForm() {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true
                        tagApi.updateTagByTagId(this.formData)
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
            close() {
                this.$emit("hideDialog")
            }
        }
    }
</script>

<style scoped/>