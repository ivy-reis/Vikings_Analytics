import React, { useState, useMemo } from 'react';
import { 
  Target, MousePointer2, TrendingUp, Users, Activity, 
  AlertTriangle, PieChart, Shield, Trophy, Swords
} from 'lucide-react';

// inserção dos dados tratados

const DEFENSE_DATA = [
  { name: "Eric Wilson", pos: "LB", solo: 49, good: 0, bad: 0 },
  { name: "Blake Cashman", pos: "LB", solo: 39, good: 1, bad: 1 },
  { name: "Byron Murphy", pos: "CB", solo: 38, good: 0, bad: 8 },
  { name: "Josh Metellus", pos: "S", solo: 37, good: 2, bad: 2 },
  { name: "Isaiah Rodgers", pos: "CB", solo: 35, good: 3, bad: 0 },
  { name: "Ivan Pace", pos: "LB", solo: 28, good: 0, bad: 3 },
  { name: "Harrison Smith", pos: "S", solo: 26, good: 1, bad: 1 },
  { name: "Jalen Redmond", pos: "DL", solo: 25, good: 1, bad: 1 },
  { name: "Jonathan Allen", pos: "DL", solo: 21, good: 0, bad: 2 },
  { name: "Dallas Turner", pos: "OLB", solo: 20, good: 2, bad: 4 },
  { name: "Jonathan Greenard", pos: "OLB", solo: 19, good: 1, bad: 4 },
  { name: "Theo Jackson", pos: "S", solo: 17, good: 1, bad: 0 },
  { name: "Andrew Van Ginkel", pos: "OLB", solo: 17, good: 0, bad: 1 },
  { name: "Javon Hargrave", pos: "DL", solo: 16, good: 0, bad: 1 },
  { name: "Levi Drake Rodriguez", pos: "DL", solo: 14, good: 0, bad: 0 },
];

const RAW_SALARIES = [
  { name: "Brian O'Neill", cap: 26019114 }, { name: "Jonathan Greenard", cap: 22300000 },
  { name: "T.J. Hockenson", cap: 16649118 }, { name: "Justin Jefferson", cap: 15167600 },
  { name: "Andrew Van Ginkel", cap: 11400000 }, { name: "Harrison Smith", cap: 9901178 },
  { name: "Christian Darrisaw", cap: 9681765 }, { name: "Aaron Jones", cap: 8400000 },
  { name: "Javon Hargrave", cap: 7884853 }, { name: "Blake Cashman", cap: 7236765 },
  { name: "Jonathan Allen", cap: 6421666 }, { name: "Byron Murphy", cap: 6130000 },
  { name: "Will Fries", cap: 5640000 }, { name: "Ryan Kelly", cap: 5569559 },
  { name: "J.J. McCarthy", cap: 4966999 }, { name: "Josh Metellus", cap: 4730000 },
  { name: "Adam Thielen", cap: 4588235 }, { name: "Josh Oliver", cap: 4264000 },
  { name: "Blake Brandel", cap: 3916666 }, { name: "Isaiah Rodgers", cap: 3632500 },
  { name: "Dallas Turner", cap: 3583378 }, { name: "C.J. Ham", cap: 3516668 },
  { name: "Jordan Addison", cap: 3478629 }, { name: "Donovan Jackson", cap: 3123101 },
  { name: "Eric Wilson", cap: 2600000 }, { name: "Jordan Mason", cap: 2250000 },
  { name: "Theo Jackson", cap: 2100000 }, { name: "Tavierre Thomas", cap: 2000000 },
  { name: "Justin Skule", cap: 2000000 }, { name: "Ryan Wright", cap: 1750000 },
  { name: "Andrew DePaola", cap: 1386668 }, { name: "Jay Ward", cap: 1193386 },
  { name: "Jalen Nailor", cap: 1145165 }, { name: "Tai Felton", cap: 1120215 },
  { name: "Ivan Pace", cap: 1036668 }, { name: "Walter Rouse", cap: 1016648 },
  { name: "Will Reichard", cap: 1002655 }, { name: "Michael Jurgens", cap: 987185 },
  { name: "Levi Drake Rodriguez", cap: 986497 }, { name: "Bo Richter", cap: 960000 },
  { name: "Jalen Redmond", cap: 960000 }, { name: "Tyrion Ingram-Dawkins", cap: 959344 },
  { name: "Ben Yurosek", cap: 846666 }, { name: "Chaz Chambliss", cap: 846666 },
  { name: "Austin Keys", cap: 845000 }, { name: "Max Brosmer", cap: 843333 },
  { name: "Joe Huber", cap: 843333 }, { name: "Zavier Scott", cap: 840000 },
  { name: "Elijah Williams", cap: 840000 }, { name: "Myles Price", cap: 840000 },
  { name: "Tyler Batty", cap: 731666 }, { name: "Carson Wentz", cap: 1197500 }, 
  { name: "Ty Chandler", cap: 1174711 }, { name: "Cam Akers", cap: 294166 }
];

const RAW_RECEIVING = [
  { name: "Justin Jefferson", pos: "WR", yscm: 803, rrtd: 2, rec: 62, tgt: 105 },
  { name: "Jordan Mason", pos: "RB", yscm: 623, rrtd: 5, rec: 13, tgt: 15 },
  { name: "Jordan Addison", pos: "WR", yscm: 464, rrtd: 3, rec: 33, tgt: 63 },
  { name: "Aaron Jones", pos: "RB", yscm: 450, rrtd: 2, rec: 20, tgt: 30 },
  { name: "T.J. Hockenson", pos: "TE", yscm: 358, rrtd: 2, rec: 44, tgt: 57 },
  { name: "Jalen Nailor", pos: "WR", yscm: 333, rrtd: 2, rec: 20, tgt: 39 },
  { name: "Zavier Scott", pos: "RB", yscm: 163, rrtd: 1, rec: 11, tgt: 13 },
  { name: "J.J. McCarthy", pos: "QB", yscm: 120, rrtd: 2, rec: 0, tgt: 0 },
  { name: "Adam Thielen", pos: "WR", yscm: 69, rrtd: 0, rec: 8, tgt: 18 },
  { name: "Josh Oliver", pos: "TE", yscm: 62, rrtd: 2, rec: 7, tgt: 9 },
  { name: "Carson Wentz", pos: "QB", yscm: 57, rrtd: 0, rec: 0, tgt: 0 },
  { name: "Cam Akers", pos: "RB", yscm: 51, rrtd: 1, rec: 0, tgt: 1 }, 
  { name: "Tai Felton", pos: "WR", yscm: 9, rrtd: 0, rec: 1, tgt: 1 },
  { name: "C.J. Ham", pos: "FB", yscm: 5, rrtd: 0, rec: 1, tgt: 1 },
  { name: "Ben Yurosek", pos: "TE", yscm: 5, rrtd: 0, rec: 1, tgt: 1 },
  { name: "Max Brosmer", pos: "QB", yscm: -2, rrtd: 0, rec: 0, tgt: 0 }
];

const RAW_PASSING = [
  { name: "Carson Wentz", passYds: 1216, passTd: 6, ints: 5, rating: 85.8 },
  { name: "J.J. McCarthy", passYds: 929, passTd: 6, ints: 10, rating: 57.9 },
  { name: "Max Brosmer", passYds: 168, passTd: 0, ints: 4, rating: 33.6 },
  { name: "Cam Akers", passYds: 32, passTd: 1, ints: 0, rating: 158.3 }
];


const formatMoney = (val) => val ? `$${(val / 1000000).toFixed(2)}M` : '$0.00M';

const POS_COLORS = { 
  WR: '#4F2683', TE: '#FFC62F', RB: '#9ca3af', QB: '#1e293b', FB: '#475569',
  LB: '#10b981', CB: '#3b82f6', S: '#6366f1', DL: '#ef4444', OLB: '#f59e0b'
};

// grafico de bolhas 
const BubbleChart = ({ data, onSelect, selectedId }) => {
  const width = 800;
  const height = 450;
  const padding = 60;
  const maxCap = Math.max(...data.map(d => d.capHit)) * 1.1; 
  const maxVol = Math.max(...data.map(d => d.volume)) * 1.1;
  const maxImp = Math.max(...data.map(d => d.impact)) || 1;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#4F2683]" /> Matriz de Eficiência (ROI)
        </h3>
        <div className="flex gap-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#dcfce7] border border-green-200"></span> Zona Ideal (MVP)</span>
        </div>
      </div>
      <div className="flex-1 min-h-[300px] relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="2" />
          
          <text x={width / 2} y={height - 15} textAnchor="middle" className="text-xs font-bold fill-slate-400">INVESTIMENTO ($)</text>
          <text x={20} y={height / 2} textAnchor="middle" transform={`rotate(-90, 20, ${height/2})`} className="text-xs font-bold fill-slate-400">PRODUÇÃO (Jardas ou Tackles)</text>

          <rect x={padding} y={padding} width={(width-2*padding)/2.5} height={(height-2*padding)/2} fill="#dcfce7" fillOpacity="0.4" rx="8" />

          {data.map((p) => {
            const x = padding + (p.capHit / maxCap) * (width - 2 * padding);
            const y = (height - padding) - (p.volume / maxVol) * (height - 2 * padding);
            const r = 6 + (p.impact / maxImp) * 20;
            const isSelected = selectedId === p.name;
            const isRisk = (p.isDefense && p.bad > 3) || (!p.isDefense && p.pos === 'QB' && p.ints > 5);
            
            const safeX = Math.min(Math.max(x, padding), width - padding);
            const safeY = Math.min(Math.max(y, padding), height - padding);

            return (
              <g key={p.name} onClick={() => onSelect(p)} className="cursor-pointer group" style={{ opacity: selectedId && !isSelected ? 0.2 : 1 }}>
                <circle cx={safeX} cy={safeY} r={isSelected ? r+4 : r} 
                  fill={isRisk ? '#ef4444' : (POS_COLORS[p.pos] || '#999')} 
                  fillOpacity={isSelected ? 1 : 0.8} 
                  stroke={isSelected ? '#1e293b' : 'white'} strokeWidth={isSelected ? 3 : 2} 
                  className="transition-all duration-200 hover:opacity-100 drop-shadow-sm" 
                />
                <text x={safeX} y={safeY + r + 15} textAnchor="middle" className={`text-[10px] font-bold fill-slate-700 pointer-events-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// grafico de radar
const RadarChart = ({ player }) => {
  if (!player) return (
    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border border-dashed border-slate-300 p-6">
      <MousePointer2 className="w-10 h-10 mb-3 opacity-30" />
      <p className="text-center text-sm font-medium">Selecione um jogador para ver o Raio X.</p>
    </div>
  );

  const size = 280; const center = size / 2; const radius = 90;
  const isDefense = player.isDefense;
  
  let metrics = [];
  const maxCost = 17000000;

  if (isDefense) {
    metrics = [
      { label: "Tackles", val: player.volume, max: 60 },
      { label: "Fumbles Forçados", val: player.impact, max: 4 },
      { label: "Faltas", val: player.bad, max: 10, isInverted: true }, 
      { label: "Econômico", val: Math.max(0, maxCost - player.capHit), max: maxCost }
    ];
  } else if (player.pos === 'QB') {
    // QB
    const safetyScore = Math.max(0, (15 - (player.ints || 0)) / 15 * 100);
    metrics = [
      { label: "Jardas", val: player.volume, max: 1500 },
      { label: "TDs", val: player.impact, max: 10 },
      { label: "Insegurança", val: safetyScore, max: 100, isRaw: true },
      { label: "Econômico", val: Math.max(0, maxCost - player.capHit), max: maxCost }
    ];
  } else {
    metrics = [
      { label: "Jardas", val: player.volume, max: 900 },
      { label: "TDs", val: player.impact, max: 8 },
      { label: "Recepções", val: player.rec, max: 70 },
      { label: "Econômico", val: Math.max(0, maxCost - player.capHit), max: maxCost }
    ];
  }

  const angleSlice = (Math.PI * 2) / metrics.length;
  const getCoords = (val, max, i, isRaw) => {
    const normalized = isRaw ? val : (val / max) * 100;
    const r = (Math.min(normalized, 100) / 100) * radius;
    return [center + r * Math.cos(i * angleSlice - Math.PI / 2), center + r * Math.sin(i * angleSlice - Math.PI / 2)];
  };
  const path = metrics.map((m, i) => getCoords(m.val, m.max, i, m.isRaw)).join(" L ") + " Z";

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col animate-in fade-in">
      <h3 className="text-sm font-bold text-[#4F2683] mb-4 flex items-center gap-2 uppercase">
        <Target className="w-4 h-4" /> Raio-X: {player.name}
      </h3>
      <div className="flex-1 flex justify-center items-center">
        <svg width={size} height={size}>
          {[0.2, 0.4, 0.6, 0.8, 1].map(r => <circle key={r} cx={center} cy={center} r={radius * r} fill="none" stroke="#f1f5f9" strokeWidth="1" />)}
          {metrics.map((m, i) => { const [x, y] = getCoords(100, 100, i, true); return (<g key={i}><line x1={center} y1={center} x2={x} y2={y} stroke="#e2e8f0" /><text x={x} y={y} dy={y < center ? -10 : 20} dx={x < center ? -15 : 15} textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">{m.label}</text></g>)})}
          <path d={`M ${path}`} fill={POS_COLORS[player.pos]} fillOpacity="0.6" stroke={POS_COLORS[player.pos]} strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
// grafico de posicao e custo - barras
const PositionSpendingChart = ({ data }) => {
  const spending = data.reduce((acc, curr) => { acc[curr.pos] = (acc[curr.pos] || 0) + curr.capHit; return acc; }, {});
  const total = Object.values(spending).reduce((a, b) => a + b, 0);
  const sortedPos = Object.keys(spending).sort((a,b) => spending[b] - spending[a]);
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-full overflow-hidden">
      <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2"><PieChart className="w-4 h-4 text-[#FFC62F]" /> Estratégia de Pagamento</h3>
      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
        {sortedPos.map(pos => {
          const amount = spending[pos]; const percent = (amount / total) * 100;
          return (<div key={pos} className="group"><div className="flex justify-between text-xs mb-1 font-semibold text-slate-600"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: POS_COLORS[pos] || '#999'}}></span>{pos}</span><span>{formatMoney(amount)} ({percent.toFixed(1)}%)</span></div><div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: POS_COLORS[pos] || '#999' }}></div></div></div>)
        })}
      </div>
    </div>
  );
};

// configurações
export default function App() {
  const [filterPos, setFilterPos] = useState('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const unifiedData = useMemo(() => {
    const salaryMap = new Map(RAW_SALARIES.map(s => [s.name, s.cap]));
    const passingMap = new Map(RAW_PASSING.map(p => [p.name, p]));
    const offense = RAW_RECEIVING.map(p => {
      const passStats = passingMap.get(p.name);
      const totalYards = p.yscm + (passStats ? passStats.passYds : 0);
      const totalTDs = p.rrtd + (passStats ? passStats.passTd : 0);
      const ints = passStats ? passStats.ints : 0;
      const capHit = salaryMap.get(p.name) || 795000;
      
      return { 
        ...p, 
        isDefense: false,
        volume: totalYards, 
        impact: totalTDs,   
        bad: ints,          
        capHit 
      };
    });

    const defense = DEFENSE_DATA.map(p => {
      const capHit = salaryMap.get(p.name) || 795000;
      return {
        ...p,
        isDefense: true,
        volume: p.solo,     
        impact: p.good,     
        bad: p.bad,         
        capHit,
        rec: 0 
      };
    });

    return [...offense, ...defense].sort((a, b) => b.volume - a.volume);
  }, []);

  const filteredData = useMemo(() => {
    return filterPos === 'ALL' ? unifiedData : unifiedData.filter(p => p.pos === filterPos);
  }, [unifiedData, filterPos]);

  const totalCost = filteredData.reduce((acc, c) => acc + c.capHit, 0);
  const bestValue = filteredData.reduce((prev, curr) => {
    if (curr.volume < 20) return prev; 
    const prevRatio = prev.volume / prev.capHit; const currRatio = curr.volume / curr.capHit;
    return currRatio > prevRatio ? curr : prev;
  }, filteredData[0]);

  const FILTERS = ['ALL', 'QB', 'WR', 'RB', 'TE', 'LB', 'CB', 'S', 'DL', 'OLB'];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-12">
      
      <header className="bg-[#2e1052] text-white border-b-4 border-[#FFC62F] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20 backdrop-blur-sm">
              <img src="https://upload.wikimedia.org/wikipedia/en/4/48/Minnesota_Vikings_logo.svg" alt="Vikings" className="w-auto h-7 object-contain drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Vikings <span className="text-[#FFC62F]">Folha Salarial e Performance</span></h1>
              <p className="text-[10px] text-purple-200 opacity-80">Temporada 2025</p>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="bg-[#1a0933] px-4 py-1.5 rounded-lg border border-purple-800 text-center min-w-[100px]">
               <span className="block text-[#FFC62F] font-bold text-sm">{unifiedData.length}</span>
               <span className="text-[9px] text-gray-400 uppercase tracking-wider">Jogadores</span>
             </div>
             <div className="bg-[#1a0933] px-4 py-1.5 rounded-lg border border-purple-800 text-center min-w-[100px]">
               <span className="block text-green-400 font-bold text-sm">{formatMoney(totalCost)}</span>
               <span className="text-[9px] text-gray-400 uppercase tracking-wider">Teto Ativo</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
        
        {/* filtros */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {FILTERS.map(pos => (
              <button
                key={pos}
                onClick={() => { setFilterPos(pos); setSelectedPlayer(null); }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filterPos === pos 
                    ? 'bg-[#4F2683] text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-500 border border-slate-200 hover:bg-gray-50'
                }`}
              >
                {pos === 'ALL' ? 'TODOS' : pos}
              </button>
            ))}
          </div>

          <div className="flex gap-4 items-center bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><TrendingUp className="w-5 h-5" /></div>
            <div><p className="text-[10px] text-gray-400 uppercase font-bold">MVP (Custo-Benefício)</p><p className="text-sm font-bold text-slate-700">{bestValue?.name} <span className="text-xs font-normal text-gray-400">({bestValue?.volume} Vol)</span></p></div>
          </div>
        </div>

        {/* estilização dos graficos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
          
          <div className="lg:col-span-8 min-h-[450px]">
            <BubbleChart data={filteredData} onSelect={setSelectedPlayer} selectedId={selectedPlayer?.name} />
          </div>

          <div className="lg:col-span-4 min-h-[350px]">
            <RadarChart player={selectedPlayer} />
          </div>

          <div className="lg:col-span-4 min-h-[300px]">
             <PositionSpendingChart data={filteredData} />
          </div>

          <div className="lg:col-span-8 min-h-[300px] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> Roster Detalhado</span>
              <span className="text-[10px] bg-white border px-2 py-1 rounded text-gray-400">{filteredData.length} Jogadores</span>
            </div>
            <div className="overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 sticky top-0">
                  <tr>
                    <th className="p-3 font-semibold">Jogador</th>
                    <th className="p-3 font-semibold">Pos</th>
                    <th className="p-3 font-semibold text-right">Impacto ($)</th>
                    <th className="p-3 font-semibold text-right">Volume (Yds/Tkl)</th>
                    <th className="p-3 font-semibold text-right">Impacto (TD/BigPlay)</th>
                    <th className="p-3 font-semibold text-center">Risco (Int/Faltas)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map(p => (
                    <tr key={p.name} onClick={() => setSelectedPlayer(p)} className={`cursor-pointer transition-colors hover:bg-purple-50 ${selectedPlayer?.name === p.name ? 'bg-purple-100' : ''}`}>
                      <td className="p-3 font-medium text-slate-700">{p.name}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm" style={{backgroundColor: POS_COLORS[p.pos] || '#999'}}>{p.pos}</span></td>
                      <td className="p-3 text-right font-mono text-slate-500">{formatMoney(p.capHit)}</td>
                      <td className="p-3 text-right font-bold text-[#4F2683]">{p.volume}</td>
                      <td className="p-3 text-right">{p.impact}</td>
                      <td className="p-3 text-center">
                        {p.bad > 0 ? (
                          <span className="inline-flex items-center gap-1 text-red-500 font-bold text-[9px] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            <AlertTriangle className="w-3 h-3" /> {p.bad}
                          </span>
                        ) : <span className="text-gray-300">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      
      {/* estilização geral */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}