import { LanguageProvider } from "@/components/language-provider"
import LanguageToggle from "@/components/language-toggle"
import BlogList from "@/components/blog-list"
import CreateBlogButton from "@/components/create-blog-button"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
        <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-primary font-bold text-2xl">
                <span className="text-primary">Lingua</span>
                <span className="text-blue-600">Bridge</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-gray-600 mx-2"></div>
              <LanguageToggle />
            </div>
            <div className="flex items-center">
              <CreateBlogButton />
            </div>
          </div>
        </header>
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogList />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
