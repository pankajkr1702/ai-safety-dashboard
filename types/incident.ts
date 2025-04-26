export type SeverityType = "Low" | "Medium" | "High"
export type SortOrder = "newest" | "oldest"

export interface Incident {
  id: number
  title: string
  description: string
  severity: SeverityType
  reported_at: string
}
