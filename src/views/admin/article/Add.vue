<template>
    <div v-title data-title="HuaruoYM | New Article">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="150px" label-position="middle">
                <el-col :span="12">
                    <el-form-item label="Title" prop="title" style="width: 80%">
                        <el-input v-model="formData.title"  placeholder="Please enter title" clearable/>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Channel" prop="channelId" style="width: 80%">
                        <treeselect v-model="formData.channelId" :multiple="false" :options="treeDate"/>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Summary" prop="summary" style="width: 80%">
                        <el-input v-model="formData.summary" placeholder="Please enter summary" clearable/>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="URL" prop="url" style="width: 80%">
                        <el-input v-model="formData.url" placeholder="Please enter URL" clearable/>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="Tag" prop="tagList" style="width: 90%">
                    <el-checkbox-group v-model="formData.selectTagList">
                        <el-checkbox v-for="(tag, index) in tagList" :key="index" :label="tag.id">
                            {{ tag.tagName }}
                        </el-checkbox>
                    </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="Allow Comment" prop="commentStatus">
                            <el-switch
                                    v-model="formData.commentStatus"
                                    active-color="#13ce66"
                                    inactive-color="#999999">
                            </el-switch>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Article Topped" prop="top">
                            <el-switch
                                    v-model="formData.top"
                                    active-color="#13ce66"
                                    inactive-color="#999999">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-col>
                
                <el-col :span="12">
                    <el-form-item label="Title Image" prop="channelImg">
                        <el-upload
                                class="avatar-uploader"
                                action="string"
                                :show-file-list="false"
                                :http-request="uploadImg"
                                :before-upload="beforeImageUpload">
                            <img v-if="formData.titleImg" :src="formData.titleImg" class="new-avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
                    </el-form-item>
                </el-col>
                
                <el-col :span="12">
                    <el-form-item label="Attachment" prop="attachmentList">
                        <el-upload
                                class="upload-demo"
                                action="string"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :http-request="uploadAttachment"
                                :on-exceed="handleExceed"
                                :file-list="formData.articleAttachments"
                                :before-upload="handleUploadFile">
                            <el-button size="small" type="primary">Click to upload</el-button>
                            <div slot="tip" class="el-upload__tip">File size should not exceed 500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="Content" prop="content">
                        <v-md-editor 
                            v-model="formData.content"
                            height="400px"
                            :disabled-menus="[]"
                            @upload-image="handleUploadImage"/>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item>
                        <el-button @click="$router.back()">Cancel</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm">Save</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import token from '@/store/token'

    import articleApi from '@/api/admin/article'
    import channelApi from '@/api/admin/channel'
    import tagApi from '@/api/admin/tag'
    
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
                    channelId: null,
                    title: null,
                    titleImg: '',
                    summary: '',
                    author: token.getUser().userName,
                    url: '',
                    content: '',
                    commentStatus: true,
                    rotation: false,
                    top: false,
                    articleAttachments: [],
                    selectTagList: [],
                    createUserId: token.getUser().id
                },
                tagList: [],
                treeDate: [],
                loading: false,
                image: '',
                rules: {
                    title: [{required: true, message: 'Please enter title', trigger: 'blur'}],
                    channelId: [{required: true, message: 'Please choose channel', trigger: 'blur'}],
                    content: [{required: true, message: 'Please enter content', trigger: 'blur'}]
                }
            }
        },
        created() {
            this.getParentTreeDate()
            this.getTagList()
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
            getTagList() {
                tagApi.getTagList()
                    .then(response => {
                        this.tagList = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            submitForm(form) {
                this.$refs['formData'].validate(valid => {
                    if(valid) {
                        this.loading = true

                        if(this.formData.commentStatus) {
                            this.formData.commentStatus = 1
                        }else {
                            this.formData.commentStatus = 0
                        }
                        
                        if(this.formData.rotation) {
                            this.formData.rotation = 1
                        }else {
                            this.formData.rotation = 0
                        }

                        if(this.formData.top) {
                            this.formData.top = 1
                        }else {
                            this.formData.top = 0
                        }

                        console.log(this.formData)

                        articleApi.addNewArticle(this.formData)
                            .then(response => {
                                this.loading = false
                                this.$message.success(response.message)
                                this.$refs['formData'].resetFields()
                                this.$router.push('/article')
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
                
                articleApi.uploadArticleImageAndFile(formData)
                    .then(response => {
                        this.formData.titleImg = response.data
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
            },
            handleUploadImage(event, insertImage, files) {
                const  formData = new FormData();

                formData.append("file",files[0])
                
                articleApi.uploadArticleImageAndFile(formData)
                    .then(response => {
                        this.image = response.data

                        insertImage({
                            url: this.image,
                            desc: "this.image",
                            width: '50%',
                            height: '50%'
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            beforeRemove(file, articleAttachments) {
                articleAttachments.forEach((item, index) => {
                    if(file.name == item.name){
                        this.formData.articleAttachments.splice(index, 1)
                    }
                })
            },
            uploadAttachment(param) {
                const formData = new FormData()

                formData.append("file",param.file)

                articleApi.uploadArticleImageAndFile(formData)
                    .then(response => {
                        this.formData.articleAttachments.push({
                            name: param.file.name,
                            url: response.data
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleExceed(files, articleAttachments) {
                this.$message.warning(`Limited to select 3 files, current have ${files.length+articleAttachments.length} files`)
            },
            handleUploadFile(file) {
                const isLt2M = file.size / 1024 / 1024 < 2

                if(!isLt2M) {
                    this.$message.error('Upload file size cannot exceed 2MB')
                }

                return isLt2M
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