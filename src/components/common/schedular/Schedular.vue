<script>
/** 
 * 这里对应的设备预订的第一个schedular
 * 具体的文档"https://fullcalendar.io/"
 * 后面的Schedular2、3、4同理，由于我没有找到合适的方法所以写了很多个Schedular组件，如果有可能请找到合适的封装方法
*/
import FullCalendar from '@fullcalendar/vue'  
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
      currentEvents: []
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
      if (confirm(`你确定要删除这个事件吗？ '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

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
    </div>
  </div>
</template>

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
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
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

</style>
