/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, PersonalityDetails } from '../types';

export const MBTI_QUESTIONS: Question[] = [
  // ================= E vs I (外向 vs 内向) =================
  {
    id: 1,
    text: "在社交聚会中，你通常会感到精力充沛，而不是感到疲惫。",
    dimension: "EI",
    direction: true, // Agree = E, Disagree = I
  },
  {
    id: 2,
    text: "你更喜欢独自看书、创作或散步，而不是去参加热闹的聚会。",
    dimension: "EI",
    direction: false, // Agree = I, Disagree = E
  },
  {
    id: 3,
    text: "即使是在陌生人很多的场合，你也能轻松且主动地发起对话。",
    dimension: "EI",
    direction: true,
  },
  {
    id: 4,
    text: "在度过忙碌的一天后，你强烈需要独自静处来恢复精力，而不是和人倾诉。",
    dimension: "EI",
    direction: false,
  },
  {
    id: 5,
    text: "你乐于在人群中表达观点，并且喜欢或者不抗拒成为大家关注的焦点。",
    dimension: "EI",
    direction: true,
  },
  {
    id: 6,
    text: "你习惯在脑海里默默思考，直到想法成熟才说出口，而不是边说边想。",
    dimension: "EI",
    direction: false,
  },
  {
    id: 7,
    text: "在空闲时间，你经常乐于联络朋友、组织聚会，充当人群中的组织者。",
    dimension: "EI",
    direction: true,
  },
  {
    id: 8,
    text: "参加大型派对或社交活动后，你经常感到精疲力尽，需要“自我充电”。",
    dimension: "EI",
    direction: false,
  },

  // ================= S vs N (实感 vs 直觉) =================
  {
    id: 9,
    text: "你更关注当下具体的事实和实际状况，而不是未来的可能性和抽象理念。",
    dimension: "SN",
    direction: true, // Agree = S, Disagree = N
  },
  {
    id: 10,
    text: "你经常陷入对未知的想象、哲学命题或某种虚无飘渺、抽象的理论思考中。",
    dimension: "SN",
    direction: false, // Agree = N, Disagree = S
  },
  {
    id: 11,
    text: "在解决问题时，你倾向于采用积累过的成熟经验，而不是摸索新奇未见的方法。",
    dimension: "SN",
    direction: true,
  },
  {
    id: 12,
    text: "你很容易觉察到言外之意、双关隐喻，对文字或艺术背后的深意充满好奇。",
    dimension: "SN",
    direction: false,
  },
  {
    id: 13,
    text: "你喜欢把事情建立在具体、看得见摸得着的例子上，不太喜欢空泛的概念大纲。",
    dimension: "SN",
    direction: true,
  },
  {
    id: 14,
    text: "你容易被不循规蹈矩、大胆前卫、充满科幻或超前气息的灵感吸引。",
    dimension: "SN",
    direction: false,
  },
  {
    id: 15,
    text: "相比于天马行空的“创意大王”，你更喜欢跟行事脚踏实地的务实伙伴合作。",
    dimension: "SN",
    direction: true,
  },
  {
    id: 16,
    text: "你常常凭借脑中直觉或电光一闪的灵敏预感做决定，而不一味苦等实证证明。",
    dimension: "SN",
    direction: false,
  },

  // ================= T vs F (理性 vs 感性) =================
  {
    id: 17,
    text: "当朋友遇到困难时，你本能地倾向于帮他剖析原因解构问题，而非进行情感安慰。",
    dimension: "TF",
    direction: true, // Agree = T, Disagree = F
  },
  {
    id: 18,
    text: "你认为在与人交往中，“不伤人情面、多关照感受”比“实话实说、一针见血”重要得多。",
    dimension: "TF",
    direction: false, // Agree = F, Disagree = T
  },
  {
    id: 19,
    text: "理性的逻辑、数据分析和确凿的证据，对你的选择起着决定性作用，胜过个人喜恶。",
    dimension: "TF",
    direction: true,
  },
  {
    id: 20,
    text: "你天生具有强烈的同理心，看电影、听故事，或者看到旁人失落时极其容易感同身受。",
    dimension: "TF",
    direction: false,
  },
  {
    id: 21,
    text: "在辩论或决策中，为了确保决定完全公平和正确，不惜点破事实甚至破坏团队温情是值得的。",
    dimension: "TF",
    direction: true,
  },
  {
    id: 22,
    text: "你更看重一个人的包容、细腻和富有人情味，胜过他们逻辑上的无懈可击。",
    dimension: "TF",
    direction: false,
  },
  {
    id: 23,
    text: "你处理冲突时比较冷静，客观分明，少主观色彩，能迅速切断情绪扰动。",
    dimension: "TF",
    direction: true,
  },
  {
    id: 24,
    text: "如果不去考虑人性化的差异、情感顾虑与每个人复杂的处境，所谓“绝对理性”往往是冰冷有损的。",
    dimension: "TF",
    direction: false,
  },

  // ================= J vs P (独立 vs 随性) =================
  {
    id: 25,
    text: "每次长途出门或旅行前，你都会制定十分妥帖完好的日程单和待办列表，并以此为乐。",
    dimension: "JP",
    direction: true, // Agree = J, Disagree = P
  },
  {
    id: 26,
    text: "如果原定计划临时被打乱或有突发变化，你会感到无比兴奋，很快适应这种即兴发展。",
    dimension: "JP",
    direction: false, // Agree = P, Disagree = J
  },
  {
    id: 27,
    text: "你是一个收纳控，倾向于物归原处，希望周边的现实环境始终干干净净、富有条理。",
    dimension: "JP",
    direction: true,
  },
  {
    id: 28,
    text: "你排斥做那些把你定在线里的计划，留着随机应变的选择才能让你安稳舒适。",
    dimension: "JP",
    direction: false,
  },
  {
    id: 29,
    text: "你习惯把任务定好截止日期（Deadline），并分步推进，非常讨厌在最后一秒突击赶工。",
    dimension: "JP",
    direction: true,
  },
  {
    id: 30,
    text: "你的房间、桌面也许堆满了东西（乱中有序），但在你看来却格外有创造力和自我气息。",
    dimension: "JP",
    direction: false,
  },
  {
    id: 31,
    text: "完成一宗任务时，有一个明确的操作说明书或清晰的操作标准，能让你觉得特别踏实。",
    dimension: "JP",
    direction: true,
  },
  {
    id: 32,
    text: "你喜欢突如其来的灵感跃升，即使手上有一件正在进行的事，也忍不住去尝试有趣的岔路。",
    dimension: "JP",
    direction: false,
  },
];

// Group personalities by standard temperaments: Analysts (INTJ, INTP, ENTJ, ENTP), Diplomats (INFJ, INFP, ENFJ, ENFP), SJs (ISTJ, ISFJ, ESTJ, ESFJ), SPs (ISTP, ISFP, ESTP, ESFP)
export const PERSONALITY_MAP: { [key: string]: PersonalityDetails } = {
  // 分析家 (Analysts - 紫色系)
  INTJ: {
    type: 'INTJ',
    name: '建筑师',
    nickname: '富有想象力且极其敏锐的战略大师',
    badgeEmoji: '🧠',
    color: 'from-violet-600 to-indigo-700',
    bgGradient: 'bg-radial from-violet-50 via-slate-50 to-indigo-50/20 dark:from-violet-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['深度专注', '冷静低调'],
      SN: ['透视全局', '看破本质'],
      TF: ['逻辑至上', '意志决定'],
      JP: ['掌控周全', '秩序前瞻'],
    },
    summary: '建筑师型人格（INTJ）是十六型人格中最罕见且最具才智深度的类型之一。他们不仅是具有独立思想的策划者，更是执着于将愿景化为现实的战略工程师。他们有着极其高远的行事准则，崇尚实用理性，反感盲从权威，总是以一种冷眼审视宏观机制的独特姿态穿梭于世界的棋盘之上。',
    strengths: ['非凡的战略规划能力', '极致的求真精神与敏锐逻辑', '极度独立且坚定自我', '强大的问题解决与举一反三能力'],
    weaknesses: ['有时显得过分挑剔冷酷', '对不合逻辑的人际琐屑缺乏耐心', '社交直觉慢热甚至略带疏离', '高标准往往带来过度精神内耗'],
    careers: ['战略架构师', '高级软件工程师', '算法专家', '风险控制高管', '科研学者/理论物理家'],
    relationships: {
      matchingTypes: ['ENFP', 'ENTP', 'INFJ'],
      tips: [
        '试着向重要的人敞开一部分情感，脆弱并不是无能的体现。',
        '在沟通时多关注情绪连接，不要仅用对错、利弊来裁决一切困惑。',
        '放下随时都要规划指导一切的心态，拥抱伴侣带来的意外温存。'
      ]
    },
    famousPeople: [
      { name: '尼古拉·特斯拉', avatar: '⚡', description: '天才发明家，用意念建模的电气革命先驱。' },
      { name: '埃隆·马斯克', avatar: '🚀', description: '科技狂人，火星探索与颠覆式造车先锋。' },
      { name: '汉尼拔（历史映射）', avatar: '🗺️', description: '纵横捭阖的古代天才战术统帅。' },
    ]
  },
  INTP: {
    type: 'INTP',
    name: '逻辑学家',
    nickname: '专注于奇特概念并不断探索的求知狂客',
    badgeEmoji: '🔬',
    color: 'from-indigo-600 to-purple-700',
    bgGradient: 'bg-radial from-indigo-50 via-slate-50 to-sky-50/20 dark:from-indigo-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['大隐于市', '精神独活'],
      SN: ['捕捉抽象', '无垠猜想'],
      TF: ['逻辑纯粹', '剥离偏见'],
      JP: ['无限包容', '灵动探寻'],
    },
    summary: '逻辑学家型人格（INTP）是绝对真理和底层规律的狂热追求者。他们常年生活在自己构建的浩瀚思维模型之中，把思考当作毕生游戏。对他们而言，世界就像一个谜案，充斥着等待拆解与解构的底层公式。他们往往具有令人惊叹的原创思维与跳脱直觉。',
    strengths: ['极其强大的批判性思维', '超强的好奇心与钻研精神', '思维极其灵活，拒绝教条主义', '看问题视角独特，常有惊人洞察'],
    weaknesses: ['容易陷入“光想不做”的拖延黑洞', '不善于社交寒暄和敷衍表态', '有时在情绪交流中显得极为钝感', '极度容易从细节思考走偏到无聊争执中'],
    careers: ['独立软件开发', '理论数学家', '物理学家', '战略顾问专家', '游戏核心概念设计师'],
    relationships: {
      matchingTypes: ['ENTJ', 'ENFJ', 'INTJ'],
      tips: [
        '当伴侣伤心时，请记得紧紧抱住他，而不是去论证他悲伤的因果关系。',
        '把对未来的宏达想法翻译成现实生活小细节，与你爱的人共享。',
        '偶尔给生活加点确定的仪式感，它会让亲密关系变得格外鲜活不枯燥。'
      ]
    },
    famousPeople: [
      { name: '阿尔伯特·爱因斯坦', avatar: '🌌', description: '物理学巨匠，重塑时空尺度的究极逻辑学者。' },
      { name: '查尔斯·达尔文', avatar: '🌿', description: '进化论发现者，终身致力于大自然规律的观察。' },
      { name: '比尔·盖茨', avatar: '💻', description: '代码狂客，微软王国的严谨构筑者。' },
    ]
  },
  ENTJ: {
    type: 'ENTJ',
    name: '指挥官',
    nickname: '运筹帷幄、百折不挠的效率执掌者',
    badgeEmoji: '👑',
    color: 'from-violet-700 to-fuchsia-800',
    bgGradient: 'bg-radial from-purple-50 via-slate-50 to-pink-50/20 dark:from-purple-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['气场全开', '统合人心'],
      SN: ['透视远大', '聚焦大局'],
      TF: ['铁血理性', '效率剪裁'],
      JP: ['雷厉风行', '完美落地'],
    },
    summary: '指挥官型人格（ENTJ）是天生的掌舵者。他们散发着领袖的魅力和强大的气场，具有令人折服的整合能力和雄心壮志。他们绝不满足于安稳现状，总是能一针见血地洞察低效和混乱，并在脑中迅速整合出颠覆现有落后体制的完整布局。',
    strengths: ['无视困难的绝对意志力', '非凡的组织与多线程协调力', '自信非凡，天生的威严领导者', '目标至上，极佳的执行路线划分者'],
    weaknesses: ['极其缺乏耐性，特别是对效率低下者', '可能显得过于自负、独断及冷漠', '极度排斥看似软弱或毫无道理的小女生情绪', '行事过硬，极易在无形中刺痛伴侣'],
    careers: ['CEO/企业级创始人', '风险投资合伙人', '管理咨询总监', '顶尖大律师', '国家级战略统筹官'],
    relationships: {
      matchingTypes: ['INTP', 'INFP', 'INFJ'],
      tips: [
        '请提醒自己：亲密关系不是一个需要优化的KPI（绩效考核指标）。',
        '给爱人多一些主导的决策空间，在爱里面学会退让是智慧而非失败。',
        '深吸一口气，练习带着同理心倾听对方哪怕“不完美”的真实宣泄。'
      ]
    },
    famousPeople: [
      { name: '朱利叶斯·凯撒', avatar: '🏛️', description: '古罗马绝对统治者，帝国格局的强势拓荒者。' },
      { name: '撒切尔夫人', avatar: '🇬🇧', description: '铁娘子，雷厉风行的国际政治家。' },
      { name: '史蒂夫·乔布斯', avatar: '🍎', description: '极简美学统帅，以极苛刻要求定义智能时代。' },
    ]
  },
  ENTP: {
    type: 'ENTP',
    name: '辩论家',
    nickname: '思维敏捷非凡、永不疲惫的头脑风暴主',
    badgeEmoji: '🎤',
    color: 'from-fuchsia-600 to-indigo-600',
    bgGradient: 'bg-radial from-fuchsia-50 via-slate-50 to-indigo-50/20 dark:from-fuchsia-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['社牛风范', '挥洒创意'],
      SN: ['多维辐射', '打破陈规'],
      TF: ['严丝合缝', '解构旧理'],
      JP: ['游戏人间', '随遇通达'],
    },
    summary: '辩论家型人格（ENTP）是追求打破旧框架的淘气探路人。他们意志敏锐、反应奇快，有着永无止境的表达欲与打破陈见的好奇心。他们喜欢将生活中的常识、约定俗成的规章、权威的说辞当作可以推敲重组的游戏积木，无时无刻不在进行思想上的探索和实验。',
    strengths: ['惊人的举一反三与跨界联想力', '无与伦比的极佳幽默感和人格魅力', '对新事物高度开放、适应力极佳', '擅长在僵局中突发奇思突破死胡同'],
    weaknesses: ['喜欢跟人抬杠、争胜，常导致社交关系紧张', '特别容易三分钟热度，抗拒漫长无趣的手工落地', '有时行为跳脱，会被误认为没有担当或不负责任', '忽略别人的深切感受，常用逻辑解嘲他人痛苦'],
    careers: ['创业家', '创意营销大师', '电视媒体评论员', '产品规划总监', '智囊团顾问/脱口秀演员'],
    relationships: {
      matchingTypes: ['INFJ', 'INTJ', 'INFP'],
      tips: [
        '不是所有的分歧都需要一场你赢我输的辩论：爱需要“感同身受”而非“辩驳胜利”。',
        '当对方要你做一些琐碎的承诺时，尽量说到做到，不要总是寻找语言漏洞。',
        '享受静下来的两个人的时刻，不要总是在家里办脱口秀式头脑演习。'
      ]
    },
    famousPeople: [
      { name: '马克·吐温', avatar: '🖋️', description: '充满诙谐解嘲和机智思辨的现代文学顽童。' },
      { name: '理查德·费曼', avatar: '🥁', description: '风趣幽默的物理学家，喜欢捣鼓各种新奇事物。' },
      { name: '本杰明·富兰克林', avatar: '🪁', description: '身兼多项创造发明，对世界怀有无止境活力的博学家。' },
    ]
  },

  // 外交家 (Diplomats - 绿色系)
  INFJ: {
    type: 'INFJ',
    name: '提倡者',
    nickname: '思想深邃幽微、秉承绝对理想的精神领路人',
    badgeEmoji: '🕯️',
    color: 'from-emerald-600 to-teal-700',
    bgGradient: 'bg-radial from-emerald-50 via-slate-50 to-teal-50/20 dark:from-emerald-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['孤高灵魂', '默默关怀'],
      SN: ['预见直觉', '洞察本性'],
      TF: ['圣徒之爱', '温情慈悲'],
      JP: ['井然有序', '追求纯真'],
    },
    summary: '提倡者型人格（INFJ）是世界上最罕见的人格类型之一（人口占比不足1.5%）。他们深层而沉静，却散发着安静但极大的精神力量。他们不是空谈主义，而是拥有坚实底色、可以将心中利他愿景付诸扎实推进的“理想实践者”。他们极易穿透伪装，洞悉人的心智弱点与善良之处。',
    strengths: ['异乎寻常的心灵同情心与共情直觉', '坚实无比的个人内在信仰与底线', '极富感召力的内在表达与深度言辞', '擅长建立极为深沉、坦诚和有意义的关系'],
    weaknesses: ['容易因感知太多人世阴暗与不公而过分压抑', '不肯对外宣泄，可能在一瞬间发起决绝的“断交”(Door-Slam)', '极佳的完美主义导致自我精神过载', '不太懂跟繁杂的物质日常生活和解'],
    careers: ['心理咨询专家', '深度作家/小说家', '非政府组织负责人', '创意设计总监', '哲学家/宗教学家'],
    relationships: {
      matchingTypes: ['ENFP', 'ENTP', 'INTJ'],
      tips: [
        '对方并不能全知全能地读懂你的心思，试着卸下心防，明明白白说出你的需求。',
        '允许世界或伴侣有残缺和不完美，别为爱背负不属于你的痛苦十字架。',
        '学会定期放松思维、去大自然里沉浸式享受阳光美食等当下简单事物。'
      ]
    },
    famousPeople: [
      { name: '马丁·路德·金', avatar: '✊🏿', description: '黑人民权领袖，著名的《我有一个梦想》提倡者。' },
      { name: '歌德', avatar: '📜', description: '深具人文主义底色、探索人类心灵深度的大文豪。' },
      { name: '柏拉图', avatar: '🏛️', description: '古希腊精神世界理想国构筑先导哲学家。' },
    ]
  },
  INFP: {
    type: 'INFP',
    name: '调停者',
    nickname: '心思极其灵动、怀揣理想主义与悲悯的治愈者',
    badgeEmoji: '🧚',
    color: 'from-teal-500 to-emerald-600',
    bgGradient: 'bg-radial from-teal-50 via-slate-50 to-green-50/20 dark:from-teal-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['自得温柔', '灵魂自白'],
      SN: ['灵性狂想', '生命奥秘'],
      TF: ['纯真坚守', '无尽柔情'],
      JP: ['清幽漫步', '随遇而安'],
    },
    summary: '调停者型人格（INFP）是天生的诗人。他们心思温柔如泉，总是在喧嚣的世界中维持自己内心的一方净土。他们具有崇高的利他精神，极度看重价值观的内在和谐与心灵契合。他们对外界有着近乎艺术搬敏锐的痛觉与感知力，善于利用文字或艺术散播爱、温存与疗愈。',
    strengths: ['不可思议的极致共情力与善良情操', '对美、哲学与世界温润的极高艺术鉴赏力', '对喜欢的事物有着最纯粹的狂热劲头', '待人真诚无争，极易提供让人沉浸的舒适区'],
    weaknesses: ['由于过于理想主义而经常受到现实痛击并自怨自艾', '极其敏感，极容易把别人的无心评价当作刺而痛苦万分', '面对现实纷争和冷血规则表现出严重的回避和拖延', '情感过载时，精神容易崩溃失联甚至画地为牢'],
    careers: ['人文作家/诗人', '心理治愈师', '自由插画师', '艺术策展人', 'NGO爱心救助员'],
    relationships: {
      matchingTypes: ['ENFJ', 'ENTJ', 'ENFP'],
      tips: [
        '即使别人意见不同，也别草草把对方定义为不理解你或不爱你。',
        '在柴米油盐、琐杂账目等日常杂务上慢慢培养一些对细节和计划的承担能力。',
        '向亲人朋友讲出你的难过，不要一个人躲起来舔伤口。'
      ]
    },
    famousPeople: [
      { name: '威廉·莎士比亚', avatar: '🎭', description: '文艺复兴时期戏剧泰斗，其笔下写尽人类精神悲喜。' },
      { name: '梵高', avatar: '🌻', description: '灵魂狂热的艺术巨匠，画布充满瑰丽的情感呐喊。' },
      { name: 'J.K. 罗琳', avatar: '🪄', description: '《哈利波特》创作者，把纯真正义的幻想传给世间的治愈者。' },
    ]
  },
  ENFJ: {
    type: 'ENFJ',
    name: '主人公',
    nickname: '极有感召力且关怀众生的热忱领袖',
    badgeEmoji: '🌟',
    color: 'from-emerald-500 to-lime-600',
    bgGradient: 'bg-radial from-green-50 via-slate-50 to-lime-50/20 dark:from-green-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['核心磁场', '交游天涯'],
      SN: ['洞观未来', '胸怀社群'],
      TF: ['人道宽厚', '包容周全'],
      JP: ['井井有条', '指引光明'],
    },
    summary: '主人公型人格（ENFJ）是天生的追随者磁铁，也是极具责任感与无私精神的人间灯塔。他们极其擅于发掘每个个体的闪光点和最大潜力，在给大众传递能量和希望的同时，以高度的组织纪律性带领团队勇攀高峰。不管身在何处，他们总是在不遗余力地充当团队润滑剂。',
    strengths: ['非凡的社交感染力和演讲口才', '深度理解人性并散发本能的关怀', '超卓的组织统领力，总能统合复杂纠纷', '高度慷慨、真挚、言行一致'],
    weaknesses: ['太希望每个人都开心而往往弄丢了自我边界', '可能在无形中扮演保护大包大揽的越界家长', '过于敏感，为了迎合群体共鸣而委曲求全', '非常抗拒冲突，面对不公有时也容易产生救世主情结'],
    careers: ['高校教授/明星讲师', '心理咨询师', '公关战略公关总监', '社区民生组织者', '人力资源培训发展主理'],
    relationships: {
      matchingTypes: ['INFP', 'ISFP', 'INTP'],
      tips: [
        '不是每个人都需要你拯救：给伴侣做选择的自由，哪怕他们会犯错。',
        '在关照全世界前，请先把“爱”留一点给你自己疲惫的心。',
        '在冲突面前多采取客观清冷的态度，这并不妨碍你的善良和爱意。'
      ]
    },
    famousPeople: [
      { name: '奥普拉·温弗瑞', avatar: '🎙️', description: '著名脱口秀女王，用极强情感洞悉力感化千万人。' },
      { name: '巴拉克·奥巴马', avatar: '🇺🇸', description: '极具语言号召力和亲和感染力的现代政治领导。' },
      { name: '马哈特玛·甘地', avatar: '🕊️', description: '非暴力抵抗领袖，其坚信的大爱感召一国民族挺进。' },
    ]
  },
  ENFP: {
    type: 'ENFP',
    name: '竞选者',
    nickname: '满载阳光、无拘无束的宇宙创意发射器',
    badgeEmoji: '🦄',
    color: 'from-teal-600 to-indigo-500',
    bgGradient: 'bg-radial from-teal-50 via-slate-50 to-pink-50/20 dark:from-teal-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['阳光社交', '温暖全场'],
      SN: ['漫天遐思', '跨界联想'],
      TF: ['真诚共舞', '情感涌动'],
      JP: ['无拘无束', '随兴而动'],
    },
    summary: '竞选者型人格（ENFP）是生活这场嘉年华里永恒的快乐泉源和探索先锋。他们活力四射，双眼始终带着对一切未知趣味亮晶晶的期待。他们最讨厌一成不变、机械重复的教条束缚。对他们而言，世界不仅是一连串无趣生存要素，更是一个布满神秘巧思和情感狂欢的大森林。',
    strengths: ['无人能及的开阔艺术想象力与灵感', '待人赤诚、自来熟，极易打动别人', '充满元气与乐观，让死水微澜重焕生机', '对探索全新领域有着不加思索的极高热情'],
    weaknesses: ['严重缺乏对漫长枯燥事务的专注度和持续力', '因为人情过于充沛，极容易玻璃心受挫', '计划性奇差，往往留下一地虎头蛇尾的摊子', '总是需要寻找赞同，容易在社交欢闹中耗干能量'],
    careers: ['独立创意策划', '演员/文娱导演', '探险自媒体博主', '企业首席创意官（CCO）', '青年职业规划顾问'],
    relationships: {
      matchingTypes: ['INTJ', 'INFJ', 'INFP'],
      tips: [
        '当你脑中再次蹦出100个新好主意时，请先协助伴侣把手上的这一个平稳落地。',
        '在面对现实责任（如理财、家务计划）时，别总是试图用撒娇或玩笑揭过。',
        '给对方一些独处的私人寂静空间，偶尔的降温更能保障长足的新奇。'
      ]
    },
    famousPeople: [
      { name: '华特·迪士尼', avatar: '🐭', description: '造梦大师，给全球两代人带去奇境童真的乐园创始人。' },
      { name: '罗宾·威廉姆斯', avatar: '🤡', description: '著名喜剧巨星，用无比灿烂的笑容掩藏着极纤细敏感的诗意心灵。' },
      { name: '安妮·弗兰克', avatar: '📕', description: '《安妮日记》作者，在极端黑夜中依然守护着纯善微光的元气姑娘。' },
    ]
  },

  // 守护者 (Sentinels - 蓝色系)
  ISTJ: {
    type: 'ISTJ',
    name: '物流师',
    nickname: '恪尽职守、严谨自律、绝对靠谱的大后方保障',
    badgeEmoji: '📊',
    color: 'from-blue-600 to-slate-700',
    bgGradient: 'bg-radial from-blue-50 via-slate-50 to-sky-50/20 dark:from-blue-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['处变不惊', '缄默寡言'],
      SN: ['一丝不苟', '敬重事实'],
      TF: ['铁面执规', '绝对严谨'],
      JP: ['令行禁止', '条理分明'],
    },
    summary: '物流师型人格（ISTJ）是现代社会的定海神针和精密齿轮。他们脚踏实地、忠于职守，极度崇尚真理、传统和家庭责任感。对他们而言，遵守承诺不仅仅是做人的底线，更是在无秩序世界里保持内心尊严的最坚定法则，任何混乱和逃避责任的行为都在他们面前无从落脚。',
    strengths: ['无人能及的一丝不苟、极致靠谱度', '在重压下坚忍冷静，绝不轻言退避', '讲究实际、实事求是，重视历史实证', '超常的规律作息与有始有终的行事条理'],
    weaknesses: ['由于为人刻板生硬，常抗拒毫无经验的崭新变革', '对他人不合规矩的行为态度非常容易感到挑剔埋怨', '非常不擅处理抽象浪漫、或者黏黏糊糊的情感纠纷', '爱钻牛角尖，容易陷入繁琐的形式主义中'],
    careers: ['高级会计审计师', '军官/高级警官', '数据库运维高管', '质检安全检测总监', '法律判决与合规官'],
    relationships: {
      matchingTypes: ['ESFJ', 'ISFJ', 'ESTJ'],
      tips: [
        '不是所有的生活分歧都可以套用“规章制度”，爱是充满妥协的温度。',
        '多对伴侣表达鼓励和爱意，口香糖和默默洗碗不能代替一句“我爱你”。',
        '试着挑战一件没有任何行车计划和清单的“说走就走”周末出逃。'
      ]
    },
    famousPeople: [
      { name: '乔治·华盛顿', avatar: '🇺🇸', description: '首任美国总统，以坚定沉静、高贵的荣誉感树立合众国基石。' },
      { name: '英女王伊丽莎白二世', avatar: '👑', description: '克己坚忍、终其一生恪守誓言、稳立大局的女王。' },
      { name: '杰夫·贝佐斯', avatar: '📦', description: '亚马逊缔造者，以极致对准效率及数据定义现代电商物流网。' },
    ]
  },
  ISFJ: {
    type: 'ISFJ',
    name: '守护者',
    nickname: '温厚慈和、默默守护每一个身边的有心天使',
    badgeEmoji: '🛡️',
    color: 'from-sky-500 to-indigo-600',
    bgGradient: 'bg-radial from-sky-50 via-slate-50 to-indigo-50/20 dark:from-sky-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['春风化雨', '安静温柔'],
      SN: ['注重微毫', '历久弥坚'],
      TF: ['细腻体贴', '爱意充盈'],
      JP: ['勤勉守时', '安享本位'],
    },
    summary: '守护者型人格（ISFJ）是这个世界上最温厚和令人安心的安全防线。他们天生具有无与伦比的服务精神、包容心、卓越的记忆力及对微末小事的超常敏感度。他们很少在台前寻求聚光灯的炫耀，去争取什么显赫成就，而是选择在角落默默无闻地关爱、奉献他人，让家里和团队充满温馨。',
    strengths: ['极强的奉献和关怀精神，堪称无私伴侣', '过目不忘的细节记忆力（对纪念日如数家珍）', '极佳、靠谱的行政运作及动手收拾能力', '极其稳健忠实，对重要关系维护至上'],
    weaknesses: ['过度委曲求全以至于常常把不公憋出病来', '极抗拒突如其来的变化，适应速度极为慢热', '默默付出却因不善言辞自我推销，而常常被人功劳白漂', '因为太怕被别人嫌弃，而包揽大量分外工作陷入过载'],
    careers: ['医护总务/高级护士', '小学教师/早教主理', '高级行政事务经理', '档案图书管理员', '客户服务中心总监'],
    relationships: {
      matchingTypes: ['ESTJ', 'ESFJ', 'ISTJ'],
      tips: [
        '当你的好意遭到曲解或被无底线索取时，请一定要大声、严肃地说“不”。',
        '你的快乐对家庭同样无比重要，不要总把自己排在家庭照顾列表的最后一个。',
        '不要习惯默默积累怨气，给伴侣一个了解你真实小伤心的表达管道。'
      ]
    },
    famousPeople: [
      { name: '德兰修女', avatar: '🕊️', description: '贫民窟守护天使，毕生将仁爱温柔洒给被世人抛弃的苦难平民。' },
      { name: '凯特·米德尔顿', avatar: '🇬🇧', description: '优雅、敬职、深受民众倾心的英国王妃。' },
      { name: '罗莎·帕克斯', avatar: '🚌', description: '民权运动先锋，以柔克刚在公交车上不卑不亢坚定守护公理。' },
    ]
  },
  ESTJ: {
    type: 'ESTJ',
    name: '总经理',
    nickname: '威严可靠、恪守法度、极富效率的组织基准',
    badgeEmoji: '💼',
    color: 'from-blue-700 to-indigo-800',
    bgGradient: 'bg-radial from-slate-50 via-blue-50 to-indigo-50/20 dark:from-blue-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['执掌主舵', '呼风唤雨'],
      SN: ['注重事实', '结果导向'],
      TF: ['公事公办', '直白决断'],
      JP: ['秩序严明', '铁腕落地'],
    },
    summary: '总经理型人格（ESTJ）是秩序和诚信的坚决维护官。他们熟知社会各环节的动作要领，善于制定目标、规章制度来规范群体。不管在哪个行业，他们都是雷厉风行、极要强、视信誉如生命的卓越执行骨干。对于那些无组织无纪律的偷懒行为，他们从不轻易姑息。',
    strengths: ['卓越的群体资源组织与统筹分配才能', '高度讲诚信，言出必行，令人彻底放心', '极其勤奋务实，能将混乱的环境瞬间秩序化', '极佳的执行魄力，毫不拖泥带水妥协'],
    weaknesses: ['思想偏古早保守，对毫无定例的探索创意容易直接一棒子打死', '太过直接威严，容易被下属或伴侣指责“控制狂”', '极不愿承认自己在情绪感知、艺术感悟上的短板', '常把自己坚信的规章当做绝对唯一的真理去训导别人'],
    careers: ['高级运营总监', '警局长/安防主管', '法务审核合伙人', '财务管理主管', '大型工厂厂长'],
    relationships: {
      matchingTypes: ['ISFJ', 'ISTJ', 'ESFJ'],
      tips: [
        '把你的指令口吻换成温和的商量、请求：在家里，爱人的尊严大过所谓绝对正确。',
        '给创意、荒诞和跳脱一些温柔生存生长的阳光，并不是所有人都需要像机器人一样运转。',
        '试着跟伴侣一起去看看纯情电影吧，学着在对方哭泣时静静倾听递纸巾。'
      ]
    },
    famousPeople: [
      { name: '约翰·D·洛克菲勒', avatar: '🛢️', description: '石油巨子，帝国宏大财团规则制订典范。' },
      { name: '希拉里·克林顿', avatar: '🇺🇸', description: '雷厉风行、意志力如钢板、终身走在台前的一线政治高管。' },
      { name: '康利（历史硬汉）', avatar: '🎖️', description: '严丝合缝、对部曲管理一丝不苟的陆军将军。' },
    ]
  },
  ESFJ: {
    type: 'ESFJ',
    name: '执政官',
    nickname: '极有感召力、面面俱到的周到社交主人翁',
    badgeEmoji: '🤝',
    color: 'from-blue-500 to-sky-600',
    bgGradient: 'bg-radial from-sky-50 via-slate-50 to-blue-50/20 dark:from-sky-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['热情似火', '人群凝聚'],
      SN: ['落地关怀', '细润无声'],
      TF: ['体面和气', '共融取暖'],
      JP: ['安排妥当', '忠于团队'],
    },
    summary: '执政官型人格（ESFJ）是社会社交圈子里无可匹敌的绝对纽带。他们精力充沛、贴心备至，有着强烈的利他底色和奉献基因。他们习惯于精心策划节日团建、家族聚会，关照在场的每一个孤僻人员。他们最大的愿望是确保所有重要人群都能和谐相融、安康度日。',
    strengths: ['完美掌握一切聚会流程、无可挑剔的待客手段', '对团队信仰、传统家规有着无与伦比的自豪感', '贴心无匹，对朋友家人的危机第一个赶到现场出手相助', '极可靠，总是完美地将交代的事情按时干完'],
    weaknesses: ['特别在意别人背后的评价，极其容易遭受冷眼伤害', '在重大家规和思维模式上容易固步自封、害怕冒险', '如果不被需要、不被频繁感谢，他们很快就会感觉自我价值流失', '对崭新、异端、不按套路的伴侣行为表现得过度焦虑约束'],
    careers: ['资深人力资源总监', '金牌婚礼策划兼大管家', '高端大客户关系业务', '资深儿科/家庭医生', '学校教务校长'],
    relationships: {
      matchingTypes: ['ISTJ', 'ISFJ', 'ESTJ'],
      tips: [
        '不是所有人都有跟你一样的情商，当爱人没有回复你的热情时，别太快判定他不爱你了。',
        '多花一点时间探索你自己的精神世界：在孤岛般的一个人时光里，你又是谁？',
        '克制住你随时想替伴侣安排一切前程发展的关怀冲动，让他们去独立游历。'
      ]
    },
    famousPeople: [
      { name: '泰勒·斯威夫特', avatar: '🎸', description: '音乐流行天后，天才经营策划也是最宠粉丝的聚会纽带大师。' },
      { name: '詹妮弗·洛佩兹', avatar: '💃', description: '横跨多界且充满慷慨魅力、永远对熟人关爱备至的超级巨星。' },
      { name: '比尔·克林顿', avatar: '🎷', description: '具有极高情商、能轻易与各路陌生人打成一片的外交型政治家。' },
    ]
  },

  // 探险家 (Explorers - 黄/橙色系)
  ISTP: {
    type: 'ISTP',
    name: '鉴赏家',
    nickname: '特立独行、沉着冷酷的手工奇女子与奇男子',
    badgeEmoji: '🛠️',
    color: 'from-amber-600 to-orange-700',
    bgGradient: 'bg-radial from-amber-50 via-slate-50 to-orange-50/20 dark:from-amber-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['独行高手', '少说多干'],
      SN: ['手眼敏锐', '极客神韵'],
      TF: ['机械逻辑', '超常冷静'],
      JP: ['说走就走', '玩转当下'],
    },
    summary: '鉴赏家型人格（ISTP）是硬核、独立到骨子里的独行工匠。他们以无与伦比的现场手脑协调性、机械拆解直觉和冷静到不可思议的心理素质著称。他们极度排斥漫长的死记硬背和不切实际的玄奥理论，热衷于亲自动手拆装、操作复杂的世界运行硬件机制，随心而动、自由洒脱。',
    strengths: ['临危绝不慌张的顶级应急处理心态', '对机械、工具、电子设备的绝顶底层理解天赋', '极为高效、直接的问题解决效率', '适应力极其庞大，永不为日常焦虑所困扰'],
    weaknesses: ['在沟通交流里极其吝于口舌表达，常让人感觉是冷血一块', '极难被束缚和长久安定，害怕给承诺', '极其注重短期现世利益，缺乏长期、战略性人生布局', '可能会做极具生理威胁的危险项目，让伴侣担惊受怕'],
    careers: ['极限职业消防机师', '金牌外科手术主刀医生', '重车赛车手/特技机械工程师', '特种网络保卫安全技术专家', '户外探险荒野生存导师'],
    relationships: {
      matchingTypes: ['ESFP', 'ESTP', 'ISFP'],
      tips: [
        '陪伴爱人看心理剧和唠嗑不是“浪费时间”，那是他们在寻求你紧密连接的努力。',
        '离开和出走前，务必发条短信和爱人报平安：你的无音讯玩失踪会让爱你的人彻底抓狂。',
        '试着学习把你的技能（如修电器、下厨、手工小礼物）变成讨爱人欢心的小礼物。'
      ]
    },
    famousPeople: [
      { name: '吉米·哈迪森', avatar: '🔧', description: '顶级手工发明改造博主，拆卸一切旧设备的高人。' },
      { name: '克林特·伊斯特伍德', avatar: '🤠', description: '硬汉演员，不露声色、极简硬朗、用行动表达一切的态度先锋。' },
      { name: '迈克尔·乔丹', avatar: '🏀', description: '天才篮球之神，用极致肉体神经和冷静决战时刻定义运动神迹。' },
    ]
  },
  ISFP: {
    type: 'ISFP',
    name: '探险家',
    nickname: '满载艺术美感、随性漫游的深沉观察大师',
    badgeEmoji: '🎨',
    color: 'from-yellow-500 to-amber-600',
    bgGradient: 'bg-radial from-yellow-50 via-slate-50 to-amber-50/20 dark:from-yellow-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['寂静孤芳', '柔善似水'],
      SN: ['声色灵敏', '捕捉美学'],
      TF: ['忠于初衷', '内蓄温情'],
      JP: ['无拘无束', '信马由缰'],
    },
    summary: '探险家型人格（ISFP）是天生的视觉艺术家、生活美学家。哪怕他们最沉默、最低头，内心却始终铺满着五彩斑斓的艺术霓虹。他们有着异乎寻常的色彩感官、对细节美感的超常捕获，以及一颗决绝不想定义自己也决不在红尘妥协世俗规则的圣洁之心。',
    strengths: ['惊人的美学、色彩、乐感与潮流感知度', '极佳的温柔细腻心肠，让人如沐春风', '独立随性，绝不给周遭人施加控制压力', '行事充满灵性，常能创造惊艳艺术品'],
    weaknesses: ['几乎没有任何理财、时间管理的严苛概念', '极其敏感，在突如其来且态度粗糙的严厉批评面前会自闭破防', '一遇到冲突便会选择消极回避，装作若无其事然后心碎避逃', '抗拒长久的绑定约束，可能显得在生活规划上过于随风飘荡'],
    careers: ['明星发型彩妆艺术家', '独立服装/珠宝设计师', '原创唱作乐手', '景观园艺陈设大师', '美食美器时尚博主'],
    relationships: {
      matchingTypes: ['ENFJ', 'ESFJ', 'ESTJ'],
      tips: [
        '当伴侣就未来五年定居点或买房资产找你开会时，别逃避：那是他们在给长足爱筑基。',
        '勇敢把内心的艺术幻字、小诗分享给爱人，其实他很想知道你默默无言时的浩渺心路。',
        '学会面对批评而不立刻全盘否定自我：在对的地方，你也是发光的玉石。'
      ]
    },
    famousPeople: [
      { name: '迈克尔·杰克逊', avatar: '🕺', description: '天生乐感与反叛创变融于血液的流行音乐之王。' },
      { name: '弗里达·卡罗', avatar: '🌺', description: '墨西哥天才女画家，用尽毕生浓烈色彩勾画痛苦自白的书写大师。' },
      { name: '梅西', avatar: '⚽', description: '谦和内敛的足球之神，在球场上轻盈起舞，用极具灵性纯善的一生感动绿茵场。' },
    ]
  },
  ESTP: {
    type: 'ESTP',
    name: '企业家',
    nickname: '雷厉风行、极其英决的冒险执行王',
    badgeEmoji: '🏎️',
    color: 'from-orange-500 to-red-600',
    bgGradient: 'bg-radial from-orange-50 via-slate-50 to-red-50/20 dark:from-orange-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['魅力四射', '燃情全场'],
      SN: ['当机立断', '眼观六路'],
      TF: ['当场算盘', '解决痛点'],
      JP: ['出位即发', '随机应变'],
    },
    summary: '企业家型人格（ESTP）是十六型人格中最具感官冲击力、行动力最快的类型。他们活在当下，相信“与其理论扯皮，不如马上下手去干”。他们性格大大咧咧、勇敢有趣、观察力惊人，极擅长发掘当下的市场风口或直接痛点并在刹那间赚到钱，是天生的商战拼刺和实操硬核先锋。',
    strengths: ['无视高风险、坚信自己能当场破局的勇毅心志', '对当前一切风口、肉眼细节捕捉奇多奇快', '在谈判、商谈中极具口说感染力及实用利导本领', '乐天幽默，总能让人跟他们在一起玩得极其开怀'],
    weaknesses: ['行事完全没有前顾后虑，常留下重大后续漏子', '对深奥精神对话、文学情感细微敏感完全没有耐心，显得“粗神经”', '极易一时热血上头，在投资或玩乐中陷入重大消费黑空', '为了胜利和当下的爽快，有时可能会做出惊人的越界赌博行径'],
    careers: ['天使投资联合创始人', '顶尖大品牌销售总监', '应急救援队队长/特警指战员', '高端旅游地产大策划', '风险操盘行长'],
    relationships: {
      matchingTypes: ['ISTP', 'ISFP', 'ESTP'],
      tips: [
        '爱不只是带爱人去网红餐厅和体验极限运动，偶尔也需要坐下来倾听他们内心的孤寂与无助。',
        '试着尊重社会和伴侣的一些陈规束缚，有时候“按规矩来”能规避大量无端大灾。',
        '向爱人许诺时先深呼吸三十秒，想想这究竟是你当场的一时口快，还是当真可以落地的承诺。'
      ]
    },
    famousPeople: [
      { name: '唐纳德·特朗普', avatar: '🇺🇸', description: '高调随兴、天生掌握媒体聚光灯魅力的大亨与前元首。' },
      { name: '海明威', avatar: '🎣', description: '战地作家、远洋捕鱼与硬直面对厄运的硬汉文豪。' },
      { name: '麦当娜', avatar: '🎤', description: '用一生的百变出格、大胆破界向世人宣告独立野心的歌坛绝对女王。' },
    ]
  },
  ESFP: {
    type: 'ESFP',
    name: '表演者',
    nickname: '只要他们在场，就没有冷场的派对极乐天使',
    badgeEmoji: '🎉',
    color: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-radial from-amber-50 via-slate-50 to-pink-50/20 dark:from-amber-950/20 dark:via-neutral-900',
    dimensionStrengthLabels: {
      EI: ['光芒万丈', '笑看红尘'],
      SN: ['享尽声色', '即兴风采'],
      TF: ['共情交心', '温暖解忧'],
      JP: ['人生派对', '行乐当下'],
    },
    summary: '表演者型人格（ESFP）是集光芒、欢乐、温暖、即兴美于一身的人文宝贝。无论是唱歌跳舞还是随性闲聊，他们总能让周围的人感觉极度解压。他们极度大度且极具生活善意，无法忍受一丁点的冷战和长期的忧心忡忡。对他们而言，人生就是一出绚烂多彩的情感舞台剧，精彩不容等待。',
    strengths: ['惊人的社交感染天赋与对氛围一秒破冰的技巧', '极高的穿衣风向标及潮流品味', '心底温暖慷慨，对遇到困境的朋友会极速借款或上门安抚', '乐观开门，天塌下来也能找到当场乐子的自愈奇才'],
    weaknesses: ['特别反感探讨理论、深奥的职业规划，习惯拖延问题', '难以忍受来自任何人（哪怕是长辈建议）的直接否定性恶评，会瞬间丧气', '极差的专注持久度，很容易三天打鱼两天晒网', '常常是月光族或卡奴，在物质浮华面前抵抗力趋于零'],
    careers: ['演艺红星/全能艺人', '超金牌公关活动主持人', '资深高级形象管家', '新媒体娱乐制作人', '幼儿艺术启发创意教师'],
    relationships: {
      matchingTypes: ['ISTP', 'ISFP', 'ESTP'],
      tips: [
        '当伴侣表现出坏心情和悲观时，不要急着催他“开心起来”甚至以此为烦：允许对方悲伤也是长情所在。',
        '做一做实用的月度消费储蓄账单，不要总是用“活在当下赚多少花多少”来解套。',
        '在重要的伴侣诺言和共同未来大计上，拿出一点严肃的、甚至可以称之为拘谨的自律态度。'
      ]
    },
    famousPeople: [
      { name: '玛丽莲·梦露', avatar: '💋', description: '绝代性感尤物，充满天真浪漫情感，用极致微笑征服荧幕的精灵。' },
      { name: '埃尔维斯·普雷斯利', avatar: '🎸', description: '猫王，把无上肉身狂欢热舞与摇滚精神植入凡世的巨星。' },
      { name: '伊丽莎白·泰勒', avatar: '💎', description: '一生传奇，身伴无数珠宝与炽热情感，爱恨交织一生的表演巨匠。' },
    ]
  }
};
