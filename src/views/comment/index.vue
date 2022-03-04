<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>

        </a-col>
        <a-col :span='12' style='text-align: right'>
          文章标题：<a-input-search v-model='formInline.title' placeholder="input search text" style="width: 400px" @search="getCommentList" />
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='flowerId' :data-source='tableData' @expand='expandRow' :expandedRowKeys='expandedRowKeys'  :loading="btnLoading2" :pagination='false'>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          rowKey='id'
          :columns="innerColumns"
          :data-source="innerTableData"
          :pagination="pagination"
          :loading='tableDataLoaing'

        >
        <span slot="num" slot-scope="text, record, index">
                {{ (page-1) * row + parseInt(index)+1 }}
        </span>
          <span slot="action" slot-scope="text, record">
              <a @click.prevent='contentDelete(record)'>删除</a>
        </span>
        </a-table>
      </a-table>
      <a-row style='margin-top: 20px;float: right'>
        <a-pagination
          show-size-changer
          :default-current="1"
          :total="total"
          :show-total="total => ` 共 ${total} 条`"
          show-quick-jumper
          @showSizeChange="onShowSizeChange"
          @change='onShowSizeChange'
        />
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {getCommentList,deleteComment,getCommentListByFlowerId} from '@/api/app/app'
const columns = [
  {
    title: 'id',
    dataIndex: 'flowerId',
    key: 'flowerId'
  },
  {
    title: '文章标题',
    dataIndex: 'flowerTitle',
    key: 'flowerTitle'
  },
  {
    title: '评论条数',
    dataIndex: 'commentNum',
    key: 'commentNum'
  }
];
const innerColumns  = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    scopedSlots: {
      customRender: 'num'
    }
  },
  {
    title: '评论内容',
    dataIndex: 'comment',
    key: 'comment'
  },
  {
    title: 'Email邮箱',
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
      innerColumns,
      expandedRowKeys:[],
      formInline: {
        title: ''
      },
      pagination: {
        total: 0,
        current:1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        showQuickJumper:true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        onShowSizeChanges:this.onShowSizeChange2,
        onChange:this.onShowSizeChange2
      },
      tableData:[],
      innerTableData:[],
      rowData:{},
      btnLoading2:false,
      btnLoading:false,
      tableDataLoaing:false,
      total:0,
      page:1,
      row:10
    }
  },
  computed: {},
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentListByFlowerId(record){
      this.tableDataLoaing = true
      getCommentListByFlowerId({
        email: "",
        flowerId: record.flowerId,
        flowerTitle: "",
        page: this.pagination.current,
        row: this.pagination.pageSize
      }).then(res=>{
        if (res.status==200){
          this.innerTableData = res.data.list
          this.pagination.total = res.data.total
        }else{
          this.$tips.warning(res.message)
        }
        this.tableDataLoaing = false
      }).catch(err=>{
        this.tableDataLoaing = false
      })
    },
    expandRow(expanded, record) {
      this.rowData = record
      // 只展开一行
      if (this.expandedRowKeys.length > 0) { //进这个判断说明当前已经有展开的了
        //返回某个指定的字符串值在字符串中首次出现的位置，下标为0
        let index = this.expandedRowKeys.indexOf(record.flowerId);
        if (index > -1) { //如果出现则截取这个id,1d到1相当于0，针对重复点击一个
          this.expandedRowKeys.splice(index, 1);
        } else {
          //如果没出现则截取所有id,添加点击id，0到1，针对已经有一个展开，点另一个会进入判断
          this.expandedRowKeys.splice(0, this.expandedRowKeys.length);
          this.expandedRowKeys.push(record.flowerId);
          this.pagination.current = 1
        }
      } else {
        this.pagination.current = 1
        //数组长度小于0，说明都没展开，第一次点击，id添加到数组，数组有谁的id谁就展开
        this.expandedRowKeys.push(record.flowerId);
      }
      this.getCommentListByFlowerId(record)
    },
    getCommentList(){
      this.btnLoading2 = true
      getCommentList({
        flowerTitle:this.formInline.title,
        page:this.page,
        row:this.row
      }).then(res=>{
        this.btnLoading2 = false
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    onShowSizeChange2(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize
      this.getCommentListByFlowerId(this.rowData);
    },
    onShowSizeChange(current, pageSize) {
      this.page = current;
      this.row = pageSize
      this.getCommentList();
    },
    contentDelete(record){
      deleteComment({
        id:record.id
      }).then(res=>{
        if (res.status==200){
          this.$tips.success('删除成功！');
          this.getCommentListByFlowerId(this.rowData);
        }else {
          this.$tips.warning(res.message);
        }
      })
    },
  }
}
</script>

<style lang='less' scoped>

</style>
