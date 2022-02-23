<template>
    <editor :id="tinymceId" v-model='content'   :init="init"></editor>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons.js";
import "tinymce/plugins/image";
import "tinymce/plugins/paste";
import "tinymce/plugins/link"
import "tinymce/plugins/fullscreen"
import { fileUpload} from '@/api/app/app'
export default {
    name: "RichText",
    props: {
      richText: {
            type: String,
            default: "",
        }
    },
    data() {
        const _this = this;
        return {
            tinymceId: "tinymce",
            init: {
                selector: '#tinymce',
                language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
                language: "zh_CN", // 语言,
                skin_url: "/tinymce/skins/ui/oxide-dark", // skin路径
                content_css: "dark",
                height: 400, // 编辑器高度
                toolbar: "'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | fullscreen",
                branding: false, // 去水印
                elementpath: false, // 禁用编辑器底部的状态栏
                statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                menubar: true, // 隐藏最上方menu
                plugins: "image link fullscreen", // 图片插件
                paste_auto_cleanup_on_paste: true,
                paste_remove_styles: true,
                paste_remove_styles_if_webkit: true,
                paste_strip_class_attributes: true,
                codesample_global_prismjs: true,
                setup: function (editor) {

                },
                images_upload_handler: (blobInfo, success,failure) => {
                  console.log(blobInfo.blob())
                  var myFile = new File(blobInfo.blob(), blobInfo.filename[options]);
                  console.log(myFile)
                  const formData = new FormData()
                  formData.append('file', blobInfo.blob())
                  fileUpload(formData).then(res=>{
                    console.log(res)
                    if (res.code==0){
                      success(res.data.src)
                    }else{
                      failure(res.msg)
                    }
                  })
                },
                init_instance_callback: (editor) => {
                  this.$emit('updateContent',tinymce.activeEditor.getContent())
                  // window.tinymce.get(_this.tinymceId).setContent( this.value);
                },
            },
        };
    },
    computed:{
      content(){
        return this.richText
      }
    },
    components: { Editor },
    created() {

    },
    mounted() {
        tinymce.init({});
    },
    methods: {

    },
};
</script>

<style scoped>
p {
    margin: 1rem 0;
}
</style>
