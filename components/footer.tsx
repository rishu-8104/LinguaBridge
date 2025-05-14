"use client"

import { useLanguage } from "./language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-primary font-bold text-xl">
              <span className="text-primary">Lingua</span>
              <span className="text-blue-600">Bridge</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("footer.poweredBy")} <span className="font-medium">Gemini 1.5 Flash API</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} LinguaBridge</div>
        </div>
      </div>
    </footer>
  )
}
