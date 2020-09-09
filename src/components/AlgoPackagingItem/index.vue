<template>
  <div class="center">
    <el-tabs v-model="activeName">
    <el-tab-pane label="IAS封装" name="first">
      <el-alert :title="iasRes"  effect="dark" :closable="false" type="success"></el-alert>
      <div>
        <el-input placeholder="请输入内容" v-model="image_name">
          <template slot="prepend">镜像名称</template>
        </el-input>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="port">
          <template slot="prepend">服务端口</template>
        </el-input>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="ias_version">
          <template slot="prepend">OPenCV版本</template>
        </el-input>
      </div>
      <el-button type="primary" plain @click="getPackageIasData">提交</el-button>
      <div :v-text="iasRes"></div>
    </el-tab-pane>
    <el-tab-pane label="VAS封装" name="second"></el-tab-pane>
    <el-tab-pane label="SVAS封装" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getPackageIas } from "../../api/algoSdk";
  export default {
    inject:['reload'],
    data() {
      return {
        activeName: 'second',
        image_name: '',
        port: '',
        ias_version: '',
        iasRes:"目前不支持指定服务器封装ias,vas,svas 该功能后续添加, 算法OPenCV版本需要在算法信息查询"
      };
    },
    methods: {
            getPackageIasData(){
                if (this.image_name==="" || this.port==="" || this.ias_version===""){
                  return this.iasRes="参数输入不全, 请重新输入"
                }
                let params = new URLSearchParams()
                params.append('image_name', this.image_name)
                params.append('port', this.port)
                params.append('ias_version', this.ias_version)
                getPackageIas(params).then((res) => {
                    if(res.errno === "0"){
                      this.iasRes=res.errmsg
                    }
                    else{this.iasRes=res.errmsg}
                }).then(res=>{
                  this.reload();
                })
            }
    }
  };
</script>

<style scoped>
.center{
  margin: 10px 20px;
}

</style>
