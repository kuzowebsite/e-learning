"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "mn" : "en")}
      className="gap-2 transition-all duration-300 hover:scale-105"
    >
      <Languages className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
      <span className="font-semibold">{language === "en" ? "MN" : "EN"}</span>
    </Button>
  )
}
