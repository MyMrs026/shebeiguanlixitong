<template>
  <div class="outer-container">
    <div class="container">
      <div class="help-container">
        <div
          class="lab_inform"
          v-if="labinform.length"
        >
          <el-descriptions
            class="margin-top"
            title="实验室信息详情"
            direction="vertical"
            :column="4"
            border
            style="margin: 10px;"
          >
            <el-descriptions-item label="实验室名称">{{labinform[0].labName}}</el-descriptions-item>
            <el-descriptions-item label="实验室管理员">{{labinform[0].linkman}}</el-descriptions-item>
            <el-descriptions-item
              label="实验室联系电话"
              :span="2"
            >{{labinform[0].tel}}</el-descriptions-item>
            <el-descriptions-item label="实验室布局">
              <el-tag size="small">{{labinform[0].layout}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="实验室介绍">
              国家实验室，属于科学与工程研究类国家科技创新基地，体现国家意志、实现国家使命、代表国家水平的战略科技力量，是面向国际科技竞争的创新基础平台，是保障国家安全的核心支撑，是突破型、引领型、平台型一体化的大型综合性研究基地。
              国家同步辐射实验室等5个首批国家实验室至2000年底，全部通过验收。2000年-2003年，科学技术部陆续批准了5个国家实验室的试点。随后，又于2006年启动10个第二批国家实验室试点建设。截止到2016年底，除青岛海洋科学与技术国家实验室正式获批成立外，其余14个试点的国家实验室仍处于筹建状态。 截至2021年1月，北京已成立挂牌成立中关村国家实验室、怀柔国家实验室、昌平国家实验室。
              2023年3月，根据国务院关于提请审议国务院机构改革方案的议案，重新组建科学技术部，保留国家实验室建设职责。
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div v-else>
          <el-skeleton
            :rows="6"
            animated
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLabList } from "../../network/labtory";
export default {
  data() {
    return {
      labinform: [],
    };
  },
  methods: {},
  created() {
    getLabList().then((res) => {
      // console.log(res);
      this.labinform = res.data;
      console.log(this.labinform);
    });
  },
};
</script>
<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100%视口高度，垂直居中 */
  max-width: 1500px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中 */
  padding-left: 220px;
  /* padding: 20px; 左右下留白 */
}
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.help-container {
  height: 700px;
  overflow-y: auto;
}
.lab_inform {
  margin: 10px;
  border: 1px solid black;
  border-radius: 8px;
  width: 80%;
  height: auto;
}
</style>