<template>
    <div class="center">
      <el-tabs v-model="activeName">
        <el-tab-pane label="XML数据格式化" name="first">
           <el-upload
             ref="upload"
             accept=".zip"
             :file-list="fileList"
             :limit='1'
             :action="uploadUrl"
             :before-upload="AlgoDataSetFormatXmlData"
             :show-file-list="true"
             :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">提交请求</el-button>
            <div slot="tip" class="el-upload__tip">注意:只是针对XML样式格式化美化, 只支持zip打包文件</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="图片数据集验证" name="second">
           <el-upload
             ref="upload"
             accept=".zip"
             :file-list="fileList"
             :limit='1'
             :action="uploadUrl"
             :before-upload="AlgoDataSetFormatImageData"
             :show-file-list="true"
             :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload();getDataSetResultData()">提交请求</el-button>
            <div slot="tip" class="el-upload__tip">注意:只支持zip打包文件</div>
          </el-upload>
            <div class="center">
              <span>请选择当前需要验证数据集标注类型:&nbsp;</span>
              <el-radio v-model="radio_file" label="xml">XML</el-radio>
              <el-radio v-model="radio_file" label="txt">TXT</el-radio>
              <el-radio v-model="radio_file" label="json">JSON</el-radio>
            </div>
            <div class="center">
              <span>请选择当前需要验证数据集类型:&nbsp;</span>
              <el-radio v-model="radio_tag" label="jpg">JPG</el-radio>
              <el-radio v-model="radio_tag" label="png">PNG</el-radio>
            </div>
            <div class="center">
              <el-input placeholder="请输入内容, 例如反光衣标签 clothes" v-model="tag_kinds">
              <template slot="prepend">标注标签</template></el-input>
            </div>
            <div class="process">
              <span>运行进度条</span>
              <el-progress :percentage="percentage" :color="customColor"></el-progress>
            </div>
        </el-tab-pane>
        <el-tab-pane label="视频数据集验证" name="third">视频数据集验证</el-tab-pane>
      </el-tabs>
      <div class="alert-button">
        <el-button v-if="false"></el-button>
      </div>
    </div>
</template>

<script>
  import { AlgoDataSetFormatXml,AlgoDataSetFormatImage,getAlgoDataSetTaskId,clearDataSetEnv,getAlgoFiles} from "../../api/algoSdk";

    export default {
    inject:['reload'],
    name: "index",
    data() {
      return {
        fileList:[],
        activeName: 'second',
        uploadUrl:"",
        radio_tag:"",
        radio_file:"",
        tag_kinds:"",
        tag_suffix:"",
        file_suffix:"",
        task_id:"",
        fun_stop:false,
        container_id:"",
        files_dir:"",
        percentage: 0,
        customColor: '#409eff',
      };
    },
    mounted() {
      console.log(this.radio_file);
    },
    methods: {
      dataNotEnough() {
        this.$message.error('输入参数不完整, 请检查输入参数');
      },
      AlgoDataSetFormatXmlData(file){
        const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});

        let formData = new FormData()
        formData.append('xml_file', file)
        AlgoDataSetFormatXml(formData).then((res) => {
          let url = window.URL.createObjectURL(new Blob([res]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "result.tar");
          document.body.appendChild(link);
          link.click()
          this.isLoding = true
          if (this.isLoding){loading.close();}
        }).then(res =>{
          this.reload();
        })
      },
       AlgoDataSetFormatImageData(file){
        const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'});
        if (this.radio_tag === "" || this.radio_file === "" || this.tag_kinds===""){
          this.dataNotEnough()
          this.reload();
          loading.close()
          return
        }
        let formData = new FormData()
        formData.append('files', file)
        formData.append('tag_suffix', this.tag_suffix)
        formData.append('file_suffix', this.file_suffix)
        formData.append('tag_kinds', this.tag_kinds)
        AlgoDataSetFormatImage(formData).then((res) => {
          this.task_id = res.task_id
          this.isLoding = true
          if (this.isLoding){loading.close();}
        }).then(res =>{
          this.reload();
        })
      },
       getDataSetResultData(){
            if (this.fun_stop === true){
              this.reload();
              return
            }
            this.timer = window.setInterval(() => {
            setTimeout(() => {
            if (this.task_id !== null) {
              let taskId = {"task_id": this.task_id}
              getAlgoDataSetTaskId(taskId).then((res) => {
                if (res.state === "SUCCESS") {
                  this.container_id = res.container_id
                  this.ori_files_dir = res.files_dir
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
                    this.clearDataSetEnvData()
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
      clearDataSetEnvData(){
        let formData = new FormData()
        formData.append('container_id', this.container_id)
        formData.append('files_dir', this.files_dir)
        clearDataSetEnv(formData).then((res) => {
          console.log("clearAlgoRunEnv", res);
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
    }
    }
</script>

<style scoped>
.el-tab-pane, .el-tabs {
  margin: 0px 20px;
}
.center{
    margin: 20px 0;
}

</style>
