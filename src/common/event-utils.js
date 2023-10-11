/**
*该文件的作用是schedular的一些事件
*/
let eventGuid = 0
let CurrentDate = new Date();
let tomorrow = new Date(CurrentDate);
tomorrow.setDate(CurrentDate.getDate() + 1);

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let tomorrowStr = tomorrow.toISOString().replace(/T.*$/,'') //YYYY-MM-DD of tomorrow


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '设备ASE的使用',
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T11:00:00',
  },
  {
    id: createEventId(),
    title: '设备ASE的使用2',
    start: tomorrowStr + 'T09:00:00',
    end: tomorrowStr + 'T11:00:00',
  }
]

export const INITIAL_EVENTS2 = [
  {
    id:createEventId(),
    title:'被王敏预约',
    start: todayStr + 'T09:30:00',
    end: todayStr + 'T10:30:00'
  },
  {
    id:createEventId(),
    title:'被李华预约',
    start: todayStr + 'T11:30:00',
    end: todayStr + 'T13:30:00'
  },
  {
    id:createEventId(),
    title:'竞赛使用',
    start: todayStr + 'T15:30:00',
    end: todayStr+ 'T17:00:00'
  },
  {
    id:createEventId(),
    title:'王某人今天就要用还要一直用，就是有钱',
    start: tomorrowStr + 'T08:30:00',
    end: tomorrowStr+ 'T17:00:00'
  },
]

export const INITIAL_EVENTS3 = [
  {
    id:createEventId(),
    title:'设备MOX的使用',
    start: todayStr + 'T13:00:00',
    end: todayStr + 'T15:00:00'
  },
  {
    id:createEventId(),
    title:'我郭神仙要烧钱，钱多的没地方花害愁',
    start: tomorrowStr + 'T08:30:00',
    end: tomorrowStr + 'T11:30:00'
  }
]

export const INITIAL_EVENTS4 = [
  {
    id: createEventId(),
    title: '实验室相关知识培训',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T11:30:00'
  },
  {
    id: createEventId(),
    title: '实验室安全知识培训',
    start: tomorrowStr + 'T13:30:00',
    end: tomorrowStr + 'T15:30:00'
  }
]

export const INITIAL_EVENTS5 = [
  {
    id: createEventId(),
    title: '实验室相关知识培训',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T11:30:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
