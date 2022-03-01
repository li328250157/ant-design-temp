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
      id: {
        type: String,
        default: function () {
          return "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "");
        },
      },
      richText: {
            type: String,
            default: "",
        }
    },
    data() {
        const _this = this;
        return {
            content:'',
            tinymceId: this.id,
            init: {
                selector: '#tinymce',
                language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
                language: "zh_CN", // 语言,
                skin_url: "/tinymce/skins/ui/oxide-dark", // skin路径
                content_css: "dark",
                height: 500, // 编辑器高度
                toolbar: "'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | fullscreen",
                branding: false, // 去水印
                elementpath: false, // 禁用编辑器底部的状态栏
                statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                menubar: true, // 隐藏最上方menu
                plugins: "image link fullscreen", // 图片插件
                default_link_target: '_blank',
                paste_auto_cleanup_on_paste: true,
                paste_remove_styles: true,
                paste_remove_styles_if_webkit: true,
                paste_strip_class_attributes: true,
                codesample_global_prismjs: true,
                setup: function (editor) {

                },
                images_upload_handler: (blobInfo, success,failure) => {
                  let files = new window.File([blobInfo.blob()], blobInfo.filename, {type: blobInfo.blob().type})
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
                  editor.on("KeyUp SetContent change", () => {
                    this.$emit('updateContent',tinymce.activeEditor.getContent())
                  })
                },
            },
        };
    },
    watch:{
      richText:{
        handler(newName, oldName) {
          this.$nextTick(()=>{
            this.content = newName
            console.log(tinymce)
          })
        },
        deep:true
      }
    },
    components: { Editor },
    created() {

    },
    mounted() {
      tinymce.init({});
    },
    methods: {
        pushQc(record){
          tinymce.activeEditor.insertContent(`<div style='height: 40px;line-height: 40px'><span class='ant-avatar ant-avatar-circle ant-avatar-image'><img src=${record.portrait} width='40' height='40'></span><span> By </span><span style='font-weight: bold;line-height: 40px;'>${record.authorName}</span></div>`);
        },
        pushStr(tag,tagUrl){
          let str = ""
          for (let i = 0; i < tag.length; i++) {
            str+=`<a href=${tagUrl[i]} target="_blank" rel="noopener" data-mce-href=${tagUrl[i]} data-mce-selected="inline-boundary">${tag[i]}</a>,`
          }
          tinymce.activeEditor.insertContent(str);
        }
    },
};
</script>

<style scoped>
p {
    margin: 1rem 0;
}
</style>
