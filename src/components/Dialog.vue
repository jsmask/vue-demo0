<template>
    <div class="fund-dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :modal-append-to-body="false" :fullscreen="dialog.fullscreen" width="60%">
                <el-form ref="formData" :rules="rules" :model="dialog.formData" status-icon label-width="100px">                   
                    <el-form-item label="收支类型" prop="type">
                        <el-select v-model="dialog.formData.type" placeholder="请选择">
                        <el-option label="支出" value="0"></el-option>
                        <el-option label="收入" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收支描述" prop="describe">
                        <el-input v-model="dialog.formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="收入" prop="income">
                        <el-input v-model.number="dialog.formData.income"></el-input>
                    </el-form-item>
                    <el-form-item label="支出" prop="expend">
                        <el-input v-model.number="dialog.formData.expend"></el-input>
                    </el-form-item>
                    <el-form-item label="现金" prop="cash">
                        <el-input v-model.number="dialog.formData.cash"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="dialog.formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right;">                        
                        <el-button @click="dialog.show=false;" style="width:100px;">取消</el-button>
                        <el-button type="primary" @click="onSubmit('formData')" style="width:100px;">提交</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
    </div>    
</template>

<script>
    export default {
        name:"fund-dialog",
        props:{
            dialog:Object
        },
        data(){
            return {
                rules:{
                    type:[
                        { required: true, message: '请选择收支类型', trigger: 'change' }
                    ],
                    income:[
                        { required: true, message: '请输入收入金额', trigger: 'blur' },
                        { type: 'number', message: '格式错误，请输入数字类型'}
                    ],
                    expend:[
                        { required: true, message: '请输入支出金额', trigger: 'blur'},
                        { type: 'number', message: '格式错误，请输入数字类型'}
                    ],
                    cash:[
                        { required: true, message: '请输入现金', trigger: 'blur' },
                        { type: 'number', message: '格式错误，请输入数字类型'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName){         
                this.$refs[formName].validate( valid => {
                    if (valid) {                       
                          switch (this.dialog.option) {
                              case 0:
                                  this.toAdd(formName);
                                  break;
                              case 1:
                                  this.toEidt(formName);
                                  break;
                              default:
                                  break;
                          }

                    } else {
                        return false;
                    }
                });
            },
            toEidt(formName){
                this.$axios
                    .post("api/profiles/edit/"+this.dialog.formData._id,this.dialog.formData)
                    .then(result=>{
                        const res=result.data;
                        if(res.status==1){
                            this.$message({
                                message:res.text,
                                type:"success"
                            });                         
                            this.$emit("update");
                            this.resetForm(formName);
                            this.dialog.show=false;                           
                        }else{
                            this.$message({
                                message:res.text,
                                type:"error"
                            });
                        }
                })
            },
            toAdd(formName){
                this.$axios
                    .post("api/profiles/add",this.dialog.formData)
                    .then(result=>{
                        const res=result.data;
                        if(res.status==1){
                            this.$message({
                                message:res.text,
                                type:"success"
                            });                         
                            this.$emit("update");
                            this.resetForm(formName);
                            this.dialog.show=false;                           
                        }else{
                            this.$message({
                                message:res.text,
                                type:"error"
                            });
                        }
                })  
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>

</style>