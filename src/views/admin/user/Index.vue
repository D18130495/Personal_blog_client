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
            <el-table-column prop="id" label="ID" width="180"/>
            <el-table-column prop="userName" label="User Name" width="180"/>
            <el-table-column prop="nickName" label="Nick Name"/>
            <el-table-column prop="email" label="Email"/>
            <el-table-column prop="createDate" label="Create Time"/>
            <el-table-column prop="status" label="Status"/>
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
            :current-page="pageNo"
            :page-size="7"
            :total="total">
        </el-pagination>

        <!-- <el-dialog :visible.sync="addVisble" v-if="addVisble" :close-on-click-modal="false">
            <Add @after="addseach" @hideDialog="hidden"></Add>
        </el-dialog>

        <el-dialog :visible.sync="editVisble" v-if="editVisble" :close-on-click-modal="false">
            <Edit @after="search" :data="formData" @hideDialog="hidden"></Edit>
        </el-dialog> -->
    </div>
</template>

<script>
    import userApi from '@/api/admin/user'
    // import {query,del} from "../../../api/user"
    // import Add from './Add'
    // import Edit from './Edit'

    export default {
        name: "User",
        components:{
            // Add,
            // Edit
        },
        data() {
            return {
                queryForm: {
                    userName:'',
                    nickName:''
                },
                tableData: [],
                total: 0,
                pageNo: 1,
                pages: '',
                formData: {},
                addVisble: false,
                editVisble: false
            }
        },
        mounted() {
            // this.list({"page":this.pageNo})
        },
        methods: {
            // handleCurrentChange(val){
            //     let  param =this.queryForm
            //     this.pageNo=val
            //     param.page=this.pageNo
            //     this.list(param)
            // },
            // search(){
            //     let  param =this.queryForm
            //     this.pageNo =1
            //     param.page=this.pageNo
            //     this.list(param)
            // },
            // list(param){
            //     query(param).then(data=>{
            //         this.tableData=data.list
            //         this.total=data.total

            //     }).catch(error=>{
            //         this.$message.error(error)
            //     })
            // },
            // add(){
            //     this.addVisble=true
            // },
            edit(row) {
                this.editVisble=true
                this.formData=row
            },
            del(row) {
                this.$confirm('确定要删除'+row.userName+'用户吗？','提示').then(()=>{
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
            // addseach(){
            //     let  param =this.queryForm
            //     param.page=this.pageNo
            //     this.list(param)
            //     query(param).then(data=>{
            //         this.pages=data.pages
            //         this.handleCurrentChange(this.pages)
            //     }).catch(error=>{
            //         this.$message.error(error)
            //     })
            // },
            // hidden(){
            //     this.addVisble=false
            //     this.editVisble=false
            // }
        }
    }
</script>

<style scoped>

</style>