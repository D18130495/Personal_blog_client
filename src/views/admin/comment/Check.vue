<template>
    <div v-title data-title="HuaruoYM | Pending Review">
        <div>
            <el-form :inline="true" ref="queryForm" label-width="80px">
                <el-form-item>
                    <el-button icon="el-icon-back" @click="$router.back()">Back</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" align="center"/>
            <el-table-column prop="author" label="Author" align="center"/>
            <el-table-column prop="content" label="Content" align="center"/>
            <el-table-column prop="statusName" label="status" align="center"/>
            <el-table-column prop="email" label="Email" align="center"/>
            <el-table-column prop="createTime" label="Comment Time" align="center"/>
            <el-table-column align="center" label="Operation" width="300px">
                <template slot-scope="scope">
                    <el-button @click="accept(scope.row)" size="small" type="success" >Accept</el-button>
                    <el-button @click="unaccept(scope.row)" size="small" type="warning" >Unaccept</el-button>
                    <el-button @click="del(scope.row)" size="small" type="danger" icon="el-icon-delete"/>
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
    // import {del,getupdateStatus} from "@/api/comment";
    import commentApi from '@/api/admin/comment'

    export default {
        name: "Check",
        data() {
            return {
                tableData: [],
                current: 1,
                limit: 7,
                total: 0,
                number:''
            }
        },
        created() {
            this.getAllUnacceptCommentPaginatedList()
        },
        methods:{
            getAllUnacceptCommentPaginatedList() {
                commentApi.getAllUnacceptCommentPaginatedList(this.current, this.limit)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            del(row) {
                this.$confirm('Are you sure to delete this comment "' + row.id + '" ?', 'Inform')
                    .then(() => {
                        del (row.id).then(response => {
                            this.$message.success(response.message)
                            this.current = 1
                            this.getAllUnacceptCommentPaginatedList()
                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            accept(row) {
                this.$confirm('确定通过此条评论吗？','提示')
                    .then(() => {
                        getupdateStatus (row.id).then(response => {
                            this.$message.success(response.message)
                            this.getAllUnacceptCommentPaginatedList()
                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            unaccept(row) {
                this.$confirm('确定通过此条评论吗？','提示')
                    .then(() => {
                   getupdateStatus (row.id).then(response => {
                            this.$message.success(response.message)
                            this.getAllUnacceptCommentPaginatedList()
                        }).catch(error => {
                            console.log(error)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllUnacceptCommentPaginatedList()
            }
        }
    }
</script>

<style scoped>

</style>