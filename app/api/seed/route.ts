import { seedSampleData } from "@/lib/seed-data"
import { NextResponse } from "next/server"

export async function GET() {
  const result = await seedSampleData()
  return NextResponse.json(result)
}
