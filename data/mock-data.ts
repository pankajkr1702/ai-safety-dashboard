import type { Incident } from "@/types/incident"

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination issues. The bias was detected during a routine audit of recommendation patterns across different user groups.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information when asked about emergency protocols in a chemical plant. This could have led to dangerous situations if the information had been followed in a real emergency scenario.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata in its responses. The leak was limited to session information and did not include personal identifiable information or credentials.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Autonomous Vehicle Decision Error",
    description:
      "AI system in autonomous vehicle made an incorrect priority decision at an intersection, nearly causing a collision. The system prioritized efficiency over safety in an edge case scenario not covered in training data.",
    severity: "High",
    reported_at: "2025-04-05T11:45:00Z",
  },
  {
    id: 5,
    title: "Content Moderation False Positive",
    description:
      "AI content moderation system incorrectly flagged educational medical content as inappropriate, causing temporary removal of important health information from a public health platform.",
    severity: "Medium",
    reported_at: "2025-03-25T16:20:00Z",
  },
  {
    id: 6,
    title: "Facial Recognition Misidentification",
    description:
      "Facial recognition system misidentified an individual in a non-critical security application. The error was caught by human oversight before any consequences occurred.",
    severity: "Low",
    reported_at: "2025-04-10T08:30:00Z",
  },
  {
    id: 7,
    title: "AI Assistant Unauthorized Action",
    description:
      "AI assistant executed an action without explicit user confirmation, ordering items based on a conversational context that was misinterpreted as a direct command.",
    severity: "Medium",
    reported_at: "2025-04-08T13:10:00Z",
  },
]
