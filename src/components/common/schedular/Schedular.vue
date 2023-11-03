<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar
        ref="calendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>

      <!-- 编辑事件弹出框 -->
      <el-dialog
        title="编辑预约"
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
      >
        <el-form :model="EventForm" ref="EventForm" :rules="rules">
          <!-- <el-form-item label="设备" label-width="120px" prop="equid">
            <el-select
              v-model="EventForm.equid"
              class="custom-select"
              placeholder="请选择设备"
            >
              <el-option
                v-for="item in device_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="项目" label-width="120px" prop="proid">
            <el-select
              v-model="EventForm.projectId"
              class="custom-select"
              placeholder="请选择项目"
            >
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" label-width="120px" prop="date">
            <el-date-picker
              v-model="EventForm.date"
              :picker-options="pickerOptions"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开始时间" label-width="120px" prop="startTime">
            <el-time-select
              placeholder="起始时间"
              v-model="EventForm.startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '17:00',
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="结束时间" label-width="120px" prop="endTime">
            <el-time-select
              placeholder="结束时间"
              v-model="EventForm.endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '17:00',
                minTime: EventForm.startTime,
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item>
            <div class="button-area">
              <el-button type="primary" @click="submitClick('EventForm')"
                >提交</el-button
              >
              <el-button type="danger" @click="delClick">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 添加事件弹出框 -->
      <el-dialog
        title="添加预约"
        :visible.sync="dialogFormVisible2"
        @close="closeDialog"
      >
        <el-form :model="EventForm2" ref="EventForm2" :rules="rules2">
          <!-- <el-form-item label="设备" label-width="120px" prop="equid">
            <el-select
              v-model="EventForm2.equid"
              class="custom-select"
              placeholder="请选择设备"
            >
              <el-option
                v-for="item in device_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="项目" label-width="120px" prop="proid">
            <el-select
              v-model="EventForm2.projectId"
              class="custom-select"
              placeholder="请选择项目"
            >
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" label-width="120px" prop="date">
            <el-date-picker
              v-model="EventForm2.date"
              :picker-options="pickerOptions"
              type="date"
              placeholder="选择预约日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开始时间" label-width="120px" prop="startTime">
            <el-time-select
              placeholder="起始时间"
              v-model="EventForm2.startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '17:00',
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="结束时间" label-width="120px" prop="endTime">
            <el-time-select
              placeholder="结束时间"
              v-model="EventForm2.endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '17:00',
                minTime: EventForm2.startTime,
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item>
            <div class="button-area">
              <el-button type="primary" @click="submitClick2('EventForm2')"
                >提交</el-button
              >
              <el-button type="danger" @click="cancelClick">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * 这里对应的设备预订的第一个schedular
 * 具体的文档"https://fullcalendar.io/"
 */
import FullCalendar, { formatDate } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid"; //日程图
import timeGridPlugin from "@fullcalendar/timegrid"; //里面的时间显示
import interactionPlugin from "@fullcalendar/interaction"; //日程图的一些交互事件，比如说拖拽选择时间
import zhLocale from "@fullcalendar/core/locales/zh-cn";
import { getProjectList } from "../../../network/project";
import { getEquList } from "../../../network/equpment";
import { makeOrder, removeOrder } from "../../../network/book";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  props: {
    events: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev next", //进行前后日子选择，以及跳到今天
          center: "title",
          right: "",
        },

        initialView: "timeGridWeek", //以日程图的方式初始化fullcalendar

        hiddenDays: [0, 6],
        events: this.events, // 初始化事件
        editable: true, //事件可以编辑
        eventStartEditable: false, //禁止使用拖动的方式修改事件的开始时间
        expandRows: true,
        eventDurationEditable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        slotEventOverlap: false, // TimeGrid视图中的定时事件不能重叠
        allDaySlot: false, //全天时间不会显示
        nowIndicator: true, //显示当前时间提示
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        locale: zhLocale, //使整个日程图以中文的形式输出
        slotMinTime: "08:30:00", //日程图从几点开始
        slotMaxTime: "17:00:00", //到几点结束
        slotDuration: "00:15:00", //时间间隔为15分钟
        //  slotLabelFormat:'H:mm',//以 24 小时格式显示时间。
        dateClick: this.handleDateClick, //定义点击日历中的日期时触发的回调函数，在此打算当点击时弹出日历
        eventDrop: this.handleEventDrop, //定义当拖拽事件结束时出发的事件，看看吧，不行的话把可拖拽禁掉
      },
      currentEvents: [],
      device_options: [],
      equlist: [],
      EventForm: {
        date: "",//将日期初始化为今天
        startTime: "",
        endTime: "",
        equid: this.$route.params.id,
        projectId: null,
      },
      EventForm2: {
        date: new Date(),//将日期初始化为今天
        startTime: "",
        endTime: "",
        equid: this.$route.params.id,
        projectId: null,
      },

      startTimeStr: "",
      endTimeStr: "",

      formatEvent: {},

      pickerOptions: {
        // 设置日期范围
        disabledDate(time) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          // 禁用过去的日期
          if (time.getTime() < today.getTime()) {
            return true;
          }
          // 禁用周末日期
          const day = time.getDay(); // 获取日期对应的星期几，0 表示星期日，1 表示星期一，依此类推
          return day === 0 || day === 6; // 返回 true 表示禁用周末日期
        },
      },

      rules: {
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        startTime: [
          { required: true, message: "请填写事件的开始事件", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请填写事件的结束事件", trigger: "blur" },
        ],
        equid: [{ required: true, message: "请选择设备", trigger: "change" }],
        // proid: [{ required: true, message: "请选择项目", trigger: "change" }],
      },
      rules2: {
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        startTime: [
          { required: true, message: "请填写事件的开始事件", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请填写事件的结束事件", trigger: "blur" },
        ],
        equid: [{ required: true, message: "请选择设备", trigger: "change" }],
        // proid: [{ required: true, message: "请选择项目", trigger: "change" }],
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      editEvent: {},
      selectEventId: null,
      projectList: [],
    };
  },

  watch: {
    events(newValue) {
      if (newValue) {
        this.updateCalendarOptions();
      }
    },
  },
  mounted() {
    this.updateCalendarOptions();
  },

  methods: {
    //获取今天的日期
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    //提取选中的时间，精确的时分
    extractedTime(time) {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },

    //其实是日期和具体时间的拼接罢了
    formatDateTime(date, time) {
      const eventDate = new Date(date);

      // 解析时间
      const [hours, minutes] = time.split(":");
      eventDate.setHours(parseInt(hours));
      eventDate.setMinutes(parseInt(minutes));

      // 格式化日期时间
      const inputDate = eventDate;

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
      const day = String(inputDate.getDate()).padStart(2, "0");
      const hour = String(inputDate.getHours()).padStart(2, "0");
      const minute = String(inputDate.getMinutes()).padStart(2, "0");
      const seconds = String(inputDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;

      return formattedDate;
    },
    //监听日程表读入数据
    updateCalendarOptions() {
      this.calendarOptions = {
        // 合并父组件传递的 options 和 events
        ...this.calendarOptions,
        events: this.events,
      };

      if (this.$refs.calendar) {
        this.$nextTick(() => {
          this.$refs.calendar.$emit("optionsChanged");
        });
      }
    },

    //拖拽选择事件触发
    handleDateSelect(selectInfo) {
      // 获取拖选区域的开始时间和结束时间
      const start = new Date(selectInfo.startStr);
      const end = new Date(selectInfo.endStr);

      // 检查拖选的时间范围是否与已有事件冲突
      const isConflict = this.events.some((event) => {
        const eventStart = event.start;
        const eventEnd = event.end;
        return eventStart < end && eventEnd > start;
      });
      // 如果存在冲突，则提示报错
      if (isConflict) {
        alert("该时间段冲突了");
        //清除拖选区域
        this.$refs.calendar.getApi().unselect();
      } else {
        //否则，添加拖选事件
        this.dialogFormVisible2 = true;
      }
      this.$refs.calendar.getApi().unselect();

      this.EventForm2.startTime = this.extractedTime(start);
      this.EventForm2.endTime = this.extractedTime(end);
      console.log(
        "拖选事件的开始时间:" +
          this.EventForm2.startTime +
          ",结束时间:" +
          this.EventForm2.endTime
      );
    },

    //点击事件时触发的函数,直接打开一个对话框
    handleEventClick(clickInfo) {
      const clickEvents = () => {
        this.openEditModal(clickInfo.event);
        this.selectEventId = clickInfo.event.id;
        console.log(this.selectEventId);
      };
      this.$emit("click-events", clickEvents);
    },

    //打开对话框
    openEditModal(event) {
      this.dialogFormVisible = true;
      this.editEvent = event;
    },

    //关闭对话框
    closeDialog() {
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },

    //这个地方异步来执行是为了实现编辑事件,先删除原事件,然后进行预约
    async makeEditOrder(endTime, equipmentId, startTime, projectId) {
      try {
        const res = await makeOrder(endTime, equipmentId, startTime, projectId);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },

    //编辑事件弹窗中的提交按钮的实现
    submitClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const editEvents = () => {
            console.log(this.EventForm);
            this.formatEvent = {
              equipmentId: this.EventForm.equid,
              startTime: this.formatDateTime(
                this.EventForm.date,
                this.EventForm.startTime
              ),
              endTime: this.formatDateTime(
                this.EventForm.date,
                this.EventForm.endTime
              ),
              projectId:this.EventForm.projectId
            };
            console.log(this.formatEvent);
            removeOrder(this.selectEventId).then((res) => {
              console.log(res);
            });
            this.makeEditOrder(
              this.formatEvent.endTime,
              this.formatEvent.equipmentId,
              this.formatEvent.startTime,
              this.formatEvent.projectId
            );
          };
          this.$emit("edit-orders", editEvents);
          this.dialogFormVisible = false;
          location.reload();
          this.$message({
            message: "修改成功！",
            type: "success",
          });
        } else {
          alert("请填写完整");
        }
      });
    },

    //编辑事件中删除按钮的实现
    delClick() {
      if (confirm(`你确定要删除这个事件吗？ '${this.editEvent.title}'`)) {
        //撤销预约逻辑
        removeOrder(this.selectEventId).then((res) => {
          console.log(res);
        });
      }
      this.dialogFormVisible = false;
      location.reload();
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },

    //新建事件中的申请提交
    submitClick2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const creatEvents = () => {
            console.log(this.EventForm2);

            this.formatEvent = {
              equipmentId: this.EventForm2.equid,
              startTime: this.formatDateTime(
                this.EventForm2.date,
                this.EventForm2.startTime
              ),
              endTime: this.formatDateTime(
                this.EventForm2.date,
                this.EventForm2.endTime
              ),
              projectId: this.EventForm2.projectId
            };

            console.log(this.formatEvent);
            makeOrder(
              this.formatEvent.endTime,
              this.formatEvent.equipmentId,
              this.formatEvent.startTime,
              this.formatEvent.projectId
            )
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.error(error);
              });
          };
          this.$emit("make-orders", creatEvents);
        } else {
          alert("请填写完整");
        }
      });
      this.dialogFormVisible2 = false;
      location.reload();
      this.$message({
        message: "预约成功！",
        type: "success",
      });
    },

    //弹窗中的取消按钮实现
    cancelClick() {
      this.dialogFormVisible2 = false;
      console.log("取消申请");
    },

    //设置事件
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
  created() {
    //获取设备列表
    getEquList().then((res) => {
      this.equlist = res.data;
      this.device_options = this.equlist.map((item) => {
        return {
          value: item.equipmentId,
          label: item.equipmentName,
        };
      });
    });

    //获取项目列表
    getProjectList().then((res) => {
      this.projectList = res.data.map((item) => {
        return {
          projectId: item.projectId,
          projectName: item.projectName,
        };
      });
      console.log(this.projectList);
    });
  },
};
</script>

<style lang="css">
h2 {
  margin: 0;
  font-size: 3px !important;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 6px !important;
  height: 400px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 3;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-calendar {
  height: 100%;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.button-area {
  display: flex;
  /* justify-content: center; */
  justify-content: space-around;
}

.fc {
  font-size: 1rem;
}
/* .fc-header-toolbar h2{
  font-size: 14px;
}
.fc-day-header {
  font-size: 14px;
} */
.fc-toolbar-title {
  font-size: 1rem !important;
}
div > .fc {
  width: 100%;
}
</style>
