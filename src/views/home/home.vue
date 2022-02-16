<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>
          <a-button type='primary' @click='showModal'>新增分类</a-button>
        </a-col>
        <a-col :span='12' style='text-align: right'>
          分类名：<a-input v-model='formInline.typeName' style='width: 450px' placeholder='input placeholder' />
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
          label="类型名称"
        >
          <a-input
            v-decorator="[
          'typeName'
        ]"
            placeholder="Please input your typeName"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="类型描述"
        >
          <a-input
            v-decorator="[
          'flowerTypeDescribe'
        ]"
            placeholder="Please input your flowerTypeDescribe"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="类型ID"
        >
          <a-input
            v-decorator="[
          'id'
        ]"
            placeholder="Please input your id"
          />
        </a-form-item>
        <a-form-item label="类型级别">
          <a-radio-group v-decorator="['level']">
            <a-radio :value="1">
              一级
            </a-radio>
            <a-radio :value="2">
              二级
            </a-radio>
            <a-radio :value="3">
              三级
            </a-radio>
          </a-radio-group>
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
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="上级分类ID"
        >
          <a-input
            v-decorator="[
          'topId',
        ]"
            placeholder="Please input your topId"
          />
        </a-form-item>
        <a-form-item label="类型大图">
          <a-upload
            name="logo"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            :file-list="bigImg" :remove="handleRemove" :before-upload="beforeUpload"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="类型图片">
          <a-upload
            name="logo"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            :file-list="typeImg" :remove="handleRemove2" :before-upload="beforeUpload2"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
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
import {getFlowerList,flowerSaveOrUpdate} from '@/api/app/app'
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
        typeName: '',
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
  },
  methods: {
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
    handleOk(){

    },
    // 对话框取消
    handleCancel() {
      this.uploadVisible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.bigImg[0])
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          values.typeImg = this.typeImgbase64
          values.bigImg =  this.bigImgbase64
          flowerSaveOrUpdate(values).then(res=>{
            this.$tips.success('新增成功！')
            this.uploadVisible = false
          })
        }
      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    handleRemove(file) {
      const index = this.bigImg.indexOf(file);
      const newFileList = this.bigImg.slice();
      newFileList.splice(index, 1);
      this.bigImg = newFileList;
    },
    beforeUpload(file) {
      this.bigImg = [file];
      let that = this
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        that.bigImgbase64 = reader.result
      }
      return false;
    },
    handleRemove2(file) {
      const index = this.typeImg.indexOf(file);
      const newFileList = this.typeImg.slice();
      newFileList.splice(index, 1);
      this.typeImg = newFileList;
    },
    beforeUpload2(file) {
      this.typeImg = [file];
      let that = this
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        that.typeImgbase64 = reader.result
      }
      return false;
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
