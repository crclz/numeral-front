<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <!--<button v-on:click="getContent">提交</button>-->
    </div>
</template>

<script>
    import E from 'wangeditor'
    import axios from "axios";

    export default {
        name: 'editor',
        model: {
            event: "change",
        },
        data () {
            return {
                editorContent: '',
                textdata: '',
            }
        },
        methods: {
            // getContent: function () {
            //     alert(this.editorContent);
            //     // document-controller/updateDocumentOne
            //     axios.post('/api/documents/update-doc-1', {
            //         "data": this.editorContent,
            //     })
            //         .then(function (response) {
            //             console.log(response);
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            // },
            // getEditorContent(){
            //     return this.editorContent;
            // }
        },
        created(){
        },
        mounted() {
            var editor = new E(this.$refs.editor);

            // 上传图片---------------------------↓
            // 参考 https://www.kancloud.cn/wangfupeng/wangeditor3/335782

            // 配置服务器端地址
            editor.customConfig.uploadImgServer = '/api/blobs/batch-upload'

            // 后端接受上传文件的参数名
            editor.customConfig.uploadFileName = 'file'

            // 将图片大小限制为 300kb
            editor.customConfig.uploadImgMaxSize = 3 * 128 * 1024

            // 限制一次最多上传 5 张图片
            editor.customConfig.uploadImgMaxLength = 5

            // 将 timeout 时间改为 3s
            editor.customConfig.uploadImgTimeout = 3000

            // 监听函数
            editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    console.log(xhr,editor,files);


                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    console.log(xhr,editor,result);
                    alert("上传成功");
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    console.log(xhr,editor,result);
                    alert("图片插入失败");
                },
                error: function (xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    console.log(xhr,editor);
                    alert("图片上传失败，请检查图片大小（单个文件不得超过300k）")
                },
                timeout: function (xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    console.log(xhr,editor);
                    alert("图片上传超时");
                },

                // // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    console.log(editor,result);
                //
                //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                //     var url = result.url;
                    var url = '';
                    for(let i=0;i<result.data.length;i++){
                        url=result.data[i];
                        // alert(url);
                        insertImg("http://47.95.230.65"+url);
                    }

                //
                //     // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }

            // 上传图片---------------------------↑

            editor.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit('change', this.editorContent); // 将内容同步到父组件中
                // alert("1");
            }
            editor.create()

            // 初始化文本编辑器内容
            var defaultId = this.$parent.getDocumentId();
            // alert(defaultId);
            if(defaultId != null){
                axios.get('/api/documents/'+defaultId)
                    .then((response)=>{
                        // window.console.log(response.data.length);
                        console.log(response);
                        if(response.status == 200) {
                            this.editorContent=response.data.data;
                            editor.txt.html(this.editorContent);
                            // alert("jiedaole");
                        }
                        // alert("请求成功")
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        }
    }
</script>

<style scoped>
</style>
