<template>
    <div id="left-tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "LeftTabBar"
    }
</script>

<style scoped>
    #left-tab-bar{
        width: 200px;
        height: calc(100vh - 100px);
        background-color: rgb(60,57,75);
    }
</style>