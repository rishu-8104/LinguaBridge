"use server"

import { neon } from "@neondatabase/serverless"
import type { BlogPost } from "./types"

// Initialize the Neon SQL client
const sql = neon(process.env.DATABASE_URL!)

// Get all blog posts
export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await sql`
      SELECT id::text, title_en, title_fi, content_en, content_fi, timestamp::text
      FROM blog_posts
      ORDER BY timestamp DESC
    `
    return result as BlogPost[]
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Add a new blog post to the database
export async function addBlogPost(post: BlogPost): Promise<void> {
  try {
    await sql`
      INSERT INTO blog_posts (id, title_en, title_fi, content_en, content_fi, timestamp)
      VALUES (${post.id}, ${post.title_en}, ${post.title_fi}, ${post.content_en}, ${post.content_fi}, ${post.timestamp})
    `
  } catch (error) {
    console.error("Error adding blog post:", error)
    throw new Error("Failed to save blog post")
  }
}

// Get blog posts filtered by language (this function doesn't actually filter by language
// since we're returning all posts, but we keep it for API compatibility)
export async function getBlogPostsByLanguage(language: "en" | "fi"): Promise<BlogPost[]> {
  return readBlogPosts()
}
