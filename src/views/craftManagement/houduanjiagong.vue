<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">后端加工</h1>
        <!-- <p style="font-size: 20px;color: black;"></p> -->
    </div>
    <div style="text-align: center;height: 500px;width: 100%;">
        <p>暂无数据</p>
    </div>
    <div class="border-style">
        <!-- <h1 style="font-size: 20px;color: black;"></h1> -->
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
  