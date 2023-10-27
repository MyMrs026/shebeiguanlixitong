<template>
  <div class="outer-container">
    <div class="container">
      <div class="help-container">
        <div
          class="lab_inform"
          v-if="labinform.length"
        >
          <el-table
            :data="labinform"
            style="width:100%">
            <el-table-column
              prop="labName"
              label="实验室名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="labAddress"
              label="实验室地址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="labLinkman"
              label="实验室联系人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="labTel"
              label="实验室联系方式"
              width="180">
            </el-table-column>
            <el-table-column
              prop="labLayoutUrl"
              label="实验室布局"
              width="180">
            </el-table-column>
          </el-table>
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