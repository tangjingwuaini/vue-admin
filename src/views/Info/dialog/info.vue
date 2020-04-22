<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInform">
            <el-form-item label="类别:" :label-width="data.formLabelWidth" prop="category">
                <el-select v-model="data.form.category" placeholder="请选择活动区域">
                    <el-option 
                        v-for="item in data.categoryOption" 
                        :key="item.id" 
                        :label="item.category_name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题:" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.title" placehoder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item label="概况:" :label-width="data.formLabelWidth" prop="content">
                <el-input type="textarea" v-model="data.form.content" placehoder="请输入标题"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { AddInfo } from "@/api/news"
import {reactive, ref, watch} from '@vue/composition-api';
export default {
    name:'dialogInfo',
     props:{
        flag:{
            type:Boolean,
            default: false
        },
        category:{
            type:Array,
            default: () => []
        }
    },
    // 2.0
    // data(){
    //     return{
    //          dialog_info_flag:false,
    //         formLabelWidth:'70px',
    //         form:{
    //             category:'',
    //             title:'',
    //             content:'',
    //         },
    //         categoryOption: [],
    //         submitLoading:false
    //     }
    // },
    setup(props, {emit, root, refs}){
        /**
         * 数据
         */
        const data = reactive({
            dialog_info_flag:false, // 弹窗标记
            formLabelWidth:'70px',
            form:{
                category:'',
                title:'',
                content:'',
            },
            // 分类下拉
            categoryOption: [],
            // 按钮加载
            submitLoading:false
        });
        // watch
        watch(() => data.dialog_info_flag = props.flag);
        // vue2.0 methods
        const close = () => {
            resetForm();
            data.dialog_info_flag = false;
            emit('update:flag', false);
        }
        const openDialog = () => {
            data.categoryOption = props.category
        }
        const resetForm = () => {
            refs.addInform.resetFields()
            // data.form.category = ''
            // data.form.title = ''
            // data.form.content = ''
        }
        const submit = () => {
            let requestData = {
                category:data.form.category,
                title:data.form.title,
                content:data.form.content,
            }
            data.submitLoading = true
            AddInfo(requestData).then(response => {
                let responseData = response.data
                console.log(data)
                root.$message({
                    message:responseData.message,
                    type:'success'
                })
                data.submitLoading = false
                // 重置表单
                resetForm()
                // root.$refs['addInform'].resetFields()
            }).catch(error => {
                data.submitLoading = false
            })
        }
         return{
            data,
            // methods
            close,openDialog,submit
        }
    }
}
</script>
<style scoped>

</style>