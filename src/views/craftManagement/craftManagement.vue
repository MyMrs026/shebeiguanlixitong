<template>
  <div class="outer-container">
    <div class="container">
      <p class="text-title">{{ message }}</p>
      <div class="table-equcraft-use">
        <div
          class="menu-icon"
          style="
              margin-top: 2.5rem;
              font-size: 1.2rem;
              letter-spacing: 0.3125rem;
              text-align: left;
            "
        >
          工艺管理模块的目的是为您的微纳米制造步骤提供合理的建议，指导您使用正确的设备和方法。
          <br />
          在这些内容中您可以找到一些制造工艺流程和设备概述，如果您需要关于某些仪器或工艺的进一步信息，请与相关人员联系。
        </div>
      </div>
      <hr
        style="border: 1px solid white; margin-left: 10px; margin-right: 10px"
      />
      <table>
        <tr>
          <th>工艺</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td rowspan="2">{{}}</td>
          <td>介绍</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td>工艺流程和设备概述</td>
          <td>项目：{{}}<br />功能：{{}}<br />技术参数：{{}}</td>
        </tr>
        <tr>
          <td rowspan="2">{{}}</td>
          <td>介绍</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td>工艺流程和设备概述</td>
          <td>第四行 - 右列下</td>
        </tr>
        <tr>
          <td rowspan="2">{{}}</td>
          <td>介绍</td>
          <td>第五行 - 右列下</td>
        </tr>
        <tr>
          <td>工艺流程和设备概述</td>
          <td>第六行 - 右列下</td>
        </tr>
        <!-- <tr>
    <td rowspan="2">4.掺杂</td>
    <td>介绍</td>
    <td>第七行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第八行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">5.表征</td>
    <td>介绍</td>
    <td>第九行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第十行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">6.键合</td>
    <td>介绍</td>
    <td>第一行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第二行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">7.热处理</td>
    <td>介绍</td>
    <td>第三行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第四行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">8.图案设计和掩膜制作</td>
    <td>介绍</td>
    <td>第五行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第六行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">9.后端加工</td>
    <td>介绍</td>
    <td>第七行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第八行 - 右列下</td>
  </tr>
  <tr>
    <td rowspan="2">10.硅片清洗</td>
    <td>介绍</td>
    <td>第九行 - 右列下</td>
  </tr>
  <tr>
    <td>工艺流程和设备概述</td>
    <td>第十行 - 右列下</td>
  </tr> -->
      </table>
    </div>
  </div>
</template>
<script>
export default {
  /**
   * 该文件目前和设备工艺文件大同小异，对照着写即可。
   */
  components: {},
  data() {
    return {
      message: "工艺参数",
      craftParams: [],

      deviceName: ""
    };
  }
};
</script>
<style scope>
.outer-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.text-title {
  margin-top: 0px;
  margin-left: 50px;
  line-height: 55px;
  font-size: 20px;
}
.table-equcraft-use {
  margin-left: 50px;
  margin-right: 50px;
}
.table-equcraft {
  width: auto;
  height: auto;
  border: 0px solid #000000;
  box-shadow: 0 2px 4px rgba(246, 245, 245, 0.2);
  margin: 0 auto;
  font-size: 1rem;
  font-family: w95fa;
}

.p-device {
  width: 40%;
  float: left;
  height: 400px;
  margin-left: 50px;
  margin-right: 50px;
}

.form-equcraft-use {
  margin-left: 50px;
  width: 40%;
  float: left;
}
.form-equcraft {
  margin-left: 50px;
}
.form-equcraft label {
  font-size: 1rem;
  font-family: w95fa;
  color: rgb(50, 49, 49);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
