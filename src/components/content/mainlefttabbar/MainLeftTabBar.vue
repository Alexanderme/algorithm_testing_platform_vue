<template>
    <left-tab-bar>
        <left-tab-bar-item>
            <div slot="item">性能测试</div>
        </left-tab-bar-item>
                <left-tab-bar-item>
            <div slot="item">准确率测试</div>
        </left-tab-bar-item>
                <left-tab-bar-item>
            <div slot="item">算法运行</div>
        </left-tab-bar-item>
                <left-tab-bar-item>
            <div slot="item">Demo测试</div>
        </left-tab-bar-item>
                <left-tab-bar-item>
            <div slot="item">兼容性测试</div>
        <left-tab-bar-item>
            <div slot="item">数据集验证</div>
        </left-tab-bar-item>
        </left-tab-bar-item>
    </left-tab-bar>
</template>

<script>
    import LeftTabBar from "components/common/lefttabbar/LeftTabBar";
    import LeftTabBarItem from "components/common/lefttabbar/LeftTabBarItem";

    export default {
        name: "MainLeftTabBar",
        components:{
            LeftTabBar,
            LeftTabBarItem
        }
    }
</script>

<style scoped>

</style>