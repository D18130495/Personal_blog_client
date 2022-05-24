<template>
    <div v-title data-title="HuaruoYM | Friend Link">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.title" placeholder="Search by title"/>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary">Search</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success">Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" align="center"/>
            <el-table-column prop="title" label="Title" align="center"/>
            <el-table-column prop="url" label="URL" align="center"/>
            <el-table-column prop="target" label="Open Method" align="center"/>


            <el-table-column label="Opeartion" align="center">
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
    </div>
</template>

<script>
    import friendlinkApi from '@/api/admin/friendlink'

    export default {
        name: "Index",
        data() {
            return {
                queryForm: {
                    name: '',
                    userName: ''
                },
                tableData: [],
                formData: {},
                current: 1,
                limit: 5,
                total: 0
            }
        },
        created() {
            this.getAllFriendLinkPaginatedList()
        },
        methods: {
            getAllFriendLinkPaginatedList() {
                friendlinkApi.getFriendLinkQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
            },
            add() {
                this.$router.push('/friend_add')
            },
            edit(row) {
                this.queryForm = row
                this.$router.push({
                    path:'/friend_edit',
                    query:{
                        id: row.id
                    }
                })
            },
            del(row) {
                this.$confirm('Are you sure to delete this link "' + row.title + '" ?', 'Inform')
                    .then(() => {
                        friendlinkApi.deleteFriendLinkById(row.id)
                            .then(response => {
                                this.$message.success(response.message)
                                this.current = 1
                                this.getAllFriendLinkPaginatedList()
                            }).catch(error => {
                                console.log(error)
                            })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            addSeach() {
                this.getAllFriendLinkPaginatedList()
            },
            editSearch() {
                this.getAllFriendLinkPaginatedList()
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllFriendLinkPaginatedList()
            }
        }
    }
</script>

<style scoped/>