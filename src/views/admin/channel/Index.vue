<template>
    <div v-title data-title="HuaruoYM | Channel">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.name" placeholder="Search by channel name"/>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >Search</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success" >Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Channel Name" align="center"/>
            <el-table-column prop="single" label="Root" align="center"/>
            <el-table-column prop="pos" label="Position" align="center"/>
            <el-table-column prop="userName" label="User Name" align="center"/>
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
    </div>
</template>

<script>
    import channelApi from '@/api/admin/channel'

    export default {
        name: "Index",
        data() {
            return {
                queryForm:{
                    name: ''
                },
                tableData: [],
                total: 0,
                current: 1,
                limit: 7
            }
        },
        created() {
            this.getAllChannelPaginatedList()
        },
        methods: {
            getAllChannelPaginatedList() {
                channelApi.getChannelQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            search() {
                this.current = 1
                this.getAllChannelPaginatedList()
            },
            add() {
                this.$router.push('/channel_add')
                this.addseach()
            },
            edit(row) {
                this.queryForm = row

                this.$router.push({
                    path:'/channel_edit',
                    query:{
                        id: row.id
                    }
                })
            },
            del(row) {
                this.$confirm('Are you sure to delete ' + row.name + '?', 'Inform')
                    .then(() => {
                        channelApi.deleteChannelById(row.id)
                            .then(response => {
                                this.$message.success(response.message)
                                this.current = 1
                                this.getAllChannelPaginatedList()
                            }).catch(error => {
                                console.log(error)
                            })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllChannelPaginatedList()
            }
        }
    }
</script>

<style scoped/>