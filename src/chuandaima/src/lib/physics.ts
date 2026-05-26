// Unclassified, standard scaling laws for educational purposes.
// References: "The Effects of Nuclear Weapons" by Samuel Glasstone and Philip J. Dolan (1977).

export type TerrainType = 'plains' | 'mountains' | 'urban';
export type WeatherType = 'clear' | 'overcast' | 'rain';

export interface NukeParams {
  yieldKt: number; // Yield in kilotons
  burstHeightMeters: number; // Height of burst
  isAirburst: boolean;
  isNeutronBomb?: boolean;
  terrain?: TerrainType;
  weather?: WeatherType;
  pressureKPa?: number;
}

export interface EffectsRadii {
  // Blast
  blast3000psi: number; // 3,000 psi (destroy missile silos)
  blast200psi: number; // 200 psi (extreme damage)
  blast20psi: number; // 20 psi (heavy damage)
  blast5psi: number; // 5 psi overpressure (moderate damage)
  blast1psi: number; // 1 psi overpressure (light damage)
  
  // Thermal
  thermalThirdDegree100: number; // 3rd degree burns (100% prob)
  thermalThirdDegree50: number; // 3rd degree burns (50% prob)
  thermalSecondDegree50: number; // 2nd degree burns (50% prob)
  thermalFirstDegree50: number; // 1st degree burns (50% prob)
  thermalNoHarm: number; // Minimum radius for 100% prob of no burn
  thermalWoodIgnition: number; // Dry wood ignites (35 cal/cm2)

  // Radiation
  radiation5000rem: number; // 5000 rem (100% mortality)
  radiation1000rem: number; // 1000 rem (95% medical mortality)
  radiation600rem: number; // 600 rem (80% medical mortality)
  radiation500rem: number; // 500 rem acute dose (50-90% medical mortality)
  radiation100rem: number; // 100 rem (sickness, lifetime cancer risk)
  
  // Other
  fireball: number; // Immediate fireball radius
}

// Approximate scaling laws for surface burst
// R = C * W^0.33 (for blast and fireball, approx)
// Thermal scales differently, radiation scales logarithmically

export function calculateEffects(params: NukeParams): EffectsRadii {
  const w = params.yieldKt;
  const wThird = Math.pow(w, 0.333333);
  const isNeutron = params.isNeutronBomb === true;
  const terrain = params.terrain || 'plains';
  const weather = params.weather || 'clear';
  const pressure = params.pressureKPa || 101.3;
  
  // Modifiers
  let blastMod = 1.0;
  let thermalMod = 1.0;
  let radMod = 1.0;

  // Neutron bomb characteristic modifiers
  if (isNeutron) {
      blastMod *= 0.4;
      thermalMod *= 0.5;
      radMod *= 5.0; // Vastly increased initial radiation
  }

  // Terrain modifiers
  if (terrain === 'mountains') {
      blastMod *= 0.8; // Blocked by terrain
      thermalMod *= 0.7; // Shadowing
  } else if (terrain === 'urban') {
      blastMod *= 0.9; // Absorbed by buildings
      thermalMod *= 0.8; // Shadowing
  }

  // Weather modifiers
  if (weather === 'overcast') {
      thermalMod *= 0.7; // Scattered by clouds
  } else if (weather === 'rain') {
      thermalMod *= 0.5; // Absorbed by water
      radMod *= 1.1; // Rainout effect increases local fallout/radiation exposure
  }

  // Pressure modifier (blast radius ~ (P0/P)^(1/3))
  const pressureMod = Math.pow(101.3 / pressure, 0.333333);
  blastMod *= pressureMod;

  
  // Fireball radius (meters). Roughly 145 * W^0.4 (surface)
  const fireballRadius = w > 0 ? 145 * Math.pow(w, 0.4) : 0;
  
  // Blast scaling approx
  // These are very rough approximate scaling lines based on general laws rather than exact Glasstone data tables.
  const blast3000psiRadius = w > 0 ? 25 * wThird * (params.isAirburst ? 1.0 : 1.0) * blastMod : 0; // highly dependent on cratoring
  const blast200psiRadius = w > 0 ? 120 * wThird * (params.isAirburst ? 1.1 : 1.0) * blastMod : 0;
  const blast20psiRadius = w > 0 ? 300 * wThird * (params.isAirburst ? 1.2 : 1.0) * blastMod : 0;
  const blast5psiRadius = w > 0 ? 581 * wThird * (params.isAirburst ? 1.3 : 1.0) * blastMod : 0;
  const blast1psiRadius = w > 0 ? 1302 * wThird * (params.isAirburst ? 1.3 : 1.0) * blastMod : 0;
  
  // Thermal scaling approx
  const thermalThirdDegree100 = w > 0 ? 650 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;
  const thermalThirdDegree50 = w > 0 ? 597 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;
  const thermalSecondDegree50 = w > 0 ? 800 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;
  const thermalFirstDegree50 = w > 0 ? 1000 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;
  const thermalNoHarm = w > 0 ? 1200 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;
  const thermalWoodIgnition = w > 0 ? 400 * Math.pow(w, 0.4) * (params.isAirburst ? 1.2 : 1.0) * thermalMod : 0;

  // Radiation scaling approx
  const radiation5000remRadius = w > 0 ? 300 * Math.pow(w, 0.2) * radMod : 0;
  const radiation1000remRadius = w > 0 ? 500 * Math.pow(w, 0.2) * radMod : 0;
  const radiation600remRadius = w > 0 ? 650 * Math.pow(w, 0.2) * radMod : 0;
  const radiation500remRadius = w > 0 ? 800 * Math.pow(w, 0.2) * radMod : 0;
  const radiation100remRadius = w > 0 ? 1200 * Math.pow(w, 0.2) * radMod : 0;
  
  return {
    blast3000psi: blast3000psiRadius,
    blast200psi: blast200psiRadius,
    blast20psi: blast20psiRadius,
    blast5psi: blast5psiRadius,
    blast1psi: blast1psiRadius,

    thermalThirdDegree100,
    thermalThirdDegree50,
    thermalSecondDegree50,
    thermalFirstDegree50,
    thermalNoHarm,
    thermalWoodIgnition,

    radiation5000rem: Math.max(fireballRadius, radiation5000remRadius),
    radiation1000rem: Math.max(fireballRadius, radiation1000remRadius),
    radiation600rem: Math.max(fireballRadius, radiation600remRadius),
    radiation500rem: Math.max(fireballRadius, radiation500remRadius),
    radiation100rem: Math.max(fireballRadius, radiation100remRadius),

    fireball: fireballRadius,
  };
}

// Rough casualty estimation based on uniform population density
export function estimateCasualties(effects: EffectsRadii, populationDensityPerSqKm: number, terrain?: TerrainType) {
    if (populationDensityPerSqKm <= 0) return { fatalities: 0, injuries: 0 };

    // Fatality zone ~ 5psi + thermal + heavy radiation
    const fatalityRadiusKm = Math.max(effects.blast5psi, effects.thermalThirdDegree50, effects.radiation500rem) / 1000;
    const fatalityArea = Math.PI * Math.pow(fatalityRadiusKm, 2);
    
    // Injury zone ~ 1psi
    const injuryRadiusKm = effects.blast1psi / 1000;
    const injuryArea = Math.PI * Math.pow(injuryRadiusKm, 2) - fatalityArea;

    let fatalityRate = 0.8;
    let injuryRate = 0.4;

    // Urban environment causes more casualties due to flying glass/collapsing buildings
    if (terrain === 'urban') {
        fatalityRate = 0.9;
        injuryRate = 0.6;
    }

    return {
        fatalities: Math.round(fatalityArea * populationDensityPerSqKm * fatalityRate), 
        injuries: Math.round(Math.max(0, injuryArea) * populationDensityPerSqKm * injuryRate) 
    };
}

export function estimateCrater(yieldKt: number, isAirburst: boolean, terrain?: TerrainType) {
    if (isAirburst || yieldKt <= 0) return { radius: 0, depth: 0 };
    // Very rough scaling, W in kt (W^0.3 for dry soil)
    // ~ 100m radius, 30m depth for 1MT (1000kt)
    // 100 / 1000^0.3 = 100 / 7.94 = 12.5
    // 30 / 1000^0.3 = 30 / 7.94 = 3.7
    let craterMod = 1.0;
    if (terrain === 'urban') craterMod = 0.9; // Harder surfaces
    if (terrain === 'mountains') craterMod = 0.8;

    return {
        radius: 12.5 * Math.pow(yieldKt, 0.3) * craterMod,
        depth: 3.7 * Math.pow(yieldKt, 0.3) * craterMod
    }
}

export interface Preset {
    name: string;
    description: string;
    yieldKt: number;
    isAirburst: boolean;
    isNeutronBomb?: boolean;
}

export const PRESETS: Preset[] = [
    { name: "戴维·克罗克特", description: "最小的美国弹头", yieldKt: 0.02, isAirburst: true },
    { name: "粗制核恐怖武器", description: "简单的核恐怖设施", yieldKt: 0.1, isAirburst: false },
    { name: "B-61 Mod 3", description: "目前美国武库最低当量", yieldKt: 0.3, isAirburst: true },
    { name: "2006年朝鲜核试验", description: "2006年测试的朝鲜武器", yieldKt: 0.5, isAirburst: false },
    { name: "2009年朝鲜核试验", description: "2009年测试的朝鲜武器", yieldKt: 6, isAirburst: false },
    { name: "2013年朝鲜核试验", description: "2013年测试的朝鲜武器", yieldKt: 10, isAirburst: false },
    { name: "简易HEU设备", description: "基于高浓缩铀的简易核恐怖主义设备", yieldKt: 10, isAirburst: false },
    { name: "小男孩 (广岛原子弹)", description: "二战广岛原子弹", yieldKt: 15, isAirburst: true },
    { name: "小工具 (三位一体)", description: "人类第一次核试验 (Trinity)", yieldKt: 20, isAirburst: true },
    { name: "胖子 (长崎原子弹)", description: "二战长崎原子弹", yieldKt: 20, isAirburst: true },
    { name: "巴基斯坦最大核试验", description: "巴基斯坦最大的武器测试", yieldKt: 45, isAirburst: false },
    { name: "印度最大核试验", description: "最大的印度武器测试", yieldKt: 60, isAirburst: false },
    { name: "W-76 (三叉戟)", description: "在美英SLBM武器库中常见", yieldKt: 100, isAirburst: true },
    { name: "2017年朝鲜核试验", description: "2017年测试的朝鲜武器", yieldKt: 150, isAirburst: false },
    { name: "W-80 (巡航导弹)", description: "目前在美国武库（巡航导弹）", yieldKt: 150, isAirburst: true },
    { name: "W-87 (民兵 III)", description: "目前在美国武库 (民兵 III)", yieldKt: 300, isAirburst: true },
    { name: "TN 80/81", description: "目前最大的法国弹头", yieldKt: 300, isAirburst: true },
    { name: "B-61 Mod 7", description: "目前在美国武器库", yieldKt: 340, isAirburst: true },
    { name: "W-78 (民兵 III)", description: "目前在美国武器库 (民兵 III)", yieldKt: 350, isAirburst: true },
    { name: "W-88 (三叉戟 D5)", description: "三叉戟D5弹头", yieldKt: 455, isAirburst: true },
    { name: "常春藤王 (Ivy King)", description: "美国测试的最大纯裂变武器", yieldKt: 500, isAirburst: true },
    { name: "白杨 SS-25 (Topol)", description: "目前在俄罗斯武库中", yieldKt: 800, isAirburst: true },
    { name: "W-59", description: "民兵 I 弹头", yieldKt: 1000, isAirburst: true },
    { name: "B-83", description: "目前美国武器库中最大的炸弹", yieldKt: 1200, isAirburst: true },
    { name: "R-12 SS-4", description: "古巴导弹危机中的苏联导弹", yieldKt: 2420, isAirburst: true },
    { name: "东风-4C", description: "中国第一枚部署的洲际弹道导弹", yieldKt: 3300, isAirburst: true },
    { name: "W-39", description: "美国H型炸弹，1961年差点意外引爆", yieldKt: 4000, isAirburst: true },
    { name: "东风-5C", description: "中国目前的洲际弹道导弹", yieldKt: 5000, isAirburst: true },
    { name: "W-53 (泰坦 II)", description: "美国部署的最高当量洲际弹道导弹", yieldKt: 9000, isAirburst: true },
    { name: "常春藤迈克 (Ivy Mike)", description: "第一颗H型引爆试验 (热核武器)", yieldKt: 10400, isAirburst: false },
    { name: "布拉沃城堡 (Castle Bravo)", description: "美国最大当量的核炸弹测试", yieldKt: 15000, isAirburst: false },
    { name: "沙皇炸弹 (测试版量)", description: "苏联最大的炸弹测试 (验证版)", yieldKt: 50000, isAirburst: true },
    { name: "沙皇炸弹 (设计当量)", description: "苏联最大的炸弹设计原案", yieldKt: 100000, isAirburst: true }
];
