export enum GameType {
  REACTION_TIME = 'reaction_time',
  SEQUENCE_MEMORY = 'sequence_memory',
  CHIMPANZEE_TEST = 'chimpanzee_test',
  NUMBER_MEMORY = 'number_memory',
  VERBAL_MEMORY = 'verbal_memory',
  AIM_TRAINER = 'aim_trainer',
  TYPING_TEST = 'typing_test'
}

export interface ScoreRecord {
  id: string;
  timestamp: number;
  score: number; // Numeric score
  unit: string;  // e.g., "ms", "级", "数字", "分", "WPM"
  details?: string; // Additional details (like accuracy)
}

export interface GameDef {
  id: GameType;
  name: string;
  englishName: string;
  description: string;
  icon: string; // lucide icon name
  scoringDesc: string; // Scoring instruction, e.g. "越低越好" or "越高越好"
  unit: string;
}

export const GAMES_LIST: GameDef[] = [
  {
    id: GameType.REACTION_TIME,
    name: "反应时间测试",
    englishName: "Reaction Time",
    description: "点击屏幕从红色变为绿色的那一瞬间。测试你的纯粹神经反应反射速度。",
    icon: "Zap",
    scoringDesc: "反应用时 (越低越好)",
    unit: "ms"
  },
  {
    id: GameType.SEQUENCE_MEMORY,
    name: "闪烁序列记忆",
    englishName: "Sequence Memory",
    description: "记住网格中方块亮起的闪烁顺序。每一关卡会增加一个新步骤，测试你的短期顺向记忆能力。",
    icon: "Grid",
    scoringDesc: "通关层数 (越高越好)",
    unit: "阶"
  },
  {
    id: GameType.CHIMPANZEE_TEST,
    name: "黑猩猩记忆测试",
    englishName: "Chimpanzee Test",
    description: "瞬时记住被遮挡前网格中的数字顺序。从1到N依次点击。测试你的空间与瞬时图像认知能力。",
    icon: "Layers",
    scoringDesc: "最大击破数字 (越高越好)",
    unit: "个"
  },
  {
    id: GameType.NUMBER_MEMORY,
    name: "数字长短记忆",
    englishName: "Number Memory",
    description: "记住屏幕上不断变长的数字并重新输入。测试你的工作记忆上限与数字保持力。",
    icon: "Hash",
    scoringDesc: "记忆数字长度 (越高越好)",
    unit: "位"
  },
  {
    id: GameType.VERBAL_MEMORY,
    name: "词汇认知容量",
    englishName: "Verbal Memory",
    description: "测试你能在脑中保持追踪多少个单词。判断显示的单词是“新词 (NEW)”还是你刚才“见过的词 (SEEN)”。",
    icon: "BookOpen",
    scoringDesc: "连续认对词汇数 (越高越好)",
    unit: "分"
  },
  {
    id: GameType.AIM_TRAINER,
    name: "瞄准器靶子训练",
    englishName: "Aim Trainer",
    description: "快速精准地点击屏幕上随机冒出的 30 个标靶。测试你的手脑协调性、鼠标/触屏精准度与反应时间。",
    icon: "Target",
    scoringDesc: "平均单次点击用时 (越低越好)",
    unit: "ms"
  },
  {
    id: GameType.TYPING_TEST,
    name: "键盘打字测试",
    englishName: "Typing Test",
    description: "在限定段落中完成键盘高速准确输入。测试你的键盘肌肉记忆以及文字输出速度。",
    icon: "FileText",
    scoringDesc: "每分钟输入字数 (WPM，越高越好)",
    unit: "WPM"
  }
];
