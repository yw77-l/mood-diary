export type FoodCategory = 'chinese' | 'japanese' | 'korean' | 'western' | 'hotpot' | 'bbq' | 'southeast' | 'dessert' | 'snack';

export interface Dish {
  id: string;
  name: string;
  emoji: string;
  category: FoodCategory;
  tags: string[];
}

export const CATEGORIES: { key: FoodCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: '全部', emoji: '🔥' },
  { key: 'chinese', label: '中餐', emoji: '🥡' },
  { key: 'japanese', label: '日料', emoji: '🍣' },
  { key: 'korean', label: '韩料', emoji: '🥩' },
  { key: 'western', label: '西餐', emoji: '🍕' },
  { key: 'southeast', label: '东南亚', emoji: '🍜' },
  { key: 'hotpot', label: '火锅', emoji: '🫕' },
  { key: 'bbq', label: '烧烤', emoji: '🍖' },
  { key: 'dessert', label: '甜品饮品', emoji: '🧋' },
  { key: 'snack', label: '小吃快餐', emoji: '🍟' },
];

export const DISHES: Dish[] = [
  // ===== 中餐 =====
  { id: 'c01', name: '红烧肉', emoji: '🍖', category: 'chinese', tags: ['下饭', '经典'] },
  { id: 'c02', name: '糖醋里脊', emoji: '🥩', category: 'chinese', tags: ['酸甜', '酥脆'] },
  { id: 'c03', name: '宫保鸡丁', emoji: '🍗', category: 'chinese', tags: ['微辣', '下饭'] },
  { id: 'c04', name: '麻婆豆腐', emoji: '🫘', category: 'chinese', tags: ['麻辣', '下饭'] },
  { id: 'c05', name: '回锅肉', emoji: '🥓', category: 'chinese', tags: ['香辣', '经典'] },
  { id: 'c06', name: '水煮鱼', emoji: '🐟', category: 'chinese', tags: ['麻辣', '硬菜'] },
  { id: 'c07', name: '番茄炒蛋', emoji: '🍅', category: 'chinese', tags: ['家常', '快手'] },
  { id: 'c08', name: '鱼香肉丝', emoji: '🥢', category: 'chinese', tags: ['酸甜', '下饭'] },
  { id: 'c09', name: '北京烤鸭', emoji: '🦆', category: 'chinese', tags: ['硬菜', '仪式感'] },
  { id: 'c10', name: '小笼包', emoji: '🥟', category: 'chinese', tags: ['经典', '爆汁'] },
  { id: 'c11', name: '酸菜鱼', emoji: '🐠', category: 'chinese', tags: ['酸辣', '硬菜'] },
  { id: 'c12', name: '干锅花菜', emoji: '🥬', category: 'chinese', tags: ['香辣', '下饭'] },
  { id: 'c13', name: '蒜蓉空心菜', emoji: '🥬', category: 'chinese', tags: ['清淡', '家常'] },
  { id: 'c14', name: '地三鲜', emoji: '🍆', category: 'chinese', tags: ['家常', '下饭'] },
  { id: 'c15', name: '酸辣土豆丝', emoji: '🥔', category: 'chinese', tags: ['酸辣', '快手'] },
  { id: 'c16', name: '京酱肉丝', emoji: '🌯', category: 'chinese', tags: ['酱香', '经典'] },

  // ===== 日料 =====
  { id: 'j01', name: '寿司拼盘', emoji: '🍣', category: 'japanese', tags: ['精致', '新鲜'] },
  { id: 'j02', name: '豚骨拉面', emoji: '🍜', category: 'japanese', tags: ['暖胃', '浓郁'] },
  { id: 'j03', name: '天妇罗', emoji: '🍤', category: 'japanese', tags: ['酥脆', '炸物'] },
  { id: 'j04', name: '鳗鱼饭', emoji: '🍱', category: 'japanese', tags: ['精致', '日式'] },
  { id: 'j05', name: '日式咖喱饭', emoji: '🍛', category: 'japanese', tags: ['浓郁', '暖胃'] },
  { id: 'j06', name: '乌冬面', emoji: '🍲', category: 'japanese', tags: ['清淡', '暖胃'] },
  { id: 'j07', name: '章鱼小丸子', emoji: '🐙', category: 'japanese', tags: ['小吃', '酥脆'] },
  { id: 'j08', name: '日式炸猪排', emoji: '🐷', category: 'japanese', tags: ['酥脆', '满足'] },
  { id: 'j09', name: '亲子丼', emoji: '🍳', category: 'japanese', tags: ['家常', '暖胃'] },
  { id: 'j10', name: '味噌拉面', emoji: '🍜', category: 'japanese', tags: ['浓郁', '经典'] },
  { id: 'j11', name: '刺身拼盘', emoji: '🐟', category: 'japanese', tags: ['新鲜', '精致'] },
  { id: 'j12', name: '大阪烧', emoji: '🫓', category: 'japanese', tags: ['铁板', '满足'] },

  // ===== 韩料 =====
  { id: 'k01', name: '韩式烤肉', emoji: '🥩', category: 'korean', tags: ['聚餐', '滋滋'] },
  { id: 'k02', name: '石锅拌饭', emoji: '🍚', category: 'korean', tags: ['管饱', '焦脆'] },
  { id: 'k03', name: '部队锅', emoji: '🫕', category: 'korean', tags: ['热乎', '满足'] },
  { id: 'k04', name: '韩式炸鸡', emoji: '🍗', category: 'korean', tags: ['酥脆', '追剧'] },
  { id: 'k05', name: '辣炒年糕', emoji: '🌶️', category: 'korean', tags: ['甜辣', '小吃'] },
  { id: 'k06', name: '韩式炸酱面', emoji: '🍝', category: 'korean', tags: ['酱香', '管饱'] },
  { id: 'k07', name: '参鸡汤', emoji: '🍲', category: 'korean', tags: ['滋补', '暖胃'] },
  { id: 'k08', name: '韩式拌冷面', emoji: '🧊', category: 'korean', tags: ['冰爽', '夏天'] },
  { id: 'k09', name: '大酱汤', emoji: '🥘', category: 'korean', tags: ['家常', '暖胃'] },
  { id: 'k10', name: '芝士肋排', emoji: '🧀', category: 'korean', tags: ['芝士', '满足'] },

  // ===== 西餐 =====
  { id: 'w01', name: '牛排', emoji: '🥩', category: 'western', tags: ['仪式感', '硬菜'] },
  { id: 'w02', name: '披萨', emoji: '🍕', category: 'western', tags: ['分享', '芝士'] },
  { id: 'w03', name: '奶油培根意面', emoji: '🍝', category: 'western', tags: ['浓郁', '奶香'] },
  { id: 'w04', name: '汉堡', emoji: '🍔', category: 'western', tags: ['管饱', '满足'] },
  { id: 'w05', name: '凯撒沙拉', emoji: '🥗', category: 'western', tags: ['清爽', '健康'] },
  { id: 'w06', name: '罗宋汤', emoji: '🥣', category: 'western', tags: ['暖胃', '酸甜'] },
  { id: 'w07', name: '千层面', emoji: '🧀', category: 'western', tags: ['芝士', '满足'] },
  { id: 'w08', name: '番茄肉酱意面', emoji: '🍝', category: 'western', tags: ['经典', '管饱'] },
  { id: 'w09', name: '薯条', emoji: '🍟', category: 'western', tags: ['酥脆', '解馋'] },
  { id: 'w10', name: '烤鸡翅', emoji: '🍗', category: 'western', tags: ['香酥', '分享'] },
  { id: 'w11', name: '三明治', emoji: '🥪', category: 'western', tags: ['快手', '管饱'] },
  { id: 'w12', name: '牛角包', emoji: '🥐', category: 'western', tags: ['早餐', '酥香'] },

  // ===== 东南亚 =====
  { id: 'se01', name: '冬阴功汤', emoji: '🦐', category: 'southeast', tags: ['酸辣', '开胃'] },
  { id: 'se02', name: '越南河粉', emoji: '🍜', category: 'southeast', tags: ['清淡', '鲜美'] },
  { id: 'se03', name: '泰式绿咖喱', emoji: '🍛', category: 'southeast', tags: ['椰香', '微辣'] },
  { id: 'se04', name: '菠萝炒饭', emoji: '🍍', category: 'southeast', tags: ['清甜', '颜值'] },
  { id: 'se05', name: '芒果糯米饭', emoji: '🥭', category: 'southeast', tags: ['甜美', '甜品'] },
  { id: 'se06', name: '越南春卷', emoji: '🫔', category: 'southeast', tags: ['清爽', '低卡'] },
  { id: 'se07', name: '肉骨茶', emoji: '🍖', category: 'southeast', tags: ['滋补', '浓香'] },
  { id: 'se08', name: '泰式炒河粉', emoji: '🍝', category: 'southeast', tags: ['酸甜', '经典'] },
  { id: 'se09', name: '椰浆饭', emoji: '🍚', category: 'southeast', tags: ['椰香', '特色'] },
  { id: 'se10', name: '青木瓜沙拉', emoji: '🥗', category: 'southeast', tags: ['酸辣', '爽脆'] },
  { id: 'se11', name: '沙爹肉串', emoji: '🍢', category: 'southeast', tags: ['炭烤', '花生酱'] },
  { id: 'se12', name: '海南鸡饭', emoji: '🐔', category: 'southeast', tags: ['鲜嫩', '经典'] },

  // ===== 火锅 =====
  { id: 'h01', name: '麻辣火锅', emoji: '🫕', category: 'hotpot', tags: ['过瘾', '热乎'] },
  { id: 'h02', name: '番茄火锅', emoji: '🍅', category: 'hotpot', tags: ['酸甜', '浓郁'] },
  { id: 'h03', name: '菌菇火锅', emoji: '🍄', category: 'hotpot', tags: ['鲜美', '清淡'] },
  { id: 'h04', name: '寿喜烧', emoji: '🥘', category: 'hotpot', tags: ['日式', '甜鲜'] },
  { id: 'h05', name: '串串香', emoji: '🍢', category: 'hotpot', tags: ['过瘾', '自选'] },
  { id: 'h06', name: '潮汕牛肉火锅', emoji: '🥩', category: 'hotpot', tags: ['鲜切', '清汤'] },
  { id: 'h07', name: '椰子鸡火锅', emoji: '🥥', category: 'hotpot', tags: ['清甜', '滋补'] },
  { id: 'h08', name: '重庆老火锅', emoji: '🌶️', category: 'hotpot', tags: ['重辣', '牛油'] },
  { id: 'h09', name: '羊蝎子火锅', emoji: '🐑', category: 'hotpot', tags: ['滋补', '暖身'] },
  { id: 'h10', name: '酸汤鱼火锅', emoji: '🐟', category: 'hotpot', tags: ['酸辣', '开胃'] },

  // ===== 烧烤 =====
  { id: 'bb01', name: '羊肉串', emoji: '🐑', category: 'bbq', tags: ['孜然', '经典'] },
  { id: 'bb02', name: '烤鸡翅', emoji: '🍗', category: 'bbq', tags: ['蜜汁', '解馋'] },
  { id: 'bb03', name: '烤鱼', emoji: '🐟', category: 'bbq', tags: ['焦香', '聚会'] },
  { id: 'bb04', name: '炭烤生蚝', emoji: '🦪', category: 'bbq', tags: ['蒜蓉', '鲜美'] },
  { id: 'bb05', name: '烤羊排', emoji: '🥩', category: 'bbq', tags: ['焦香', '硬菜'] },
  { id: 'bb06', name: '烤玉米', emoji: '🌽', category: 'bbq', tags: ['炭香', '素食'] },
  { id: 'bb07', name: '烤鸡皮', emoji: '🐔', category: 'bbq', tags: ['焦脆', '下酒'] },
  { id: 'bb08', name: '锡纸金针菇', emoji: '🍄', category: 'bbq', tags: ['蒜香', '鲜美'] },
  { id: 'bb09', name: '烤羊腰', emoji: '🥓', category: 'bbq', tags: ['重口', '特色'] },
  { id: 'bb10', name: '烤面包片', emoji: '🍞', category: 'bbq', tags: ['焦甜', '主食'] },

  // ===== 甜品饮品 =====
  { id: 'd01', name: '珍珠奶茶', emoji: '🧋', category: 'dessert', tags: ['国民', '甜蜜'] },
  { id: 'd02', name: '杨枝甘露', emoji: '🥭', category: 'dessert', tags: ['港式', '清爽'] },
  { id: 'd03', name: '抹茶冰淇淋', emoji: '🍦', category: 'dessert', tags: ['日式', '夏天'] },
  { id: 'd04', name: '提拉米苏', emoji: '🍰', category: 'dessert', tags: ['意式', '浪漫'] },
  { id: 'd05', name: '芒果冰沙', emoji: '🧊', category: 'dessert', tags: ['夏天', '冰爽'] },
  { id: 'd06', name: '芝士蛋糕', emoji: '🧀', category: 'dessert', tags: ['浓郁', '经典'] },
  { id: 'd07', name: '椰子冻', emoji: '🥥', category: 'dessert', tags: ['清甜', '爽滑'] },
  { id: 'd08', name: '黑糖波波', emoji: '🥤', category: 'dessert', tags: ['焦香', '网红'] },
  { id: 'd09', name: '水果捞', emoji: '🍓', category: 'dessert', tags: ['新鲜', '健康'] },
  { id: 'd10', name: '咖啡拿铁', emoji: '☕', category: 'dessert', tags: ['提神', '日常'] },
  { id: 'd11', name: '芒果班戟', emoji: '🥞', category: 'dessert', tags: ['港式', '甜蜜'] },
  { id: 'd12', name: '柠檬茶', emoji: '🍋', category: 'dessert', tags: ['清爽', '解腻'] },

  // ===== 小吃快餐 =====
  { id: 's01', name: '麻辣烫', emoji: '🥣', category: 'snack', tags: ['自选', '热乎'] },
  { id: 's02', name: '煎饼果子', emoji: '🫓', category: 'snack', tags: ['快手', '路边摊'] },
  { id: 's03', name: '馄饨', emoji: '🥟', category: 'snack', tags: ['暖胃', '清淡'] },
  { id: 's04', name: '酸辣粉', emoji: '🍜', category: 'snack', tags: ['酸辣', '过瘾'] },
  { id: 's05', name: '小龙虾', emoji: '🦞', category: 'snack', tags: ['过瘾', '宵夜'] },
  { id: 's06', name: '炸串', emoji: '🍢', category: 'snack', tags: ['解馋', '路边摊'] },
  { id: 's07', name: '螺蛳粉', emoji: '🍜', category: 'snack', tags: ['上头', '重口'] },
  { id: 's08', name: '凉皮', emoji: '🍝', category: 'snack', tags: ['夏天', '爽滑'] },
  { id: 's09', name: '肉夹馍', emoji: '🥙', category: 'snack', tags: ['管饱', '西北'] },
  { id: 's10', name: '过桥米线', emoji: '🍲', category: 'snack', tags: ['云南', '鲜美'] },
  { id: 's11', name: '铁板鱿鱼', emoji: '🦑', category: 'snack', tags: ['夜市', '焦香'] },
  { id: 's12', name: '章鱼烧', emoji: '🐙', category: 'snack', tags: ['夜市', '满足'] },
];
