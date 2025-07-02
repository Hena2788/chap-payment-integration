"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const txRef = searchParams.get("tx_ref")
      const status = searchParams.get("status")

      if (status === "success" && txRef) {
        // Redirect to success page
        router.push(`/payment/success?tx_ref=${txRef}&status=${status}`)
      } else {
        // Redirect to failure page or back to checkout
        router.push(`/payment/failed?tx_ref=${txRef}&status=${status}`)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">Processing your payment...</p>
      </div>
    </div>
  )
}
