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

            editor.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit('change', this.editorContent); // 将内容同步到父组件中
                // alert("1");
            }
            editor.create()
            // 初始化文本编辑器内容
            // axios.get('/api/documents/get-doc-1')
            //     .then(function (response) {
            //         console.log(response);
            //         editor.txt.html(response.data.data);
            //
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

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
