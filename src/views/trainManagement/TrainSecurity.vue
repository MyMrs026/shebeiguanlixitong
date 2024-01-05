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
      fileUrl:"http://47.98.160.222:8080/api/file/trainword.docx"
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
  <div class="border-style">
    <h1>微纳加工平台培训</h1>
    <p>根据微纳加工平台管理制度,用户需经注册审核,综合培训(含现场培训和安全培训)后方可开通门禁进入超净室;设备培训考核通过后方可自行操作设备.</p>
    <h2>用户注册方法</h2>
    <p>在下方页面下载填写”用户申请表”,参加培训时请携带用户申请表,身份证,申请表交由微纳加工中心存档及开通门禁.</p>
    <h2>综合培训</h2>
    <p>微纳加工中心每周二上午9:00-11:00组织综合培训.每期报名截止时间为每周日晚上12:00. 
       综合培训随时开放报名.报名申请时请按要求提供姓名,机构,职位,联系电话,邮箱等信息.报名过程中如有疑问,请联系18822595138.
       通过综合培训后方可开通门禁.
    </p>
    <h2>设备培训及考核</h2>
    <p>请与各台设备的负责老师联系,确定培训,考核相关事宜.联系方式详见设备详情页.</p><br>
    <p>附件：<a :href="fileUrl" download>微纳加工平台培训预约用户申请表</a></p>
  </div>
</template>

<style scoped>
.border-style{
  width: 80%;
  margin-left: 10%;
}
h1{
  text-align: center;
  font-size: 40px;
  color: black;
}
p{
  color: black;
  text-indent: 2em;
  
}
h2{
  color: black;
  font-size: 20px;
}
</style>