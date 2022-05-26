<template>
    <div v-title data-title="HuaruoYM | Comment">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.content" placeholder="Search by keyword"/>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >Search</el-button>
                    <el-button  @click="check" type="error" >
                        Pending Review
                        <span style="color: #ff180e;font-size: 15px">
                            {{ number }}
                        </span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" align="center"/>
            <el-table-column prop="author" label="Author" align="center"/>
            <el-table-column prop="content" label="Content" align="center"/>
            <el-table-column prop="statusName" label="Status" align="center"/>
            <el-table-column prop="email" label="Email" align="center"/>
            <el-table-column prop="createTime" label="Comment Time" align="center"/>
            <el-table-column align="center" label="Opeartion">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row)"  size="small" type="danger" icon="el-icon-delete"/>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-size="limit"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import commentApi from '@/api/admin/comment'

    export default {
        name: "Index",
        data() {
            return {
                queryForm: {
                    content: ''
                },
                tableData: [],
                current: 1,
                limit: 7,
                total: 0,
                number: ''
            }
        },
        created() {
            this.getAllCommentPaginatedList()
            this.getCommentStatus()
        },
        methods: {
            getAllCommentPaginatedList() {
                commentApi.getCommentQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            getCommentStatus() {
                commentApi.getCommentStatus()
                    .then(response => {
                        this.number = response.data
                    }).catch(error => {
                        console.log(error)
                    })
            },
            search() {
                this.current = 1
                this.getAllCommentPaginatedList()
            },
            check() {
                this.$router.push('/comment_check')
            },
            del(row) {
                this.$confirm('Are you sure to delete this comment "' + row.id + '" ?', 'Inform').then(()=>{
                    commentApi.deleteCommentById(row.id)
                        .then(response => {
                            this.$message.success(response.message)
                            this.current = 1
                            this.getAllCommentPaginatedList()
                        }).catch(error => {
                            console.log(error)
                        })
                }).catch(error => {
                    console.log(error)
                })
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllCommentPaginatedList()
            }
        }
    }
</script>

<style scoped/>