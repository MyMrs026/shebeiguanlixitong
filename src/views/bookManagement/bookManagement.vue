<template>
  <div class="book-container">
    <!-- 预约管理部分分为两个部分，上半部分为子导航条，下半部分包括当前用户预约设备的日程表、设备被预约的日程表等 -->
    <div class="top-div">
      <!-- 第一个 div 的内容 -->
      <div class="book-title">
        <p>设备预约日视图</p>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div class="button-group">
        <button>更新</button>
        <button>日期</button>
        <button>创建新的预约</button>
      </div>
    </div>
    <div class="bottom-div">
      <!-- 第二个 div 的内容 -->
      <el-row style="height: auto">
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button plain @click="hideClick1">{{ buttonText1 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow1">
            <p style="margin: 10px">当前用户:{{ this.$store.state.cu_role }}</p>
            <!-- 调用日程表在这里 -->
            <Schedular />
          </div>
        </el-col>
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button @click="hideClick2">{{ buttonText2 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow2">
            <p style="margin: 10px">设备名</p>
            <!-- 后期在这里默认选择下拉设备，设备列表从数据库传出 -->
            <Schedular2 />
          </div>
        </el-col>
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button @click="hideClick3">{{ buttonText3 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow3">
            <!-- 同样道理 -->
            <p style="margin: 10px">选择新设备</p>
            <Schedular3 />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Schedular from "../../components/common/schedular/Schedular.vue";
import Schedular2 from "../../components/common/schedular/Schedular2.vue"
import Schedular3 from "../../components/common/schedular/Schedular3.vue";
export default {
  components: {
    Schedular,
    Schedular2,
    Schedular3,
  },
  data() {
    return {
      //elementui中的日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: "",//日期选择器传回来的数据
      //日程表是否显示
      isShow1: true,
      isShow2: true,
      isShow3: true,
    };
  },
  computed: {
    //按钮文字切换的实现
    buttonText1() {
      return this.isShow1 ? "隐藏" : "显示";
    },
    buttonText2() {
      return this.isShow2 ? "隐藏" : "显示";
    },
    buttonText3() {
      return this.isShow3 ? "隐藏" : "显示";
    },
  },
  methods: {
    //隐藏按钮的实现
    hideClick1() {
      console.log("hideClick1");
      this.isShow1 = !this.isShow1;
    },
    hideClick2() {
      console.log("hideClick2");
      this.isShow2 = !this.isShow2;
    },
    hideClick3() {
      console.log("hideClick3");
      this.isShow3 = !this.isShow3;
    },
  },
};
</script>

<style scoped>
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  margin-left: 10px;
}

.top-div {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  height: auto;
  border: 1px solid #000;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 25px;
  background-color: rgb(230, 230, 230);
  /* 可以根据需要进行其他样式设置 */
}
.book-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-div {
  width: 90%;
  height: auto;
  border: 1px solid #000;
  border-radius: 8px;
}

.schedular-area {
  width: 90%;
  height: 100%;
}
.button-area {
  margin: 10px;
}
.button-group {
  display: flex;
  align-content: center;
}
.button-group .button {
  margin-right: 15px;
}
.button-group .button:last-child {
  margin-right: 0;
}
</style>