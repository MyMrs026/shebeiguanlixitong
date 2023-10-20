<template>
  <div class="goods">
    <div class="sub-tabbar" v-if="this.$store.state.cu_role === 'admin'">
      <router-link to="/goods/category">
        <el-button plain>商品分类</el-button>
      </router-link>
      <router-link to="/goods/details">
        <el-button plain>商品详情</el-button>
      </router-link>
      <hr />
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scope>
.goods {
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/qqq6.png");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>