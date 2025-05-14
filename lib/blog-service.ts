"use server"

import type { BlogPost, BlogPostInput } from "./types"
import { translateText, detectLanguage } from "./translation-service"
import { addBlogPost, getBlogPostsByLanguage } from "./db-service"

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const { title, content, sourceLanguage } = input

  // Detect language to confirm it matches the UI language
  const detectedLanguage = await detectLanguage(content)
  console.log(`Detected language: ${detectedLanguage}, Source language: ${sourceLanguage}`)

  // Translate content
  const targetLanguage = sourceLanguage === "en" ? "fi" : "en"

  const translatedTitle = await translateText(title, sourceLanguage, targetLanguage)
  const translatedContent = await translateText(content, sourceLanguage, targetLanguage)

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title_en: sourceLanguage === "en" ? title : translatedTitle,
    title_fi: sourceLanguage === "fi" ? title : translatedTitle,
    content_en: sourceLanguage === "en" ? content : translatedContent,
    content_fi: sourceLanguage === "fi" ? content : translatedContent,
    timestamp: new Date().toISOString(),
  }

  // Save to our PostgreSQL database
  await addBlogPost(newPost)

  return newPost
}

export async function getBlogPosts(language: "en" | "fi"): Promise<BlogPost[]> {
  // Get posts from our PostgreSQL database
  return getBlogPostsByLanguage(language)
}
