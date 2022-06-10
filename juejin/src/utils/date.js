/**
 * 获取上周、本周、上月、本月、上季度、本季度的开始日期、结束日期 start
 * 获取上月开始结束日期考虑了年份的变化
 */
const now = new Date(); // 当前日期
const nowDayOfWeek = now.getDay() - 1; // 今天本周的第几天
const nowDay = now.getDate(); // 当前日
const nowMonth = now.getMonth(); // 当前月
let nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
const lastMonthDate = new Date(); // 上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
const lastMonth = lastMonthDate.getMonth();

// 格式化日期：yyyy-MM-dd
export function formatDate (date) {
  return date.getTime(date);
}

// 获得某月的天数
export function getMonthDays (myMonth) {
  let monthStartDate = new Date(nowYear, myMonth, 1);
  let monthEndDate = new Date(nowYear, myMonth + 1, 1);
  let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

// 获得本季度的开始月份
export function getQuarterStartMonth () {
  let quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (nowMonth > 2 && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (nowMonth > 5 && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}
// 前7天的开始时间
export function getLastStartSevenDays () {
  let start = new Date((new Date().toLocaleDateString()));
  start = start.getTime() - 3600 * 1000 * 24 * 6;
  return start;
}

// 当天结束时间戳
export function getLastEndSevenDays () {
  const end = new Date(new Date().setHours(23, 59, 59, 0)).getTime();
  return end;
}

// 昨天的最后时间戳
export function getLastDateEndTime () {
  const end = (new Date(new Date().setHours(0, 0, 0, 0)).getTime()) - 1000;
  return end;
}

// 获得本周的开始日期
export function getWeekStartDate () {
  let weekStartDate;
  // 周日
  if (nowDayOfWeek === -1) {
    weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  } else {
    weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  }
  return formatDate(weekStartDate);
}

// 获得本周的结束日期
export function getWeekEndDate () {
  let weekEndDate;
  if (nowDayOfWeek === -1) {
    weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1, 23, 59, 59, 0);
  } else {
    weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek), 23, 59, 59, 0);
  }
  return formatDate(weekEndDate);
}

// 获得上周的开始日期
export function getLastWeekStartDate () {
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  return formatDate(weekStartDate);
}

// 获得上周的结束日期
export function getLastWeekEndDate () {
  let weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1, 23, 59, 59, 0);
  return formatDate(weekEndDate);
}

// 获得本月的开始日期
export function getMonthStartDate () {
  let monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}
// 获得本月的结束日期
export function getMonthEndDate () {
  let monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth), 23, 59, 59, 0);
  return formatDate(monthEndDate);
}

// 当前往前推30天的时间戳
export function getOneMonthAgo () {
  // 当天的23:59:59
  const todayEndTime = getLastEndSevenDays();
  const lastOneMonthTime = todayEndTime - (30 * 24 * 60 * 60 * 1000) + 1000;
  return lastOneMonthTime;
}

// 获得上月开始时间
export function getLastMonthStartDate () {
  let lastMonthStartDate = null;
  if (lastMonth === 11) {
    lastMonthStartDate = new Date(nowYear - 1, lastMonth, 1);
  } else {
    lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  }
  return formatDate(lastMonthStartDate);
}
// 获得上月结束时间
export function getLastMonthEndDate () {
  let lastMonthEndDate = null;
  if (lastMonth === 11) {
    lastMonthEndDate = new Date(nowYear - 1, lastMonth, getMonthDays(lastMonth), 23, 59, 59, 0);
  } else {
    lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59, 0);
  }
  return formatDate(lastMonthEndDate);
}

// 获得本季度的开始日期
export function getQuarterStartDate () {
  let quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}
// 或的本季度的结束日期
export function getQuarterEndDate () {
  let quarterEndMonth = getQuarterStartMonth() + 2;
  let quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth), 23, 59, 59, 0);
  return formatDate(quarterStartDate);
}

// 判断是否跨月/跨年
export function getCrossMonth (startTime, endTime) {
  const startYear = FilterTimeToDate(startTime).slice(0, 4);
  const endYear = FilterTimeToDate(endTime).slice(0, 4);
  const startMonth = FilterTimeToDate(startTime).slice(5, 7);
  const endMonth = FilterTimeToDate(endTime).slice(5, 7);
  // 根据年月的字符串对比
  if (startYear !== endYear || startMonth !== endMonth) {
    return true;
  } else {
    return false;
  }
}

// 金额单位 分改为元
export const FilterKeepTwoDigitsPrice = function (val) {
  if (isNaN(val)) {
    return 0;
  }
  return (val / 100).toFixed(2);
};

// 百分比
export const FilterPercent = function (val) {
  if (isNaN(val)) {
    return 0;
  }
  if (val === 0) {
    return val;
  }
  return (val * 100).toFixed(2);
};

// change time to hour minute second 1小时 1分钟 1秒
export const FilterChangeTimeToHMS = (val) => {
  if (!val) {
    return '--';
  }
  const allSecond = val;
  let restSecond = val;
  const hour = Math.floor(allSecond / (60 * 60));
  if (hour >= 1) {
    restSecond = restSecond - hour * 60 * 60;
  }
  const minute = Math.floor(restSecond / 60);
  if (minute >= 1) {
    restSecond = Math.round(restSecond - minute * 60);
  }
  return `${hour >= 1 ? hour + '小时 ' : ''}${minute >= 1 ? minute + '分钟 ' : ''}${restSecond > 0 ? restSecond + '秒' : ''}`;
};

// 转化时间戳为YYYY-MM-DD HH:MM:SS格式
export const FilterTimeToDate = val => {
  if (Number(val) < 0) {
    return '/';
  }
  if (isNaN(val) || val === 0) {
    return '--';
  } else if (val === null) {
    return '--';
  }
  let date = new Date(val);
  const Year = `${date.getFullYear()}`;
  const Month = `${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }`;
  const Day = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  const Hour = `${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }`;
  const Minute = `${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
  const Second = `${
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }`;
  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
};

// 时间差转 换成 天：时：分：秒
export const FilterTimeStampToChinese = value => {
  if (Number(value) < 0 || isNaN(value) || value === 0 || value === null) {
    return '--';
  }
  // 计算出相差天数
  const days = Math.floor(value / (24 * 3600 * 1000));
  // 计算出小时数
  const leave1 = value % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
};

const LDate = {
  getQuarterEndDate: getQuarterEndDate,
  getQuarterStartDate: getQuarterStartDate,
  getLastMonthEndDate: getLastMonthEndDate,
  getLastMonthStartDate: getLastMonthStartDate,
  getMonthEndDate: getMonthEndDate,
  getMonthStartDate: getMonthStartDate,
  getLastWeekEndDate: getLastWeekEndDate,
  getLastWeekStartDate: getLastWeekStartDate,
  getWeekEndDate: getWeekEndDate,
  getWeekStartDate: getWeekStartDate,
  getLastEndSevenDays: getLastEndSevenDays,
  getLastStartSevenDays: getLastStartSevenDays,
  getQuarterStartMonth: getQuarterStartMonth,
  getMonthDays: getMonthDays,
  FilterPercent,
  getCrossMonth
};

export default LDate;
