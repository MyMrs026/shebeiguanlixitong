<template>
  <div class="outer-container">
    <div class="book-container">
      <!-- 预约管理部分分为两个部分，上半部分为子导航条，下半部分包括当前用户预约设备的日程表、设备被预约的日程表等 -->

      <!-- 第二个 div 的内容 -->
      <div class="fullcalendar-area">
        <div class="content-area">
          <!-- 当前用户的名称 -->
          <div class="book-title">
            <p>当前用户 {{ curUsername }}</p>
          </div>
          <div class="schedular-area">
            <!-- 调用日程表在这里 -->
            <Schedular
              :events="orderEvents"
              :equipmentId="curEquipment.equipmentId"
              class="schedular"
              @make-orders="handleMakeOrders"
              @edit-orders="handleEditOrders"
              @click-events="handleClickEvents"
              @update-orders="handleUpdataData"

            />
          </div>
        </div>
        <div class="content-area">
          <div class="top-content2">
            <div style="font-size: 20px; color: #6d6c6c">
              <p>当前设备 {{ curEquipment.equipmentName }}</p>
            </div>
            <!-- <el-select
            v-model="newEqup"
            class="custom-select"
            placeholder="请选择设备"
            @change="equSelectChange"
          >
            <el-option
              v-for="item in device_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >s
            </el-option>
          </el-select> -->
          </div>

          <div class="schedular-area">
            <Schedular
              :events="orderEvents2"
              class="schedular"
              @make-orders="handleMakeOrders"
            />
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
import { getLoginUserInfo, getUserInform, login } from "../../network/user";
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
      value1: this.getCurrentDate(), //日期选择器传回来的数据
      newEqup: "",
      equlist: [], // 从数据库读入所有设备信息
      device_options: [], //将读入的设备提取需要的字段
      originEvents: [], //从数据库读出来的数据在这存放
      originEvents2: [], //同上
      orderEvents: [], //将数据库中读出来的事件调整后的格式放到这个数组下,此数组存放是当前登录用户的所有预约记录
      orderEvents2: [], //此数组存放的是不同设备的所有预约记录
      eventGuid: 0,
      curEquipment: {}, //当前设备
      curUsername: "",
    };
  },
  methods: {
    //调用子组件中传递的函数
    handleMakeOrders(func) {
      console.log("在父组件中执行从子组件接受的函数");
      func();
    },
    //调用子组件中的编辑提交
    handleEditOrders(func) {
      func();
    },
    //点击子组件中打开编辑弹窗
    handleClickEvents(func) {
      func();
    },
    //获取当前日期
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    //监听选择设备的情况
    equSelectChange(value) {
      console.log(value);
      this.loadEquOrder(value);
    },

    //根据id获取设备名
    async loadEquInform(id) {
      try {
        const res = await getEquInform(id);
        const equName = res.data.equipmentName.toString();
        return equName;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    
    //根据id获取用户名
   async loadUserInform(id) {
      try {
        let userName = ""
        const res = await getUserInform(id);
        if( res.data ){
          userName = res.data.username.toString();
          // console.log(userName);
          return userName;
        }else{
          console.log("该用户已被删除");
        }       
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    
    //根据设备id获取该设备的预约信息
    async loadEquOrder(id) {
      try {
        const res = await getequOrders(id);
        this.originEvents2 = res.data;
        this.orderEvents2 = await Promise.all(
          this.originEvents2.map(async (item) => {
            const userName = await this.loadUserInform(item.userId);
            return {
              id: item.equipmentOrderId.toString(),
              title: "已被" + userName + "预约",
              projectId: item.projectId,
              start: formatDateToISOString(item.startTime).slice(0, -5),
              end: formatDateToISOString(item.endTime).slice(0, -5),
            };
          })
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    // 根据目前登录用户获取预约记录
    async loadOrderData() {
      try {
        const res = await getOrders();
        this.originEvents = res.data;
        this.orderEvents = await Promise.all(
          this.originEvents.map(async (item) => {
            const equName = await this.loadEquInform(item.equipmentId);
            const userName = await this.loadUserInform(item.userId);
            return {
              id: item.equipmentOrderId.toString(),
              title: userName + "使用" + equName,
              projectId: item.projectId,
              start: formatDateToISOString(item.startTime).slice(0, -5),
              end: formatDateToISOString(item.endTime).slice(0, -5),
            };
          })
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    handleUpdataData() {
      this.loadOrderData()
      this.loadEquOrder(this.$route.params.id)
      console.log("调用父组件");
    }
  },
  created() {
    //获取设备列表，第一个日程表选中时需要，第二个日程表选择时需要
    getEquList().then((res) => {
      this.equlist = res.data;
      this.device_options = this.equlist.map((item) => {
        return {
          value: item.equipmentId,
          label: item.equipmentName,
        };
      });
    });
    this.loadLoginUserInfo();
    this.loadOrderData();
  },
  mounted() {
    const currentEquId = this.$route.params.id;
    getEquInform(currentEquId).then((res) => {
      this.curEquipment = res.data;
      this.loadEquOrder(currentEquId);
    });

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
  width: 100%;
  height: 100%;
}

.font-class {
  color: #656565;
  margin-top: 0px;
  margin-left: 20px;
  line-height: 55px;
  font-size: 20px;
}

.top-content2 {
  display: flex;
  flex-direction: row;
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
}

.content-area {
  width: 50%;
  height: auto;
}

.schedular-area {
  width: 100%;
  height: 100%;
}
.schedular {
  height: 70%;
  color: #393939;
  font-size: 15px;
  overflow: auto;
}

.custom-select {
  width: 200px;
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
