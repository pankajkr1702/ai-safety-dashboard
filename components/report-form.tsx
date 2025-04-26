"use client"

import type React from "react"

import { useState } from "react"
import type { Incident, SeverityType } from "@/types/incident"

interface ReportFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void
  onCancel: () => void
}

export default function ReportForm({ onSubmit, onCancel }: ReportFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<SeverityType>("Medium")
  const [errors, setErrors] = useState<{ title?: string; description?: string }>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: { title?: string; description?: string } = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ title, description, severity })

    // Reset form
    setTitle("")
    setDescription("")
    setSeverity("Medium")
    setErrors({})
  }

  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-xl p-6 border border-[#333] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Report New AI Safety Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Incident Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-[#252525] border ${
                  errors?.title ? "border-red-500" : "border-[#333]"
                } rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b4a] transition-all duration-300`}
                placeholder="Enter incident title"
              />
              {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium mb-1">
                Severity Level
              </label>
              <div className="flex flex-wrap gap-4">
                {["Low", "Medium", "High"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={() => setSeverity(level as SeverityType)}
                      className="mr-2 accent-[#ff6b4a]"
                    />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Incident Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full h-[120px] bg-[#252525] border ${
                errors?.description ? "border-red-500" : "border-[#333]"
              } rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b4a] transition-all duration-300`}
              placeholder="Describe the AI safety incident in detail..."
            />
            {errors?.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#333] rounded-md text-sm hover:bg-[#252525] transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-[#ff6b4a] to-[#ff8066] hover:from-[#ff8066] hover:to-[#ff9b86] text-white rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg order-1 sm:order-2"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  )
}
