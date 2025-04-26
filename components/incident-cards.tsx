"use client"

import { useState } from "react"
import type { Incident } from "@/types/incident"
import { formatDate } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface IncidentCardsProps {
  incidents: Incident[]
  activeIncidentId: number | null
  setActiveIncidentId: (id: number | null) => void
}

export default function IncidentCards({
  incidents,
  activeIncidentId,
  setActiveIncidentId,
}: IncidentCardsProps) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const toggleExpand = (id: number) => {
    const newExpandedIds = new Set(expandedIds)
    if (expandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIds(newExpandedIds)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-gradient-to-r from-green-500 to-green-400"
      case "Medium":
        return "bg-gradient-to-r from-orange-500 to-orange-400"
      case "High":
        return "bg-gradient-to-r from-red-500 to-red-400"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-400"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-2">Reported Incidents</h2>
      <div className="flex flex-col gap-3 flex-1 overflow-auto">
        {incidents.length === 0 ? (
          <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#333] text-center text-gray-400 flex-1 flex items-center justify-center">
            No incidents match your current filters
          </div>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-[#1e1e1e] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        incident.severity === "Low"
                          ? "bg-green-500"
                          : incident.severity === "Medium"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{incident.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-sm text-gray-400">ID: #{incident.id}</div>
                        <div className="text-sm text-gray-400">•</div>
                        <div className="text-sm text-gray-400">{formatDate(incident.reported_at)}</div>
                      </div>
                  </div>
                </div>
                <div
                    className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 ${
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
                {activeIncidentId === incident.id && (
                  <div className="mt-4 text-sm text-gray-100">
                    {incident.description}
                  </div>
                )}
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => setActiveIncidentId(activeIncidentId === incident.id ? null : incident.id)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {activeIncidentId === incident.id ? "Hide Details" : "View Details"} 
              </button>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
