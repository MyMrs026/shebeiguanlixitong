<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <el-dialog 
        title="编辑事件" 
        :visible.sync="dialogFormVisible" @close="closeDialog"
      >
        <el-form 
          :model="EventForm"
          ref="EventForm"
          :rules="rules">
          <el-form-item label="标题" label-width="120px" prop="title">
            <el-input v-model="EventForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" label-width="120px" prop="startTime">
            <el-input v-model="EventForm.startTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" label-width="120px" prop="endTime">
            <el-input v-model="EventForm.endTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用者" label-width="120px" prop="user">
            <el-input v-model="EventForm.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button-area">
              <el-button type="primary" @click="submitClick">提交</el-button>
              <el-button type="danger"  @click="delClick">删除</el-button>
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
 * 后面的Schedular2、3、4同理，由于我没有找到合适的方法所以写了很多个Schedular组件，如果有可能请找到合适的封装方法
*/
import FullCalendar, { formatDate } from '@fullcalendar/vue'  
import dayGridPlugin from '@fullcalendar/daygrid' //日程图
import timeGridPlugin from '@fullcalendar/timegrid'  //里面的时间显示
import interactionPlugin from '@fullcalendar/interaction' //日程图的一些交互事件，比如说拖拽选择时间
import { INITIAL_EVENTS, createEventId } from '../../../common/event-utils.js'  //导入日程图的一些事件

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',//进行前后日子选择，以及跳到今天
          center: 'title',
          right: ''
        },
        initialView: 'timeGridDay', //以日程图的方式初始化fullcalendar
        initialEvents: INITIAL_EVENTS, // 初始化事件
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        locale: "zh-cn", //使整个日程图以中文的形式输出
       slotMinTime: '08:00:00', //日程图从几点开始
       slotMaxTime: '20:00:00' //到几点结束
      },
      currentEvents: [],
      EventForm:{
        title:'',
        startTime:'',
        endTime:'',
        user:''
      },
      rules:{
        title:[
          { required:true, message: '请填写事件的标题',trigger:'blur' }
        ],
        startTime:[
          { required:true, message: '请填写事件的开始事件',trigger:'blur' }
        ],
        endTime:[
          { required:true, message: '请填写事件的结束事件',trigger:'blur' }
        ],
        user:[
          { required:true, message: '请填写使用者',trigger:'blur' }
        ]
      },
      dialogFormVisible:false
    }
  },

  methods: {

    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect(selectInfo) { //拖动来新建一个事件
      let title = prompt('请输入新的事件名：')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },

    handleEventClick(clickInfo) { //删除某个事件
      // if (confirm(`你确定要删除这个事件吗？ '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
      this.openEditModal(clickInfo.event);
    },

    openEditModal(event) {
      // console.log(event.title,event.start,event.end);
      this.dialogFormVisible = true
    },

    closeDialog(){
      this.dialogFormVisible = false
    },

    submitClick(){

    },

    delClick(){

    },

    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>

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

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 6px !important;
  height:400px;
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

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.button-area{
  display: flex;
  /* justify-content: center; */
  justify-content: space-around;
}
</style>
