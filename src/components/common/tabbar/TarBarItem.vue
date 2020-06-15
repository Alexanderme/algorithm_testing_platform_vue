<template>
    <div class="tab-bar-item" @click="itemClick" :class="{tabLogin:loginActive}">
        <div :class="{active: isActive}">
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
                console.log(this.$router.replace(this.path));
                this.$router.replace(this.path)
            }
        },
        computed:{
            isActive(){
                return true
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
        margin: 30px 50px;
        font-size: 25px;
    }
    .active{
        font-weight: bolder;
        /*color: #ff5777;*/
    }
    .tabLogin{
        float: right;
    }
</style>