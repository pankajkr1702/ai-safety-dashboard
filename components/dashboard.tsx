"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import IncidentCards from "@/components/incident-cards"
import BentoGrid from "@/components/bento-grid"
import ReportForm from "@/components/report-form"
import type { Incident } from "@/types/incident"
import { useIncidents } from "@/hooks/use-incidents"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const { 
    incidents, 
    filterSeverity, 
    setFilterSeverity, 
    sortOrder, 
    setSortOrder,
    addIncident 
  } = useIncidents()
  
  const { toast } = useToast()
  const [showReportForm, setShowReportForm] = useState(false)
  const [activeIncidentId, setActiveIncidentId] = useState<number | null>(null)

  const handleAddIncident = (newIncident: Omit<Incident, "id" | "reported_at">) => {
    addIncident(newIncident)
    setShowReportForm(false)
    toast({
      title: "Report Submitted Successfully",
      description: "The incident has been successfully reported and added to the system.",
      className: "bg-[#1e1e1e] border-green-500 text-white",
      duration: 3000,
    })
  }

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 flex flex-col max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
              <h1 className="text-2xl font-semibold tracking-tight">AI Safety Incidents</h1>
              <p className="text-gray-400 mt-1">Monitor and manage AI safety incidents</p>
          </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-3">
              <select
                  className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-sm min-w-[160px] focus:outline-none focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all duration-300 hover:border-[#ff6b4a]/30"
                  value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as any)}
              >
                <option value="All">All Severities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                  className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-sm min-w-[160px] focus:outline-none focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all duration-300 hover:border-[#ff6b4a]/30"
                  value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
            </div>
              <button
                onClick={() => {
                  setFilterSeverity("All")
                  setSortOrder("Newest First")
                }}
                className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-sm hover:bg-[#252525] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b4a]/20 hover:border-[#ff6b4a]/30 flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                  <path d="M4.5 3V2.5H2.5V3V12V12.5H4.5V12V3ZM11.5 3V2.5H9.5V3V12V12.5H11.5V12V3Z" stroke="currentColor"/>
                </svg>
                Clear Filters
              </button>
              <button
                className="bg-[#ff6b4a] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#ff8066] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b4a]/50 hover:scale-[1.02]"
                onClick={() => setShowReportForm(!showReportForm)}
              >
                {showReportForm ? "Cancel Report" : "Report New Incident"}
              </button>
          </div>
        </div>

        {showReportForm && (
            <div className="mb-8">
            <ReportForm onSubmit={handleAddIncident} onCancel={() => setShowReportForm(false)} />
          </div>
        )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BentoGrid incidents={incidents} />
            </div>
            <div className="h-[calc(100vh-12rem)] sticky top-8 overflow-hidden flex flex-col bg-[#121212] rounded-xl border border-[#1e1e1e]">
              <div className="p-6 border-b border-[#1e1e1e] bg-[#121212] z-10">
                <h2 className="text-lg font-medium">Reported Incidents</h2>
              </div>
              <div className="overflow-y-auto flex-1 p-4">
                <div className="space-y-4">
                  <IncidentCards
                    incidents={incidents}
                    activeIncidentId={activeIncidentId}
                    setActiveIncidentId={setActiveIncidentId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
