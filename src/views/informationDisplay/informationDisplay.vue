<template>
  <div class="outer-container">
    <div class="bg">
      <el-tabs type="border-card">

        <el-tab-pane
          label="用户账户"
          v-if="this.$store.state.cu_role === 'staff'"
        >
          <el-descriptions :column=1>
            <el-descriptions-item
              label="消费明细"
              labelStyle="width:90px"
            >
              <el-table
                :data="expendRecord"
                style="width: 70%"
              >
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="event"
                  label="事件"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="lab"
                  label="实验室"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="expend"
                  label="支出"
                >
                </el-table-column>
              </el-table>
            </el-descriptions-item>
            <el-descriptions-item label="总支出">{{totalexpend}}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </diV>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: 0,
      totalexpend: 0,
      expendRecord: [
        {
          date: "2016-05-02",
          event: "购买设备1",
          lab: "",
          expend: -1000,
        },
        {
          date: "2016-05-04",
          event: "购买材料1",
          lab: "",
          expend: -200,
        },
        {
          date: "2016-05-01",
          event: "购买设备2",
          lab: "",
          expend: -2000,
        },
        {
          date: "2016-05-03",
          event: "购买材料2",
          lab: "",
          expend: -300,
        },
      ],
    };
  },
  methods: {
    calculateBalance() {
      let totalexpend = 0;
      for (let record of this.expendRecord) {
        totalexpend += record.expend;
      }
      this.totalexpend = totalexpend;
    },
  },
  mounted() {
    this.calculateBalance();
  },
  watch: {
    expenseRecord: {
      handler() {
        this.calculateBalance();
      },
      deep: true,
    },
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
.bg{
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
</style>