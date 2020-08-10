<template>
  <div class="hello">
    <div id="editor">
      <p>欢迎使用 <b>金刚石</b> 文档</p>
    </div>

    <div>
      <editor></editor>
    </div>


  </div>
</template>

<script>
  import Editor from './Editor'

  export default {
    components: { Editor },
    data() {
      return {
        isClear: false,
        detail:"",
        text:''
      }
    },
    methods: {
      change(val) {
        console.log(val);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
