"use server"

import { neon } from "@neondatabase/serverless"

// Initialize the Neon SQL client
const sql = neon(process.env.DATABASE_URL!)

export async function seedSampleData() {
  try {
    // Check if we already have data
    const count = await sql`SELECT COUNT(*) FROM blog_posts`

    if (Number.parseInt(count[0].count) === 0) {
      // Insert sample data
      await sql`
        INSERT INTO blog_posts (id, title_en, title_fi, content_en, content_fi, timestamp)
        VALUES 
        (
          '1', 
          'Welcome to LinguaBridge', 
          'Tervetuloa LinguaBridgeen', 
          'This is a multilingual blog platform that automatically translates your content between English and Finnish using Google''s Gemini 1.5 Flash API.', 
          'Tämä on monikielinen blogialusta, joka kääntää sisältösi automaattisesti englannin ja suomen välillä käyttäen Googlen Gemini 1.5 Flash API:a.',
          CURRENT_TIMESTAMP
        ),
        (
          '2', 
          'How to Use This Platform', 
          'Kuinka käyttää tätä alustaa', 
          'Simply create a new post in either English or Finnish, and the system will automatically translate it to the other language. You can switch between languages using the toggle in the header.', 
          'Luo yksinkertaisesti uusi julkaisu joko englanniksi tai suomeksi, ja järjestelmä kääntää sen automaattisesti toiselle kielelle. Voit vaihtaa kielten välillä käyttämällä ylätunnisteen vaihtopainiketta.',
          CURRENT_TIMESTAMP - INTERVAL '1 day'
        )
      `
      return { success: true, message: "Sample data seeded successfully" }
    } else {
      return { success: true, message: "Database already contains data" }
    }
  } catch (error) {
    console.error("Error seeding data:", error)
    return { success: false, message: "Failed to seed sample data" }
  }
}
