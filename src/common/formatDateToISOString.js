// 在你的项目中创建一个独立的日期格式化工具文件，例如 utils/dateUtils.js

// 封装日期格式化函数
export function formatDateToISOString(date) {
  const inputDateTime = new Date(date);
  inputDateTime.setHours(inputDateTime.getHours() + 8);

  const outputDateTimeString = inputDateTime.toISOString();

  return outputDateTimeString;
}