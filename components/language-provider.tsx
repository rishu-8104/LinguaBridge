"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fi"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "app.title": "LinguaBridge",
    "language.english": "English",
    "language.finnish": "Finnish",
    "blog.create": "Create Post",
    "blog.title": "Title",
    "blog.content": "Content",
    "blog.submit": "Submit",
    "blog.cancel": "Cancel",
    "blog.back": "Back to Posts",
    "blog.noPostsYet": "No blog posts yet. Create your first post!",
    "blog.translating": "Translating...",
    "blog.loading": "Loading blog posts...",
    "footer.poweredBy": "Powered by",
    "blog.createNew": "Write a new post",
    "blog.readMore": "Read more",
    "about.title": "What LinguaBridge Does",
    "about.feature1.title": "Multilingual Blog Platform",
    "about.feature1.description":
      "Create and manage blog posts in both English and Finnish with a seamless user experience.",
    "about.feature2.title": "Automatic Translation",
    "about.feature2.description":
      "Content is automatically translated between languages using Google's Gemini 1.5 Flash API, saving you time and effort.",
    "about.feature3.title": "Language Switching",
    "about.feature3.description":
      "Switch between languages with a simple toggle to view all content in your preferred language.",
    "about.feature4.title": "Global Accessibility",
    "about.feature4.description":
      "Make your content accessible to speakers of both languages without manual translation work.",
    "about.techTitle": "How It Works",
    "about.techDescription":
      "When you create a post, LinguaBridge detects the language, translates it to the other supported language, and stores both versions. This allows readers to seamlessly switch between languages while reading the same content.",
    "workflow.step1.title": "Create Content",
    "workflow.step1.description": "Write your blog post in either English or Finnish using the simple editor.",
    "workflow.step2.title": "Language Detection",
    "workflow.step2.description":
      "LinguaBridge automatically detects the language of your content using Gemini 1.5 Flash API.",
    "workflow.step3.title": "Automatic Translation",
    "workflow.step3.description":
      "Your content is translated to the other supported language while preserving meaning and context.",
    "workflow.step4.title": "Multilingual Publishing",
    "workflow.step4.description":
      "Both language versions are published simultaneously, allowing readers to switch languages seamlessly.",
  },
  fi: {
    "app.title": "LinguaBridge",
    "language.english": "Englanti",
    "language.finnish": "Suomi",
    "blog.create": "Luo Julkaisu",
    "blog.title": "Otsikko",
    "blog.content": "Sisältö",
    "blog.submit": "Lähetä",
    "blog.cancel": "Peruuta",
    "blog.back": "Takaisin Julkaisuihin",
    "blog.noPostsYet": "Ei vielä blogikirjoituksia. Luo ensimmäinen julkaisusi!",
    "blog.translating": "Käännetään...",
    "blog.loading": "Ladataan blogikirjoituksia...",
    "footer.poweredBy": "Käyttää",
    "blog.createNew": "Kirjoita uusi julkaisu",
    "blog.readMore": "Lue lisää",
    "about.title": "Mitä LinguaBridge Tekee",
    "about.feature1.title": "Monikielinen Blogialusta",
    "about.feature1.description":
      "Luo ja hallinnoi blogikirjoituksia sekä englanniksi että suomeksi saumattomalla käyttökokemuksella.",
    "about.feature2.title": "Automaattinen Käännös",
    "about.feature2.description":
      "Sisältö käännetään automaattisesti kielten välillä käyttäen Googlen Gemini 1.5 Flash API:a, säästäen aikaa ja vaivaa.",
    "about.feature3.title": "Kielen Vaihtaminen",
    "about.feature3.description":
      "Vaihda kielten välillä yksinkertaisella valitsimella nähdäksesi kaiken sisällön haluamallasi kielellä.",
    "about.feature4.title": "Globaali Saavutettavuus",
    "about.feature4.description":
      "Tee sisällöstäsi saavutettavaa molempien kielten puhujille ilman manuaalista käännöstyötä.",
    "about.techTitle": "Miten Se Toimii",
    "about.techDescription":
      "Kun luot julkaisun, LinguaBridge tunnistaa kielen, kääntää sen toiselle tuetulle kielelle ja tallentaa molemmat versiot. Tämä mahdollistaa lukijoiden saumattoman kielten vaihdon samaa sisältöä lukiessa.",
    "workflow.step1.title": "Luo Sisältöä",
    "workflow.step1.description":
      "Kirjoita blogikirjoituksesi joko englanniksi tai suomeksi käyttäen yksinkertaista editoria.",
    "workflow.step2.title": "Kielen Tunnistus",
    "workflow.step2.description":
      "LinguaBridge tunnistaa automaattisesti sisältösi kielen käyttäen Gemini 1.5 Flash API:a.",
    "workflow.step3.title": "Automaattinen Käännös",
    "workflow.step3.description":
      "Sisältösi käännetään toiselle tuetulle kielelle säilyttäen merkityksen ja asiayhteyden.",
    "workflow.step4.title": "Monikielinen Julkaisu",
    "workflow.step4.description":
      "Molemmat kieliversiot julkaistaan samanaikaisesti, jolloin lukijat voivat vaihtaa kieltä saumattomasti.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
