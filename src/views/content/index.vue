<template>
  <page-header-wrapper>
    <a-card>
      <a-row style='margin-bottom: 20px'>
        <a-col :span='12'>
          <a-button type='primary' @click='showModal'>新增文章</a-button>
        </a-col>
        <a-col :span='12' style='text-align: right'>
          标题：<a-input-search v-model='formInline.title' placeholder="input search text" style="width: 400px" @search="getFlowerList" />
        </a-col>
      </a-row>
      <a-table :columns='columns' rowKey='id' :data-source='tableData'  :loading="btnLoading2" style='background: #FFFFFF' bordered :pagination='false'>
            <span slot='classic' slot-scope='typeFirst,record'>
              <a-cascader
                :defaultValue='[typeFirst,record.typeSecond,record.typeThird]'
                style='width: 300px'
                :options="options"
                disabled
                placeholder="Please select"
              />
            </span>
           <span slot='iconSrc' slot-scope='iconSrc'>
                <a-avatar  shape="square" :size="200" :src="iconSrc" />
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
      :title="title"
      :visible="uploadVisible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      width='60%'
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
          <a-input v-decorator="['title',{rules: [
              {
                required: true,
                message: 'Please input your title!',
              },
            ]}]" placeholder="Please input your typeName" />
        </a-form-item>
        <a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="描述">
          <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            v-decorator="['describe',{rules: [
              {
                required: true,
                message: 'Please input your describe!',
              },
            ]}]"
            :auto-size="{ minRows: 4 }"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="作者"
        >
          <a-switch  v-decorator="['generateAuthor',{ valuePropName: 'checked' }]" />
          <a-button type="primary" style='margin-left: 20px' @click='pushQc(true)'>追加作者</a-button>
          <a-button type="primary" style='margin-left: 20px' @click='pushQc(false)'>追加标签</a-button>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="生成HTML文件"
        >
          <a-switch v-decorator="['generateHtml',{ valuePropName: 'checked' }]" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="所属分类"
        >
          <a-cascader
            v-decorator="['typeName',{rules: [
              {
                required: true,
                message: 'Please input your typeName!',
              },
            ]}]"
            :options="options"
            change-on-select
            expand-trigger="hover"
            placeholder="Please select"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="标签"
        >
          <a-select
            v-decorator="['tag']"
            mode="tags"
            style="width: 100%"
            allowClear
            placeholder="输入标签"
            option-label-prop="label"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="标签url地址"
        >
          <a-select
            v-decorator="['tagUrl']"
            mode="tags"
            style="width: 100%"
            allowClear
            placeholder="输入标签url地址"
            option-label-prop="label"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          v-if='form.getFieldValue("showType")!=4'
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="word解析"
        >
          <a-upload
            name="file"
            list-type="picture"
            accept='.doc,.docx'
            :showUploadList='false'
            :multiple="false"
            action="/hua/file/getDocx"
            :file-list="wordList"
            @change="handleChangeDoc"
          >
            <a-button> <a-icon type="upload" /> word解析 </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="富文本"
        >
          <tinymce   v-if="editversion"  ref='tin' :richText='richText' @updateContent='updateContent' />
        </a-form-item>
        <a-form-item label="展示类型">
          <a-select  v-decorator="['showType',{defaultValue:1,rules: [
              {
                required: true,
                message: 'Please input your showType!',
              },
            ]}]" @change='changeShowType'>
            <a-select-option value="1">
              大图文
            </a-select-option>
            <a-select-option value="2">
              三图
            </a-select-option>
            <a-select-option value="3">
              文字
            </a-select-option>
            <a-select-option value="4">
              视频
            </a-select-option>
            <a-select-option value="5">
              小图文
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="封面图" v-if='form.getFieldValue("showType")==1||form.getFieldValue("showType")==5||form.getFieldValue("showType")==4'  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            :multiple="false"
            action="/hua/file/layeditUpload"
            :file-list="bigImg"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="['iconSrc',{rules: [
              {
                required: true,
                message: 'Please input your iconSrc!',
              },
            ]}]"
            placeholder="Please input your iconSrc"
          />
        </a-form-item>
        <a-form-item label="封面图" v-if='form.getFieldValue("showType")==2'  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            action="/hua/file/layeditUpload"
            :file-list="typeImg1"
            @change="handleChange2"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="['iconSrc1',{rules: [
              {
                required: true,
                message: 'Please input your iconSrc!',
              },
            ]}]"
            placeholder="Please input your iconSrc"
          />
        </a-form-item>
        <a-form-item label="封面图" v-if='form.getFieldValue("showType")==2'  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            action="/hua/file/layeditUpload"
            :file-list="typeImg2"
            @change="handleChange4"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="['iconSrc2',{rules: [
              {
                required: true,
                message: 'Please input your iconSrc!',
              },
            ]}]"
            placeholder="Please input your iconSrc"
          />
        </a-form-item>
        <a-form-item label="封面图" v-if='form.getFieldValue("showType")==2'  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            accept='image/*'
            action="/hua/file/layeditUpload"
            :file-list="typeImg3"
            @change="handleChange5"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="['iconSrc3',{rules: [
              {
                required: true,
                message: 'Please input your iconSrc!',
              },
            ]}]"
            placeholder="Please input your iconSrc"
          />
        </a-form-item>
        <a-form-item label="视频上传" v-if='form.getFieldValue("showType")==4'  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-upload
            name="file"
            list-type="picture"
            :multiple="false"
            action="/hua/file/layeditUpload"
            :file-list="videoList"
            @change="handleChange3"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
          <a-input
            v-decorator="[
          'videoSrc',{rules: [
              {
                required: true,
                message: 'Please input your videoSrc!',
              },
            ]}
        ]"
            placeholder="Please input your videoSrc"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 12 }">
          <a-button type="primary" :loading='btnLoading' html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { flower2SaveOrUpdate, getFlowerList, getTypeTree, deleteFlower ,getAuthor } from '@/api/app/app'
import tinymce from "./tinymce";
import mammoth from "mammoth";
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
    title: '缩略图',
    dataIndex: 'iconSrc',
    key: 'iconSrc',
    scopedSlots: { customRender: 'iconSrc' },
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
      editversion:false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      formInline: {
        title: '',
        id:'',
        level:'',
        topId:''
      },
      rowData:{},
      title:"新增文章",
      richText:'',
      tableData:[],
      btnLoading2:false,
      btnLoading:false,
      uploadVisible:false,
      confirmLoading: false,
      typeImg1: [],
      typeImg2: [],
      typeImg3: [],
      bigImg:[],
      wordList:[],
      options:[],
      videoList:[],
      total:0,
      page:1,
      row:10
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  created() {
    this.getTypeTree()
    this.getFlowerList()
  },
  methods: {
    pushQc(record){
      if (record){
        getAuthor().then(res=>{
          this.$refs.tin.pushQc(res.data.list[0])
        })
      }else{
        this.$nextTick(()=>{
          console.log(this.form.getFieldValue("tag"))
          this.$refs.tin.pushStr(this.form.getFieldValue("tag"),this.form.getFieldValue("tagUrl"))
        })
      }
    },
    getTypeTree(){
      getTypeTree().then(res=>{
        console.log(res)
        this.options = JSON.parse(res.data)
        console.log(JSON.parse(res.data))
      })
    },
    getFlowerList(){
      this.btnLoading2 = true
      getFlowerList({
        page:this.page,
        row:this.row,
        title: this.formInline.title,
        rand:2
      }).then(res=>{
        this.btnLoading2 = false
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    onShowSizeChange(current, pageSize) {
      this.page = current;
      this.row = pageSize
      this.getFlowerList();
    },
    contentEdit(record){
      this.uploadVisible = true;
      this.title = "编辑文章"
      this.rowData = record;
      this.$nextTick(()=>{
        this.editversion =true;
        this.form.setFieldsValue({'showType':record.showType})
          this.$nextTick(()=>{
            if (record.showType==2){
              this.form.setFieldsValue({'iconSrc1':record.iconSrc.split(',')[0]})
              this.form.setFieldsValue({'iconSrc2':record.iconSrc.split(',')[1]})
              this.form.setFieldsValue({'iconSrc3':record.iconSrc.split(',')[2]})
            }else{
              this.form.setFieldsValue({'iconSrc':record.iconSrc})
            }
            this.richText= record.htmlText
          })
        this.form.setFieldsValue({'generateAuthor':Boolean(Number(record.generateAuthor))})
        this.form.setFieldsValue({'generateHtml':Boolean(Number(record.generateHtml))})
        this.form.setFieldsValue({'tag':record.tag.split(',')})
        this.form.setFieldsValue({'tagUrl':record.tagUrl.split(',')})
        this.form.setFieldsValue({'title':record.title})
        this.form.setFieldsValue({'title':record.title})
        this.form.setFieldsValue({'describe':record.describe})
        this.form.setFieldsValue({'videoSrc':record.videoSrc})
        this.form.setFieldsValue({'typeName':[record.typeFirst,record.typeSecond,record.typeThird]})
      })
    },
    updateContent(value){
        this.richText = value
    },
    contentDelete(record){
      deleteFlower({
          id:record.id
        }).then(res=>{
          this.$tips.success('删除成功！')
        this.getFlowerList()
        })
    },
    showModal() {
      this.uploadVisible = true;
      this.editversion =true;
      this.title = "新增文章"
      this.form.resetFields()
      this.richText =""
      this.typeImg= []
      this.bigImg = []
      this.videoList= []
      this.wordList= []
      this.$nextTick(()=>{
        this.form.setFieldsValue({'generateAuthor':true})
        this.form.setFieldsValue({'generateHtml':true})
        this.form.setFieldsValue({'showType':"1"})
        this.form.setFieldsValue({'tag':[]})
        this.form.setFieldsValue({'tagUrl':[]})
      })
    },
    changeShowType(){
      this.$nextTick(()=> {
        this.typeImg= []
        this.bigImg = []
        this.videoList= []
        this.wordList= []
        this.form.setFieldsValue({ 'iconSrc': '' })
      })
    },
    // 对话框取消
    handleCancel() {
      this.uploadVisible = false;
      this.editversion =false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.btnLoading = true
          if (values.showType==2){
            values.iconSrc = values.iconSrc1+','+values.iconSrc2+','+values.iconSrc3;
            delete  values.iconSrc1
            delete  values.iconSrc2
            delete  values.iconSrc3
          }
          if (this.title=="编辑文章"){
            values.id = this.rowData.id
          }
          values.typeFirst = Number(values.typeName[0])||0
          values.typeSecond = Number(values.typeName[1])||0
          values.typeThird = Number(values.typeName[2])||0
          values.generateAuthor =  values.generateAuthor?1:0
          values.generateHtml =  values.generateHtml?1:0
          values.htmlText = this.richText
          values.tag = values.tag.join(',')
          values.tagUrl = values.tagUrl.join(',')
          delete  values.typeName
          console.log(values)
          flower2SaveOrUpdate(values).then(res=>{
            if (res.status == 200){
              this.$tips.success('新增成功！')
              this.getFlowerList()
              this.uploadVisible = false
            }else {
              this.$tips.warning(res.message)
            }
            this.btnLoading = false
          })
        }
      });
    },
    handleChange(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      let testmsg = /^image\/(jpeg|png|jpg|pjp|svg|tiff|ico|webp|gif)$/.test(file.file.type)
      if (!testmsg){
        this.$tips.warning('请上传图片格式！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'iconSrc':file.response.data.src})
            })
          }else{
            this.bigImg = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.bigImg = fileList;
    },
    handleChange2(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      let testmsg = /^image\/(jpeg|png|jpg|pjp|svg|tiff|ico|webp|gif)$/.test(file.file.type)
      if (!testmsg){
        this.$tips.warning('请上传图片格式！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'iconSrc1':file.response.data.src})
            })
          }else{
            this.typeImg1 = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.typeImg1 = fileList;
    },
    handleChange4(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      let testmsg = /^image\/(jpeg|png|jpg|pjp|svg|tiff|ico|webp|gif)$/.test(file.file.type)
      if (!testmsg){
        this.$tips.warning('请上传图片格式！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'iconSrc2':file.response.data.src})
            })
          }else{
            this.typeImg2 = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.typeImg2 = fileList;
    },
    handleChange5(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      let testmsg = /^image\/(jpeg|png|jpg|pjp|svg|tiff|ico|webp|gif)$/.test(file.file.type)
      if (!testmsg){
        this.$tips.warning('请上传图片格式！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'iconSrc3':file.response.data.src})
            })
          }else{
            this.typeImg3 = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.typeImg3 = fileList;
    },
    handleChange3(file) {
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      let testmsg = /^video\/(mp4|ogg|flv|avi|wmv|rmvb)$/.test(file.file.type)
      if (!testmsg){
        this.$tips.warning('请上视频格式！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.src;
          if (file.response.data.src){
            this.$nextTick(()=>{
              this.form.setFieldsValue({'videoSrc':file.response.data.src})
            })
          }else{
            this.videoList = [];
            this.$tips.warning('请求超时,请重新上传！')
          }
        }
        return file;
      });
      this.videoList = fileList;
    },
    handleChangeDoc(file){
      let fileList = [...file.fileList];
      fileList = fileList.slice(-1);
      var FileExt = file.file.name.replace(/.+\./, "");
      if (['doc','docx'].indexOf(FileExt.toLowerCase()) === -1){
        this.$tips.warning('请上传后缀名为doc、docx的附件！');
        return false;
      }
      fileList = fileList.map(file => {
        if (file.response) {
          this.$nextTick(()=>{
            console.log(file)
            this.richText = file.response
          })
        }
        return file;
      });
      this.wordList = fileList;
    },
    beforeUpload(file){
      var FileExt = file.name.replace(/.+\./, "");
      if (['doc','docx'].indexOf(FileExt.toLowerCase()) === -1){
        this.$tips.warning('请上传后缀名为doc、docx的附件！');
        return false;
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
