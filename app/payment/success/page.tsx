"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Home, Loader2 } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const txRef = searchParams.get("tx_ref")
  const status = searchParams.get("status")

  useEffect(() => {
    const verifyPayment = async () => {
      if (!txRef) {
        setError("Transaction reference not found")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/chapa/verify?tx_ref=${txRef}`)
        const data = await response.json()

        if (data.status === "success") {
          setPaymentData(data.data)
        } else {
          setError(data.message || "Payment verification failed")
        }
      } catch (error) {
        console.error("Verification error:", error)
        setError("Failed to verify payment")
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [txRef])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <CardTitle className="text-red-600">Payment Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button>
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your purchase. Your order has been confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transaction Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono">{paymentData?.tx_ref || txRef}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">
                    {paymentData?.amount ? `${paymentData.amount} ${paymentData.currency}` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {paymentData?.status || "Completed"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{paymentData?.method || "Chapa"}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Test Mode
                </Badge>
              </div>
              <p className="text-sm text-blue-700">This was a test transaction. No real money was charged.</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left p-4 bg-white border rounded-lg">
                  <h4 className="font-medium mb-2">📧 Email Confirmation</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive an email confirmation shortly with your order details.
                  </p>
                </div>
                <div className="text-left p-4 bg-white border rounded-lg">
                  <h4 className="font-medium mb-2">🚚 Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Your order will be processed and shipped within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Link href="/">
                <Button>
                  <Home className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
