"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function detectLanguage(text: string): Promise<"en" | "fi"> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    Detect the language of the following text. 
    Respond with only "en" for English or "fi" for Finnish.
    
    Text: "${text}"
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text().trim().toLowerCase()

    if (response.includes("fi")) {
      return "fi"
    } else {
      return "en"
    }
  } catch (error) {
    console.error("Error detecting language:", error)
    // Default to English if there's an error
    return "en"
  }
}

export async function translateText(
  text: string,
  sourceLanguage: "en" | "fi",
  targetLanguage: "en" | "fi",
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const sourceLang = sourceLanguage === "en" ? "English" : "Finnish"
    const targetLang = targetLanguage === "en" ? "English" : "Finnish"

    const prompt = `
    Translate the following ${sourceLang} text to ${targetLang}.
    Maintain the original meaning, tone, and formatting as closely as possible.
    Respond with ONLY the translated text, no explanations or additional content.
    
    Text to translate: "${text}"
    `

    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error translating text:", error)
    // Return original text if translation fails
    return text
  }
}
