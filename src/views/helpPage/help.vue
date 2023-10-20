<template>
<div class="outer-container">
<div class="bg-help">
  <div class="help"> 
    <h3 class="text-home">帮助页面</h3>
    <div class="common-questuon">
      <h3>常见问题及解答</h3>
      <h3>1.我找不到在那进行设备预约</h3>
      <h3>2.设备坏了我该怎么保修</h3>
      <h3>3.培训内容我改去那个地方获取</h3>
      <h3>4.我想创建项目并成为项目组长我该怎么做</h3>
    </div>
    <hr/>
    <div class="external">
      <h3>没有找到我想知道的问题？</h3>
      <h3>联系管理员：{{ email }}</h3>
    </div>
  </div>
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
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.bg-help{
  display: flex;
  flex-direction: column;
  overflow:hidden;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.help{
  height:700px;
  overflow-y: auto;
  padding-left: 3.125rem;
}
.text-home {
  margin-top: 0rem;
  line-height: 3.4375rem;
  font-size: 1.5rem;
  color:rgb(103, 102, 102);
}
.common-questuon{
  font-size: 1.5rem;
  margin: 10px;
  width: 60%;
  height: auto;
  border: 1px solid rgb(255, 255, 255);
  background-color: white;
  border-radius: 5px;
}
</style>