"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface BlogContextType {
  refreshBlogList: () => void
  setRefreshCallback: (callback: () => void) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [refreshCallback, setRefreshCallbackState] = useState<(() => void) | null>(null)

  const refreshBlogList = useCallback(() => {
    if (refreshCallback) {
      refreshCallback()
    }
  }, [refreshCallback])

  const setRefreshCallback = useCallback((callback: () => void) => {
    setRefreshCallbackState(() => callback)
  }, [])

  return <BlogContext.Provider value={{ refreshBlogList, setRefreshCallback }}>{children}</BlogContext.Provider>
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
