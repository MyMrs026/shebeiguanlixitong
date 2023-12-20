<template>
  <div class="outer-container">
    <div class="book-container">
      <div class="fullcalendar-area">
        <div class="content-area">
          <div class="top-content2">
            <div style="font-size: 20px; color: #6d6c6c">
              <p>当前设备 {{ curEquipment.equipmentName }}</p>
            </div>
          </div>
          <div class="schedular-area">
            <Schedular
              :events="orderEvents2"
              :equipmentId="curEquipment.equipmentId"
              class="schedular"
              @make-orders="handleMakeOrders"
              @edit-orders="handleEditOrders"
              @click-events="handleClickEvents"
              @update-orders="handleUpdataData"
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
import { getequOrders } from "../../network/book";
import { getUserInform } from "../../network/user";
import { formatDateToISOString } from "../../common/formatDateToISOString";

export default {
  components: {
    Schedular,
  },
  data() {
    return {
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
    async loadUserInformation(id) {
      try {
        let userInfo = {};
        const res = await getUserInform(id);
        if (res.data) {
          userInfo = res.data;
          return userInfo;
        } else {
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
        // console.log(this.originEvents2);
        this.orderEvents2 = await Promise.all(
          this.originEvents2.map(async (item) => {
            const userInfo = await this.loadUserInformation(item.userId);
            // console.log(userInfo);
            return {
              id: item.equipmentOrderId.toString(),
              title: "已被" + userInfo.username + "预约",
              username: userInfo.username,
              userEmail: userInfo.email,
              userTel: userInfo.tel,
              projectId: item.projectId,
              start: formatDateToISOString(item.startTime).slice(0, -5),
              end: formatDateToISOString(item.endTime).slice(0, -5),
            };
          })
        );
        // console.log(this.orderEvents2);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    handleUpdataData() {
      // this.loadOrderData();
      this.loadEquOrder(this.$route.params.id);
      console.log("调用父组件");
    },

    async loadData() {
      try {
        await this.loadOrderData();
      } catch (error) {
        console.log(1);
      }
    },
  },
  created() {
    getEquList().then((res) => {
      this.equlist = res.data;
      this.device_options = this.equlist.map((item) => {
        return {
          value: item.equipmentId,
          label: item.equipmentName,
        };
      });
    });
    this.loadUserInformation();
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
  line-height: 30px;
  font-size: 20px;
}

.top-content2 {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 20px;
}

.book-title {
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
  width: 100%;
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
