<template>
    <div v-title data-title="HuaruoYM | User">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.userName" placeholder="Search by user name"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="queryForm.nickName" placeholder="Search by nick name"/>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >Search</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success" >Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="id" label="ID" width="180"/>
            <el-table-column align="center" prop="userName" label="User Name" width="180"/>
            <el-table-column align="center" prop="nickName" label="Nick Name"/>
            <el-table-column align="center" prop="email" label="Email"/>
            <el-table-column align="center" prop="createTime" label="Create Time"/>
            <el-table-column align="center" prop="status" label="Status"/>
            <el-table-column align="center" width="150" label="Operation">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit"/>
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

        <el-dialog :visible.sync="addVisble" v-if="addVisble" :close-on-click-modal="false" width="35%">
            <Add @after="addAndEditseach" @hideDialog="hidden"/>
        </el-dialog>

        <el-dialog :visible.sync="editVisble" v-if="editVisble" :close-on-click-modal="false" width="35%">
            <Edit @after="addAndEditseach" :data="formData" @hideDialog="hidden"/>
        </el-dialog>
    </div>
</template>

<script>
    import userApi from '@/api/admin/user'

    import Add from '@/views/admin/user/Add'
    import Edit from '@/views/admin/user/Edit'

    export default {
        name: "User",
        components: {
            Add,
            Edit
        },
        data() {
            return {
                queryForm: {
                    userName:'',
                    nickName:''
                },
                tableData: [],
                formData: {},
                total: 0,
                current: 1,
                limit: 3,
                addVisble: false,
                editVisble: false
            }
        },
        created() {
            this.getAllUserPaginatedList()
        },
        methods: {
            getAllUserPaginatedList() {
                userApi.getUserQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            search() {
                this.current = 1
                this.getAllUserPaginatedList()
            },
            addAndEditseach() {
                this.getAllUserPaginatedList()
            },
            add() {
                this.addVisble = true
            },
            edit(row) {
                this.editVisble = true
                this.formData = row
            },
            del(row) {
                this.$confirm('Are you sure to delete this user "' + row.userName + '" ?', 'Inform')
                    .then(() => {
                        userApi.deleteUserById(row.id)
                            .then(response => {
                                this.$message.success(response.message)
                                this.current = 1
                                this.getAllUserPaginatedList()
                            }).catch(error => {
                                console.log(error)
                            })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            hidden() {
                this.addVisble = false
                this.editVisble = false
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllUserPaginatedList()
            }
        }
    }
</script>

<style scoped/>