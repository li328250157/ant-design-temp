<template>
    <page-header-wrapper>
        <a-card>
           <a-row>
               <a-col span='6'>
                   <a-card hoverable style="width: 240px" @click="goDoc1">
                       <img
                           slot="cover"
                           alt="example"
                           src="@/assets/veer1.jpg"
                       />
                       <a-card-meta>
                           <template slot="title">
                               <span style='text-decoration: underline'>平台功能交互介绍</span>
                           </template>
                           <template slot="description">
<!--                               https://odocs.myoas.com/docs/1d3aVlXGNpivvYqg-->
                           </template>
                       </a-card-meta>
                   </a-card>
               </a-col>
               <a-col span='6'>
                   <a-card hoverable style="width: 240px" @click="goDoc">
                       <img
                           slot="cover"
                           alt="example"
                           src="@/assets/veer.jpg"
                       />
                       <a-card-meta>
                           <template slot="title">
                               <span style='text-decoration: underline'>客户端接入文档</span>
                           </template>
                           <template slot="description">
<!--                               https://odocs.myoas.com/docs/aBAYVjPWe6I5gO3j-->
                           </template>
                       </a-card-meta>
                   </a-card>
               </a-col>
               <a-col span='6'>
                   <a-card hoverable style="width: 240px" @click="goDoc2">
                       <img
                           slot="cover"
                           alt="example"
                           src="@/assets/veer2.jpg"
                       />
                       <a-card-meta>
                           <template slot="title">
                               <span style='text-decoration: underline'>服务端接入文档</span>
                           </template>
                           <template slot="description">
<!--                               http://mindoc.itest.wanyol.com/docs/atms/atms-1c8ebqe6ore86-->
                           </template>
                       </a-card-meta>
                   </a-card>
               </a-col>
               <a-col span='6'>
                   <a-card hoverable style="width: 240px" @click="goDoc3">
                       <img
                           slot="cover"
                           alt="example"
                           src="@/assets/veer3.jpg"
                       />
                       <a-card-meta>
                           <template slot="title">
                               <span style='text-decoration: underline'>迭代落地参考文档</span>
                           </template>
                       </a-card-meta>
                   </a-card>
               </a-col>
           </a-row>
        </a-card>
    </page-header-wrapper>
</template>

<script>

export default {
    name: 'Home',
    components: {
    },
    data() {
        return {

        }
    },
    computed: {

    },
    created() {

    },
    methods:{
        goDoc1(){
            window.open('https://odocs.myoas.com/docs/1d3aVlXGNpivvYqg')
        },
        goDoc(){
            window.open('https://odocs.myoas.com/docs/aBAYVjPWe6I5gO3j')
        },
        goDoc2(){
            window.open('http://mindoc.itest.wanyol.com/docs/atms/atms-1c8ebqe6ore86')
        },
        goDoc3(){
            window.open('https://odocs.myoas.com/docs/gO3oxO62D2fzxDqD')
        }
    }
}
</script>

<style lang="less" scoped>

</style>
