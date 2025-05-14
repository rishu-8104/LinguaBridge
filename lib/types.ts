export interface BlogPost {
  id: string
  title_en: string
  title_fi: string
  content_en: string
  content_fi: string
  timestamp: string
}

export interface BlogPostInput {
  title: string
  content: string
  sourceLanguage: "en" | "fi"
}
