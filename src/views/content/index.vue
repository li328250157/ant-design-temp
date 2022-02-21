<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>
          <a-button type='primary' @click='showModal'>新增文章</a-button>
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
    <a-modal
      title="新增文章"
      :visible="uploadVisible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      width='70%'
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
          label="标题"
        >
          <a-input v-decorator="['title']" placeholder="Please input your typeName" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="描述"
        >
          <a-input v-decorator="['describe']" placeholder="Please input your flowerTypeDescribe" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="作者"
        >
          <a-switch default-checked v-decorator="['generateAuthor']" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="生成HTML文件"
        >
          <a-switch v-decorator="['generateHtml', { valuePropName: 'checked' }]" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="所属分类"
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
          label="word上传"
        >
          <a-upload
            name="file"
            list-type="picture"
            accept='.doc,.docx'
            :multiple="false"
            action="http://121.201.66.113:9097//file/layeditUpload"
            :file-list="wordList"
            @change="handleChange2"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="富文本"
        >
          <tinymce :value='richText' />
        </a-form-item>
        <a-form-item label="封面图"           :label-col="formItemLayout.labelCol"
                     :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            action="http://121.201.66.113:9097//file/layeditUpload"
            :file-list="typeImg"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="[
          'iconSrc',
        ]"
            placeholder="Please input your iconSrc"
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
import { flowerSaveOrUpdate, getFlowerList ,getTypeTree} from '@/api/app/app'
import tinymce from "./tinymce";
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
  components: {tinymce},
  data() {
    return {
      columns,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      formInline: {
        title: '',
        level:'',
        topId:''
      },
      richText:'',
      // form:{
      //   TypeName:'aaaaaaaaaaaaa'
      // },
      tableData:[],
      btnLoading2:false,
      btnLoading:false,
      uploadVisible:false,
      confirmLoading: false,
      typeImg: [],
      wordList:[],
      options:[],
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
    this.getTypeTree()
  },
  methods: {
    getTypeTree(){
      getTypeTree().then(res=>{
        this.options = JSON.parse(res.data)
        console.log(JSON.parse(res.data))
      })
    },
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

    },
    showModal() {
      this.uploadVisible = true;
      this.$nextTick(()=>{
        // console.log(this.form.setFieldsValue({'typeName':111}))
      })
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
    handleChange(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          this.$nextTick(()=>{
            this.form.setFieldsValue({'iconSrc':file.response.data.src})
          })
        }
        return file;
      });
      this.typeImg = fileList;
    },
    handleChange2(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          this.$nextTick(()=>{
            // this.form.setFieldsValue({'iconSrc':file.response.data.src})
            this.richText="asdfgsdfsdfsdfd"
          })
        }
        return file;
      });
      this.wordList = fileList;
    }
  }
}
</script>

<style lang='less' scoped>

</style>
