<template>
    <div v-title data-title="HuaruoYM | Tag">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.tagName" placeholder="Search by tag"/>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary">Search</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success">Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" align="center"/>
            <el-table-column prop="tagName" label="Tag name" align="center"/>
            <el-table-column align="center" label="Operation">
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

        <el-dialog :visible.sync="addVisble" v-if="addVisble" :close-on-click-modal="false">
            <Add @after="addSeach" @hideDialog="hidden"/>
        </el-dialog>

        <el-dialog :visible.sync="editVisble" v-if="editVisble" :close-on-click-modal="false">
            <Edit @after="editSearch" :data="formData" @hideDialog="hidden"/>
        </el-dialog>
    </div>
</template>

<script>
    import tagApi from '@/api/admin/tag'

    import Add from './Add'
    import Edit from './Edit'

    export default {
        name: "Index",
        components: {
            Add,
            Edit
        },
        data() {
            return {
                queryForm:{
                    tagName:'',
                },
                tableData: [],
                formData: {},
                current: 1,
                limit: 7,
                total: 0,
                addVisble: false,
                editVisble: false
            }
        },
        created() {
            this.getAllTagPaginatedList()
        },
        methods: {
            getAllTagPaginatedList() {
                tagApi.getTagQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            search() {
                tagApi.getTagQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            add() {
                this.addVisble = true
            },
            edit(row) {
                this.editVisble = true
                this.formData = row
            },
            del(row) {
                this.$confirm('Are you sure to delete this tag "' + row.tagName + '" ?', 'Inform')
                    .then(() => {
                        tagApi.deleteTagById(row.id)
                            .then(response => {
                                this.$message.success(response.message)
                                this.current = 1
                                this.getAllTagPaginatedList()
                            }).catch(error => {
                                console.log(error)
                            })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            addSeach() {
                this.getAllTagPaginatedList()
            },
            editSearch() {
                this.getAllTagPaginatedList()
            },
            hidden() {
                this.addVisble = false
                this.editVisble = false
            },
            handleCurrentChange(val) {
                this.current = val
                this.getAllTagPaginatedList()
            }
        }
    }
</script>

<style scoped/>