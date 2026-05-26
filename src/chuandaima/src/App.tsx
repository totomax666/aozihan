import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, useMapEvents, Marker, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { calculateEffects, estimateCasualties, estimateCrater, PRESETS, TerrainType, WeatherType, Preset } from './lib/physics';
import { Crosshair, Settings, Info, Map as MapIcon, RotateCcw, History, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from './lib/utils';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const isLocationInChina = (lat: number, lng: number) => {
  return lat >= 15 && lat <= 54 && lng >= 73 && lng <= 135;
};

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 3000; 

    // Reset display value when value changes
    setDisplayValue(0);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeProgress = progress < 0.5 
        ? 16 * Math.pow(progress, 5) 
        : 1 - Math.pow(-2 * progress + 2, 5) / 2;
      
      setDisplayValue(Math.floor(value * easeProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
}

function LocationMarker({ position, setPosition }: { position: LatLngTuple | null, setPosition: (p: LatLngTuple) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function MapUpdater({ center }: { center: LatLngTuple | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

const LOCATION_PRESETS: { category: string; locations: { name: string; position: LatLngTuple; popDensity: number }[] }[] = [
    {
        category: "主要城市",
        locations: [
            { name: "华盛顿特区，美国", position: [38.8951, -77.0364], popDensity: 4200 },
            { name: "纽约，美国", position: [40.7128, -74.0060], popDensity: 11000 },
            { name: "波士顿，马萨诸塞州，美国", position: [42.3601, -71.0589], popDensity: 5500 },
            { name: "洛杉矶，加利福尼亚州，美国", position: [34.0522, -118.2437], popDensity: 3300 },
            { name: "旧金山，加利福尼亚州，美国", position: [37.7749, -122.4194], popDensity: 7200 },
            { name: "芝加哥，伊利诺伊州，美国", position: [41.8781, -87.6298], popDensity: 4600 },
            { name: "费城，宾夕法尼亚州，美国", position: [39.9526, -75.1652], popDensity: 4600 },
            { name: "檀香山，夏威夷，美国", position: [21.3069, -157.8583], popDensity: 2300 },
            { name: "莫斯科，俄罗斯", position: [55.7558, 37.6173], popDensity: 5000 },
            { name: "伦敦，英国", position: [51.5074, -0.1278], popDensity: 5700 },
            { name: "巴黎，法国", position: [48.8566, 2.3522], popDensity: 20000 },
            { name: "柏林，德国", position: [52.5200, 13.4050], popDensity: 4200 },
            { name: "新德里，印度", position: [28.6139, 77.2090], popDensity: 11300 },
            { name: "伊斯兰堡，巴基斯坦", position: [33.6844, 73.0479], popDensity: 1200 },
            { name: "东京，日本", position: [35.6762, 139.6503], popDensity: 6300 },
            { name: "平壤，朝鲜", position: [39.0392, 125.7625], popDensity: 2000 },
            { name: "首尔，韩国", position: [37.5665, 126.9780], popDensity: 15600 },
            { name: "特拉维夫，以色列", position: [32.0853, 34.7818], popDensity: 8500 }
        ]
    },
    {
        category: "历史遗址",
        locations: [
            { name: "三一遗址，新墨西哥州，美国 (1945)", position: [33.6773, -106.4754], popDensity: 0 },
            { name: "广岛，日本 (1945)", position: [34.3853, 132.4553], popDensity: 4000 },
            { name: "长崎，日本 (1945)", position: [32.7503, 129.8779], popDensity: 2000 },
            { name: "埃鲁吉拉布岛，埃尼威托克，马绍尔群岛 (1952)", position: [11.6667, 162.1872], popDensity: 0 },
            { name: "纳姆岛，比基尼环礁，马绍尔群岛 (1954)", position: [11.6972, 165.3136], popDensity: 0 },
            { name: "轿车火山口，内华达州测试点，美国 (1962)", position: [37.1769, -116.0461], popDensity: 0 },
            { name: "沙皇炸弹测试场，新地岛，俄罗斯 (1961)", position: [73.8058, 54.5975], popDensity: 0 }
        ]
    }
];

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
}

interface HistoryRecord {
    id: string;
    timestamp: number;
    presetName: string;
    position: LatLngTuple;
    yieldKt: number;
    isAirburst: boolean;
    isNeutronBomb: boolean;
    terrain: TerrainType;
    weather: WeatherType;
    fatalities: number;
    injuries: number;
    craterRadius: number;
}

interface ActiveDetonation {
    id: string;
    position: LatLngTuple;
    effects: any;
    casualties: { fatalities: number; injuries: number };
    crater: { radius: number; depth: number; volume: number };
    isIntercepted: boolean;
}

const terrainMap: Record<TerrainType, string> = { plains: '平原', urban: '城市', mountains: '山区' };
const weatherMap: Record<WeatherType, string> = { clear: '晴天', overcast: '阴天', rain: '雨天' };

export default function App() {
  const [position, setPosition] = useState<LatLngTuple | null>([40.7128, -74.0060]); // NYC default
  const [yieldStr, setYieldStr] = useState<string>("100");
  const [isAirburst, setIsAirburst] = useState<boolean>(true);
  const [hasDetonated, setHasDetonated] = useState<boolean>(false);
  const [popDensity, setPopDensity] = useState<number>(10000); // Dynamic population density
  
  // New features
  const [isNeutronBomb, setIsNeutronBomb] = useState<boolean>(false);
  const terrain: TerrainType = 'plains';
  const [weather, setWeather] = useState<WeatherType>('clear');
  const [pressureStr, setPressureStr] = useState<string>("101.3");
  const [presetName, setPresetName] = useState<string>("自定义");
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);
  const [showInterceptModal, setShowInterceptModal] = useState<boolean>(false);
  const [activeDetonations, setActiveDetonations] = useState<ActiveDetonation[]>([]);

  // Advanced toggles
  const [showBlast3000, setShowBlast3000] = useState<boolean>(false);
  const [showBlast200, setShowBlast200] = useState<boolean>(false);
  const [showBlast20, setShowBlast20] = useState<boolean>(false);
  const [showBlast5, setShowBlast5] = useState<boolean>(true);
  const [showBlast1, setShowBlast1] = useState<boolean>(true);

  const [showRad5000, setShowRad5000] = useState<boolean>(false);
  const [showRad1000, setShowRad1000] = useState<boolean>(false);
  const [showRad600, setShowRad600] = useState<boolean>(false);
  const [showRad500, setShowRad500] = useState<boolean>(true);
  const [showRad100, setShowRad100] = useState<boolean>(false);

  const [showTherm3rd100, setShowTherm3rd100] = useState<boolean>(false);
  const [showTherm3rd50, setShowTherm3rd50] = useState<boolean>(true);
  const [showTherm2nd50, setShowTherm2nd50] = useState<boolean>(false);
  const [showTherm1st50, setShowTherm1st50] = useState<boolean>(false);
  const [showThermNoHarm, setShowThermNoHarm] = useState<boolean>(false);
  const [showThermWood, setShowThermWood] = useState<boolean>(false);
  
  const [showFireball, setShowFireball] = useState<boolean>(true);

  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatsMobile, setShowStatsMobile] = useState(false);

  const [mapCenter, setMapCenter] = useState<LatLngTuple | null>([40.7128, -74.0060]);
  const [searchLocation, setSearchLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchLocation = async () => {
      if (!searchLocation) return;
      setIsSearching(true);
      try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchLocation)}&format=json&limit=1`);
          const data = await res.json();
          if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              setPosition([lat, lon]);
              setMapCenter([lat, lon]);
              setHasDetonated(false);
          } else {
              alert("未找到该位置，请尝试其他关键词。");
          }
      } catch (e) {
           console.error("Search failed", e);
           alert("搜索失败，请检查网络或稍后重试。");
      } finally {
          setIsSearching(false);
      }
  };

  useEffect(() => {
    if (!position) return;
    const [lat, lon] = position;
    
    // Check closest preset
    let minDistance = Infinity;
    let closestDensity = 3000;
    for (const group of LOCATION_PRESETS) {
        for (const loc of group.locations) {
            const d = getDistanceKm(lat, lon, loc.position[0], loc.position[1]);
            if (d < minDistance) {
                minDistance = d;
                closestDensity = loc.popDensity;
            }
        }
    }
    
    if (minDistance < 50) {
        setPopDensity(closestDensity);
        return;
    }

    // Default fallback, try simple API estimation asynchronously
    setPopDensity(3000); 
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.address) {
            if (data.address.city || data.address.town) setPopDensity(5000);
            else if (data.address.suburb || data.address.neighbourhood) setPopDensity(8000);
            else if (data.address.village) setPopDensity(1000);
            else setPopDensity(50); // Rural
        }
      })
      .catch(() => {});

  }, [position]);

  const yieldKt = parseFloat(yieldStr) || 0;
  const pressure = parseFloat(pressureStr) || 101.3;

  const effects = useMemo(() => {
    return calculateEffects({ 
      yieldKt, 
      burstHeightMeters: 0, 
      isAirburst, 
      isNeutronBomb, 
      terrain, 
      weather, 
      pressureKPa: pressure 
    });
  }, [yieldKt, isAirburst, isNeutronBomb, terrain, weather, pressure]);

  const stats = useMemo(() => {
    if (activeDetonations.length === 0) return null;
    
    let fatalities = 0;
    let injuries = 0;
    activeDetonations.forEach(d => {
      fatalities += d.casualties.fatalities;
      injuries += d.casualties.injuries;
    });

    const latest = activeDetonations[activeDetonations.length - 1];
    
    return { 
      fatalities, 
      injuries, 
      crater: latest.crater 
    };
  }, [activeDetonations]);

  const handleDetonate = () => {
    if (yieldKt > 0 && position) {
      const intercepted = isLocationInChina(position[0], position[1]);
      setIsIntercepted(intercepted);
      setShowInterceptModal(intercepted);
      setHasDetonated(true);
      
      const currentEff = calculateEffects({ yieldKt, burstHeightMeters: 0, isAirburst, isNeutronBomb, terrain, weather, pressureKPa: pressure });
      const currentCas = intercepted ? { fatalities: 0, injuries: 0 } : estimateCasualties(currentEff, popDensity, terrain);
      const currentCrater = intercepted ? { radius: 0, depth: 0, volume: 0 } : estimateCrater(yieldKt, isAirburst, terrain);

      const newDetonation: ActiveDetonation = {
        id: Date.now().toString() + Math.random(),
        position,
        effects: currentEff,
        casualties: currentCas,
        crater: currentCrater,
        isIntercepted: intercepted
      };
      setActiveDetonations(prev => [...prev, newDetonation]);

      const newRecord: HistoryRecord = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          presetName: presetName || '自定义',
          position,
          yieldKt,
          isAirburst,
          isNeutronBomb,
          terrain,
          weather,
          fatalities: currentCas.fatalities,
          injuries: currentCas.injuries,
          craterRadius: currentCrater.radius
      };

      setHistory(prev => [newRecord, ...prev]);
    }
  };

  const handleReset = () => {
    setHasDetonated(false);
    setIsIntercepted(false);
    setShowInterceptModal(false);
    setActiveDetonations([]);
  };

  const handleSetPreset = (p: Preset) => {
      setYieldStr(p.yieldKt.toString());
      setIsAirburst(p.isAirburst);
      setIsNeutronBomb(!!p.isNeutronBomb);
      setPresetName(p.name);
      setHasDetonated(false);
  }

  const handleDeleteHistory = (id: string) => {
      setHistory(prev => prev.filter(r => r.id !== id));
  };

  const filteredHistory = history.filter(h => 
      h.presetName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      h.yieldKt.toString().includes(searchQuery)
  );

  return (
    <div className="w-full h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans relative flex-col md:flex-row">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

      {/* Left Sidebar: Controls */}
      <aside className="w-full md:w-[350px] h-[50vh] md:h-full bg-white/5 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/10 p-4 md:p-6 flex flex-col z-10 shrink-0 overflow-y-auto custom-scrollbar relative order-2 md:order-1">
        <div className="mb-6 flex justify-between items-start shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">核爆模拟器 PRO</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">战略级毁伤效果模拟系统 v4.3</p>
          </div>
          <button 
             onClick={() => setIsHistoryOpen(true)}
             className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
             title="模拟历史记录"
          >
            <History className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
          {/* Location */}
          <section>
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 block">目标位置</label>
            <select 
                onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    const [lat, lng] = val.split(',').map(Number);
                    setPosition([lat, lng]);
                    setMapCenter([lat, lng]);
                    setHasDetonated(false);
                }}
                className="bg-white/10 border border-white/10 text-xs p-2 rounded-lg outline-none w-full text-slate-300 [&>option]:bg-slate-800 mb-2 transition-colors focus:border-orange-500/50"
                defaultValue=""
            >
                <option value="" disabled>选择预设城市...</option>
                {LOCATION_PRESETS.map(category => (
                    <optgroup key={category.category} label={category.category}>
                        {category.locations.map(loc => (
                            <option key={loc.name} value={`${loc.position[0]},${loc.position[1]}`}>
                                {loc.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
            <div className="flex gap-2">
                <input 
                    type="text"
                    placeholder="或输入具体位置..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchLocation()}
                    className="flex-1 bg-white/10 border border-white/10 text-xs p-2 rounded-lg outline-none text-slate-300 placeholder:text-slate-500 focus:border-orange-500/50 transition-colors"
                />
                <button 
                    onClick={handleSearchLocation}
                    disabled={isSearching}
                    className="bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-50 text-slate-300 text-xs font-bold px-3 rounded-lg transition-colors"
                >
                    {isSearching ? '...' : 'GO'}
                </button>
            </div>
            <div className="text-[9px] text-slate-500 mt-2 px-1 flex gap-1 items-center">
               <Crosshair className="w-3 h-3" />
               或者在地图上点击也可以设置位置
            </div>
          </section>

          {/* Yield */}
          <section>
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 block">弹头选择</label>
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="number" 
                value={yieldStr}
                onChange={(e) => { setYieldStr(e.target.value); setPresetName("自定义"); setHasDetonated(false); }}
                className="w-2/3 bg-white/10 p-2.5 rounded-lg border border-white/10 text-sm outline-none focus:border-orange-500/50 transition-colors"
                min="0"
                step="any"
              />
              <span className="text-xs font-bold text-slate-400">{yieldKt} KT</span>
            </div>
            
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
               <input 
                 type="checkbox" 
                 checked={isNeutronBomb}
                 onChange={(e) => { setIsNeutronBomb(e.target.checked); setPresetName("自定义"); setHasDetonated(false); }}
                 className="accent-orange-500"
               />
               <span className="text-xs text-slate-300">增强辐射 (中子弹)</span>
            </label>

            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 block">预设武器库</label>
            <select
                value={presetName}
                onChange={(e) => {
                    const preset = PRESETS.find(p => p.name === e.target.value);
                    if (preset) handleSetPreset(preset);
                    else {
                        setPresetName("自定义");
                        setHasDetonated(false);
                    }
                }}
                className="bg-white/10 border border-white/10 text-xs p-2 rounded-lg outline-none w-full text-slate-300 [&>option]:bg-slate-800 mb-2 transition-colors focus:border-orange-500/50"
            >
               <option value="自定义">自定义当量...</option>
               <optgroup label="预设武器库">
                 {PRESETS.map(p => (
                   <option key={p.name} value={p.name}>
                     {p.name} ({p.yieldKt >= 1000 ? `${p.yieldKt / 1000} Mt` : `${p.yieldKt} kt`})
                   </option>
                 ))}
               </optgroup>
            </select>
            {presetName !== "自定义" && (
               <p className="text-[10px] text-slate-400 italic px-1">
                 {PRESETS.find(p => p.name === presetName)?.description}
               </p>
            )}
          </section>

          {/* Burst Height */}
          <section>
             <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 block">爆炸高度</label>
             <div className="flex gap-2">
                <button 
                  onClick={() => { setIsAirburst(true); setHasDetonated(false); }}
                  className={cn("flex-1 py-1.5 text-sm rounded-lg border transition-all", isAirburst ? "bg-orange-500/20 border-orange-500/50 text-orange-200" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}
                >
                  空爆
                </button>
                <button 
                  onClick={() => { setIsAirburst(false); setHasDetonated(false); }}
                  className={cn("flex-1 py-1.5 text-sm rounded-lg border transition-all", !isAirburst ? "bg-orange-500/20 border-orange-500/50 text-orange-200" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10")}
                >
                  地表爆
                </button>
             </div>
             <div className="flex justify-between text-[9px] text-slate-500 mt-1 px-1">
                <span>最大冲击波覆盖范围</span>
                <span>最大局部放射性尘埃/弹坑</span>
             </div>
          </section>

          {/* Environment Factors */}
          <section className="bg-black/20 p-3 rounded-lg border border-white/5 space-y-3">
             <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">高级设置 & 环境调节</h4>
             
             <div className="flex flex-col gap-1">
                 <label className="text-[10px] text-slate-500">天气</label>
                 <select 
                    value={weather} 
                    onChange={(e) => { setWeather(e.target.value as WeatherType); setHasDetonated(false); }}
                    className="bg-white/10 border border-white/10 text-xs p-1.5 rounded outline-none w-full text-slate-300 [&>option]:bg-slate-800"
                 >
                    <option value="clear">晴天 (标准)</option>
                    <option value="overcast">阴天 (减轻热辐射)</option>
                    <option value="rain">雨天 (减轻热辐射, +放射性沉降)</option>
                 </select>
             </div>

             <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                 <label className="text-[10px] font-bold text-slate-400 block mb-1">显示冲击波超压环：</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showBlast3000} onChange={e => setShowBlast3000(e.target.checked)} className="accent-red-800" /> 3,000 psi (摧毁导弹掩体)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showBlast200} onChange={e => setShowBlast200(e.target.checked)} className="accent-red-700" /> 200 psi (严重损坏)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showBlast20} onChange={e => setShowBlast20(e.target.checked)} className="accent-red-600" /> 20 psi (严重损坏)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showBlast5} onChange={e => setShowBlast5(e.target.checked)} className="accent-red-500" /> 5 psi (中等损伤)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showBlast1} onChange={e => setShowBlast1(e.target.checked)} className="accent-red-400" /> 1 psi (轻微损坏)</label>
             </div>

             <div className="space-y-2 pt-2 border-t border-white/10 text-orange-200">
                 <label className="text-[10px] font-bold text-slate-400 block mb-1">显示热辐射环：</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showTherm3rd100} onChange={e => setShowTherm3rd100(e.target.checked)} className="accent-orange-600" /> 三度烧伤 (100%概率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showTherm3rd50} onChange={e => setShowTherm3rd50(e.target.checked)} className="accent-orange-500" /> 三度烧伤 (50%的概率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showTherm2nd50} onChange={e => setShowTherm2nd50(e.target.checked)} className="accent-orange-400" /> 二级烧伤 (50%概率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showTherm1st50} onChange={e => setShowTherm1st50(e.target.checked)} className="accent-yellow-500" /> 一级烧伤 (50%概率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showThermNoHarm} onChange={e => setShowThermNoHarm(e.target.checked)} className="accent-yellow-400" /> 无燃烧概率为100%的最小半径</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showThermWood} onChange={e => setShowThermWood(e.target.checked)} className="accent-orange-700" /> 干木通常燃烧 (35 cal/cm²)</label>
             </div>

             <div className="space-y-2 pt-2 border-t border-white/10 text-emerald-200">
                 <label className="text-[10px] font-bold text-slate-400 block mb-1">显示电离辐射环：</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showRad5000} onChange={e => setShowRad5000(e.target.checked)} className="accent-emerald-800" /> 5,000 rem (100%死亡率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showRad1000} onChange={e => setShowRad1000(e.target.checked)} className="accent-emerald-700" /> 1,000 rem (95%的医疗死亡率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showRad600} onChange={e => setShowRad600(e.target.checked)} className="accent-emerald-600" /> 600 rem (80%的医疗死亡率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showRad500} onChange={e => setShowRad500(e.target.checked)} className="accent-emerald-500" /> 500 rem (50-90%的医疗死亡率)</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showRad100} onChange={e => setShowRad100(e.target.checked)} className="accent-emerald-400" /> 100 rem (疾病，终身癌症风险增加)</label>
             </div>

             <div className="space-y-2 pt-2 border-t border-white/10">
                 <label className="text-[10px] font-bold text-slate-400 block mb-1">其他影响：</label>
                 <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300"><input type="checkbox" checked={showFireball} onChange={e => setShowFireball(e.target.checked)} className="accent-amber-400" /> 火球</label>
             </div>
          </section>
        </div>

        <div className="mt-auto flex flex-col gap-2 z-20 shrink-0">
          <button 
             onClick={handleDetonate}
             disabled={!position || yieldKt <= 0}
             className="py-4 rounded-xl font-black tracking-widest transition-all bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            引爆
          </button>
          
          {activeDetonations.length > 0 && (
            <button 
               onClick={handleReset}
               className="py-3 rounded-xl font-bold transition-all bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 flex justify-center items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> 重新开始
            </button>
          )}
        </div>
      </aside>

      {/* Main Content: Map & Results */}
      <main className="flex-1 relative z-0 h-[50vh] md:h-full order-1 md:order-2">
        
        {/* Map */}
        <MapContainer center={[40.7128, -74.0060]} zoom={11} scrollWheelZoom={true} className="w-full h-full bg-slate-950" zoomControl={false}>
          <MapUpdater center={mapCenter} />
          <TileLayer
             attribution='&copy; Google Maps'
             url="https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=zh-CN"
             subdomains={['0', '1', '2', '3']}
             className="dark-map-tiles"
             opacity={0.9}
          />
          <LocationMarker position={position} setPosition={setPosition} />
          
          {activeDetonations.map((det) => (
            !det.isIntercepted && (
              <React.Fragment key={det.id}>
                {/* Blast */}
                {showBlast1 && <Circle center={det.position} radius={det.effects.blast1psi} pathOptions={{color: 'transparent', fillColor: '#a8a29e', fillOpacity: 0.15}} />}
                {showBlast5 && <Circle center={det.position} radius={det.effects.blast5psi} pathOptions={{color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.2}} />}
                {showBlast20 && <Circle center={det.position} radius={det.effects.blast20psi} pathOptions={{color: 'transparent', fillColor: '#b91c1c', fillOpacity: 0.3}} />}
                {showBlast200 && <Circle center={det.position} radius={det.effects.blast200psi} pathOptions={{color: 'transparent', fillColor: '#7f1d1d', fillOpacity: 0.4}} />}
                {showBlast3000 && <Circle center={det.position} radius={det.effects.blast3000psi} pathOptions={{color: 'transparent', fillColor: '#450a0a', fillOpacity: 0.5}} />}

                {/* Thermal */}
                {showThermNoHarm && <Circle center={det.position} radius={det.effects.thermalNoHarm} pathOptions={{color: 'transparent', fillColor: '#fef08a', fillOpacity: 0.15}} />}
                {showTherm1st50 && <Circle center={det.position} radius={det.effects.thermalFirstDegree50} pathOptions={{color: 'transparent', fillColor: '#fde047', fillOpacity: 0.2}} />}
                {showTherm2nd50 && <Circle center={det.position} radius={det.effects.thermalSecondDegree50} pathOptions={{color: 'transparent', fillColor: '#facc15', fillOpacity: 0.25}} />}
                {showTherm3rd50 && <Circle center={det.position} radius={det.effects.thermalThirdDegree50} pathOptions={{color: 'transparent', fillColor: '#f97316', fillOpacity: 0.25}} />}
                {showTherm3rd100 && <Circle center={det.position} radius={det.effects.thermalThirdDegree100} pathOptions={{color: 'transparent', fillColor: '#ea580c', fillOpacity: 0.3}} />}
                {showThermWood && <Circle center={det.position} radius={det.effects.thermalWoodIgnition} pathOptions={{color: 'transparent', fillColor: '#c2410c', fillOpacity: 0.35}} />}
                
                {/* Radiation */}
                {showRad100 && <Circle center={det.position} radius={det.effects.radiation100rem} pathOptions={{color: 'transparent', fillColor: '#6ee7b7', fillOpacity: 0.15}} />}
                {showRad500 && <Circle center={det.position} radius={det.effects.radiation500rem} pathOptions={{color: 'transparent', fillColor: '#10b981', fillOpacity: 0.2}} />}
                {showRad600 && <Circle center={det.position} radius={det.effects.radiation600rem} pathOptions={{color: 'transparent', fillColor: '#059669', fillOpacity: 0.25}} />}
                {showRad1000 && <Circle center={det.position} radius={det.effects.radiation1000rem} pathOptions={{color: 'transparent', fillColor: '#047857', fillOpacity: 0.3}} />}
                {showRad5000 && <Circle center={det.position} radius={det.effects.radiation5000rem} pathOptions={{color: 'transparent', fillColor: '#064e3b', fillOpacity: 0.4}} />}
                
                {/* Fireball */}
                {showFireball && <Circle center={det.position} radius={det.effects.fireball} pathOptions={{color: '#fde047', fillColor: '#fde047', fillOpacity: 0.8}} />}

                <Marker position={det.position} opacity={0.5} />
              </React.Fragment>
            )
          ))}
        </MapContainer>

        {showInterceptModal && hasDetonated && (
          <div className="absolute inset-0 z-[2000] flex items-center justify-center pointer-events-none p-4">
            <div className="bg-slate-900/90 text-white p-6 md:p-8 rounded-3xl shadow-2xl border border-red-500/30 backdrop-blur-xl max-w-md text-center pointer-events-auto filter drop-shadow-[0_0_50px_rgba(220,38,38,0.3)]">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-900/50 border border-red-400/20">
                <X className="w-10 h-10 text-white drop-shadow-md" />
              </div>
              <h2 className="text-3xl font-black mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-red-200">导弹已被拦截！</h2>
              <p className="text-red-200 text-sm leading-relaxed mb-8">
                你小子想干什么？导弹被我种花家导弹防御系统成功拦截并摧毁于大气层外，未造成任何地面伤亡或破坏。
              </p>
              <button onClick={() => setShowInterceptModal(false)} className="w-full py-4 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl transition-all font-bold text-sm tracking-widest border border-white/10">
                关闭报告
              </button>
            </div>
          </div>
        )}

        {/* HUD Overlay Map Visuals */}
        <div className="absolute inset-0 bg-slate-950 opacity-20 pointer-events-none mix-blend-color"></div>

        {/* History Overlay Panel */}
        {isHistoryOpen && (
            <div className="absolute top-4 right-4 md:right-24 bottom-4 w-full max-w-sm bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[2000] flex flex-col pointer-events-auto">
               <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
                 <h2 className="font-bold text-slate-100 flex items-center gap-2">
                   <History className="w-4 h-4 text-orange-400" />
                   模拟历史记录
                 </h2>
                 <button onClick={() => setIsHistoryOpen(false)} className="text-slate-400 hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="p-4 border-b border-white/10">
                  <input 
                     type="text" 
                     placeholder="搜索当量或预设名称..." 
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-slate-200 focus:border-orange-500/50 outline-none"
                  />
               </div>

               <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {filteredHistory.length === 0 ? (
                      <p className="text-center text-slate-500 text-sm mt-10">未找到记录。请引爆以保存历史记录。</p>
                  ) : (
                      filteredHistory.map(rec => (
                          <div key={rec.id} className="bg-white/5 border border-white/10 rounded-xl p-3 relative group hover:border-white/20 transition-colors">
                              <button 
                                onClick={() => handleDeleteHistory(rec.id)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                  <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="text-[10px] text-slate-500 mb-1 flex justify-between pr-6">
                                  <span>{new Date(rec.timestamp).toLocaleTimeString()}</span>
                                  <span>{rec.position[0].toFixed(2)}, {rec.position[1].toFixed(2)}</span>
                              </div>
                              <h4 className="font-bold text-orange-100 text-sm">{rec.yieldKt} KT • {rec.presetName}</h4>
                              <div className="flex gap-2 text-[10px] text-slate-400 mt-1 mb-2">
                                  <span className="bg-white/10 px-1 rounded">{rec.isAirburst ? '空爆' : '地表爆'}</span>
                                  {rec.isNeutronBomb && <span className="bg-green-500/20 text-green-300 px-1 rounded border border-green-500/30">中子弹</span>}
                                  <span className="bg-white/10 px-1 rounded capitalize">{terrainMap[rec.terrain]}</span>
                                  <span className="bg-white/10 px-1 rounded capitalize">{weatherMap[rec.weather]}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2 mt-2">
                                  <div>
                                      <span className="text-slate-500">死亡：</span> <span className="text-red-400 font-bold">{rec.fatalities.toLocaleString()}</span>
                                  </div>
                                  <div>
                                      <span className="text-slate-500">受伤：</span> <span className="text-orange-400 font-bold">{rec.injuries.toLocaleString()}</span>
                                  </div>
                              </div>
                          </div>
                      ))
                  )}
               </div>
            </div>
        )}

        {/* Mobile Mini Dashboard Toggle */}
        {activeDetonations.length > 0 && stats && (
          <div className="md:hidden absolute bottom-6 left-6 right-6 z-[1000] pointer-events-auto">
             <button onClick={() => setShowStatsMobile(!showStatsMobile)} className="w-full bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-3 flex justify-between items-center shadow-2xl">
               <div className="flex flex-col text-left">
                 <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">累计伤害评估概览</span>
                 <span className="text-sm font-bold text-white"><span className="text-red-400">死: <AnimatedNumber value={stats.fatalities} /></span> &nbsp;|&nbsp; <span className="text-orange-400">伤: <AnimatedNumber value={stats.injuries} /></span></span>
               </div>
               <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-slate-400">
                 {showStatsMobile ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
               </div>
             </button>
          </div>
        )}

        {/* Bottom Dashboard: Stats & Cross-Section */}
        {activeDetonations.length > 0 && stats && (
          <div className={cn("absolute bottom-24 md:bottom-6 left-6 right-6 lg:right-auto lg:w-[800px] flex-col md:flex-row gap-6 z-[1000] pointer-events-none transition-all", showStatsMobile ? "flex" : "hidden md:flex")}>
            {/* Statistics */}
            <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between pointer-events-auto shadow-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">伤害评估 (累积)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs text-center md:text-left">累计死亡人数</p>
                  <p className="text-xl md:text-2xl font-bold text-red-500 text-center md:text-left"><AnimatedNumber value={stats.fatalities}/></p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-slate-400 text-xs text-center md:text-left">累计受伤人数</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-400 text-center md:text-left"><AnimatedNumber value={stats.injuries}/></p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg col-span-2">
                  <p className="text-slate-400 text-xs mb-2">最近一次影响半径概览</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] md:text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-yellow-400">火球</span><span>{activeDetonations[activeDetonations.length - 1].isIntercepted ? "0.00" : (activeDetonations[activeDetonations.length - 1].effects.fireball/1000).toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-red-400">5 psi 冲击波</span><span>{activeDetonations[activeDetonations.length - 1].isIntercepted ? "0.00" : (activeDetonations[activeDetonations.length - 1].effects.blast5psi/1000).toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-orange-400">热辐射 (三度烧伤)</span><span>{activeDetonations[activeDetonations.length - 1].isIntercepted ? "0.00" : ((activeDetonations[activeDetonations.length - 1].effects.thermalThirdDegree50 || 0)/1000).toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-emerald-400">500 rem 辐射</span><span>{activeDetonations[activeDetonations.length - 1].isIntercepted ? "0.00" : (activeDetonations[activeDetonations.length - 1].effects.radiation500rem/1000).toFixed(2)} km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Crater Profile */}
            {!activeDetonations[activeDetonations.length - 1].isAirburst && stats.crater.radius > 0 && (
              <div className="w-full md:w-[320px] lg:w-[380px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 pointer-events-auto flex flex-col justify-between shrink-0 shadow-2xl hidden sm:flex">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">弹坑横截面 (预计)</h3>
                <div className="relative h-[80px] md:h-[100px] w-full border-b border-white/20 mb-2">
                   <svg viewBox="0 0 300 100" className="w-full h-full text-slate-700/80">
                     <path d="M0,20 Q150,140 300,20" fill="currentColor" />
                     <path d="M0,20 Q150,140 300,20" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
                     <line x1="150" y1="20" x2="150" y2="80" stroke="white" strokeDasharray="2" opacity="0.3" />
                   </svg>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="text-[10px] bg-slate-900/90 px-2 py-0.5 border border-white/20 rounded font-mono text-slate-300">深度: {stats.crater.depth.toFixed(0)}m</span>
                   </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>直径: {(stats.crater.radius * 2).toFixed(0)}m</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Compass/HUD Elements */}
        {position && (
          <div className="absolute top-6 right-6 flex flex-col gap-2 items-end z-[1000] pointer-events-none">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-[10px] text-white/50 pointer-events-auto shadow-lg">
              北
            </div>
            <div className="bg-black/60 px-3 py-1.5 rounded text-[10px] border border-white/10 backdrop-blur-md pointer-events-auto font-mono text-slate-300 shadow-md">
              坐标: {position[0] >= 0 ? '北纬' : '南纬'} {Math.abs(position[0]).toFixed(4)}°, {position[1] >= 0 ? '东经' : '西经'} {Math.abs(position[1]).toFixed(4)}°
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
