"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, Home, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const txRef = searchParams.get("tx_ref")
  const status = searchParams.get("status")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
            <CardDescription className="text-lg">Unfortunately, your payment could not be processed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transaction Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono">{txRef || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-red-600 font-semibold">{status || "Failed"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">What can you do?</h3>
              <div className="text-left space-y-3">
                <div className="p-3 bg-white border rounded-lg">
                  <p className="text-sm">• Check your payment details and try again</p>
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <p className="text-sm">• Ensure you have sufficient funds</p>
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <p className="text-sm">• Contact your bank if the issue persists</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => window.history.back()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href="/">
                <Button>
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
