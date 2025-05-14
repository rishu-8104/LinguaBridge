"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Calendar, Globe } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ExpandedPostProps {
  post: BlogPost
  onClose: () => void
}

export function ExpandedPost({ post, onClose }: ExpandedPostProps) {
  const { t } = useLanguage()
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "fi">("en")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLanguage === "en" ? "en-US" : "fi-FI", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-gray-700">
        <CardHeader className="relative pb-2 space-y-1">
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-2 top-2" aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl pr-8">{post[`title_${currentLanguage}`]}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.timestamp)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              <ToggleGroup
                type="single"
                value={currentLanguage}
                onValueChange={(value) => value && setCurrentLanguage(value as "en" | "fi")}
                className="border border-slate-200 dark:border-gray-700 rounded-md overflow-hidden"
              >
                <ToggleGroupItem
                  value="en"
                  aria-label={t("language.english")}
                  className="px-2 py-1 text-xs font-medium"
                >
                  🇬🇧
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="fi"
                  aria-label={t("language.finnish")}
                  className="px-2 py-1 text-xs font-medium"
                >
                  🇫🇮
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">{post[`content_${currentLanguage}`]}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-2 pb-4">
          <Button onClick={onClose} variant="outline">
            {t("blog.back")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
