<template>
  <div class="fix-type">
    <el-tabs v-model="activeName">
    <el-tab-pane label="符合标准算法" name="first">
      <el-alert :title="iasRes"  effect="dark" :closable="false" type="success"></el-alert>
      <div class="elinput">
        <el-input placeholder="例如alert_info, 需要和算法一一对应(可以运行'算法文件结果功能'查看)" v-model="alert_info">
          <template slot="prepend">算法INFO字段</template>
        </el-input>
      </div>
      <div class="elinput">
        <el-input placeholder="例如no_clothes, 多个标签以逗号分隔例如no_clothes,clothes" v-model="tag_names">
          <template slot="prepend">比对算法标签</template>
        </el-input>
      </div>
       <div class="elinput">
        <el-input placeholder="请输入算法镜像名称" v-model="image_name">
          <template slot="prepend">镜像名称</template>
        </el-input>
      </div>
      <div class="elinput">
        <el-input placeholder="请输入内容, 例如0.5, 可以不填 默认是0.5" v-model="iou">
          <template slot="prepend">比对IOU</template>
        </el-input>
      </div>
      <div class="elinput">
        <el-input placeholder="请输入内容, 例如修改算法roi或者阈值(需要和算法配置一致,可以运行算法信息查看算法配置), 默认可以不填" v-model="args">
          <template slot="prepend">参数配置</template>
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
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload();getMissRateTaskIdData()">提交请求</el-button>
          <div slot="tip" class="el-upload__tip">注意:动态传参配置参数目前只支持3.0版本, 只能上传打包好的zip文件, 准确率测试只支持图片</div>
        </el-upload>
      </div>
    </el-tab-pane>
    <el-tab-pane label="不符合标准算法" name="second"></el-tab-pane>
      <div class="process">
        <span>运行进度条</span>
        <el-progress :percentage="percentage" :color="customColor"></el-progress>
      </div>
    </el-tabs>
      <div class="alert-button">
        <el-button v-if="false"></el-button>
      </div>
  </div>

</template>

<script>
  import {getMissRateTaskId, getAlgoPrecision} from "../../api/algoSdk";
  export default {
    inject:['reload'],
    data() {
      return {
        fileList:[],
        activeName: 'first',
        alert_info: 'alert_info',
        tag_names: 'no_clothes',
        iou:"",
        uploadUrl:"",
        iasRes:"算法标注标签和算法输出json一致, 算法报警字段等请查看算法报警json, 获取可以运行算法文件接口功能会返回算法json",
        isLoding:false,
        image_name:"ccr.ccs.tencentyun.com/source/dev_reflectcloth_gpu_sdk3.0_modj_lic1b:v3.2.1",
        args:"",
        task_id:"",
        percentage: 0,
        customColor: '#409eff',
      };
    },
    methods: {
      dataNotEnough() {
        this.$message.error('输入参数不完整, 请检查输入参数');
      },
      getAlgoPrecisionData(file){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'});
          if (this.tag_names ==="" || this.alert_info==="" || this.image_name===""){
            this.dataNotEnough()
            this.reload();
            return
          }
          let formData = new FormData()
          formData.append('files', file)
          formData.append('tag_names', this.tag_names)
          formData.append('alert_info', this.alert_info)
          formData.append('image_name', this.image_name)
          if (this.args!==""){
             formData.append('args', this.args)
          }
          if (this.iou!=="") {
            formData.append('iou', this.iou)
          }
          getAlgoPrecision(formData).then((res) => {
            this.task_id = res.task_id
            this.isLoding = true
            if (this.isLoding){loading.close();}
          }).then(res=>{
            this.reload();
          })
      },
     getMissRateTaskIdData(){
            if (this.fun_stop === true){
              this.reload();
              return
            }
            this.timer = window.setInterval(() => {
            setTimeout(() => {
            if (this.task_id !== null) {
              let taskId = {"task_id": this.task_id}
              getMissRateTaskId(taskId).then((res) => {
                if (res.state === "SUCCESS") {
                  this.iasRes = res.result
                  this.increase(res.state)
                  window.clearInterval(this.timer)
                } else {
                  this.status = res.status;
                  this.increase(this.status)
                }
              })
            }
          }, 1)
        }, 3000);
       },
    increase(status) {
        if (status === "SUCCESS"){
          this.percentage = 100
        }
        else{
          if (typeof(status)=="number"){
            this.percentage = status
          }
        }
        if (this.percentage > 100) {
          this.percentage = 100;
        }
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
