export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  createdAt: number;
}

export interface UserProfile {
  height: number;
}

export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  label: string;
  color: string;
  bgColor: string;
  emoji: string;
  minIdeal: number;
  maxIdeal: number;
}

export const BMI_CATEGORIES: Record<BmiCategory, Omit<BmiResult, 'bmi' | 'minIdeal' | 'maxIdeal'>> = {
  underweight: {
    category: 'underweight',
    label: '偏瘦',
    color: '#60A5FA',
    bgColor: '#DBEAFE',
    emoji: '🪶',
  },
  normal: {
    category: 'normal',
    label: '健康',
    color: '#34D399',
    bgColor: '#D1FAE5',
    emoji: '💪',
  },
  overweight: {
    category: 'overweight',
    label: '偏重',
    color: '#FBBF24',
    bgColor: '#FEF3C7',
    emoji: '🐻',
  },
  obese: {
    category: 'obese',
    label: '肥胖',
    color: '#F87171',
    bgColor: '#FEE2E2',
    emoji: '⚠️',
  },
};

/** 中国标准 BMI 范围 */
export function calcBmi(weight: number, height: number): BmiResult {
  const h = height / 100;
  const bmi = Math.round((weight / (h * h)) * 10) / 10;
  let category: BmiCategory;
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 24) category = 'normal';
  else if (bmi < 28) category = 'overweight';
  else category = 'obese';

  const minIdeal = Math.round(18.5 * h * h * 10) / 10;
  const maxIdeal = Math.round(23.9 * h * h * 10) / 10;

  const cat = BMI_CATEGORIES[category];
  return { bmi, minIdeal, maxIdeal, ...cat };
}
