import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    keyExists: !!process.env.GNEWS_API_KEY,
  });
}