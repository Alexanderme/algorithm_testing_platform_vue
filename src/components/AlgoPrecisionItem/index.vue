<template>
  <div class="fix-type">
    <el-tabs v-model="activeName">
    <el-tab-pane label="符合标准算法" name="first">
      <el-alert :title="iasRes"  effect="dark" :closable="false" type="success"></el-alert>
      <div class="elinput">
        <el-input placeholder="例如alert_info" v-model="alert_info">
          <template slot="prepend">算法INFO字段</template>
        </el-input>
      </div>
      <div class="elinput">
        <el-input placeholder="例如no_clothes, 多个标签以逗号分隔例如no_clothes,clothes" v-model="tag_names">
          <template slot="prepend">比对算法标签</template>
        </el-input>
      </div>
      <div class="elinput">
        <el-input placeholder="例如0.5" v-model="iou">
          <template slot="prepend">对比IOU</template>
        </el-input>
      </div>
       <div class="elinput">
        <el-input placeholder="请输入内容" v-model="port">
          <template slot="prepend">服务端口</template>
        </el-input>
      </div>
       <div class="elinput">
          <el-upload
           ref="upload"
           accept=".zip"
           :file-list="fileList"
           :limit='1'
           :action="uploadUrl"
           :before-upload="getAlgoPrecisionData"
           :show-file-list="true"
           :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交请求</el-button>
          <div slot="tip" class="el-upload__tip">注意:算法目前只支持3.0版本, 只能上传打包好的zip文件, 准确率测试只支持图片</div>
        </el-upload>
      </div>
    </el-tab-pane>
    <el-tab-pane label="不符合标准算法" name="second"></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import { getAlgoPrecision } from "../../api/algoSdk";
  export default {
    inject:['reload'],
    data() {
      return {
        fileList:[],
        activeName: 'first',
        alert_info: 'alert_info',
        port: 60001,
        tag_names: 'no_clothes',
        iou:"",
        uploadUrl:"",
        iasRes:"算法标注标签和算法输出json一致, 算法报警字段等请查看算法报警json, 运行前请先封装IAS",
        isLoding:false
      };
    },
    methods: {
      getAlgoPrecisionData(file){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'});
          if (this.tag_name==="" || this.port==="" || this.alert_info===""){
            return this.iasRes="参数输入不全, 请重新输入"
          }
          let formData = new FormData()
          formData.append('files', file)
          formData.append('tag_names', this.tag_names)
          formData.append('alert_info', this.alert_info)
          formData.append('port', this.port)
          formData.append('iou', this.iou)

          getAlgoPrecision(formData).then((res) => {
            this.isLoding = true
            if (this.isLoding){loading.close();}
            if(res.errno === "0"){
                this.iasRes = res.errmsg
              }
              else{this.iasRes=res.errmsg}
          }).then(res=>{
            this.reload();
          })
      },
    submit() {
       this.$nextTick(() => {
           this.$refs.upload.submit()
       })
     },
     submitUpload() {
        this.$refs.upload.submit();
      }
    }
  };
</script>

<style scoped>
  .fix-type{
  margin-left: 20px;
}
.elinput{
  margin: 10px 100px 10px 0;
}
.el-alert {
    height: auto;
    width: auto;
    white-space:pre
}
</style>
