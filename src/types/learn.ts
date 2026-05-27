export type LangCode = 'pt-BR' | 'en-US';

export interface Sentence {
  id: string;
  text: string;
  reading: string;
  translation: string;
  note: string;
  lang: LangCode;
  tags: string[];
}

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'en-US', label: 'English',   flag: '🇺🇸' },
];

export const SENTENCES: Sentence[] = [
  // ===== 葡语 =====
  { id: 'pt-01', text: 'Bom dia, meu amor!', reading: 'bõw djia mew a-mor', translation: '早安，我的爱！', note: '葡语的 "bom dia" 和西语 "buenos días" 是亲戚哦', lang: 'pt-BR', tags: ['问候', '情侣'] },
  { id: 'pt-02', text: 'Que saudade de você!', reading: 'ke saw-da-dji dji vo-se', translation: '好想你啊！', note: '"saudade" 是葡语独有的词，形容一种深深的思念，无法直译', lang: 'pt-BR', tags: ['情侣', '趣味'] },
  { id: 'pt-03', text: 'Vamos comer alguma coisa juntos?', reading: 'va-mus ko-mer aw-gu-ma koy-za jun-tus', translation: '一起去吃点东西吧？', note: '巴西人最自然的邀约方式', lang: 'pt-BR', tags: ['美食', '日常'] },
  { id: 'pt-04', text: 'Hoje o dia está lindo, como você.', reading: 'o-zhi u djia es-ta lin-du ko-mu vo-se', translation: '今天天气很好，就像你一样。', note: '巴西式土味情话，自然不油腻', lang: 'pt-BR', tags: ['情侣'] },
  { id: 'pt-05', text: 'Eu te amo mais que tudo.', reading: 'ew chi a-mu mais ke tu-du', translation: '我爱你胜过一切。', note: 'mais que tudo = more than everything', lang: 'pt-BR', tags: ['情侣'] },
  { id: 'pt-06', text: 'Com licença, onde fica o restaurante?', reading: 'kõw li-sen-sa on-dji fi-ka u hes-taw-ran-chi', translation: '请问餐厅在哪？', note: 'com licença = excuse me（借过/请问）', lang: 'pt-BR', tags: ['旅行', '美食'] },
  { id: 'pt-07', text: 'Estou com fome, vamos pedir comida!', reading: 'es-tow kõw fo-mi va-mus pe-djir ko-mi-da', translation: '我饿了，叫外卖吧！', note: 'com fome = with hunger，直译"带着饥饿"很有趣', lang: 'pt-BR', tags: ['美食', '日常'] },
  { id: 'pt-08', text: 'Você está muito bonito hoje.', reading: 'vo-se es-ta muyn-tu bo-ni-tu o-zhi', translation: '你今天很好看。', note: 'bonito 形容美/帅，男女通用', lang: 'pt-BR', tags: ['情侣'] },
  { id: 'pt-09', text: 'Boa noite, durma bem!', reading: 'bo-a noy-chi dur-ma bẽy', translation: '晚安，睡个好觉！', note: 'durma bem = sleep well，睡前温柔一句', lang: 'pt-BR', tags: ['问候', '日常'] },
  { id: 'pt-10', text: 'Tudo bem? — Tudo ótimo!', reading: 'tu-du bẽy — tu-du o-chi-mu', translation: '"还好吗？" — "超棒的！"', note: '巴西最常用的打招呼和回复，一天说十遍', lang: 'pt-BR', tags: ['口语', '日常'] },
  { id: 'pt-11', text: 'Meu Deus, que delícia!', reading: 'mew dews ke de-li-si-a', translation: '天哪太好吃了吧！', note: '巴西人吃饭时的标配感叹句', lang: 'pt-BR', tags: ['美食', '口语'] },
  { id: 'pt-12', text: 'Quero viajar pelo mundo com você.', reading: 'ke-ru vi-a-zhar pe-lu mun-du kõw vo-se', translation: '想和你环游世界。', note: 'pelo mundo = around the world', lang: 'pt-BR', tags: ['旅行', '情侣'] },

  // ===== 英语 =====
  { id: 'en-01', text: 'You make me a better person.', reading: 'yu meyk mi ə be-tər pər-sən', translation: '你让我成为更好的人。', note: '最简单也最真挚的告白', lang: 'en-US', tags: ['情侣'] },
  { id: 'en-02', text: 'What do you feel like eating tonight?', reading: 'wʌt du yu fiyl layk iy-ting tə-nayt', translation: '今晚想吃啥？', note: 'feel like + V-ing = 想要做某事，超实用句型', lang: 'en-US', tags: ['美食', '日常'] },
  { id: 'en-03', text: 'I love you to the moon and back.', reading: 'ay lʌv yu tə ðə muwn ænd bæk', translation: '我爱你比往返月球还多。', note: '经典英文情话，小朋友绘本里也有这句', lang: 'en-US', tags: ['情侣', '趣味'] },
  { id: 'en-04', text: 'It\'s a piece of cake!', reading: 'its ə piys əv keyk', translation: '小菜一碟！', note: '最常用的英语俚语，不能直译成"一块蛋糕"', lang: 'en-US', tags: ['口语', '趣味'] },
  { id: 'en-05', text: 'Home is wherever I\'m with you.', reading: 'howm iz wer-e-ver aym wið yu', translation: '有你在的地方就是家。', note: '适合发朋友圈配图的一句话', lang: 'en-US', tags: ['情侣'] },
  { id: 'en-06', text: 'Could I get the check, please?', reading: 'kʊd ay get ðə chek pliyz', translation: '麻烦买单。', note: 'check = bill（美式），英国人说 bill', lang: 'en-US', tags: ['旅行', '美食'] },
  { id: 'en-07', text: 'I\'m feeling under the weather today.', reading: 'aym fiy-ling ʌn-dər ðə we-ðər tə-dey', translation: '今天有点不舒服。', note: 'under the weather = 身体不适，地道习语', lang: 'en-US', tags: ['日常', '口语'] },
  { id: 'en-08', text: 'You had me at hello.', reading: 'yu hæd miy æt hə-low', translation: '你说"你好"的那一刻我就沦陷了。', note: '出自电影 Jerry Maguire，影史经典告白', lang: 'en-US', tags: ['情侣', '趣味'] },
  { id: 'en-09', text: 'Break a leg tomorrow!', reading: 'breyk ə leg tə-mɑ-row', translation: '明天加油！祝好运！', note: '对面试/演出的人说"断条腿"= 祝成功', lang: 'en-US', tags: ['口语', '趣味'] },
  { id: 'en-10', text: 'It\'s not my cup of tea.', reading: 'its nɑt may kʌp əv tiy', translation: '这不是我的菜。', note: '委婉表达"不合我口味"的万能句', lang: 'en-US', tags: ['口语', '趣味'] },
  { id: 'en-11', text: 'Let\'s just Netflix and chill.', reading: 'lets jʌst net-fliks ænd chil', translation: '窝着看剧放松吧~', note: '情侣宅家经典暗号，已经成流行梗了 😏', lang: 'en-US', tags: ['日常', '趣味'] },
  { id: 'en-12', text: 'Shall we cook together tonight?', reading: 'shæl wi kʊk tə-ge-ðər tə-nayt', translation: '今晚一起做饭好吗？', note: 'shall we = 委婉提议，比 let\'s 更有礼貌', lang: 'en-US', tags: ['美食', '情侣'] },
];
