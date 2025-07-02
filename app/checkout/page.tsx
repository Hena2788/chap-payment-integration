"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Shield, Loader2 } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 2500,
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1800,
    image: "/placeholder.svg?height=200&width=200",
    description: "Feature-rich smartwatch with health monitoring",
  },
  {
    id: 3,
    name: "Wireless Speaker",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
    description: "Portable Bluetooth speaker with premium sound",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 800,
    image: "/placeholder.svg?height=200&width=200",
    description: "Professional gaming mouse with RGB lighting",
  },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: 1,
  })

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === Number.parseInt(productId))
      setProduct(foundProduct)
    }
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, formData.quantity + change)
    setFormData({
      ...formData,
      quantity: newQuantity,
    })
  }

  const handlePayment = async () => {
    if (!product || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const paymentPayload = {
        amount: product.price * formData.quantity,
        currency: "ETB",
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone,
        tx_ref: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        callback_url: `${window.location.origin}/payment/callback`,
        return_url: `${window.location.origin}/payment/success`,
        description: `Payment for ${product.name}`,
        meta: {
          product_id: product.id,
          quantity: formData.quantity,
        },
      }

      console.log("Sending payment request:", paymentPayload)

      const response = await fetch("/api/chapa/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      })

      const data = await response.json()

      console.log("API Response:", data)

      if (data.status === "success" && data.data?.checkout_url) {
        // Redirect to Chapa checkout
        window.location.href = data.data.checkout_url
      } else {
        // Show detailed error message
        const errorMessage = data.message || "Payment initialization failed"
        const details = data.details ? JSON.stringify(data.details, null, 2) : ""

        console.error("Payment initialization failed:", data)
        alert(`Payment Error: ${errorMessage}\n\nDetails: ${details}`)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert(`Network Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = product.price * formData.quantity
  const tax = Math.round(subtotal * 0.15) // 15% tax
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Test Mode
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Please provide your details for the payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+251912345678"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Secure Payment</span>
                </CardTitle>
                <CardDescription>Your payment is secured by Chapa's advanced encryption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <span>Supports all major payment methods</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} ETB</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Quantity</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={formData.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{formData.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => handleQuantityChange(1)}>
                      +
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (15%)</span>
                    <span>{tax.toLocaleString()} ETB</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toLocaleString()} ETB</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay with Chapa
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">
                    Test Mode
                  </Badge>
                  <p className="text-sm text-blue-700">
                    This is a test environment. No real money will be charged. Use test card numbers for payment
                    testing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
