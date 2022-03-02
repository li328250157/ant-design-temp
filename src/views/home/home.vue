<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>
          <a-button type='primary' @click='showModal'>新增分类</a-button>
        </a-col>
        <a-col :span='12' style='text-align: right'>
          分类名：
          <a-input v-model='typeName' style='width: 400px' placeholder="Please input your typeName" />
<!--          <a-button type='primary' @click='search' style='margin-left: 10px' :loading='btnLoading'>查询</a-button>-->
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='value' :data-source='filterTree' :expanded-row-keys.sync="expandedRowKeys"  :loading="btnLoading2" style='background: #FFFFFF' bordered :pagination='false'>
            <span slot='flowerTypeName' slot-scope='flowerTypeName'>
              <a-tag color="#2db7f5">
                {{ flowerTypeName }}
              </a-tag>
            </span>
        <span slot='iconSrc' slot-scope='iconSrc'>
                <a-avatar  shape="square" :size="100" :src="iconSrc" />
            </span>
        <span slot="action" slot-scope="text, record">
              <a @click.prevent='contentEdit(record)'>编辑</a>
              <a-divider type="vertical" />
              <a @click.prevent='contentDelete(record)'>删除</a>
            </span>
      </a-table>
    </a-card>
    <a-modal
      :title="addTitle"
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
          label="类型名称"
        >
          <a-input v-decorator="['flowerTypeName',{rules: [
              {
                required: true,
                message: 'Please input your flowerTypeName!',
              },
            ]}]" placeholder="Please input your flowerTypeName" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="类型描述"
        >
          <a-input v-decorator="['flowerTypeDescribe',{rules: [
              {
                required: true,
                message: 'Please input your flowerTypeDescribe!',
              },
            ]}]" placeholder="Please input your flowerTypeDescribe" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="排序"
        >
          <a-input v-decorator="['sort',{rules: [
              {
                required: true,
                message: 'Please input your sort!',
              },
            ]}]" placeholder="Please input your sort" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="上级分类ID"
        >
          <a-cascader
            v-decorator="['topId',{defaultValue:[]}]"  :options="options" change-on-select expand-trigger="hover" placeholder="Please select" />
        </a-form-item>
        <a-form-item label="类型图片上传">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            action="/hua/file/layeditUpload"
            :file-list="typeList"
            @change="handleChange2"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input v-decorator="['typeImg',{rules: [
              {
                required: true,
                message: 'Please input your typeImg!',
              },
            ]}]" placeholder="Please input your topId" />
        </a-form-item>
        <a-form-item label="类型大图上传">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            action="/hua/file/layeditUpload"
            :file-list="bigList"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input v-decorator="['bigImg',{rules: [
              {
                required: true,
                message: 'Please input your bigImg!',
              },
            ]}]" placeholder="Please input your bigImg" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit" :loading='btnLoading'>
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import {flowerSaveOrUpdate,getTypeTree,delFlowerTypeById} from '@/api/app/app'
const columns = [
  {
    title: '分类名',
    dataIndex: 'label',
    key: 'label',
    scopedSlots: { customRender: 'flowerTypeName' },
  },
  {
    title: 'id',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: '缩略图',
    dataIndex: 'imgUrl',
    key: 'imgUrl',
    scopedSlots: { customRender: 'iconSrc' },
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
      addTitle:"新增分类",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      expandedRowKeys:[],
      typeName: "",
      tableData:[],
      btnLoading2:false,
      btnLoading:false,
      uploadVisible:false,
      confirmLoading: false,
      typeList: [],
      bigList:[],
      options:[],
      total:0,
      page:0,
      row:10
    }
  },
  computed: {
      filterTree(){
        if(this.typeName==""){
          return this.options
        }else{
          return this.mapTree(this.typeName,this.options)
        }
      }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  created() {
    this.getTypeTree()
  },
  methods: {
    mapTree(value, arr){
      let newarr = [];
      arr.forEach(element => {
        if (element.label.indexOf(value) > -1) { // 判断条件
          newarr.push(element);
        } else {
          if (element.children && element.children.length > 0) {
            let redata = this.mapTree(value, element.children);
            if (redata && redata.length > 0) {
              let obj = {
                ...element,
                children: redata
              };
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
    },
    mapTree2(value, arr){
      let newarr = [];
      arr.forEach(element => {
        if (element.value==value) { // 判断条件
          newarr.push(element);
        } else {
          if (element.children && element.children.length > 0) {
            let redata = this.mapTree2(value, element.children);
            if (redata && redata.length > 0) {
              let obj = {
                ...element,
                children: redata
              };
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
    },
    getTypeTree(){
      this.btnLoading2 = true
      getTypeTree().then(res=>{
        this.options = JSON.parse(res.data);
        this.btnLoading2 = false
      })
    },
    onShowSizeChange(current, pageSize) {
      this.page = current-1;
      this.row = pageSize
      this.getFlowerList();
    },
    contentEdit(record){
      this.uploadVisible = true;
      this.addTitle = "编辑分类"
      this.typeList = [];
      this.bigList = [];
      this.$nextTick(()=>{
        let arr = this.mapTree2(record.parentId,this.options)
        this.form.setFieldsValue({'typeImg':record.imgUrl})
        this.form.setFieldsValue({'flowerTypeName':record.label})
        this.form.setFieldsValue({'flowerTypeDescribe':record.code})
        this.form.setFieldsValue({'bigImg':record.bigImg})
        this.form.setFieldsValue({'sort':record.sort})
        if (arr.length>0){
          this.form.setFieldsValue({'topId':[arr[0].value,record.parentId]})
        }else {
          this.form.setFieldsValue({'topId':[record.parentId]})
        }
      })

      console.log(record)
    },
    contentDelete(record){
      console.log(record)
      delFlowerTypeById({ id:record.value }).then(res=>{
        this.$tips.success('删除成功！')
        this.getTypeTree()
      })
    },
    // 新建
    showModal() {
      this.uploadVisible = true;
      this.form.resetFields();
      this.addTitle = "新增分类"
      this.typeList = [];
      this.bigList = [];
      this.$nextTick(()=>{
        this.form.setFieldsValue({'topId':[]})
      })
    },
    // 对话框取消
    handleCancel() {
      this.uploadVisible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(values)
        this.btnLoading = true
        if (!err) {
          if (values.topId.length==3){
            values.topId = values.topId[1]
          }else if(values.topId.length==0){
            values.topId = 0
          }else if(values.topId.length==1){
            values.topId = values.topId[0]
          }else if(values.topId.length==2){
            values.topId = values.topId[1]
          }
          flowerSaveOrUpdate(values).then(res=>{
            this.$tips.success(this.addTitle+'成功！')
            this.getTypeTree()
            this.btnLoading = false
            this.uploadVisible = false
          }).catch(err=>{
            this.btnLoading = false
          })
        }
      });
    },
    handleChange2(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'typeImg':file.response.data.src})
            })
          }else{
            this.typeList = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.typeList = fileList;
    },
    handleChange(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'bigImg':file.response.data.src})
            })
          }else{
            this.bigList = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.bigList = fileList;
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
