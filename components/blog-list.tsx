"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { getBlogPosts } from "@/lib/blog-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BlogPost } from "@/lib/types"
import { Loader2, Calendar } from "lucide-react"
import { ExpandedPost } from "./expanded-post"

export default function BlogList() {
  const { language, t } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedPosts = await getBlogPosts(language)
        setPosts(fetchedPosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setError("Failed to load blog posts. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [language])

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "fi-FI", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">{t("blog.loading")}</p>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <div className="text-center text-gray-500 dark:text-gray-400 max-w-md">
          <h3 className="text-xl font-semibold mb-2">{t("blog.noPostsYet")}</h3>
          <p className="text-muted-foreground">{t("blog.createNew")}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden flex flex-col h-full border border-slate-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <CardHeader className="pb-2 space-y-1">
              <CardTitle className="text-xl">{post[`title_${language}`]}</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.timestamp)}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
                {post[`content_${language}`]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPost && <ExpandedPost post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  )
}
