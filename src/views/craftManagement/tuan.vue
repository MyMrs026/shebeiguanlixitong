<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">图案设计和掩膜制作</h1>
        <!-- <p style="font-size: 20px;color: black;"></p> -->
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">套刻标记</h1>
        <div>
          <h1>1.EBL</h1>
          <p>套刻标记为20um的正方形，放在整个版图区域的四个角（左上、左下、右下、右上）。若需要每一层分开套刻，则每一层结构的四个角也加上套刻标记。</p>
          <img src="../../../src/assets/img/EBL.png" alt="">
        </div>
        <div>
          <h1>1.DUV</h1>
          <p>对准标记包含三种必需的：Search、LSA、FIA，具体尺寸请联系我们。</p>
          <img src="../../../src/assets/img/DUV1.jpg" alt="" style="height: 500px;">
          <img src="../../../src/assets/img/DUV2.jpg" alt="" style="height: 30%;">
        </div>
    </div>
    </section>
  </template>
  <script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
      }
    }
  }
  </script>
  <style scoped>
  .border-style{
    width: 80%;
    margin: 0 0 0 10% ;
  }
.el-table{
    .cell {
        white-space: pre-wrap;
    }
}
  </style>
  