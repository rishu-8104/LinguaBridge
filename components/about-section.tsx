// Import the WorkflowDiagram component
"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, Globe, ImportIcon as Translate, Database, ToggleLeft } from "lucide-react"
import { WorkflowDiagram } from "./workflow-diagram"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="py-8 border-t border-slate-200 dark:border-gray-700 mt-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">{t("about.title")}</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-slate-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Languages className="h-5 w-5 text-blue-600" />
                {t("about.feature1.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.feature1.description")}</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Translate className="h-5 w-5 text-blue-600" />
                {t("about.feature2.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.feature2.description")}</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ToggleLeft className="h-5 w-5 text-blue-600" />
                {t("about.feature3.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.feature3.description")}</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-blue-600" />
                {t("about.feature4.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.feature4.description")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            {t("about.techTitle")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{t("about.techDescription")}</p>

          <WorkflowDiagram />
        </div>
      </div>
    </section>
  )
}
