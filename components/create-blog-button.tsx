"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import BlogForm from "./blog-form"
import { PlusCircle } from "lucide-react"

export default function CreateBlogButton() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-1.5">
        <PlusCircle className="h-4 w-4" />
        <span>{t("blog.create")}</span>
      </Button>
      {isFormOpen && <BlogForm onClose={() => setIsFormOpen(false)} />}
    </>
  )
}
