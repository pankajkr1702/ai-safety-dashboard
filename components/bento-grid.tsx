"use client"

import type { Incident } from "@/types/incident"
import { PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { formatDate } from "@/lib/utils"

interface BentoGridProps {
  incidents: Incident[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-[#252525] border border-[#333] rounded-lg p-3 text-sm">
        <p className="font-medium" style={{ color: data.color }}>
          {data.name}
        </p>
        <p className="text-gray-400">Count: {data.value}</p>
        <p className="text-gray-400">Percentage: {data.percentage}%</p>
      </div>
    )
  }
  return null
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, color }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
  )
}

const severityStyles = {
  Low: {
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500",
    glow: "hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]",
    text: "text-green-400",
  },
  Medium: {
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500",
    glow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]",
    text: "text-orange-400",
  },
  High: {
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-500",
    glow: "hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    text: "text-red-400",
  },
}

export default function BentoGrid({ incidents }: BentoGridProps) {
  // Calculate severity distribution
  const severityCounts = {
    Low: incidents.filter((i) => i.severity === "Low").length,
    Medium: incidents.filter((i) => i.severity === "Medium").length,
    High: incidents.filter((i) => i.severity === "High").length,
  }

  const total = incidents.length
  const pieData = [
    { 
      name: "Low", 
      value: severityCounts.Low, 
      color: "#4ade80", 
      percentage: ((severityCounts.Low / total) * 100).toFixed(0)
    },
    { 
      name: "Medium", 
      value: severityCounts.Medium, 
      color: "#f97316", 
      percentage: ((severityCounts.Medium / total) * 100).toFixed(0)
    },
    { 
      name: "High", 
      value: severityCounts.High, 
      color: "#ef4444", 
      percentage: ((severityCounts.High / total) * 100).toFixed(0)
    },
  ]

  // Calculate incidents over time (last 7 days)
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  const incidentsOverTime = last7Days.map((date) => {
    const count = incidents.filter((i) => i.reported_at.split("T")[0] === date).length
    return { date, count }
  })

  // Recent incidents
  const recentIncidents = [...incidents]
    .sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime())
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Severity Distribution */}
      <div className="bg-[#1e1e1e] rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20">
        <h3 className="text-lg font-medium mb-8">Severity Distribution</h3>
        <div className="relative h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                paddingAngle={4}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Total */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold">{total}</div>
            <div className="text-sm text-gray-400">Total</div>
        </div>
          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex justify-center gap-8">
          {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm font-medium" style={{ color: entry.color }}>{entry.name}</span>
                  <span className="text-sm text-gray-400">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Over Time */}
      <div className="bg-[#1e1e1e] rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20">
        <h3 className="text-lg font-medium mb-8">Incidents Over Time</h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={incidentsOverTime} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={(value) => value.split("-").slice(1).join("/")}
                stroke="#333"
                dy={10}
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fontSize: 12, fill: '#666' }} 
                stroke="#333"
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#252525",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#ff6b4a" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff6b4a"
                strokeWidth={2}
                dot={{ fill: "#ff6b4a", r: 4 }}
                activeDot={{ r: 6, fill: "#ff8066" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Incidents */}
      <div className="bg-[#1e1e1e] rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20">
        <h3 className="text-lg font-medium mb-8">Total Incidents</h3>
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-5xl font-bold text-[#ff6b4a]">{total}</span>
          <span className="text-sm text-gray-400">reported cases</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(severityCounts).map(([severity, count]) => (
            <div
              key={severity}
              className={`bg-[#252525] rounded-xl p-4 transition-all duration-300 hover:scale-[1.05] ${
                severity === "Low"
                  ? "hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:border-green-500/50"
                  : severity === "Medium"
                    ? "hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:border-orange-500/50"
                    : "hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:border-red-500/50"
              } border border-transparent`}
            >
              <div className={`text-sm ${
                severity === "Low"
                  ? "text-green-400"
                  : severity === "Medium"
                    ? "text-orange-400"
                    : "text-red-400"
              }`}>{severity}</div>
              <div className="text-2xl font-semibold mt-2">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-[#1e1e1e] rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20">
        <h3 className="text-lg font-medium mb-8">Recent Incidents</h3>
        <div className="space-y-6">
          {incidents.slice(0, 3).map((incident) => (
              <div
                key={incident.id}
              className="flex items-center gap-4 pb-6 border-b border-[#333] last:border-0 last:pb-0 transition-all duration-300 hover:bg-[#252525] hover:px-4 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    incident.severity === "Low"
                      ? "bg-green-500"
                      : incident.severity === "Medium"
                        ? "bg-orange-500"
                        : "bg-red-500"
                  }`}
                ></div>
              <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{incident.title}</div>
                <div className="text-sm text-gray-400 mt-1">{formatDate(incident.reported_at)}</div>
                </div>
                <div
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    incident.severity === "Low"
                    ? "bg-green-500/10 text-green-400"
                      : incident.severity === "Medium"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {incident.severity}
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
