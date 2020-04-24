<template>
    <el-form ref="form" label-width="120px">

        <el-form-item label="信息分类:" >
            <el-select v-model="form.categoryId">
                <el-option v-for="item in data.category" :value="item.id" :label="item.category_name" :key="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="新闻标题:" >
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="缩略图:">
            <!-- <Uploadlmg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig"/> -->
             
        </el-form-item>

        <el-form-item label="发布日期:">
            <el-date-picker v-model="form.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
        </el-form-item>

        <el-form-item label="详情内容:">
            <quillEditor v-model="form.content" ref="myQuilEditor" :options="data.editorOption"></quillEditor>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submit" :loading="data.submitLoading">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { GetList, EdidInfo } from "@/api/news"
import { timestampToTime } from "@/utils/common"
import { reactive, ref, watch, onMounted } from '@vue/composition-api'
// 组件
// import Uploadlmg from "@c/Uploadlmg"
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: "infoDetailed",
    // 图的组件Uploadlmg  不写了  出错
    components: {quillEditor},
    setup(props, { root }){
        // 图片上传配置
        // const uploadImgConfig = reactive({
        //     action:"http://up-z2.qiniup.com",
        //     accesskey:"Fa0zG5UGcSC9BrSEHql7ThGVbGcR5JkfHnUSRZz3",
        //     secretkey:"nhH5ekrEVXt_-fk9K6RRD5As5X1rRVnxTBOKsR0E",
        //     buckety:"webjshtmll"
        // });

        const data = reactive({
            id:root.$route.params.id || root.$store.getters["infoDetailed/infoId"],
            category:[],
            editorOption:{},
            submitLoading:false
        })

        const form = reactive({
            categoryId:"",
            title:"",
            createDate:"",
            content:""
            // imgUrl:""
        })


        /**
         * 获取信息分类
         */
        const getInfoCategory = () => {
            root.$store.dispatch('common/geInfotCategor').then(response => {
                data.category = response
            })
        }

        /**
         * 获取当前ID的信息
         */
         const getInfo = () => {
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id:data.id
            }
            GetList(requestData).then(response => {
                let responseData = response.data.data.data[0];
                // console.log(responseData);
                form.categoryId = responseData.categoryId;
                form.title = responseData.title;
                form.createDate = timestampToTime(responseData.createDate);
                form.content = responseData.content;
                // form.imgUrl = responseData.imgUrl;
            })
        }

        /**
         * 保存(修改数据时,必须注意的:一定需要一个ID)
         */
         const submit = () => {
            let requestData = {
                id:data.id,
                categoryId:form.categoryId,
                title:form.title,
                content:form.content,
                // imgUrl:form.imgUrl
            }
            data.submitLoading = true
            EdidInfo(requestData).then(response => {
                let responseData = response.data
                // console.log(data)
                root.$message({
                    message:responseData.message,
                    type:'success'
                })
                data.submitLoading = false
            }).catch(error => {
                data.submitLoading = false
            })
        }

      

        onMounted(() => {
            getInfoCategory()
            getInfo()
        })

        return {
            // uploadImgConfig 这个是上传图片的组件  因为获取不要接口  不搞了
            data,form,submit
        }
    }
}
</script>
<style lang="css" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>