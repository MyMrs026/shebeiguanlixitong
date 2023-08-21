<template>
  <div> 
    <h3>帮助页面</h3>
    <div class="common-questuon">
      <h3>常见问题及解答</h3>
      <h1>1.我找不到在那进行设备预约</h1>
      <h1>2.设备坏了我该怎么保修</h1>
      <h1>3.培训内容我改去那个地方获取</h1>
      <h1>4.我想创建项目并成为项目组长我该怎么做</h1>
    </div>
    <hr/>
    <div class="external">
      <h3>没有找到我想知道的问题？</h3>
      <h3>联系管理员：{{ email }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  components:{

  },
  data() {
    return {
      email:"admin@edu.cn",
    }
  },
  methods:{
    
  }
}
</script>
<style scope>
.common-questuon{
  margin: 10px;
  width: 60%;
  height: auto;
  border: 1px solid black;
  border-radius: 5px;
}
</style>