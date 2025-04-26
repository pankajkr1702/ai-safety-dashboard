"use client"

import { useState } from "react"
import type React from "react"
import { Home, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1e1e1e] p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="w-16 bg-[#0a0a0a] flex flex-col items-center py-6 border-r border-[#1e1e1e] h-full">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b4a] to-[#ff8066] rounded-md flex items-center justify-center mb-8 shadow-lg">
            <Home size={16} className="text-white" />
          </div>

          <nav className="flex flex-col items-center gap-4">
            <SidebarIcon icon={<Home size={20} />} active />
          </nav>

          <div className="mt-auto">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e] transition-all duration-300"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function SidebarIcon({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-[#1e1e1e] to-[#252525] text-white shadow-md"
          : "text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e]"
      }`}
    >
      {icon}
    </div>
  )
}
