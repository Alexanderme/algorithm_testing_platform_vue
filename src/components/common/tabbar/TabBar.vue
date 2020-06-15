<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
    #tab-bar{
        width: 100%;
        height: 100px;
        background-color: rgb(53,137,235);
    }
</style>