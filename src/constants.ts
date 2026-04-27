
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
  image: string;
  imagePrompt: string;
  tips: string;
}

export const CAT_TYPES: Record<CatMBTI, CatTypeInfo> = {
  INTJ: {
    id: 'INTJ',
    name: '高冷统治者',
    title: '喵界战略家',
    description: '你像一只黑猫一样独立、冷静且非常有主见。你不需要他人的认可，内心深处，你才是自己世界的绝对主人。',
    traits: ['高度独立', '极致理智', '洞察全局', '略带疏离'],
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=80',
    imagePrompt: 'A sophisticated black cat wearing a tiny business suit, sitting in a dark leather office chair with a bookshelf background, cinematic lighting, 8k.',
    tips: '拥抱你的孤独力，那是你灵感的源泉。但偶尔也要记得给值得信赖的人开启一份专属的“互动仪式”。'
  },
  INTP: {
    id: 'INTP',
    name: '喵界思想家',
    title: '逻辑观察员',
    description: '你的灵魂里住着一只爱钻研的灰猫。比起参与，你更喜欢审视。你脑海里的宇宙模型比现实世界有趣得多。',
    traits: ['深度好奇', '专注内省', '解构逻辑', '特立独行'],
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    imagePrompt: 'A fluffy grey cat wearing small glasses, surrounded by floating mathematical formulas and yarn balls, studio lighting, whimsical.',
    tips: '给你的大脑提供持续的“智力磨牙棒”。你适合在安静的高处俯瞰世界，不必强迫自己融入平庸。'
  },
  ENTJ: {
    id: 'ENTJ',
    name: '霸道总裁',
    title: '灵魂指挥官',
    description: '如果你是一只猫，那一定是威严的缅因。你天生带有一种不怒自威的霸气，喜欢一切尽在掌握。',
    traits: ['果敢决绝', '极度自信', '重塑秩序', '效率至上'],
    image: 'https://images.unsplash.com/photo-1516750484197-6b28d10c91ea?w=800&q=80',
    imagePrompt: 'A majestic Ginger Main Coon cat looking authoritative on a velvet red throne, wearing a small golden crown, epic lighting.',
    tips: '你的执行力是无敌的，但要小心不要让身边的人感到窒息。偶尔收起爪子，展现一下温柔的“呼噜声”吧。'
  },
  ENTP: {
    id: 'ENTP',
    name: '调皮发明家',
    title: '逻辑挑战者',
    description: '你是一只思维活跃的暹罗猫。每一天都在挑战规则，毕竟，把桌子边缘的东西推下去看看重力规则，不是很有趣吗？',
    traits: ['思维灵活', '辩论鬼才', '反骨思维', '创意无限'],
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80',
    imagePrompt: 'A Siamese cat with a mischievous expression, standing amidst knocked-over plastic cups and scattered toys, dynamic action shot.',
    tips: '你的才华在于打破陈规。不要害怕混乱，那正是你创造力的来源。尝试把捣蛋的热情转化成更有建设性的“发明”。'
  },
  INFJ: {
    id: 'INFJ',
    name: '神秘通灵者',
    title: '喵界灵魂先知',
    description: '你拥有一双异色瞳猫咪般的眼睛，能看穿一切伪善。当你静静观察时，其实是在感应周围的能量场。',
    traits: ['直觉惊人', '深度包容', '灵性追求', '复杂多维'],
    image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cdc?w=800&q=80',
    imagePrompt: 'A beautiful white cat with heterochromia (different colored eyes), surrounded by mystical glowing butterflies, ethereal atmosphere.',
    tips: '你对环境极其敏感，守护好你的“心理结界”。在宁静的独处中充电，你才能继续扮演他人的心灵港湾。'
  },
  INFP: {
    id: 'INFP',
    name: '治愈系诗人',
    title: '柔软梦想家',
    description: '你像是一只躲在温暖阳光下的折耳猫。内心世界充盈着浪漫与幻想，渴望一种纯粹且不被打扰的宁静。',
    traits: ['情感细腻', '极致温柔', '回避冲突', '价值观坚定'],
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80',
    imagePrompt: 'A folded-ear cat curled up on a soft pastel blanket with a window showing a sunset, peaceful and dreamy vibe.',
    tips: '不要被现实的残酷吓坏。在你的小小避风港里，你的善良会被开出花来。记住，你不需要取悦所有人。'
  },
  ENFJ: {
    id: 'ENFJ',
    name: '光芒社交家',
    title: '喵界外交元首',
    description: '你有着布偶猫般的亲和力，是天然的聚合者。你热衷于关照每一个人的情绪，确保没有人被冷落。',
    traits: ['热情洋溢', '共情博爱', '魅力惊人', '责任感重'],
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80',
    imagePrompt: 'A friendly Ragdoll cat with its paws up, welcoming and warm expression, surrounded by flowers and soft light.',
    tips: '照顾别人的同时，也别忘了照顾自己。你不需要通过解决所有人的烦恼来换取爱，你本身就值得被宠爱。'
  },
  ENFP: {
    id: 'ENFP',
    name: '活力发射塔',
    title: '快乐传播锦鲤',
    description: '你是一只永远在追逐蝴蝶的三花猫。生活对你来说就是一场宏大的探险，枯燥是最不能忍受的敌人。',
    traits: ['好奇宝宝', '元气满溢', '跨界脑机', '爱与自由'],
    image: 'https://images.unsplash.com/photo-1513245533132-aa7f70582d0c?w=800&q=80',
    imagePrompt: 'A calico cat jumping in the air to catch a colorful feather toy, confetti in the background, vibrant and energetic.',
    tips: '保持你的新鲜感！你需要的不仅仅是玩伴，更是能理解你奇思妙想的朋友。别让琐事扑熄你眼里的光。'
  },
  ISTJ: {
    id: 'ISTJ',
    name: '忠诚守卫者',
    title: '喵界秩序天平',
    description: '你是一只守时的狸花猫。你生活自律、严谨可靠。在你的世界里，每一个流程都应该按章办事，分毫不差。',
    traits: ['极致务实', '严谨守法', '情绪稳定', '信守承诺'],
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    imagePrompt: 'A tabby cat sitting perfectly upright and alert next to a grandfather clock, formal atmosphere, high detail.',
    tips: '稳定的环境是你最大的安全感。在面对突然的改变时，给自己一点“缓冲期”。你的踏实是身边最值得信赖的基石。'
  },
  ISFJ: {
    id: 'ISFJ',
    name: '温柔守护者',
    title: '喵界后勤管家',
    description: '你有着英短般的沉稳与贴心。你习惯于在背后默默奉献，不图高光，只想让爱的人在安稳中入梦。',
    traits: ['绝对忠诚', '细节控', '温柔低调', '高度利他'],
    image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&q=80',
    imagePrompt: 'A British Shorthair cat gently nuzzling a human hand, soft domestic lighting, cozy home library background.',
    tips: '你是无声的安慰者，但也要学着表达自己的需求。给自己买一点最爱的“小零食”，奖励那个辛苦照顾全家人的自己。'
  },
  ESTJ: {
    id: 'ESTJ',
    name: '刚毅管理者',
    title: '喵界行动哨兵',
    description: '你是一只穿着正式礼服的燕尾服猫。你对效率和产出有铁律般的追求，组织力是你与生俱来的天赋。',
    traits: ['执行力王', '重信守义', '纪律严明', '务实导向'],
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80',
    imagePrompt: 'A tuxedo cat looking sternly at the camera, wearing a small bow-tie, sitting on a clean desk, minimalist background.',
    tips: '你是个极佳的开路先锋。在团队中，你总能确保任务落地。但记得，不是所有的事都能靠指令完成，有时也需要听听他人的软言细语。'
  },
  ESFJ: {
    id: 'ESFJ',
    name: '热心大家长',
    title: '喵界和谐大使',
    description: '你像是一只在家里跑来跑去帮着“打扫”的长毛猫。你关心每一个人的处境，是社交圈里公认的东道主。',
    traits: ['极其负责', '善于社交', '传统至上', '乐于分享'],
    image: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=800&q=80',
    imagePrompt: 'A fluffy cat helping "clean" (playing with) a duster, cheerful indoor setting, bright sunlight.',
    tips: '你的存在感来源于被需要。在照顾他人的同时，享受这种连接感带来的满足吧。你是让周围环境保持温暖的魔法师。'
  },
  ISTP: {
    id: 'ISTP',
    name: '冷酷极客',
    title: '喵界全能工匠',
    description: '你是一只在暗处观察机器原理的灵猫。你话不多，但动手能力极强，总是能冷静地找到解决问题的最短路径。',
    traits: ['冷静自持', '实战专家', '好奇探索', '自由灵魂'],
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&q=80',
    imagePrompt: 'A cat carefully pawing at a complex mechanical toy or faucet, focused expression, technical lighting.',
    tips: '你不需要太多的解释。当你专注于研究你的“迷宫”时，那就是你最迷人的时候。遇到锁不住的门，通常是因为你就在那里。'
  },
  ISFP: {
    id: 'ISFP',
    name: '随性艺术家',
    title: '喵界感官诗人',
    description: '你是一只像缅甸猫般优雅的栖息者。你对美、质感、光线有着超乎常人的敏锐度，总能找到生活中最舒适的角落。',
    traits: ['审美在线', '瞬间沉浸', '温和宽容', '追逐自由'],
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80',
    imagePrompt: 'A sleek Burmese cat lounging in a modern minimalist apartment with art on the walls, golden hour lighting.',
    tips: '沉浸在你的感官世界里吧。无论是音乐、画作还是柔顺的毛发质感，都是你连接世界的媒介。你适合慢生活。'
  },
  ESTP: {
    id: 'ESTP',
    name: '硬核玩家',
    title: '喵界极限勇士',
    description: '你是一只奔跑在巅峰的孟加拉豹猫。挑战、速度、当下的快感是你生活的燃料，思考未来不如先跳上那个最高的书架。',
    traits: ['大胆激进', '应变天才', '直觉导向', '精力充沛'],
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=80',
    imagePrompt: 'A Bengal cat in mid-leap between tall furniture, sharp focus, adventurous vibe.',
    tips: '尽情释放你的野性。你需要足够的活动空间和即时反馈的游戏。你的生命力在于每一个“当下”的决策。'
  },
  ESFP: {
    id: 'ESFP',
    name: '喵界巨星',
    title: '焦点发射机',
    description: '你是一只在聚光灯下展示奇怪睡姿的明星喵。哪里有观众，哪里就有你精彩的表演，你赋予平凡生活以剧场感。',
    traits: ['外向夺目', '即兴创作', '乐天至上', '富有魅力'],
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80',
    imagePrompt: 'A cat "dancing" or posing dramatically under a spotlight or disco ball effect, playful and glitzy.',
    tips: '拥抱掌声和赞美，那是你前进的动力！每天为自己创造一些仪式感，让身边的人也感受到你带来的快乐。'
  }
};

export const QUESTIONS: Question[] = [
  // EI: 外向 vs 内向 (5题)
  { id: 1, dimension: 'EI', text: "当你进入一个满是陌生人的社交聚会时，你的第一反应是：", leftLabel: "好奇观察", rightLabel: "战术后撤", leftOption: "像只自来熟的小猫，立刻开启社交模式", rightOption: "像只谨慎的野猫，先观察全场局势", leftValue: 'E', rightValue: 'I' },
  { id: 2, dimension: 'EI', text: "如果在一个陌生的城市旅行，你更喜欢：", leftLabel: "旷野追风", rightLabel: "深山潜行", leftOption: "去最热闹的地标打卡，感受潮流律动", rightOption: "钻进偏僻的小巷，独享宁静时光", leftValue: 'E', rightValue: 'I' },
  { id: 3, dimension: 'EI', text: "结束了一周超负荷的工作后，你如何恢复元气？", leftLabel: "群聚充电", rightLabel: "闭关回血", leftOption: "邀约好友聚会，在欢笑中释放疲惫", rightOption: "关掉手机独处，在静谧中找回自我", leftValue: 'E', rightValue: 'I' },
  { id: 4, dimension: 'EI', text: "在团队合作中，你更享受作为：", leftLabel: "外向沟通者", rightLabel: "深度思考者", leftOption: "组织协调，通过频繁沟通达成共识", rightOption: "默默钻研，用扎实的研究成果说话", leftValue: 'E', rightValue: 'I' },
  { id: 5, dimension: 'EI', text: "面对突如其来的当众发言机会，你会：", leftLabel: "顺势而上", rightLabel: "略显局促", leftOption: "兴奋地整理思路，享受表达的过程", rightOption: "心跳加速，反复确认讲稿是否完美", leftValue: 'E', rightValue: 'I' },

  // SN: 实感 vs 直觉 (5题)
  { id: 6, dimension: 'SN', text: "面对一个新的学习任务，你倾向于：", leftLabel: "细节导向", rightLabel: "宏观构思", leftOption: "掌握每一个具体步骤和基础事实", rightOption: "先建立大框架和理论模型", leftValue: 'S', rightValue: 'N' },
  { id: 7, dimension: 'SN', text: "在购买贵重物品（如电脑）时，你更看重：", leftLabel: "参数性能", rightLabel: "美学故事", leftOption: "拆解具体的配置参数和测评表现", rightOption: "被产品的设计理念或品牌气质打动", leftValue: 'S', rightValue: 'N' },
  { id: 8, dimension: 'SN', text: "当你观察一座从未去过的花园时，你的视线首先落在：", leftLabel: "繁花露水", rightLabel: "意境深处", leftOption: "花朵的颜色和具体的物理细节", rightOption: "整体氛围传递出的情感和意境", leftValue: 'S', rightValue: 'N' },
  { id: 9, dimension: 'SN', text: "面对一个复杂的问题，你解决的方式通常是：", leftLabel: "过往经验", rightLabel: "创新路径", leftOption: "寻找成熟的成熟方案和历史对标", rightOption: "跳出框架，尝试从未有人尝试的方法", leftValue: 'S', rightValue: 'N' },
  { id: 10, dimension: 'SN', text: "在闲谈中，你更喜欢聊些什么话题？", leftLabel: "当下的生活", rightLabel: "未来的可能", leftOption: "周围发生的实事和具体的个人经历", rightOption: "对未来的设想和各种天马行空的灵感", leftValue: 'S', rightValue: 'N' },

  // TF: 理智 vs 情感 (5题)
  { id: 11, dimension: 'TF', text: "当好友向你倾诉苦恼时，你的第一反应是：", leftLabel: "拆解逻辑", rightLabel: "共情抚慰", leftOption: "冷静分析原因并给出解决方案", rightOption: "感同身受地倾听并给予情感支持", leftValue: 'T', rightValue: 'F' },
  { id: 12, dimension: 'TF', text: "面对具有争议性的议题，你会优先考虑：", leftLabel: "客观准则", rightLabel: "个人体验", leftOption: "普世逻辑、公平性的一致性", rightOption: "每个个体的具体处境和内心感受", leftValue: 'T', rightValue: 'F' },
  { id: 13, dimension: 'TF', text: "在职场竞赛中，你最看重的是：", leftLabel: "公平竞争", rightLabel: "和谐氛围", leftOption: "基于能力的客观评估和公正透明", rightOption: "团队成员间的支持和良好的协作关系", leftValue: 'T', rightValue: 'F' },
  { id: 14, dimension: 'TF', text: "当你的观点被质疑时，你的状态是：", leftLabel: "理据服人", rightLabel: "内心波动", leftOption: "兴奋地组织论据，进行逻辑反驳", rightOption: "感到一些难受，会反思语气是否太生硬", leftValue: 'T', rightValue: 'F' },
  { id: 15, dimension: 'TF', text: "做出重大决定时，你往往遵循：", leftLabel: "冰冷的公式", rightLabel: "温暖的直觉", leftOption: "列出利益得失，选择最优路径", rightOption: "倾听内心的声音，确保无愧于心", leftValue: 'T', rightValue: 'F' },

  // JP: 判断 vs 知觉 (5题)
  { id: 16, dimension: 'JP', text: "关于长途旅行的计划，你的习惯通常是：", leftLabel: "严丝合缝", rightLabel: "随兴而行", leftOption: "提前刷好攻略，制定详细的时间表", rightOption: "带上护照就出发，目的地取决于心情", leftValue: 'J', rightValue: 'P' },
  { id: 17, dimension: 'JP', text: "你的书桌或办公环境通常呈现出：", leftLabel: "极简秩序", rightLabel: "灵感废土", leftOption: "一尘不染，物品归位明确", rightOption: "充满痕迹，虽然混乱但你有自己的逻辑", leftValue: 'J', rightValue: 'P' },
  { id: 18, dimension: 'JP', text: "面对截止日期（Deadline），你的状态是：", leftLabel: "稳步推进", rightLabel: "极限冲刺", leftOption: "拆解任务，步步为营，提前预留余裕", rightOption: "前期发呆，最后关头靠压力产生爆发力", leftValue: 'J', rightValue: 'P' },
  { id: 19, dimension: 'JP', text: "当计划被突发情况打乱时，你会：", leftLabel: "感到焦虑", rightLabel: "随遇而安", leftOption: "感到烦躁，必须立刻制定补救方案", rightOption: "觉得很有趣，随机应变本身就是乐趣", leftValue: 'J', rightValue: 'P' },
  { id: 20, dimension: 'JP', text: "你更倾向于如何度过一个闲暇的周六？", leftLabel: "预订精彩", rightLabel: "顺其自然", leftOption: "提前安排好活动，确保充实而有意义", rightOption: "睡个懒觉，看当时想做什么再决定", leftValue: 'J', rightValue: 'P' }
];
