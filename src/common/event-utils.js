/**
*该文件的作用是schedular的一些事件
*/
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '全天的事件',
    start: todayStr
  },
  {
    id: createEventId(),
    title: '设备ASE的使用',
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T11:00:00',
  }
]

export const INITIAL_EVENTS2 = [
  {
    id: createEventId(),
    title: '全天的事件',
    start: todayStr
  },
  {
    id:createEventId(),
    title:'被王敏预约',
    start: new Date().toISOString().replace(/T.*$/, '') + 'T09:30:00',
    end: new Date().toISOString().replace(/T.*$/, '') + 'T10:30:00'
  },
  {
    id:createEventId(),
    title:'被李华预约',
    start: new Date().toISOString().replace(/T.*$/, '') + 'T11:30:00',
    end: new Date().toISOString().replace(/T.*$/, '') + 'T13:30:00'
  },
  {
    id:createEventId(),
    title:'竞赛使用',
    start: new Date().toISOString().replace(/T.*$/, '') + 'T15:30:00',
    end: new Date().toISOString().replace(/T.*$/, '') + 'T17:00:00'
  },
]

export const INITIAL_EVENTS3 = [
  {
    id: createEventId(),
    title: '全天的事件',
    start: todayStr
  },
  {
    id:createEventId(),
    title:'设备MOX的使用',
    start: new Date().toISOString().replace(/T.*$/, '') + 'T13:00:00',
    end: new Date().toISOString().replace(/T.*$/, '') + 'T15:00:00'
  }
]

export const INITIAL_EVENTS4 = [
  {
    id: createEventId(),
    title: '全天的事件',
    start: todayStr
  },
  {
    id: createEventId(),
    title: '实验室相关知识培训',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T11:30:00'
  }
]

export const INITIAL_EVENTS5 = [
  {
    id: createEventId(),
    title: '全天的事件',
    start: todayStr
  },
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
