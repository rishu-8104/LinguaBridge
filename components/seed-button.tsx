"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Database } from "lucide-react"

export function SeedButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSeed = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/seed")
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage("Error seeding database")
      console.error("Error seeding database:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleSeed} disabled={isLoading} variant="outline" className="flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Seeding...</span>
          </>
        ) : (
          <>
            <Database className="h-4 w-4" />
            <span>Seed Sample Data</span>
          </>
        )}
      </Button>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
