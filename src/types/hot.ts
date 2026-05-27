export interface HotEvent {
  text: string;
  year: number;
}

export interface DailyTopic {
  emoji: string;
  title: string;
  content: string;
  category: string;
}

export const CONVERSATION_TOPICS: DailyTopic[] = [
  { emoji: '💭', title: '如果中了彩票第一件事做什么', content: '不许说存银行，要说具体的第一笔消费！互相猜猜对方会买什么', category: '情侣话题' },
  { emoji: '🍽️', title: '如果只能吃一种菜系一辈子', content: '中餐日料韩料西餐…你们的默契能撑几轮不吵架？', category: '情侣话题' },
  { emoji: '✈️', title: '下次旅行的第一个目的地', content: '打开地图随便指一个地方，研究一下怎么去、吃什么、住哪里', category: '情侣话题' },
  { emoji: '🎬', title: '哪部电影让你哭得最惨', content: '交换片单，周末找一部没看过的窝在一起看', category: '情侣话题' },
  { emoji: '🦸', title: '你最想拥有的超能力是什么', content: '飞行？隐身？读心术？理由要讲出来才有趣', category: '趣味话题' },
  { emoji: '🐣', title: '小时候做过最离谱的一件事', content: '翻翻相册互相爆料，保证有未公开的童年黑历史', category: '趣味话题' },
  { emoji: '🎵', title: '你的KTV必点曲目是哪首', content: '下次一起去KTV验证一下对方是不是真的会唱', category: '趣味话题' },
  { emoji: '📱', title: '手机里最常用的三个App', content: '除了微信和抖音，看看对方在刷什么奇奇怪怪的应用', category: '趣味话题' },
  { emoji: '🍳', title: '你最拿手的一道菜是什么', content: '说得再好不如做一顿，今晚厨房交给会做的人', category: '生活话题' },
  { emoji: '💤', title: '睡前最后一件必做的事是什么', content: '刷手机？喝水？锁门？两个人在床上的习惯能一样吗', category: '生活话题' },
  { emoji: '📷', title: '相册里最新一张照片是什么', content: '同时亮出手机相册，给照片背后的故事配个解说', category: '生活话题' },
  { emoji: '🎂', title: '今年最想收到什么生日礼物', content: '不许说"随便"和"你送的都喜欢"，要具体到品牌型号颜色', category: '情侣话题' },
  { emoji: '🏝️', title: '荒岛求生只能带三样东西', content: '除了手机，认真想想真正有用的东西，答案能看出性格', category: '趣味话题' },
  { emoji: '👶', title: '如果能穿越回十年前对自己说一句话', content: '分享后会发现你们走过多大的弯路才遇到彼此', category: '走心话题' },
  { emoji: '🌟', title: '你眼中对方最有魅力的瞬间', content: '认真描述一下，越具体对方越开心', category: '情侣话题' },
  { emoji: '🎨', title: '用一种颜色形容今天的心情', content: '不用多想，脱口而出，然后解释为什么', category: '日常话题' },
  { emoji: '📚', title: '最近读到最有启发的一句话', content: '可以是书里、微博上、甚至外卖小票上的金句', category: '走心话题' },
  { emoji: '🧸', title: '你从小到大最喜欢的玩具', content: '童年的安慰物透露了你的深层性格，还能顺便回忆童年', category: '走心话题' },
];
