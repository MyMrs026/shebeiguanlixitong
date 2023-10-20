<template>
  <div class="outer-container">
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
              style="width: 265px"
            >
            </el-date-picker>
          </div>
          <hr
            style="
              border: 1px solid white;
              margin-left: 10px;
              margin-right: 10px;
              margin-top: 10px;
            "
          />
        </div>

        <!-- 第二个 div 的内容 -->
        <div class="fullcalendar-area">
          <div class="content-area">
            <div class="schedular-area">
              <p class="font-class">当前用户:{{ this.$store.state.cu_role }}</p>
              <!-- 调用日程表在这里 -->
              <!-- <div>{{this.orderEvents}}</div> -->
              <Schedular :events="orderEvents" class="schedular" />
            </div>
          </div>

          <div class="content-area">
            <div class="schedular-area">
              <!-- 同样道理 -->
              <el-select
                v-model="newEqup"
                @change = "equSelectChange"
                filterable
                placeholder="请选择设备"
                class="select-newequ"
              >
                <el-option
                  v-for="item in device_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <Schedular :events="orderEvents2" class="schedular" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Schedular from "../../components/common/schedular/Schedular";
import { getEquList, getEquInform } from "../../network/equpment";
import { getOrders, getequOrders } from "../../network/book";
import { getUserInform } from "../../network/user"
import { formatDateToISOString } from "../../common/formatDateToISOString";

export default {
  components: {
    Schedular,
  },
  data() {
    return {
      //elementui中的日期选择器
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now();
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
      newEqup: "",
      equlist:[], // 从数据库读入所有设备信息
      device_options: [], //将读入的设备提取需要的字段
      originEvents: [], //从数据库读出来的数据在这存放
      originEvents2: [], //同上
      orderEvents: [], //将数据库中读出来的事件调整后的格式放到这个数组下,此数组存放是当前登录用户的所有预约记录
      orderEvents2:[], //此数组存放的是不同设备的所有预约记录
      eventGuid: 0,
    };
  },
  methods: {
    //监听选择设备的情况
    equSelectChange(value) {
      // console.log(value);
      this.loadEquOrder(value)

    },

    //根据id获取设备信息
    async loadEquInform(id) {
      try {
        const res = await getEquInform(id);
        const equName = res.data.equipmentName.toString();
        // console.log(equName);
        return equName
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    //根据id获取用户信息
    async loadUserInform(id) {
      try {
        const res = await getUserInform(id);
        const userName = res.data.username.toString();
        // console.log(userName);
        return userName
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    //根据设备id获取该设备的预约信息
    async loadEquOrder(id) {
      try {
        const res = await getequOrders(id);
        this.originEvents2 = res.data;
        console.log(this.originEvents2);
        this.orderEvents2 = await Promise.all( this.originEvents2.map(async (item)=>{
          const userName = await this.loadUserInform(item.userId)
          return {
            id: item.equipmentOrderId.toString(),
            title: "已被" + userName + "预约",
            start: formatDateToISOString(item.startTime).slice(0, -5),
            end: formatDateToISOString(item.endTime).slice(0, -5)
          };
        }));
        console.log(this.orderEvents2);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    // 根据目前登录用户获取预约记录
    async loadOrderData() {
      try {
        const res = await getOrders();
        this.originEvents = res.data;
        // console.log(this.originEvents);
        this.orderEvents = await Promise.all( this.originEvents.map(async (item) => {
          const equName = await this.loadEquInform(item.equipmentId)
          const userName = await this.loadUserInform(item.userId)
          return {
            id: item.equipmentOrderId.toString(),
            // title: (item.userId + "使用" + item.equipmentId).toString(),
            title: userName + "使用" + equName,
            start: formatDateToISOString(item.startTime).slice(0, -5),
            end: formatDateToISOString(item.endTime).slice(0, -5),
          };
        }));
        console.log(this.orderEvents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
  created() {
    //获取设备列表，第一个日程表选中时需要，第二个日程表选择时需要
    getEquList().then((res) => {
      this.equlist = res.data;
      // console.log(this.equlist);
      this.device_options = this.equlist.map((item) => {
        return {
          value:item.equipmentId,
          label:item.equipmentName
        }
      })
      console.log(this.device_options);
    }),
    this.loadOrderData();
  },
};
</script>
  
  <style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.book-container {
  display: flex;
  flex-direction: column;
  overflow: auto;
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
  clear: both;
  height: 0px;
}
.button-hide {
  font-size: 1rem;
  margin-left: 10px;
}
.font-class {
  color: #656565;
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
  margin-top: 20px;
  margin-bottom: 25px;
  color: #656565;
  /* 可以根据需要进行其他样式设置 */
}
.book-title {
  margin-left: 20px;
  font-size: 20px;
  color: #6d6c6c;
}
.block {
  float: left;
  margin-left: 200px;
}
.bottom-div {
  width: 95%;
  height: 550px;
}

.fullcalendar-area {
  display: flex;
  flex-direction: row;
  /* overflow-x: auto; */
  width: 100%;
  height: auto;
}

.content-area {
  width: 50%;
  height: auto;
}

.schedular-area {
  width: 100%;
  height: fit-content;
  /* overflow: scroll; */
}
.schedular {
  height: 100vh;
  color: #393939;
  font-size: 15px;
  overflow: auto;
}
.button-area {
  margin: 10px;
}
.button-group {
  float: left;
  margin-left: 100px;
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