<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='15'>
          <a-button type='primary' @click='showModal'>新增分类</a-button>
        </a-col>
        <a-col :span='9'>
          分类名：
          <a-cascader
            v-model='formInline.typeName'
            :options="options"
            style='width: 400px'
            expand-trigger="hover"
            placeholder="Please select"
            @change="onChange"
          />
          <a-button type='primary' @click='getFlowerList' style='margin-left: 10px' :loading='btnLoading'>查询</a-button>
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='artifactId' :data-source='tableData'  :loading="btnLoading2" style='background: #FFFFFF' bordered :pagination='false'>
            <span slot='flowerTypeName' slot-scope='flowerTypeName'>
              <a-tag color="#2db7f5">
                {{ flowerTypeName }}
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
    <a-modal
      title="新增分类"
      :visible="uploadVisible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-form
        id="components-form-demo-validate-other"
        :form="form"
        v-bind="formItemLayout"
        @submit="handleSubmit"
      >
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="分类名"
        >
          <a-cascader
            v-decorator="['typeName']"
            :options="options"
            expand-trigger="hover"
            placeholder="Please select"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="排序"
        >
          <a-input
            v-decorator="[
          'sort'
        ]"
            placeholder="Please input your sort"
          />
        </a-form-item>
        <a-form-item label="类型图片上传">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            action="http://121.201.66.113:9097//file/layeditUpload"
            :file-list="typeImg"
            @change="handleChange2"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="类型图片地址"           :label-col="formItemLayout.labelCol"
                     :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
          'typeImg',
        ]"
            placeholder="Please input your topId"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import {getFlowerList,flowerSaveOrUpdate,getTypeTree,fileUpload} from '@/api/app/app'
const columns = [
  {
    title: '分类名',
    dataIndex: 'flowerTypeName',
    key: 'flowerTypeName',
    scopedSlots: { customRender: 'flowerTypeName' },
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
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
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      formInline: {
        typeName: [],
        level:'',
        topId:''
      },
      tableData:[],
      btnLoading2:false,
      btnLoading:false,
      uploadVisible:false,
      confirmLoading: false,
      typeImg: [],
      bigImg:[],
      options:[],
      bigImgbase64:'',
      TypeImgbase64:'',
      total:0,
      page:0,
      row:10
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  created() {
    this.getFlowerList()
    this.getTypeTree()
  },
  methods: {
    onChange(){

    },
    getTypeTree(){
      getTypeTree().then(res=>{
        this.options = JSON.parse(res.data)
        console.log(JSON.parse(res.data))
      })
    },
    getFlowerList(){
      this.btnLoading2 = true
      getFlowerList({
        level:this.formInline.level,
        page:this.page+1,
        row:this.row,
        topId: this.formInline.topId
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
      this.getFlowerList();
    },
    contentEdit(){

    },
    contentDelete(){

    },
    // 新建
    showModal() {
      this.uploadVisible = true;
    },
    // 对话框取消
    handleCancel() {
      this.uploadVisible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          flowerSaveOrUpdate(values).then(res=>{
            this.$tips.success('新增成功！')
            this.uploadVisible = false
          })
        }
      });
    },
    handleChange(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          this.$nextTick(()=>{
            this.form.setFieldsValue({'bigImg':file.response.data.src})
          })
        }
        return file;
      });
      this.bigImg = fileList;
      console.log(this.bigImg)
    },
    handleChange2(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          this.$nextTick(()=>{
            this.form.setFieldsValue({'typeImg':file.response.data.src})
          })
        }
        return file;
      });
      this.typeImg = fileList;
    },
  }
}
</script>

<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
</style>
