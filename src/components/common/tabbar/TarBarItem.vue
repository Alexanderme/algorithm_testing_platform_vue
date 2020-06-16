<template>
    <div class="tab-bar-item" @click="itemClick" :class="{tabLogin:loginActive, active:isActive }" >
        <div>
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TarBarItem",
        props:{
            path:{
                type:String
            }
        },
        methods:{
            itemClick(){
                this.$router.replace(this.path)
            }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1
            },
            loginActive(){
                return this.path === "/login"
            }

        }
    }
</script>

<style scoped>
    .tab-bar-item{
        float: left;
        padding: 39px 60px;
        /*line-height: 40px;*/
        font-size: 20px;
        color: #ffffff;
    }
    .tabLogin{
        float: right;
    }
    .active{
        background-color: #666666;
        border-radius: 30%;
    }
</style>