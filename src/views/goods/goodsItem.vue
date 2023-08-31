<template>
  <div class="goodsItem">
    <div class="inner-container">
      <div>商品编号：{{ goodsItem.number }}</div>
      <div>商品名: {{ goodsItem.name }}</div>
      <div>
        商品图片:
        <img
          :src="require('@/assets/img/' + goodsItem.pic)"
          alt="商品图片"
          width="100"
          height="130"
        />
      </div>
      <div>商品类别: {{ goodsItem.cate }}</div>
      <div>商品库存:{{ goodsItem.storage }}{{ goodsItem.sku }}</div>
      <div>商品价格:{{ goodsItem.price }}</div>
      <div>商品介绍:{{ goodsItem.desc }}</div>
      <div><el-button type="primary" style="font-size: 2rem">购买</el-button></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      goodsItem: {},
    };
  },
  methods: {},
  mounted() {
    // console.log(this.$route.params.id);
    var number = this.$route.params.id;
    this.goodsItem = this.$store.state.goodsItems[number - 1];
    console.log(this.goodsItem);
  },
};
</script>
<style scope>
.goodsItem {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  justify-items: left;
  align-items: left;
}
.inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  border: 1px solid black;
  font-size: 2rem;
}
</style>