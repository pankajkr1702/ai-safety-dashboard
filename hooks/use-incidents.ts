import { useState, useEffect, useMemo } from "react"
import type { Incident } from "@/types/incident"
import { mockIncidents } from "@/data/mock-data"

const STORAGE_KEY = "ai-safety-incidents"

export type SeverityType = "Low" | "Medium" | "High" | "All"
export type SortOrderType = "Newest First" | "Oldest First" | "Severity (High to Low)" | "Severity (Low to High)"

export function useIncidents() {
  // Initialize with mock data first
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)
  const [isInitialized, setIsInitialized] = useState(false)
  const [filterSeverity, setFilterSeverity] = useState<SeverityType>("All")
  const [sortOrder, setSortOrder] = useState<SortOrderType>("Newest First")

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setIncidents(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading incidents from localStorage:", error)
    }
    setIsInitialized(true)
  }, [])

  // Save to localStorage whenever incidents change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents))
      } catch (error) {
        console.error("Error saving incidents to localStorage:", error)
      }
    }
  }, [incidents, isInitialized])

  const addIncident = (newIncident: Omit<Incident, "id" | "reported_at">) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map((i) => i.id)) + 1,
      reported_at: new Date().toISOString(),
    }
    setIncidents(prev => [...prev, incident])
  }

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(prev => prev.map((i) => (i.id === updatedIncident.id ? updatedIncident : i)))
  }

  const deleteIncident = (id: number) => {
    setIncidents(prev => prev.filter((i) => i.id !== id))
  }

  // Memoize the filtered and sorted incidents to prevent unnecessary recalculations
  const filteredAndSortedIncidents = useMemo(() => {
    let result = [...incidents]

    // Apply severity filter
    if (filterSeverity !== "All") {
      result = result.filter((incident) => incident.severity === filterSeverity)
    }

    // Apply sorting
    switch (sortOrder) {
      case "Newest First":
        result.sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime())
        break
      case "Oldest First":
        result.sort((a, b) => new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime())
        break
      case "Severity (High to Low)":
        const severityOrder = { High: 3, Medium: 2, Low: 1 }
        result.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity])
        break
      case "Severity (Low to High)":
        const severityOrderReverse = { Low: 1, Medium: 2, High: 3 }
        result.sort((a, b) => severityOrderReverse[a.severity] - severityOrderReverse[b.severity])
        break
    }

    return result
  }, [incidents, filterSeverity, sortOrder]) // Only recalculate when these dependencies change

  return {
    incidents: filteredAndSortedIncidents,
    addIncident,
    updateIncident,
    deleteIncident,
    setFilterSeverity,
    setSortOrder,
    filterSeverity,
    sortOrder,
  }
} 