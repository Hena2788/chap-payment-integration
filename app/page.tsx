import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Zap, Shield, Headphones } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 2500,
    originalPrice: 3000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1800,
    originalPrice: 2200,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    description: "Feature-rich smartwatch with health monitoring",
  },
  {
    id: 3,
    name: "Wireless Speaker",
    price: 1200,
    originalPrice: 1500,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    description: "Portable Bluetooth speaker with premium sound",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 800,
    originalPrice: 1000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    description: "Professional gaming mouse with RGB lighting",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TechStore</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Products
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Test Mode
              </Badge>
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Premium Tech Products</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the latest in technology with secure payments powered by Chapa. Shop with confidence in our test
            environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Headphones className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3">{product.description}</CardDescription>
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()} ETB</span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} ETB
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/checkout?product=${product.id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TechStore?</h2>
            <p className="text-lg text-gray-600">Experience seamless shopping with Chapa payment integration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your transactions are protected with Chapa's secure payment gateway</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick and efficient payment processing for instant confirmations</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">TechStore</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for premium tech products with secure Chapa payments.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Headphones</li>
                <li>Smart Watches</li>
                <li>Speakers</li>
                <li>Gaming Gear</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Returns</li>
                <li>Warranty</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Payment</h4>
              <p className="text-gray-400 mb-2">Powered by Chapa</p>
              <Badge variant="outline" className="border-green-400 text-green-400">
                Test Mode Active
              </Badge>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechStore. All rights reserved. Payment processing by Chapa.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
