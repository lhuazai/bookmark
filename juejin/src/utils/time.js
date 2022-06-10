// 转化时间戳为YYYY-MM-DD 格式
export function timeStampToDay (val) {
  if (isNaN(val)) {
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
  return `${Year}-${Month}-${Day}`;
}
// 转化时间戳为YYYY-MM-DD HH:MM:SS格式
export function FilterTimeToDate (val) {
  if (isNaN(val) || val === 0) {
    return '--';
  } else if (val === null) {
    return '--';
  }
  let date = new Date(val);
  const Year = `${date.getFullYear()}`;
  const Month = `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`;
  const Day = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
  const Hour = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`;
  const Minute = `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  const Second = `${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
}

// 转化时分秒
export const FilterTimeToHM = val => {
  let date = new Date(val);
  const Hour = `${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }`;
  const Minute = `${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
  return `${Hour}:${Minute}`;
};

// 获取当前时间距离目标时间的年月
export function getYearAndMonthOfMinus (targetTime) {
  // 例如 targetTime 是 2019-12-01
  // 月份不足十位的补零
  function complementZero (num) {
    if (num > 0 && num < 10) {
      return `0${num}`;
    } else if (num >= 10 && num <= 12) {
      return `${num}`;
    }
  }

  let dateAry = [];
  // 获取目标时间的年月
  let baseDate = new Date(targetTime);
  let baseYear = baseDate.getFullYear();
  let baseMonth = baseDate.getMonth() + 1;
  // 获取当前时间的年月
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;

  currentMonth += 3;

  // 年份差
  let minusYear = currentYear - baseYear;
  // 当前时间 生成的年月，例如2021-04-07 则生成的就是 -> [ '2021-04', '2021-03', '2021-02', '2021-01' ]
  for (let i = currentMonth; i > 0; i--) {
    dateAry.push(`${currentYear}-${complementZero(i)}`);
  }

  // 中间相差的整年 则生成的就是 -> ['2020-12','2020-11', ... '2020-03', '2020-02', '2020-01']
  for (let i = 1; i < minusYear; i++) {
    for (let j = 0; j < 12; j++) {
      dateAry.push(`${currentYear - i}-${complementZero(12 - j)}`);
    }
  }
  // 给定目标时间 例如2019-12-01 则生成的就是 -> ['2019-12']
  for (let i = 12; i >= baseMonth; i--) {
    dateAry.push(`${baseYear}-${complementZero(i)}`);
  }
  return dateAry;
}

export default {
  timeStampToDay,
  FilterTimeToDate,
  FilterTimeToHM,
  getYearAndMonthOfMinus
};
