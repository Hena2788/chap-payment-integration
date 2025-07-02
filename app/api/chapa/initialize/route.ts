import { type NextRequest, NextResponse } from "next/server"

// Chapa Test API Configuration - using environment variables
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || "CHASECK_TEST-your-secret-key-here"
const CHAPA_API_URL = "https://api.chapa.co/v1/transaction/initialize"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      amount,
      currency = "ETB",
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      callback_url,
      return_url,
      description,
      meta,
    } = body

    // Validate required fields
    if (!amount || !email || !first_name || !last_name || !tx_ref) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields",
          missing_fields: {
            amount: !amount,
            email: !email,
            first_name: !first_name,
            last_name: !last_name,
            tx_ref: !tx_ref,
          },
        },
        { status: 400 },
      )
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

    // Prepare payment data for Chapa
    const paymentData = {
      amount: Number.parseFloat(amount.toString()),
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      callback_url,
      return_url,
      description: description || `Payment for order ${tx_ref}`,
      meta: meta || {},
    }

    console.log("Sending payment data to Chapa:", JSON.stringify(paymentData, null, 2))

    // Make request to Chapa API
    const response = await fetch(CHAPA_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    const chapaResponse = await response.json()

    console.log("Chapa API Response:", JSON.stringify(chapaResponse, null, 2))
    console.log("Response status:", response.status)

    if (response.ok && chapaResponse.status === "success") {
      return NextResponse.json({
        status: "success",
        message: "Payment initialized successfully",
        data: chapaResponse.data,
      })
    } else {
      // Return detailed error information
      return NextResponse.json(
        {
          status: "error",
          message: chapaResponse.message || "Payment initialization failed",
          details: chapaResponse,
          http_status: response.status,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Chapa initialization error:", error)
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
