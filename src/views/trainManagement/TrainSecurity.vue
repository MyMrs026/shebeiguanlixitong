<script>
import MulTable from "../../components/common/table/MulTable.vue";
import { getTrainList } from "../../network/train";
import { applyTraining } from "../../network/train";

export default {
  components: {
    MulTable,
  },
  data() {
    return {
      dataList: [],
      selection: [],
      dialogVisible: false,
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    submit(selection) {
      const temp = selection.map((item) => {
        return { trainingId: item.trainingId };
      });
      applyTraining(temp).then((res) => {
        console.log(res);
        if (res.code === 2000) {
          this.$message({
            message: "提交申请成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "提交申请失败",
            type: "error",
          });
        }
      });
      this.dialogVisible = false;
      this.toggleSelection();
    },
    toggleSelection() {
      this.$refs.mulTable.clearSelection();
    },
  },
  created() {
    getTrainList().then((res) => {
      this.dataList = res.data
        .filter((item) => item.trainingType !== "设备培训")
        .map((item) => {
          return {
            ...item,
            trainingPrice: item.trainingPrice.toFixed(2),
          };
        });
    });
  },
};
</script>

<template>
  <div class="train-security">
    <MulTable
      ref="mulTable"
      :data="dataList"
      :items-per-page="2"
      row-key-field="trainingId"
      @selection-change="handleSelectionChange"
    >
      <template v-slot:columns>
        <el-table-column label="编号" type="index"> </el-table-column>
        <el-table-column label="培训名称" prop="trainingName">
        </el-table-column>
        <el-table-column label="培训类型" prop="trainingType">
        </el-table-column>
        <el-table-column label="单价(元)" prop="trainingPrice">
        </el-table-column>
      </template>
    </MulTable>
    <el-button @click="dialogVisible = true">提交申请</el-button>
    <el-button @click="toggleSelection">取消所有</el-button>

    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="dialog-content">确定要提交设备培训申请吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit(selection)">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.train-security {
    
}   

.dialog-content {
  text-align: center;
  font-size: large;
}

.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>