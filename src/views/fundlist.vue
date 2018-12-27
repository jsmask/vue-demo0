<template>
    <div class="fundlist">
        
        <div class="tools-box">
            <div style="float:left;">
                    <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                     <el-button style="margin-left:15px;" type="warning" size="medium"  @click="toSearch">筛选</el-button>
            </div>
            <el-button v-if="user.identity=='manager'" style="float:right;" type="primary" size="medium"  @click="handleAdd">追加</el-button>           
        </div>
             <el-table :data="tableData" border style="width: 100%" height="75%">

                <el-table-column  label="序号" width="60" align="center" type="index">
                </el-table-column>

                <el-table-column  label="创建时间" width="200" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ getDate(scope.row.date) }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="收支类型" align="center">               
                    <template slot-scope="scope">
                        <span>{{ ['支出','收入'][scope.row.type] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="收支描述" align="center">               
                    <template slot-scope="scope">
                        <span>{{ scope.row.describe }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="收入" align="center">               
                    <template slot-scope="scope" align="center">
                        <span>{{ scope.row.income }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="支出" align="center">               
                    <template slot-scope="scope">
                        <span>{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>

                 <el-table-column label="账户现金" align="center">               
                    <template slot-scope="scope">
                        <span>{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>

                 <el-table-column label="备注" align="center" width="300">               
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button v-if="user.identity=='manager'" @click="handleEdit(scope.$index,scope.row)" size="mini" icon="el-icon-edit"></el-button>
                        <el-button v-if="user.identity=='manager'" type="danger" @click="handleDelete(scope.$index,scope.row)" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="paginations.total">
                        </el-pagination>
            </div>

            <Dialog :dialog="dialog" @update="getListData"></Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog'
    import com from '../com.js'
    export default {
        name:"fundlist",
        data() {
            return {
                date:"",
                allData:[],
                tableData: [],
                filterTableData:[],
                paginations:{
                    page_index:1,
                    total:0,
                    page_size:5,
                    page_sizes:[5,10,15,20]
                },
                dialog:{
                    title:"",
                    option:0,
                    show:false,
                    fullscreen:false,
                    formData:{
                        type:"",
                        describe:"",
                        income:"",
                        expend:"",
                        cash:"",
                        remark:""
                    }
                }
            }
        },
        components:{
            Dialog
        },
        created(){
           this.getListData(); 
        },
        computed:{
            user(){             
                 return this.$store.getters.user;
            }
        },
        methods:{
            toSearch(){
                if(!this.date){
                    this.getListData();
                    return;
                }
                let startTime=new Date(this.date[0]).getTime();
                let endTime=new Date(this.date[1]).getTime();

                this.allData=this.filterTableData.filter(item=>{
                    let time=new Date(item.date).getTime();
                    return time>=startTime&&time<=endTime;
                });
                this.setPaginations();
            },
            handleSizeChange(page_size){
                this.setPaginations(1,page_size);
            },
            handleCurrentChange(page){
               this.setPaginations(page,this.paginations.page_size);
            },
            setPaginations(page_index=1,page_size=5){
                this.paginations.total=this.allData.length;           
                let page=this.paginations.page_index=page_index;
                let size=this.paginations.page_size=page_size;
                
                this.tableData=this.allData.filter((value,index)=>{
                    return index>=(page-1)*size&&index<page*size;
                });
            },
            getListData(){
                this.$axios
                .get("api/profiles")
                .then(result=>{
                    const res=result.data;
                    if(res.status==1){
                        this.allData=res.data.list;  
                        this.filterTableData=res.data.list;                    
                        this.setPaginations();
                    }
                    else{
                        this.$message({
                            message:res.text,
                            type:"error"
                        });
                    }
                })
            },
            getDate(value){
                return com.getDate(value);
            },
            handleAdd(index,row){
                this.dialog.show=true;
                this.dialog.title="追加资金信息";
                this.dialog.option=0;
                this.dialog.formData={
                        type:"",
                        describe:"",
                        income:"",
                        expend:"",
                        cash:"",
                        remark:"",
                        _id:""
                    }          
            },
            handleEdit(index,row){
                this.dialog.show=true;
                this.dialog.title="修改资金信息";
                this.dialog.option=1;
                this.dialog.formData={
                        type:row.type,
                        describe:row.describe,
                        income:Number(row.income),
                        expend:Number(row.expend),
                        cash:Number(row.cash),
                        remark:row.remark,
                        _id:row._id
                    }
            },
            handleDelete(index,row){
                this.$axios
                .post("api/profiles/delete/"+row._id,{})
                .then(result=>{
                    const res=result.data;
                    if(res.status==1){
                        this.$message({
                            type:"success",
                            message:res.text
                        })
                        this.getListData();
                    }else{
                        this.$message({
                            type:"error",
                            message:res.text
                        })
                    }
                })       
            },
        }
    }
</script>

<style scoped>
.fundlist{
    box-sizing: border-box;
    padding:30px;
}
.tools-box{
    overflow: hidden;
    margin-bottom: 20px;
}
.pagination-box{
    margin-top: 30px;
    text-align: right;
}
</style>