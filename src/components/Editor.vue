<template>
    <div>
        <div ref="editor" style="text-align:left" @change="onChange"></div>
        <!--<button v-on:click="getContent">提交</button>-->
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'editor',
        props:['passvalue'],
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
            onChange(){
                this.$emit('passtofather', this.editorContent);
            }
        },
        created(){
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
              this.editorContent = html
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
            editor.txt.html(this.passvalue);
        }
    }
</script>

<style scoped>
</style>
