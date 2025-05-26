"use client"

import { useEffect } from "react"
import BlogList from "./blog-list"
import { useBlog } from "./blog-context"

export default function BlogListWithRefresh() {
  const { setRefreshCallback } = useBlog()

  useEffect(() => {
    // Get the refresh function from the BlogList component
    const refreshFunction = () => {
      // This will be replaced with the actual refresh function
      console.log("Refreshing blog list")
    }

    // Set the refresh callback in the context
    setRefreshCallback(refreshFunction)

    // Cleanup
    return () => {
      setRefreshCallback(() => {})
    }
  }, [setRefreshCallback])

  return <BlogList />
}
