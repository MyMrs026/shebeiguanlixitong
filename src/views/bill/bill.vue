<template>
  <div>
    <h3>账单页面</h3>
    <div style="display: flex;flex-direction:column;">
      培训费用
      <el-table 
        :data="trainCost" 
        border 
        style="80%">
        <el-table-column prop="name" label="培训名称" width="120">
        </el-table-column>
        <el-table-column prop="cost" label="共计花费" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div>
      设备使用费用
      <el-table 
        :data="equCost" 
        border
        style="width: 100%"> 
        <el-table-column prop="name" label="设备名称" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120">
        </el-table-column>
        <el-table-column prop="charge" label="收费标准" width="120">
        </el-table-column>
        <el-table-column prop="cost" label="共计花费" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div>
      商品订单费用
      <el-table 
        :data="goodsCost" 
        border
        style="width: 100%"> 
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="charge" label="收费标准" width="120">
        </el-table-column>
        <el-table-column prop="num" label="购买数量" width="120">
        </el-table-column>
        <el-table-column prop="cost" label="共计花费" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div>费用总计:{{this.totalCost}}</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      trainCost: [
        {
          name: "安全知识培训",
          cost: 120,
        },
      ],
      equCost: [
        {
          name: "ASE",
          startTime: new Date("2023-10-12 09:00"),
          endTimeL: new Date("2023-10-12 11:00"),
          charge: "80元/小时",
          cost: 160,
        },
      ],
      goodsCost: [
        {
          name: "ASE零件",
          charge: "60元/件",
          num: 2,
          cost: 120,
        },
      ],
      totalCost:0
    };
  },
  methods: {

  },
  mounted(){
    this.totalCost = this.trainCost[0].cost + this.equCost[0].cost + this.goodsCost[0].cost
  }
};
</script>
<style scope>
</style>