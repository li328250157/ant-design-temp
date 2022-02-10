<template>
    <page-header-wrapper>
        <a-card style='padding: 50px'>
            <a-form-model :model='form' :label-col='labelCol' ref='creatForm' :rules='rules' :wrapper-col='wrapperCol'>
                <a-form-model-item label='哥伦布的appCode' prop='appCode'>
                    <a-input v-model='form.appCode' />
                </a-form-model-item>
                <a-form-model-item label='自定义应用包名' prop='packageName'>
                    <a-input v-model='form.packageName' />
                </a-form-model-item>
                <a-form-model-item label='对应的gitlab projectId' prop='projectId'>
                    <a-input v-model='form.projectId' />
                </a-form-model-item>
                <a-form-model-item label='哥伦布项目id' prop='columbusProjectId'>
                    <a-input v-model='form.columbusProjectId' />
                </a-form-model-item>
                <a-form-model-item label='云平台psaid' prop='psaId'>
                    <a-input v-model='form.psaId' />
                </a-form-model-item>
                <a-form-model-item label='父应用的fid' prop='parentFid'>
                    <a-input v-model='form.parentFid' />
                </a-form-model-item>
                <a-form-model-item :wrapper-col='{ span: 14, offset: 4 }'>
                    <a-button type='primary' @click='onSubmit'>
                        注册
                    </a-button>
                    <a-button style='margin-left: 10px;' @click='resetForm'>
                        重置
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>
    </page-header-wrapper>
</template>

<script>
import { appRegister } from '@/api/app/app'

export default {
    name: 'Apply.vue',
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                appCode: '',
                packageName: '',
                projectId: '',
                columbusProjectId: '',
                psaId: '',
                parentFid:''
            },
            rules: {
                appCode: [{ required: true, message: '请输入appcode', trigger: 'blur' }],
                packageName: [{ required: true, message: '请输入packageName', trigger: 'blur' }],
                projectId: [{ required: true, message: '请输入projectId', trigger: 'blur' }],
                columbusProjectId: [{ required: true, message: '请输入columbusProjectId', trigger: 'blur' }],
                psaId: [{ required: true, message: '请输入psaId', trigger: 'blur' }]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.creatForm.validate(valid => {
                if (valid) {
                    appRegister(this.form).then(res => {
                        if (res.errno === 0) {
                            this.$notification.success({
                                message: '注册成功！'
                            })
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm() {
            this.$refs.creatForm.resetFields()
        }
    }
}
</script>

<style scoped>

</style>
