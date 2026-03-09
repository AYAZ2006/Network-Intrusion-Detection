import { motion } from "framer-motion";
import {LineChart,Line,PieChart,Pie,Cell,BarChart,Bar,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend,} from "recharts";
const attackOverTime = [
  { time: "00:00", attacks: 12, traffic: 450 },
  { time: "04:00", attacks: 5, traffic: 200 },
  { time: "08:00", attacks: 28, traffic: 780 },
  { time: "12:00", attacks: 45, traffic: 1200 },
  { time: "16:00", attacks: 32, traffic: 980 },
  { time: "20:00", attacks: 18, traffic: 650 },
  { time: "23:59", attacks: 22, traffic: 550 },
];

const attackTypes = [
  { name: "DDoS", value: 35 },
  { name: "Port Scan", value: 25 },
  { name: "SQL Injection", value: 18 },
  { name: "Brute Force", value: 15 },
  { name: "MITM", value: 7 },
];

const PIE_COLORS = [
  "hsl(0, 85%, 55%)",
  "hsl(210, 100%, 55%)",
  "hsl(50, 100%, 55%)",
  "hsl(142, 70%, 49%)",
  "hsl(185, 100%, 50%)",
];

const topIPs = [
  { ip: "192.168.1.105", count: 142 },
  { ip: "10.0.0.87", count: 98 },
  { ip: "172.16.0.34", count: 76 },
  { ip: "203.45.67.89", count: 54 },
  { ip: "89.123.45.67", count: 41 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="glass-panel p-3 text-xs text-white font-bold">
      <p className="text-[#E0E6EB] font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>{entry.name}: {entry.value}</p>
      ))}
    </div>
  );
};

const ChartsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-[#E0E6EB]">Visual Analytics</h2>
          <p className="text-muted-foreground text-sm text-[#56606F]">Comprehensive threat intelligence visualizations</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0D1013] rounded-xl border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 text-[#E0E6EB]">Attacks Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attackOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 16%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} stroke="hsl(220, 15%, 16%)"/>
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} stroke="hsl(220, 15%, 16%)"/>
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="attacks" stroke="hsl(0, 85%, 55%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 85%, 55%)" }}/>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0D1013] rounded-xl border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 text-[#E0E6EB]">Attack Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={attackTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {attackTypes.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(value) => (<span className="text-xs text-muted-foreground">{value}</span>)}/>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#0D1013] rounded-xl border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 text-[#E0E6EB]">Top Source IPs</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topIPs} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 16%)" />
                <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} stroke="hsl(220, 15%, 16%)"/>
                <YAxis type="category" dataKey="ip" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} width={110} stroke="hsl(220, 15%, 16%)"/>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="hsl(210, 100%, 55%)" radius={[0, 4, 4, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#0D1013] rounded-xl border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 text-[#E0E6EB]">Traffic Volume</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={attackOverTime}>
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 70%, 49%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 70%, 49%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 16%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} stroke="hsl(220, 15%, 16%)"/>
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} stroke="hsl(220, 15%, 16%)"/>
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="traffic" stroke="hsl(142, 70%, 49%)" fill="url(#trafficGrad)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;