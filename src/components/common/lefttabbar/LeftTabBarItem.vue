<template>
    <div class="left-tab-bar-item">
        <slot name="item"></slot>
    </div>
</template>

<script>
    export default {
        name: "LeftTabBarItem",
        methods:{

        }
    }
</script>

<style scoped>
    .left-tab-bar-item{
        padding:  50px 50px;
        color: #ffffff;
    }
</style>