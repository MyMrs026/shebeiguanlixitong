<template>
  <div class="book-container">
    <div class="insdide">
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
          style="width:265px;"
        >
        </el-date-picker>
      </div>
      <div class="button-group">
        <el-button>更新</el-button>
        <el-button>日期</el-button>
        <el-button>创建新的预约</el-button>
      </div>
    </div>
    <div class="bottom-div">
      <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px;margin-top:10px;" />
      <!-- 第二个 div 的内容 -->
      <el-row style="height: auto">
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button class="button-hide" @click="hideClick1">{{ buttonText1 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow1">
            <p class="font-class">当前用户:{{ this.$store.state.cu_role }}</p>
            <!-- 调用日程表在这里 -->
            <Schedular class="schedular"/>
          </div>
        </el-col>
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button class="button-hide" @click="hideClick2">{{ buttonText2 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow2">
            <p class="font-class">设备名</p>
            <!-- 后期在这里默认选择下拉设备，设备列表从数据库传出 -->
            <Schedular2 class="schedular"/>
          </div>
        </el-col>
        <el-col :span="8" style="height: auto">
          <div class="button-area">
            <el-button class="button-hide" @click="hideClick3">{{ buttonText3 }}</el-button>
          </div>
          <div class="schedular-area" v-if="isShow3">
            <!-- 同样道理 -->
            <el-select v-model="newEqup" placeholder="请选择新设备" class="select-newequ">
              <el-option
                v-for="item in device_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <Schedular3 class="schedular"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import Schedular from "../../components/common/schedular/Schedular.vue";
import Schedular2 from "../../components/common/schedular/Schedular2.vue";
import Schedular3 from "../../components/common/schedular/Schedular3.vue";
// 分辨率大于等于1680，大部分为1920的范围情况下，调用此css
	if(window.screen.width >= 1680){
		document.write('<link rel="stylesheet" href="css/index_1920.css">');
	}
	// 分辨率在1600-1680这个范围的情况下，调用此css
	else if(window.screen.width >= 1600){
		document.write('<link rel="stylesheet" href="css/index_1600.css">');
	}
	// 分辨率小于1600的范围情况下，调用此css
	else{
		document.write('<link rel="stylesheet" href="css/index.css">');
	}
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
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "", //日期选择器传回来的数据
      //日程表是否显示
      isShow1: true,
      isShow2: true,
      isShow3: true,
      newEqup:"",
      device_options: [ //目前写死，后期也是从数据库中导入
        {
          value: "选项1",
          label: "ASE",
        },
        {
          value: "选项2",
          label: "OEA",
        },
        {
          value: "选项3",
          label: "DTP",
        },
        {
          value: "选项4",
          label: "MKI",
        },
        {
          value: "选项5",
          label: "OSD",
        },
      ],
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
  left:0;
  z-index:-1;
  overflow:hidden;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.inside {
  height: 100%;
  overflow-y: auto;
}
.clear { 
  clear:both;
  height:0px;
}
.button-hide {
  font-size: 1rem;
  margin-left: 10px
}
.font-class {
  color:#656565;
  margin-top: 0px;
  margin-left: 20px;
  line-height: 55px;
  font-size: 20px;
}
.select-newequ {
  margin-left: 20px;
  line-height: 70px;
  font-size: 20px;
  font-family: w95fa;
}
.top-div {
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  width: 95%;
  height: auto;
  /* border: 1px solid #fff;
  border-radius: 8px; */
  margin-top: 20px;
  margin-bottom: 25px;
  color: #656565;
  /* 可以根据需要进行其他样式设置 */
}
.book-title {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  margin-left: 20px;
  font-size: 20px;
  color:#6d6c6c
}
.block{
  float:left;
  margin-left:200px;
}
.bottom-div {
  width: 95%;
  height: 550px;
  /* border: 1px solid #fff;
  border-radius: 8px; */
}

.schedular-area {
  width: 90%;
  height: 100%;
}
.schedular{
  color: #393939;
  font-size: 15px;
}
.button-area {
  margin: 10px;
}
.button-group {
  float:left;
  margin-left:100px;
  align-content: center;
}
.button-group .button {
  margin-right: 15px;
  font-size: 2rem;
}
.button-group .button:last-child {
  margin-right: 0;
}
</style>