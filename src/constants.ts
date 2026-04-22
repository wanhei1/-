
export type CatMBTI = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  leftLabel: string;
  rightLabel: string;
  leftOption: string;
  rightOption: string;
  leftValue: 'E' | 'S' | 'T' | 'J';
  rightValue: 'I' | 'N' | 'F' | 'P';
}

export interface CatTypeInfo {
  id: CatMBTI;
  name: string;
  title: string;
  description: string;
  traits: string[];
  imagePrompt: string;
  tips: string;
}

export const CAT_TYPES: Record<CatMBTI, CatTypeInfo> = {
  INTJ: {
    id: 'INTJ',
    name: '高冷统治者',
    title: '喵界战略家',
    description: '独立、冷静且非常有主见。它不需要你的认可，它才是这个家的主人。',
    traits: ['独立', '理智', '极其聪明', '略显冷漠'],
    imagePrompt: 'A sophisticated black cat wearing a tiny business suit, sitting in a dark leather office chair with a bookshelf background, cinematic lighting, 8k.',
    tips: '给它足够的空间。不要强迫它社交，当它想找你时，它会主动出现。如果你能建立固定的互动仪式，它会更信任你。'
  },
  INTP: {
    id: 'INTP',
    name: '喵界思想家',
    title: '逻辑观察员',
    description: '总是带着疑惑的眼神审视世界。它可能在思考宇宙的奥秘，也可能只是在发呆。',
    traits: ['好奇', '内向', '观察力强', '不按常理出牌'],
    imagePrompt: 'A fluffy grey cat wearing small glasses, surrounded by floating mathematical formulas and yarn balls, studio lighting, whimsical.',
    tips: '多提供智力挑战玩具，比如漏食球或解谜板。它喜欢观察，给它准备一个可以看窗外风景的高处平台吧。'
  },
  ENTJ: {
    id: 'ENTJ',
    name: '霸道总裁',
    title: '家庭指挥官',
    description: '非常有领导欲望。如果你不按时喂饭，它会用最高分贝的号叫来纠正你的错误。',
    traits: ['果决', '自信', '有控制欲', '高效'],
    imagePrompt: 'A majestic Ginger Main Coon cat looking authoritative on a velvet red throne, wearing a small golden crown, epic lighting.',
    tips: '保持规律的喂食和清理频率。它喜欢一切尽在掌握的感觉。千万不要在它面前表现得太“软弱”，否则它会变本加厉指挥你。'
  },
  ENTP: {
    id: 'ENTP',
    name: '调皮发明家',
    title: '混乱制造者',
    description: '极具创造力的捣蛋鬼。它每天的乐趣就是测试家里各种物品的重力（即把它们推下桌子）。',
    traits: ['活泼', '聪明', '爱挑战', '变幻莫测'],
    imagePrompt: 'A Siamese cat with a mischievous expression, standing amidst knocked-over plastic cups and scattered toys, dynamic action shot.',
    tips: '一定要把易碎品收起来！多变换玩具花样，旧玩具对它来说很快就会失去吸引力。尝试教它一些小技巧，比如击掌。'
  },
  INFJ: {
    id: 'INFJ',
    name: '神秘通灵喵',
    title: '灵魂伴侣',
    description: '它似乎能看穿你的灵魂。在你最脆弱的时候，它总会静静地出现在你身边。',
    traits: ['直觉敏锐', '安静', '共情力', '理想主义'],
    imagePrompt: 'A beautiful white cat with heterochromia (different colored eyes), surrounded by mystical glowing butterflies, ethereal atmosphere.',
    tips: '它对环境非常敏感。保持家里氛围的宁静对它很重要。它不需要轰轰烈烈的玩耍，温柔的抚摸和轻声细语最能打动它。'
  },
  INFP: {
    id: 'INFP',
    name: '治愈系诗人',
    title: '柔软梦想家',
    description: '感情细腻、害羞。它有一个丰富的小世界，充满了对零食和温暖阳光的幻想。',
    traits: ['细腻', '温柔', '害羞', '有爱心'],
    imagePrompt: 'A folded-ear cat curled up on a soft pastel blanket with a window showing a sunset, peaceful and dreamy vibe.',
    tips: '它非常慢热，不要强迫它见生人。在家里设置多个隐蔽的藏身处，当它感到尴尬或压力大时，它需要一个可以躲避的“城堡”。'
  },
  ENFJ: {
    id: 'ENFJ',
    name: '社交达喵',
    title: '暖心外交官',
    description: '家里的小太阳。它热衷于调解其他宠物的矛盾，并确保每个来客都见过它的肚皮。',
    traits: ['热情', '负责', '社交天才', '温暖'],
    imagePrompt: 'A friendly Ragdoll cat with its paws up, welcoming and warm expression, surrounded by flowers and soft light.',
    tips: '它需要大量的关注。每天一定要抽出专门的时间陪它聊天和玩耍。如果家里有新成员加入，它会是那个最好的“接待员”。'
  },
  ENFP: {
    id: 'ENFP',
    name: '活力向日葵',
    title: '快乐传播者',
    description: '好奇心过旺且精力无限。每一根飘动的线头对它来说都是一场史诗级的冒险。',
    traits: ['热心', '想象力丰富', '开朗', '随性'],
    imagePrompt: 'A calico cat jumping in the air to catch a colorful feather toy, confetti in the background, vibrant and energetic.',
    tips: '你的参与感对它来说最重要。它不喜欢一个人玩，它更期待你和它一起互动。给它准备一些色彩鲜艳、动静大的玩具。'
  },
  ISTJ: {
    id: 'ISTJ',
    name: '忠诚守卫者',
    title: '纪律委员',
    description: '生活极其自律。几点起床、几点埋屎都有严格的流程，并且期望你也遵守。',
    traits: ['诚实', '严谨', '循规蹈矩', '可靠'],
    imagePrompt: 'A tabby cat sitting perfectly upright and alert next to a grandfather clock, formal atmosphere, high detail.',
    tips: '最讨厌改变。换猫砂、换食盆这种事对它来说是天大的威胁，尽量保持环境稳定。它是个极好的倾听者，你会发现它非常踏实。'
  },
  ISFJ: {
    id: 'ISFJ',
    name: '温柔后勤官',
    title: '家庭守护神',
    description: '总是默默地照顾着每个人。它不求关注，只想确保你能在它温暖的陪伴中安稳入睡。',
    traits: ['忠诚', '有责任感', '体贴', '细心'],
    imagePrompt: 'A British Shorthair cat gently nuzzling a human hand, soft domestic lighting, cozy home library background.',
    tips: '它喜欢规律且温和的生活方式。当它为你表现出极大的包容时，请多奖励它一些最爱的小零食。它更像是一个无声的安慰者。'
  },
  ESTJ: {
    id: 'ESTJ',
    name: '秩序指挥官',
    title: '铁腕管理者',
    description: '它对家里的秩序有极高的要求。任何杂乱或逾矩的行为都会遭到它严肃的凝视。',
    traits: ['务实', '果断', '有组织力', '严肃'],
    imagePrompt: 'A tuxedo cat looking sternly at the camera, wearing a small bow-tie, sitting on a clean desk, minimalist background.',
    tips: '表现出你的“服从”。如果它想要某样东西，直接给吧，不要试图和它讨价还价。它需要清晰的边界感和充足的物质保障。'
  },
  ESFJ: {
    id: 'ESFJ',
    name: '热心大管家',
    title: '喵界主人翁',
    description: '最完美的东道主。它不仅关心你，也关心家里所有的生物，确保每个人都感到满意。',
    traits: ['热心', '善于交际', '传统', '爱操心'],
    imagePrompt: 'A fluffy cat helping "clean" (playing with) a duster, cheerful indoor setting, bright sunlight.',
    tips: '给它足够的“工作”感。当你在做家务时，它如果想参与，就给它一些非危险的任务（比如玩弄塑料纸）。它需要感觉到自己是家庭重要的一员。'
  },
  ISTP: {
    id: 'ISTP',
    name: '孤傲手艺人',
    title: '喵界极客',
    description: '比起撒娇，它更喜欢研究饮水机是怎么出水的，或者是如何灵巧地打开那个你以为很安全的橱柜。',
    traits: ['冷静', '动手能力强', '观察家', '独立'],
    imagePrompt: 'A cat carefully pawing at a complex mechanical toy or faucet, focused expression, technical lighting.',
    tips: '给它一些具有探索性的玩具，比如多层迷宫。它话不多，但它的每一个动作都在展示它的智慧。如果你发现它在研究你的门锁，请提前做好加固。'
  },
  ISFP: {
    id: 'ISFP',
    name: '随性艺术家',
    title: '美学追求者',
    description: '对生活品质有极高的追求。它总是能找到家里阳光最美、睡垫最舒服的地方。',
    traits: ['优雅', '敏感', '享受当下', '温和'],
    imagePrompt: 'A sleek Burmese cat lounging in a modern minimalist apartment with art on the walls, golden hour lighting.',
    tips: '注重环境的舒适度。高品质的猫窝、顺滑的毛发刷都能让它心情愉悦。它对色彩和声音很敏感，家里可以放一些柔和的背景音乐。'
  },
  ESTP: {
    id: 'ESTP',
    name: '喵界冒险客',
    title: '行动派专家',
    description: '生活在边缘的猫。它从最高的书架跳下，从不考虑软着陆，因为挑战本身就是奖励。',
    traits: ['大胆', '灵活', '务实', '精力充沛'],
    imagePrompt: 'A Bengal cat in mid-leap between tall furniture, sharp focus, adventurous vibe.',
    tips: '释放它无尽的体力。激光笔、大型跑轮或者是能让它飞檐走壁的猫墙是必备的。它的反应极快，你可以和它玩“抢夺”类的小游戏。'
  },
  ESFP: {
    id: 'ESFP',
    name: '喵界大明星',
    title: '派对灵魂',
    description: '哪里有热闹，哪里就有它。它是天生的表演者，只要有人看着，它就能表演各种奇葩姿势。',
    traits: ['外向', '友好', '爱出风头', '乐天派'],
    imagePrompt: 'A cat "dancing" or posing dramatically under a spotlight or disco ball effect, playful and glitzy.',
    tips: '多给它夸奖和称赞！它是真的能听懂掌声。每天都要有一些充满仪式感的互动，比如当众给它梳毛。它甚至可能会主动向邻居“展示”自己。'
  }
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: 'EI',
    text: "当家里突然来了陌生客人时，你家猫咪通常会：",
    leftLabel: "热衷社交",
    rightLabel: "极度害羞",
    leftOption: "主动上前闻闻客人的气味，甚至求抚摸",
    rightOption: "立刻躲到床底或柜子里，直到客人离开",
    leftValue: 'E',
    rightValue: 'I'
  },
  {
    id: 2,
    dimension: 'SN',
    text: "当它看到窗外飞过一只小鸟或飞虫时：",
    leftLabel: "动作派",
    rightLabel: "沉思派",
    leftOption: "疯狂拍打窗户，迫切想要抓住它",
    rightOption: "静静地注视着，眼神深邃得像是在思考鸟生",
    leftValue: 'S',
    rightValue: 'N'
  },
  {
    id: 3,
    dimension: 'EI',
    text: "你下班回家推开门的那一刻：",
    leftLabel: "热情如火",
    rightLabel: "稳如泰山",
    leftOption: "它已经在门口，对着你一通狂叫或蹭腿",
    rightOption: "它还瘫在窝里睡觉，只是慵懒地抬下眼皮",
    leftValue: 'E',
    rightValue: 'I'
  },
  {
    id: 4,
    dimension: 'TF',
    text: "在面对剪指甲或洗澡这些“喵生磨难”时：",
    leftLabel: "理智应对",
    rightLabel: "情绪爆发",
    leftOption: "冷静配合，或者虽然不爽但能忍辱负重",
    rightOption: "反应超级激烈，表现得像受了天大委屈",
    leftValue: 'T',
    rightValue: 'F'
  },
  {
    id: 5,
    dimension: 'EI',
    text: "如果你因为忙碌而暂时没理会它，它会：",
    leftLabel: "戏精附体",
    rightLabel: "独自安好",
    leftOption: "通过捣乱（如踩键盘）强行引起你的注意",
    rightOption: "很懂事，自己找玩具玩或者安静地陪在身边",
    leftValue: 'E',
    rightValue: 'I'
  },
  {
    id: 6,
    dimension: 'SN',
    text: "玩逗猫棒的时候，它的风格更倾向于：",
    leftLabel: "瞬间爆发",
    rightLabel: "运筹帷幄",
    leftOption: "直接莽撞，只要动了就冲上去扑咬",
    rightOption: "长时间潜伏观察，寻找最佳时机才出击",
    leftValue: 'S',
    rightValue: 'N'
  },
  {
    id: 7,
    dimension: 'JP',
    text: "你家猫咪每天的作息习惯更像是：",
    leftLabel: "守时标兵",
    rightLabel: "自由灵魂",
    leftOption: "精准的闹钟，每天准时催饭，分毫不差",
    rightOption: "想一出是一出，作息非常随机",
    leftValue: 'J',
    rightValue: 'P'
  },
  {
    id: 8,
    dimension: 'TF',
    text: "当你因为心情不好而难过哭泣时，它会：",
    leftLabel: "不明所以",
    rightLabel: "深情共鸣",
    leftOption: "迷惑地看着你，完全不能理解脆弱的人类",
    rightOption: "似乎能感知到你的情绪，过来舔你或依靠你",
    leftValue: 'T',
    rightValue: 'F'
  },
  {
    id: 9,
    dimension: 'SN',
    text: "给它买了一个造型奇特的新玩具，它会：",
    leftLabel: "先试再说",
    rightLabel: "先看再动",
    leftOption: "不管三七二十一，直接冲上去咬两口试试",
    rightOption: "战术性撤退，远观大半天确定安全才靠近",
    leftValue: 'S',
    rightValue: 'N'
  },
  {
    id: 10,
    dimension: 'TF',
    text: "如果今天突然换了一种没吃过的猫粮品牌：",
    leftLabel: "务实干饭",
    rightLabel: "挑剔美食",
    leftOption: "作为“干饭喵”，只要是吃的都没问题",
    rightOption: "作为“美食家”，挑剔地闻闻然后埋头拒绝",
    leftValue: 'T',
    rightValue: 'F'
  },
  {
    id: 11,
    dimension: 'JP',
    text: "如果它最喜欢的那个位子被你占了：",
    leftLabel: "夺回主权",
    rightLabel: "大度让出",
    leftOption: "一定要纠缠你或者死盯着你，直到你自觉让位",
    rightOption: "算了，我再去别的地方找个舒服位置瘫着",
    leftValue: 'J',
    rightValue: 'P'
  },
  {
    id: 12,
    dimension: 'TF',
    text: "因为犯了错被你训斥以后，它的反应通常是：",
    leftLabel: "坚守立场",
    rightLabel: "心虚反省",
    leftOption: "毫无悔意，甚至盯着你的眼睛“死不认账”",
    rightOption: "躲避你的眼神，表现得很委屈或羞愧",
    leftValue: 'T',
    rightValue: 'F'
  }
];
