<template>
    <div v-title data-title="HuaruoYM | Article">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.title" placeholder="Search by title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >Search</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success" >Add</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" align="center"/>
            <el-table-column prop="title" label="Title" align="center"/>
            <el-table-column prop="articleView" label="View" align="center"/>
            <el-table-column prop="user.userName" label="Create User Name" align="center"/>
            <el-table-column prop="createTime" label="Create Time" align="center"/>
            <el-table-column label="Operation" align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit"/>
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
    // import {query,del} from "@/api/article";
    import articleApi from '@/api/admin/article'

    export default {
        name: "Index",
        data() {
            return {
                queryForm: {
                    name: '',
                    userName: ''
                },
                tableData: [],
                current: 1,
                limit: 7,
                total: 0
            }
        },
        created() {
            this.getAllArticlePaginatedList()
        },
        methods: {
            getAllArticlePaginatedList() {
                articleApi.getArticleQueryPaginatedList(this.current, this.limit, this.queryForm)
                    .then(response => {
                        this.tableData = response.data.records
                        this.total = response.data.total
                    }).catch(error => {
                        console.log(error)
                    })
            },
            add() {
                this.$router.push('/article_add')
            },
            edit(row) {
                this.queryForm = row

                this.$router.push({
                    path: '/article_edit',
                    query: {
                        id: row.id
                    }
                })
            },
            del(row){
                this.$confirm('确定要删除'+row.title+'文章吗？','提示').then(()=>{
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
            handleCurrentChange(val) {
                this.current = val
                this.getAllArticlePaginatedList()
            }
        }
    }
</script>

<style scoped/>