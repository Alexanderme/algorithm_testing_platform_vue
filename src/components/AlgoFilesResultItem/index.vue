<template>
  <div>
    <div class="center">
      <el-alert :title="iasRes" type="warning"  effect="dark" :closable="false"></el-alert>
    </div>
    <div class="center">
      <el-upload
         ref="upload"
         accept=".zip"
         :file-list="fileList"
         :limit='1'
         :action="uploadUrl"
         :before-upload="postAlgoFilesResultData"
         :show-file-list="true"
         :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload();getAlgoFilesResultData()">提交请求</el-button>
        <div slot="tip" class="el-upload__tip">注意:只能上传打包好的zip文件, 为了提高效率请裁剪视频,视频长度不要大于5分钟, 不支持中文命名, 请在上传之前处理中文</div>
      </el-upload>
    </div>
     <div class="center">
      <el-input placeholder="请输入内容" v-model="algo_mirror">
      <template slot="prepend">镜像名称</template></el-input>
    </div>
    <div class="center">
      <el-input placeholder="请输入内容" v-model="algo_configs">
      <template slot="prepend">参数配置</template></el-input>
    </div>
    <div class="center">
      <span>运行进度条</span>
      <el-progress :percentage="percentage" :color="customColor"></el-progress>
    </div>
    <div class="alert-button">
      <el-button v-if="false"></el-button>
    </div>
  </div>
</template>

<script>
  import { getAlgoFiles, postAlgoFilesResult, getAlgoFilesTaskId, clearAlgoRunEnv } from "../../api/algoSdk";
    export default {
      inject:['reload'],
      name: "index",
    data() {
      return {
        fileList:[],
        algo_configs:'{"roi": []}',
        algo_mirror:"",
        uploadUrl:"",
        isLoding:false,
        iasRes:"注意: 1:图片只支持jpg,png,jpeg, 视频只支持mp4,avi,视频存在格式问题会导致没有视频结果,请先格式工厂格式下视频 2:参数配置方式只支持3.0算法",
        task_id: null,
        percentage: 0,
        current:null,
        total:null,
        customColor: '#409eff',
        fun_stop:false,
        container_id:"",
        ori_files_dir:"",
        res_files_dir:"",
        error_files:""
      }
    },
    methods: {
      dataNotEnough() {
        this.$message.error('输入参数不完整, 请检查输入参数');
      },
      postAlgoFilesResultData(file){
        const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});

        let formData = new FormData()
        formData.append('files', file)
        formData.append('args', this.algo_configs)
        formData.append('image_name', this.algo_mirror)
        if (this.algo_mirror === ""){
          this.dataNotEnough()
          this.fun_stop = true
        }
        postAlgoFilesResult(formData).then((res) => {
            this.task_id = res.task_id
            this.isLoding = true
            if (this.isLoding){loading.close();}
        }).then(res =>{
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
      },
       getAlgoFilesResultData(){
            if (this.fun_stop === true){
              this.reload();
              return
            }
            this.timer = window.setInterval(() => {
            setTimeout(() => {
            if (this.task_id !== null) {
              let taskId = {"task_id": this.task_id}
              getAlgoFilesTaskId(taskId).then((res) => {
                if (res.state === "SUCCESS") {
                  this.container_id =  res.container_id
                  this.ori_files_dir =  res.ori_files_dir
                  this.res_files_dir =  res.res_files_dir
                  this.error_files = res.error_files
                  this.increase(res.state)
                  let formData = new FormData()
                  formData.append('files', res.result)
                  getAlgoFiles(formData).then((res) => {
                    let url = window.URL.createObjectURL(new Blob([res]));
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    link.setAttribute("download", "result.tar");
                    document.body.appendChild(link);
                    link.click()
                    window.clearInterval(this.timer)
                  }).then(res=>{
                    this.clearAlgoRunEnvData()
                    this.$router.go(0)
                  })
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
       clearAlgoRunEnvData(){
        let formData = new FormData()
        formData.append('container_id', this.container_id)
        formData.append('ori_files_dir', this.ori_files_dir)
        formData.append('res_files_dir', this.res_files_dir)
        clearAlgoRunEnv(formData).then((res) => {
          console.log("clearAlgoRunEnv", res);
        })
      },
    }
  }
</script>

<style scoped>
.center{
  margin: 20px 20px;
}
</style>
