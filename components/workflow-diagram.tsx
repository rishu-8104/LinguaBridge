"use client"

import { useLanguage } from "./language-provider"

export function WorkflowDiagram() {
  const { t } = useLanguage()

  return (
    <div className="mt-8">
      <div className="relative max-w-3xl mx-auto">
        {/* Step 1 */}
        <div className="flex items-start mb-12">
          <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            1
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium">{t("workflow.step1.title")}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t("workflow.step1.description")}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute left-4 top-8 h-12 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

        {/* Step 2 */}
        <div className="flex items-start mb-12">
          <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            2
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium">{t("workflow.step2.title")}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t("workflow.step2.description")}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute left-4 top-32 h-12 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

        {/* Step 3 */}
        <div className="flex items-start mb-12">
          <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            3
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium">{t("workflow.step3.title")}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t("workflow.step3.description")}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute left-4 top-56 h-12 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

        {/* Step 4 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            4
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium">{t("workflow.step4.title")}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t("workflow.step4.description")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
