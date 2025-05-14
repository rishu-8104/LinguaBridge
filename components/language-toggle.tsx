"use client"

import { useLanguage } from "./language-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center">
      <ToggleGroup
        type="single"
        value={language}
        onValueChange={(value) => value && setLanguage(value as "en" | "fi")}
        className="border border-slate-200 dark:border-gray-700 rounded-md overflow-hidden"
      >
        <ToggleGroupItem value="en" aria-label={t("language.english")} className="px-3 py-1.5 text-sm font-medium">
          🇬🇧 {t("language.english")}
        </ToggleGroupItem>
        <ToggleGroupItem value="fi" aria-label={t("language.finnish")} className="px-3 py-1.5 text-sm font-medium">
          🇫🇮 {t("language.finnish")}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
