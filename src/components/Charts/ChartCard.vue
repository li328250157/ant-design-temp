<template>
    <a-card :loading="loading" :body-style="{ padding: '20px 24px 8px' }" :bordered="false">
        <div class="chart-card-header">
            <div class="meta">
                <span class="chart-card-title">
                    <slot name="title">
                        {{ title }}
                    </slot>
                </span>
                <span class="chart-card-detail" v-if='treeData' @click='openDetail'>
                    <slot name="detail">
                         {{ treeData.length>0?detail:'' }}
                    </slot>
                </span>
                <span class="chart-card-action">
                    <slot name="action"></slot>
                </span>
            </div>
            <div class="total">
                <slot name="total">
                    <span>{{ (typeof total === 'function' && total()) || total }}</span>
                </slot>
            </div>
        </div>
        <div class="chart-card-content">
            <div class="content-fix">
                <slot></slot>
            </div>
        </div>
        <div class="chart-card-footer">
            <div class="field">
                <slot name="footer"></slot>
            </div>
        </div>
        <a-modal
            title="详情"
            :visible="visible"
            :footer="null"
            :width='900'
            @cancel='handleCancel'
        >
            <div style='overflow: auto'>
                <a-tree :tree-data="treeData"  blockNode show-icon>
                    <a-icon slot="methods" type="api" />
                    <a-icon slot="file" type="file" />
                </a-tree>
            </div>
        </a-modal>
    </a-card>
</template>

<script>
    export default {
        name: 'ChartCard',
        data(){
          return {
              visible:false
          }
        },
        props: {
            title: {
                type: String,
                default: '',
            },
            detail:{
                type: String,
                default: '',
            },
            total: {
                type: [Function, Number, String],
                required: false,
                default: null,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            treeData:{
                type:Array,
                detail: []
            }
        },
        methods:{
            openDetail(){
                this.visible = true;
            },
            handleCancel() {
                this.visible = false;
            },
        }
    }
</script>

<style lang="less" scoped>
.chart-card-header {
    position: relative;
    overflow: hidden;
    width: 100%;

    .meta {
        position: relative;
        overflow: hidden;
        width: 100%;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
    }
}
.chart-card-detail{
    text-decoration: underline;
    color: #00A0E9;
    cursor: pointer;
}
.chart-card-action {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
}

.chart-card-footer {
    border-top: 1px solid #e8e8e8;
    padding-top: 9px;
    margin-top: 8px;

    > * {
        position: relative;
    }

    .field {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
    }
}

.chart-card-content {
    margin-bottom: 12px;
    position: relative;
    height: 46px;
    width: 100%;

    .content-fix {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}

.total {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #000;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
}
</style>
