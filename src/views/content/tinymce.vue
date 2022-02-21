<template>
    <editor :id="tinymceId"  v-model='value' :init="init"></editor>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons.js";
import "tinymce/plugins/image";
import "tinymce/plugins/paste";
export default {
    name: "RichText",
    props: {
        value: {
            type: String,
            default: "",
        }
    },
    data() {
        const _this = this;
        return {
            content: "",
            tinymceId: "tinymce",
            init: {
                selector: '#tinymce',
                language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
                language: "zh_CN", // 语言,
                skin_url: "/tinymce/skins/ui/oxide-dark", // skin路径
                content_css: "dark",
                height: 300, // 编辑器高度
                toolbar: "'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
                branding: false, // 去水印
                elementpath: false, // 禁用编辑器底部的状态栏
                statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                menubar: true, // 隐藏最上方menu
                plugins: "image", // 图片插件
                paste_auto_cleanup_on_paste: true,
                paste_remove_styles: true,
                paste_remove_styles_if_webkit: true,
                paste_strip_class_attributes: true,
                codesample_global_prismjs: true,
                valid_elements: "p[*],img[*],pre[*]",
                setup: function (editor) {

                },
                images_upload_handler: (blobInfo, success) => {

                }, // 上传本地图片
                init_instance_callback: (editor) => {
                  window.tinymce.get(_this.tinymceId).setContent( this.value);
                },
            },
        };
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
