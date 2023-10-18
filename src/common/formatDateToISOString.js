// 在你的项目中创建一个独立的日期格式化工具文件，例如 utils/dateUtils.js

// 封装日期格式化函数

// import dayjs from 'dayjs';
// import utc from 'dayjs-ext/plugin/utc'
// import timezone from 'dayjs-ext/plugin/timeZone'

// dayjs.extend(utc);
// dayjs.extend(timezone)

export function formatDateToISOString(date) {
  if(!(date instanceof Date)) {
    throw new Error('Invalid date object passed to formatDateToHongKongTime function')
  }
  // const year = date.getUTCFullYear();
  // const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  // const day = date.getUTCDate().toString().padStart(2, '0');
  // const hours = date.getUTCHours().toString().padStart(2, '0');
  // const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  // const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  const hkTimeZone  = new Date(date.toISOString().split('T')[0] + 'Z');
  hkTimeZone.setMinutes(date.getMinutes()-date.getTimezoneOffset());
  const formattedDate = hkTimeZone.toISOString().slice(0, 19).replace('+0000', 'Asia/Hong_Kong');
  return formattedDate
}