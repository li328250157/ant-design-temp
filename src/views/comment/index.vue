<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>

        </a-col>
        <a-col :span='12' style='text-align: right'>
          邮箱：<a-input-search v-model='formInline.email' placeholder="input search text" style="width: 400px" @search="getCommentList" />
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='artifactId' :data-source='tableData'  :loading="btnLoading2" style='background: #FFFFFF' bordered :pagination='false'>
        <span slot="action" slot-scope="text, record">
              <a @click.prevent='contentDelete(record)'>删除</a>
        </span>
      </a-table>
      <a-row style='margin-top: 20px;float: right'>
        <a-pagination
          show-size-changer
          :default-current="1"
          :total="total"
          @showSizeChange="onShowSizeChange"
          @change='onShowSizeChange'
        />
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {getCommentList,deleteComment} from '@/api/app/app'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '内容',
    dataIndex: 'comment',
    key: 'comment'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      columns,
      formInline: {
        email: ''
      },
      tableData:[],
      btnLoading2:false,
      btnLoading:false,
      total:0,
      page:0,
      row:10
    }
  },
  computed: {},
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList(){
      this.btnLoading2 = true
      getCommentList({
        email:this.formInline.email,
        page:this.page+1,
        row:this.row
      }).then(res=>{
        console.log(res)
        this.btnLoading2 = false
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    onShowSizeChange(current, pageSize) {
      this.page = current-1;
      this.row = pageSize
      this.getCommentList();
    },
    contentDelete(record){
      deleteComment({
        id:record.id
      }).then(res=>{
        this.$tips.success('删除成功！')
      })
    },
  }
}
</script>

<style lang='less' scoped>

</style>
