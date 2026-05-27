export interface AlmanacData {
  solarDate: string;
  yi: string[];
  ji: string[];
  chong: string;
  luckyDirection: string;
  luckyColor: string;
  luckyNumber: string;
  dayNote: string;
}

const YI_POOL = [
  '嫁娶', '出行', '开市', '纳财', '祈福',
  '搬家', '装修', '签约', '出行', '求医',
  '祭祀', '入学', '交易', '会友', '订婚',
  '开业', '动土', '纳采', '裁衣', '求嗣',
  '修造', '安床', '订盟', '竖柱', '上梁',
];

const JI_POOL = [
  '动土', '破土', '安葬', '行丧', '伐木',
  '开渠', '穿井', '词讼', '远行', '移徙',
  '栽种', '牧养', '畋猎', '求财', '开仓',
  '酝酿', '出货', '上表', '会友', '出行',
];

const CHONG_ZODIAC = [
  '🐭 鼠', '🐮 牛', '🐯 虎', '🐰 兔',
  '🐲 龙', '🐍 蛇', '🐴 马', '🐏 羊',
  '🐵 猴', '🐔 鸡', '🐶 狗', '🐷 猪',
];

const LUCKY_DIRECTIONS = [
  '正东', '东南', '正南', '西南',
  '正西', '西北', '正北', '东北',
];

const LUCKY_COLORS = [
  '🔴 红色', '🟡 金色', '🟢 翠绿', '🔵 宝蓝',
  '🟣 紫色', '🟠 橙色', '⚪ 银白', '🩷 粉色',
];

const DAY_NOTES = [
  '今日诸事皆宜，百无禁忌，是个好日子',
  '宜早不宜迟，上午办事事半功倍',
  '宜静不宜动，适合在家休息放松',
  '宜约饭聚会，朋友相聚其乐融融',
  '宜表白心意，适合表达感情的日子',
  '宜整理收纳，断舍离的好时机',
  '宜出门散步，走走停停都有好风景',
  '宜给自己买个小礼物，犒劳一下',
  '宜制定计划，适合规划未来方向',
  '宜打电话给家人，联络感情的好日子',
];

function seedFromDate(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function pickN<T>(arr: T[], seed: number, n: number): T[] {
  const result: T[] = [];
  let s = seed;
  const pool = [...arr];
  for (let i = 0; i < n && pool.length > 0; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const idx = s % pool.length;
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

export function getAlmanac(date: Date = new Date()): AlmanacData {
  const seed = seedFromDate(date);
  const yi = pickN(YI_POOL, seed, 4);
  const ji = pickN(JI_POOL, seed + 1, 3);
  const chongIdx = (seed * 7) % 12;
  const dirIdx = (seed * 3) % 8;
  const colorIdx = (seed * 5) % 8;
  const noteIdx = (seed * 11) % DAY_NOTES.length;
  const luckyNum = (seed % 90) + 1;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  return {
    solarDate: `${y}年${m}月${d}日 星期${weekdays[date.getDay()]}`,
    yi,
    ji,
    chong: CHONG_ZODIAC[chongIdx],
    luckyDirection: LUCKY_DIRECTIONS[dirIdx],
    luckyColor: LUCKY_COLORS[colorIdx],
    luckyNumber: String(luckyNum),
    dayNote: DAY_NOTES[noteIdx],
  };
}

/** 2025-2026 农历近似（春节对应公历日期的偏移） */
const LUNAR_NEW_YEARS: Record<number, { month: number; day: number }> = {
  2025: { month: 1, day: 29 },
  2026: { month: 2, day: 17 },
};

const LUNAR_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
];

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function getLunarDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const lny = LUNAR_NEW_YEARS[y] || { month: 1, day: 29 };

  const lnyDayOfYear =
    MONTH_DAYS.slice(0, lny.month - 1).reduce((a, b) => a + b, 0) +
    lny.day +
    (lny.month > 2 && isLeapYear(y) ? 1 : 0);

  const todayDayOfYear =
    MONTH_DAYS.slice(0, date.getMonth()).reduce((a, b) => a + b, 0) +
    date.getDate() +
    (date.getMonth() > 1 && isLeapYear(y) ? 1 : 0);

  let diff = todayDayOfYear - lnyDayOfYear;

  if (diff < 0) {
    const prevYear = y - 1;
    const prevLny = LUNAR_NEW_YEARS[prevYear] || { month: 1, day: 29 };
    const prevLnyDay =
      MONTH_DAYS.slice(0, prevLny.month - 1).reduce((a, b) => a + b, 0) +
      prevLny.day +
      (prevLny.month > 2 && isLeapYear(prevYear) ? 1 : 0);
    const daysInPrevYear = isLeapYear(prevYear) ? 366 : 365;
    diff = todayDayOfYear + (daysInPrevYear - prevLnyDay);
  }

  const month = Math.floor(diff / 30);
  const day = diff % 30;

  const lunarMonth = LUNAR_MONTHS[Math.min(month, 11)];
  const lunarDay = LUNAR_DAYS[Math.min(day, 29)];

  return `${lunarMonth}月${lunarDay}`;
}
