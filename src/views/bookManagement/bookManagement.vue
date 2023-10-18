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
          <div class="button-group">
            <el-button>更新</el-button>
            <el-button>日期</el-button>
            <el-button>创建新的预约</el-button>
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
            <!-- <div class="button-area">
              <el-button class="button-hide" @click="hideClick1">{{
                buttonText1
              }}</el-button>
            </div> -->
            <div class="schedular-area" v-if="isShow1">
              <p class="font-class">当前用户:{{ this.$store.state.cu_role }}</p>
              <!-- 调用日程表在这里 -->
              <Schedular :events="events" class="schedular" />
            </div>
          </div>
          <!-- <div class="content-area">
            <div class="button-area">
              <el-button class="button-hide" @click="hideClick2">{{
                buttonText2
              }}</el-button>
            </div>
            <div class="schedular-area" v-if="isShow2">
              <p class="font-class">开始预约</p>
              <Schedular :events="events2" class="schedular" />
            </div>
          </div> -->
          <div class="content-area">
            <!-- <div class="button-area">
              <el-button class="button-hide" @click="hideClick3">{{
                buttonText3
              }}</el-button>
            </div> -->
            <div class="schedular-area" v-if="isShow3">
              <!-- 同样道理 -->
              <el-select
                v-model="newEqup"
                placeholder="请选择设备"
                class="select-newequ"
                @change="handleSelectChange"
              >
                <el-option
                  v-for="item in device_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <Schedular :events="events2" class="schedular" />
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  
  import Schedular from "../../components/common/schedular/Schedular";
  import { getEquList, getEquInform } from '../../network/equpment'
  import { getOrders } from '../../network/book'
  import {
    INITIAL_EVENTS,
    INITIAL_EVENTS2,
    INITIAL_EVENTS3,
    createEventId,
  } from "../../common/event-utils";
  
  import { formatDateToISOString } from '../../common/formatDateToISOString'

  export default {
    components: {
      Schedular,
    },
    data() {
      return {
        //elementui中的日期选择器
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
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
        newEqup: "",
        device_options: [
          //目前写死，后期也是从数据库中导入
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
        fevents: INITIAL_EVENTS,
        fevents2: INITIAL_EVENTS2,
        fevents3: INITIAL_EVENTS3,
        originEvents:[],
        originEvents2:[],
        events:[],
        events2:[],


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
      handleSelectChange() {
        console.log("该添加一个fullcalendar了");
      },
      
    },
    mounted(){
    //获取设备列表，第一个日程表选中时需要，第三个日程表选择时需要
      getEquList().then(res => {
        this.equlist = res.data;
        console.log(res.data);
      }),
  
      getOrders().then(res => {
        // console.log(res.data);
        this.originEvents = res.data;
        // console.log(this.originEvents);
        this.events = this.originEvents.map( item => {
          return {
            id:item.equipmentOrderId.toString(),
            title:item.userId+"使用"+item.equipmentId,
            // start:formatDateToISOString(new Date(item.startTime)),
            // end:formatDateToISOString(new Date(item.endTime)),
            start:item.startTime, 
            end:item.endTime,
          }
        })

        console.log(this.events);
        console.log(this.fevents);

      })
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
    color: #6d6c6c;
  }
  .block {
    float: left;
    margin-left: 200px;
  }
  .bottom-div {
    width: 95%;
    height: 550px;
    /* border: 1px solid #fff;
    border-radius: 8px; */
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
