<template>
  <div class="hello">
    <div id="editor">
      <img src="../assets/banner.png" height="204" width="578"/>
      <h1>一款让文档轻如鸿毛的在线文档编辑平台</h1>
    </div>


  </div>
</template>

<script>

  export default {
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
#editor{
  display: flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: url(../assets/background.jpg);
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#editor h1{
  padding: 5px 25px 5px 25px;
  background: rgba(250,250,250,0.3);
  letter-spacing: 5px;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: normal;
  font-size: 50px;
  color: #0066CC;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(250,250,250,0.3);
}
</style>
