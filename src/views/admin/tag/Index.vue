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
            <Add @after="addseach" @hideDialog="hidden"/>
        </el-dialog>

        <el-dialog :visible.sync="editVisble" v-if="editVisble" :close-on-click-modal="false">
            <Edit @after="search" :data="formData" @hideDialog="hidden"/>
        </el-dialog>
    </div>
</template>

<script>
    // import {query,del} from "../../../api/tag";
    import tagApi from '@/api/admin/tag'

    // import Add from './Add'
    // import Edit from './Edit'

    export default {
        name: "Index",
        components: {
            // Add,
            // Edit
        },
        data() {
            return {
                queryForm:{
                    tagName:'',
                },
                tableData: [],
                formData: {},
                current: 1,
                limit: 5,
                total: 0,
                addVisble: false,
                editVisble: false
            }
        },
        created() {
            this.getAllTagPaginatedList()
        },
        methods: {
            search() {
                let  param =this.queryForm
                this.pageNo =1
                param.page=this.pageNo
                this.list(param)
            },
            getAllTagPaginatedList() {
                tagApi.getTagQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
            },
            del(row) {
                this.$confirm('确定要删除'+row.tagName+'标签吗？','提示').then(()=>{
                    del (row.id).then(data=>{
                        let param= this.queryForm
                        param.page =this.pageNo
                        this.list(param)
                    }).catch(error=>{

                        this.$message.error(error)
                    })
                }).catch(error=>{

                })
            },
            add() {
                this.addVisble=true
            },
            edit(row) {
                this.editVisble=true
                this.formData=row
            },
            addseach() {
                let  param =this.queryForm
                param.page=this.pageNo
                this.list(param)
                query(param).then(data=>{
                    this.pages=data.pages
                    this.handleCurrentChange(this.pages)
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            hidden() {
                this.addVisble = false
                this.editVisble = false
            },
            handleCurrentChange(val){
                this.current = val
                this.getAllTagPaginatedList()
            },
        }
    }
</script>

<style scoped/>