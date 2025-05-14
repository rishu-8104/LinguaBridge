"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { createBlogPost } from "@/lib/blog-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Languages } from "lucide-react"

interface BlogFormProps {
  onClose: () => void
}

export default function BlogForm({ onClose }: BlogFormProps) {
  const { t, language } = useLanguage()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return

    setError(null)
    setIsSubmitting(true)

    try {
      await createBlogPost({ title, content, sourceLanguage: language })
      onClose()
    } catch (error) {
      console.error("Error creating blog post:", error)
      setError("Failed to create blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-blue-600" />
            {t("blog.create")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              {t("blog.title")}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
              className="focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter post title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              {t("blog.content")}
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
              disabled={isSubmitting}
              className="focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your post content..."
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              {t("blog.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px] bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("blog.translating")}
                </span>
              ) : (
                t("blog.submit")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
