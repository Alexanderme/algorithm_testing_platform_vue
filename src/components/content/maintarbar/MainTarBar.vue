<template>
    <tab-bar>
        <tar-bar-item path="/home">
            <div slot="item-text">首页</div>
        </tar-bar-item>
        <tar-bar-item path="/algo">
            <div slot="item-text">算法</div>
        </tar-bar-item>
        <tar-bar-item path="/platform">
            <div slot="item-text">平台</div>
        </tar-bar-item>
        <tar-bar-item path="/login">
            <div slot="item-text">登录</div>
        </tar-bar-item>
    </tab-bar>
</template>

<script>
    import TarBarItem from "components/common/tabbar/TarBarItem";
    import TabBar from "components/common/tabbar/TabBar";
    export default {
        name: "MainTarBar",
        components:{
            TarBarItem,
            TabBar
        }
    }
</script>

<style scoped>

</style>