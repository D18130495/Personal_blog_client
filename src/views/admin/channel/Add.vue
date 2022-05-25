<template>
    <div v-title data-title="HuaruoYM | New Channel">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="150px">
                <el-form-item label="Channel Name" prop="name">
                    <el-input v-model="formData.name" placeholder="Please enter channel name" clearable style="width: 40%"/>
                </el-form-item>

                <el-form-item label="Parent Channel" prop="parentId">
                    <treeselect v-model="formData.parentId" placeholder="Please choose parent channel" :multiple="false" :options="treeDate" clearable style="width: 40%"/>
                </el-form-item>

                <el-form-item label="Summary" prop="summary">
                    <el-input v-model="formData.summary" placeholder="Please enter channel summary" clearable style="width: 40%"/>
                </el-form-item>

                <el-form-item label="Position" prop="pos">
                    <el-select v-model="formData.pos" placeholder="Please choose position" clearable style="width: 40%">
                        <el-option 
                            v-for="item in this.pos"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="Related URL" prop="url">
                    <el-input v-model="formData.url" placeholder="Please enter related URL" clearable style="width: 40%">
                    </el-input>
                </el-form-item>

                <el-form-item label="SEO Title" prop="seoTitle">
                    <el-input v-model="formData.seoTitle" placeholder="Please enter SEO title" clearable style="width: 40%">
                    </el-input>
                </el-form-item>

                <el-form-item label="SEO Keyword" prop="seoKeyword">
                    <el-input v-model="formData.seoKeyword" placeholder="Please enter SEO keyword" clearable style="width: 40%">
                    </el-input>
                </el-form-item>

                <el-form-item label="SEO Description" prop="seoDescription">
                    <el-input v-model="formData.seoDescription" placeholder="Please enter SEO description" clearable style="width: 40%">
                    </el-input>
                </el-form-item>

                <el-form-item label="Root" prop="single">
                    <el-switch
                        v-model="formData.single"
                        active-color="#13ce66"
                        inactive-color="#999999"
                    />
                </el-form-item>

                <el-form-item label="Channel Image" prop="channelImg">
                    <el-upload
                            class="avatar-uploader"
                            action="string"
                            :show-file-list="false"
                            :http-request="uploadImg"
                            :before-upload="beforeImageUpload">
                        <img v-if="formData.channelImg" :src="formData.channelImg" class="new-avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"/>
                    </el-upload>
                </el-form-item>

                <el-form-item label="Content" prop="content">
                    <v-md-editor v-model="formData.content" height="400px"></v-md-editor>
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
    import token from '@/store/token'
    import pos from '@/utils/index'

    import channelApi from '@/api/admin/channel'

    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: "Add",
        components: { 
            Treeselect
        },
        data() {
            return {
                formData: {
                    name: '',
                    parentId: null,
                    channelImg: '',
                    summary: '',
                    single: false,
                    url: '',
                    pos: 'A',
                    seoTitle: '',
                    seoKeyword: '',
                    seoDescription: '',
                    content: '',
                    createUser: token.getUser().id
                },
                treeDate: [],
                loading: false,
                rules: {
                    name: [{required: true, message: 'Plesae enter channel name', trigger: 'blur'}]
                },
                pos: {}
            }
        },
        created() {
            this.getParentTreeDate()
            this.pos = pos.pos
        },
        methods: {
            getParentTreeDate() {
                channelApi.getParentTreeData()
                    .then(response => {
                        this.treeDate = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            submitForm(form) {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true

                        if(this.formData.single) {
                            this.formData.single = 'Y'
                        }else {
                            this.formData.single = 'N'
                        }

                        channelApi.addNewChannel(this.formData)
                            .then(response => {
                                this.loading = false
                                this.$message.success(response.message)
                                this.$refs['formData'].resetFields()
                                this.$router.push('/channel')
                            }).catch(error => {
                                this.loading = false
                                console.log(error)
                            })
                    }
                })
            },
            uploadImg(param) {
                const formData = new FormData()

                formData.append("file", param.file)
                
                channelApi.uploadChannelImage(formData)
                    .then(response => {
                        this.formData.channelImg = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            beforeImageUpload(file) {
                const isIMAGE = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type ==='image/png')
                const isLt2M = file.size / 1024 / 1024 < 2

                if(!isIMAGE) {
                    this.$message.error('Upload file should be image format')
                }

                if(!isLt2M) {
                    this.$message.error('Upload file size cannot exceed 2MB')
                }

                return isIMAGE && isLt2M
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        width: 80px;
        height: 80px;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 24px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    
    .new-avatar {
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
</style>