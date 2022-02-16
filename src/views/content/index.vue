<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>
          <a-button type='primary'>新增文章</a-button>
        </a-col>
        <a-col :span='8'>
          标题：<a-input v-model='formInline.title' style='width: 450px' placeholder='input placeholder' />
        </a-col>
        <a-col :span='4'>
          <a-button type='primary' @click='getFlowerList' :loading='btnLoading'>查询</a-button>
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='artifactId' :data-source='tableData'  :loading="btnLoading2" style='background: #FFFFFF' bordered :pagination='false'>
            <span slot='classic' slot-scope='typeFirst,typeSecond,typeThird'>
              <a-tag :color="typeFirst === 100 ? 'volcano' : 'green'">
                {{ typeFirst === 100 ? '一级分类':'二级分类' }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a @click.prevent='contentEdit(record)'>编辑</a>
              <a-divider type="vertical" />
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
import {getFlowerList} from '@/api/app/app'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '所属分类',
    dataIndex: 'typeFirst',
    key: 'typeFirst',
    scopedSlots: { customRender: 'classic' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: 'Content',
  components: {},
  data() {
    return {
      columns,
      formInline: {
        title: '',
        level:'',
        topId:''
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

  },
  methods: {
    getFlowerList(){
      getFlowerList({
        level:this.formInline.level,
        page:this.page,
        row:this.row,
        topId: this.formInline.topId
      }).then(res=>{
        console.log(res)
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    onShowSizeChange(current, pageSize) {
      this.page = current-1;
      this.row = pageSize
      this.getFlowerList();
    },
    contentEdit(){

    },
    contentDelete(){

    }
  }
}
</script>

<style lang='less' scoped>

</style>
