import { type NextRequest, NextResponse } from "next/server"

// Chapa Test API Configuration - using environment variables
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || "CHASECK_TEST-your-secret-key-here"
const CHAPA_VERIFY_URL = "https://api.chapa.co/v1/transaction/verify"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const txRef = searchParams.get("tx_ref")

    if (!txRef) {
      return NextResponse.json({ status: "error", message: "Transaction reference is required" }, { status: 400 })
    }

    // Check if secret key is configured
    if (!CHAPA_SECRET_KEY || CHAPA_SECRET_KEY === "CHASECK_TEST-your-secret-key-here") {
      return NextResponse.json(
        {
          status: "error",
          message: "Chapa secret key not configured. Please add CHAPA_SECRET_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    console.log("Verifying transaction:", txRef)

    // Make request to Chapa verify API
    const response = await fetch(`${CHAPA_VERIFY_URL}/${txRef}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const chapaResponse = await response.json()

    console.log("Chapa Verify Response:", JSON.stringify(chapaResponse, null, 2))

    if (response.ok && chapaResponse.status === "success") {
      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data: chapaResponse.data,
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: chapaResponse.message || "Payment verification failed",
          details: chapaResponse,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Chapa verification error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
