(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-688fc829"],{2909:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var a=r("6b75");function o(e){if(Array.isArray(e))return Object(a["a"])(e)}r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("a630");function n(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}var i=r("06c5");function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e){return o(e)||n(e)||Object(i["a"])(e)||s()}},3752:function(e,t,r){"use strict";r("d7f8")},4875:function(e,t,r){"use strict";r.d(t,"h",(function(){return f})),r.d(t,"d",(function(){return g})),r.d(t,"l",(function(){return h})),r.d(t,"g",(function(){return y})),r.d(t,"f",(function(){return b})),r.d(t,"a",(function(){return w})),r.d(t,"i",(function(){return v})),r.d(t,"j",(function(){return I})),r.d(t,"b",(function(){return L})),r.d(t,"k",(function(){return T})),r.d(t,"c",(function(){return F})),r.d(t,"m",(function(){return x})),r.d(t,"e",(function(){return C}));r("d3b7");var a=r("4360"),o=r("9fb0"),n=r("56cd"),i=r("bc3a"),s=r.n(i),l=r("a78e"),u=r.n(l),d=(r("a27e"),s.a.create({baseURL:"/hua",timeout:3e4})),p=function(e){if(e.response){var t=e.response.data,r=u.a.get(o["a"]);return 401!==e.response.status||t.result&&t.result.isLogin?403===e.response.status?n["a"].error({message:"Forbidden",description:t.message}):n["a"].error({message:t.status,description:t.error}):(n["a"].error({message:"Unauthorized",description:"Authorization verification failed"}),r&&a["a"].dispatch("Logout").then((function(){setTimeout((function(){window.location.reload()}),1500)}))),Promise.reject(e)}return n["a"].warning({message:"warning",description:e.message}),Promise.reject(e)};d.interceptors.request.use((function(e){u.a.get(o["a"]);return e}),p),d.interceptors.response.use((function(e){e.data;if(200===e.status)return e.data;n["a"].warning({message:"warning",description:e.message})}),p);var c=d,m={flowerTypeList:"/flowerType/getFLowerTypeList",flowerSaveOrUpdate:"/flowerType/flowerSaveOrUpdate",flower2SaveOrUpdate:"/flower/flowerSaveOrUpdate",delFlowerTypeById:"/flowerType/delFlowerTypeById",commentList:"/comment/getCommentFlowerList",getCommentListByFlowerId:"/comment/getCommentListByFlowerId",deleteComment:"/comment/removeCommentById",emailList:"/googleUser/getGoogleUserList",deleteEmail:"/googleUser/removeGoogleById",TypeTree:"/flowerType/getFLowerTypeList",fileUpload:"/file/layeditUpload",getHtml:"/file/getDocx",flowerList:"/flower/getFLowerList",deleteFlower:"/flower/flowerDelById",getAuthor:"/author/getAuthorRand"};function f(e){return c({url:m.getAuthor,method:"post",data:e})}function g(e){return c({url:m.deleteFlower,method:"post",data:e})}function h(e){return c({url:m.flowerList,method:"post",data:e})}function y(e){return c({url:m.flowerSaveOrUpdate,method:"post",data:e})}function b(e){return c({url:m.flower2SaveOrUpdate,method:"post",data:e})}function w(e){return c({url:m.delFlowerTypeById,method:"post",data:e})}function v(e){return c({url:m.commentList,method:"post",data:e})}function I(e){return c({url:m.getCommentListByFlowerId,method:"post",data:e})}function L(e){return c({url:m.deleteComment,method:"post",params:e})}function T(e){return c({url:m.emailList,method:"post",data:e})}function F(e){return c({url:m.deleteEmail,method:"post",params:e})}function x(e){return c({url:m.TypeTree,method:"get",params:e})}function C(e){return c({url:m.fileUpload,method:"post",data:e})}},"77b8":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("page-header-wrapper",[r("a-card",[r("a-row",{staticStyle:{"margin-bottom":"20px"}},[r("a-col",{attrs:{span:12}},[r("a-button",{attrs:{type:"primary"},on:{click:e.showModal}},[e._v("新增分类")])],1),r("a-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[e._v(" 分类名： "),r("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please input your typeName"},model:{value:e.typeName,callback:function(t){e.typeName=t},expression:"typeName"}})],1)],1),r("a-table",{staticStyle:{background:"#FFFFFF"},attrs:{columns:e.columns,rowKey:"value","data-source":e.filterTree,"expanded-row-keys":e.expandedRowKeys,loading:e.btnLoading2,bordered:"",pagination:!1},on:{"update:expandedRowKeys":function(t){e.expandedRowKeys=t},"update:expanded-row-keys":function(t){e.expandedRowKeys=t}},scopedSlots:e._u([{key:"flowerTypeName",fn:function(t){return r("span",{},[r("a-tag",{attrs:{color:"#2db7f5"}},[e._v(" "+e._s(t)+" ")])],1)}},{key:"iconSrc",fn:function(e){return r("span",{},[r("a-avatar",{attrs:{shape:"square",size:100,src:e}})],1)}},{key:"action",fn:function(t,a){return r("span",{},[r("a",{on:{click:function(t){return t.preventDefault(),e.contentEdit(a)}}},[e._v("编辑")]),r("a-divider",{attrs:{type:"vertical"}}),1!=a.value?r("a",{on:{click:function(t){return t.preventDefault(),e.contentDelete(a)}}},[e._v("删除")]):e._e()],1)}}])})],1),r("a-modal",{attrs:{title:e.addTitle,visible:e.uploadVisible,"confirm-loading":e.confirmLoading,footer:null},on:{cancel:e.handleCancel}},[r("a-form",e._b({attrs:{id:"components-form-demo-validate-other",form:e.form},on:{submit:e.handleSubmit}},"a-form",e.formItemLayout,!1),[r("a-form-item",{attrs:{"label-col":e.formItemLayout.labelCol,"wrapper-col":e.formItemLayout.wrapperCol,label:"类型名称"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["flowerTypeName",{rules:[{required:!0,message:"Please input your flowerTypeName!"}]}],expression:"['flowerTypeName',{rules: [\n              {\n                required: true,\n                message: 'Please input your flowerTypeName!',\n              },\n            ]}]"}],attrs:{placeholder:"Please input your flowerTypeName"}})],1),r("a-form-item",{attrs:{"label-col":e.formItemLayout.labelCol,"wrapper-col":e.formItemLayout.wrapperCol,label:"类型描述"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["flowerTypeDescribe",{rules:[{required:!0,message:"Please input your flowerTypeDescribe!"}]}],expression:"['flowerTypeDescribe',{rules: [\n              {\n                required: true,\n                message: 'Please input your flowerTypeDescribe!',\n              },\n            ]}]"}],attrs:{placeholder:"Please input your flowerTypeDescribe"}})],1),r("a-form-item",{attrs:{"label-col":e.formItemLayout.labelCol,"wrapper-col":e.formItemLayout.wrapperCol,label:"排序"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["sort",{rules:[{required:!0,message:"Please input your sort!"}]}],expression:"['sort',{rules: [\n              {\n                required: true,\n                message: 'Please input your sort!',\n              },\n            ]}]"}],attrs:{placeholder:"Please input your sort"}})],1),r("a-form-item",{attrs:{"label-col":e.formItemLayout.labelCol,"wrapper-col":e.formItemLayout.wrapperCol,label:"上级分类ID"}},[r("a-cascader",{directives:[{name:"decorator",rawName:"v-decorator",value:["topId",{defaultValue:[]}],expression:"['topId',{defaultValue:[]}]"}],attrs:{options:e.options,"change-on-select":"","expand-trigger":"hover",placeholder:"Please select"}})],1),r("a-form-item",{attrs:{label:"类型图片上传"}},[r("a-upload",{attrs:{name:"file","list-type":"picture",accept:"image/*",multiple:!1,action:"/hua/file/layeditUpload","file-list":e.typeList},on:{change:e.handleChange2}},[r("a-button",[r("a-icon",{attrs:{type:"upload"}}),e._v(" Click to upload ")],1)],1),r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["typeImg",{rules:[{required:!0,message:"Please input your typeImg!"}]}],expression:"['typeImg',{rules: [\n              {\n                required: true,\n                message: 'Please input your typeImg!',\n              },\n            ]}]"}],attrs:{placeholder:"Please input your topId"}})],1),r("a-form-item",{attrs:{label:"类型大图上传"}},[r("a-upload",{attrs:{name:"file","list-type":"picture",accept:"image/*",multiple:!1,action:"/hua/file/layeditUpload","file-list":e.bigList},on:{change:e.handleChange}},[r("a-button",[r("a-icon",{attrs:{type:"upload"}}),e._v(" Click to upload ")],1)],1),r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["bigImg",{rules:[{required:!0,message:"Please input your bigImg!"}]}],expression:"['bigImg',{rules: [\n              {\n                required: true,\n                message: 'Please input your bigImg!',\n              },\n            ]}]"}],attrs:{placeholder:"Please input your bigImg"}})],1),r("a-form-item",{attrs:{"wrapper-col":{span:12,offset:6}}},[r("a-button",{attrs:{type:"primary","html-type":"submit",loading:e.btnLoading}},[e._v(" Submit ")])],1)],1)],1)],1)},o=[],n=r("2909"),i=r("5530"),s=(r("159b"),r("4e82"),r("fb6a"),r("d81d"),r("4875")),l=[{title:"分类名",dataIndex:"label",key:"label",scopedSlots:{customRender:"flowerTypeName"}},{title:"id",dataIndex:"value",key:"value"},{title:"缩略图",dataIndex:"imgUrl",key:"imgUrl",scopedSlots:{customRender:"iconSrc"}},{title:"操作",key:"action",scopedSlots:{customRender:"action"}}],u={name:"Home",components:{},data:function(){return{columns:l,addTitle:"新增分类",formItemLayout:{labelCol:{span:6},wrapperCol:{span:14}},expandedRowKeys:[],dataRow:{},typeName:"",tableData:[],btnLoading2:!1,btnLoading:!1,uploadVisible:!1,confirmLoading:!1,typeList:[],bigList:[],options:[],total:0,page:0,row:10}},computed:{filterTree:function(){return""==this.typeName?this.options:this.mapTree(this.typeName,this.options)}},beforeCreate:function(){this.form=this.$form.createForm(this,{name:"validate_other"})},created:function(){this.getTypeTree()},methods:{mapTree:function(e,t){var r=this,a=[];return t.forEach((function(t){if(t.label.indexOf(e)>-1)a.push(t);else if(t.children&&t.children.length>0){var o=r.mapTree(e,t.children);if(o&&o.length>0){var n=Object(i["a"])(Object(i["a"])({},t),{},{children:o});a.push(n)}}})),a},mapTree2:function(e,t){var r=this,a=[];return t.forEach((function(t){if(t.value==e)a.push(t);else if(t.children&&t.children.length>0){var o=r.mapTree2(e,t.children);if(o&&o.length>0){var n=Object(i["a"])(Object(i["a"])({},t),{},{children:o});a.push(n)}}})),a},getTypeTree:function(){var e=this;this.btnLoading2=!0,Object(s["m"])().then((function(t){e.options=JSON.parse(t.data),e.btnLoading2=!1})),Object(s["m"])({id:1,page:1,row:10}).then((function(t){e.options.push(JSON.parse(t.data)[0])}))},onShowSizeChange:function(e,t){this.page=e-1,this.row=t,this.getFlowerList()},contentEdit:function(e){var t=this;this.uploadVisible=!0,this.addTitle="编辑分类",this.typeList=[],this.bigList=[],this.dataRow=e,this.$nextTick((function(){var r=t.mapTree2(e.parentId,t.options);t.form.setFieldsValue({typeImg:e.imgUrl}),t.form.setFieldsValue({flowerTypeName:e.label}),t.form.setFieldsValue({flowerTypeDescribe:e.code}),t.form.setFieldsValue({bigImg:e.bigImg}),t.form.setFieldsValue({sort:e.sort}),r.length>0?t.form.setFieldsValue({topId:[r[0].value,e.parentId]}):t.form.setFieldsValue({topId:[e.parentId]})}))},contentDelete:function(e){var t=this;Object(s["a"])({id:e.value}).then((function(e){200==e.status?(t.$tips.success("删除成功！"),t.getTypeTree()):t.$tips.warning(e.message)}))},showModal:function(){var e=this;this.uploadVisible=!0,this.form.resetFields(),this.addTitle="新增分类",this.typeList=[],this.bigList=[],this.$nextTick((function(){e.form.setFieldsValue({topId:[]})}))},handleCancel:function(){this.uploadVisible=!1},handleSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,r){t.btnLoading=!0,e?t.btnLoading=!1:(3==r.topId.length?r.topId=r.topId[1]:0==r.topId.length?r.topId=0:1==r.topId.length?r.topId=r.topId[0]:2==r.topId.length&&(r.topId=r.topId[1]),"编辑分类"==t.addTitle&&(r.id=t.dataRow.value),Object(s["g"])(r).then((function(e){200==e.status?(t.$tips.success(t.addTitle+"成功！"),t.getTypeTree(),t.uploadVisible=!1):t.$tips.warning(e.message),t.btnLoading=!1})).catch((function(e){t.btnLoading=!1})))}))},handleChange2:function(e){var t=this,r=Object(n["a"])(e.fileList);r=r.slice(-1),r=r.map((function(e){if(e.response){if(e.url=e.response.data.src,!e.response.data.src)return t.typeList=[],t.$tips.warning("请求超时,请重新上传！"),!1;t.$nextTick((function(){t.form.setFieldsValue({typeImg:e.response.data.src})}))}return e})),this.typeList=r},handleChange:function(e){var t=this,r=Object(n["a"])(e.fileList);r=r.slice(-1),r=r.map((function(e){if(e.response){if(e.url=e.response.data.src,!e.response.data.src)return t.bigList=[],t.$tips.warning("请求超时,请重新上传！"),!1;t.$nextTick((function(){t.form.setFieldsValue({bigImg:e.response.data.src})}))}return e})),this.bigList=r}}},d=u,p=(r("3752"),r("2877")),c=Object(p["a"])(d,a,o,!1,null,null,null);t["default"]=c.exports},d7f8:function(e,t,r){}}]);