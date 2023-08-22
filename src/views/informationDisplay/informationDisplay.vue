<template>
  <div>
    <h2>信息展示</h2>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        
        <el-descriptions :column=1>
          <el-descriptions-item label="头像">
            <div class="block"><el-avatar
                :size="50"
                :src="circleUrl"
              ></el-avatar></div>
          </el-descriptions-item>
          <el-descriptions-item label="昵称">kooriookami</el-descriptions-item>
          <el-descriptions-item label="性别">男</el-descriptions-item>
          <el-descriptions-item label="地区">
            苏州市
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">12345@163.com</el-descriptions-item></el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane label="用户账户"  v-if="this.$store.state.cu_role === 'staff'">
        <el-descriptions :column=1>
          <el-descriptions-item label="消费明细" labelStyle="width:90px">
            <el-table 
              :data="expendRecord"
              style="width: 70%"
              >
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="event"
                label="事件"
                width="180">
              </el-table-column>
              <el-table-column
                prop="lab"
                label="实验室"
                width="180">
              </el-table-column>
              <el-table-column
                prop="expend"
                label="支出">
              </el-table-column>
            </el-table>
          </el-descriptions-item>
          <el-descriptions-item label="总支出">{{totalexpend}}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </diV>
</template>
<script>
export default {
  data() {
    return {
      balance:0,
      totalexpend:0,
      // totalincome:0,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      expendRecord: [{
        date: '2016-05-02',
        event: '购买设备1',
        lab:'',
        expend: -1000
      }, {
        date: '2016-05-04',
        event: '购买材料1',
        lab:'',
        expend:-200
      }, {
        date: '2016-05-01',
        event: '购买设备2',
        lab:'',
        expend: -2000
      }, {
        date: '2016-05-03',
        event: '购买材料2',
        lab:'',
        expend: -300
      }],
    };
  },
  methods:{
    calculateBalance() {
    let totalexpend = 0;
    for (let record of this.expendRecord) {
      totalexpend += record.expend;
    }
    this.totalexpend = totalexpend;
    }
  },
    mounted() {
      this.calculateBalance();
    },
    watch: {
      expenseRecord: {
        handler() {
          this.calculateBalance();
        },
        deep: true
      }
    }
};
</script>
<style scoped>
</style>