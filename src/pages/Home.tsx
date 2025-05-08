import {Link} from "react-router-dom"
import { ArrowRight, BadgeCheck, Bell, CreditCard, Lock, BarChart3, Award, School, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b bg-white">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Zero Cash</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:underline" >
                Home
              </Link>
              <Link to="#about" className="text-sm font-medium hover:underline">
                About Us
              </Link>
              <Link to ="#contact" className="text-sm font-medium hover:underline">
                Contact Us
              </Link>
            </nav>
            <Button>Sign In</Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Zero Cash – The Future of Cashless Campus Transactions
                  </h1>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Enabling secure, cashless transactions for students within educational institutions.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline">
                      Request a Demo
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                      src="/placeholder.svg?height=400&width=400"
                      alt="Zero Cash Hero"
                      className="rounded-lg object-cover"
                      width={400}
                      height={400}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="py-12 md:py-16 lg:py-20" id="about">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Vision</h2>
                <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                  Zero Cash aims to revolutionize campus transactions by eliminating physical cash handling. Our QR
                  code-based system enables students to make secure payments across campus facilities like canteens and
                  bookstores, while providing parents with complete visibility and control over spending.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                Key Features
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Lock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Secure QR Code System</h3>
                  <p className="text-gray-500 mt-2">Unique QR codes for each student ensuring secure transactions</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Real-time Dashboards</h3>
                  <p className="text-gray-500 mt-2">Comprehensive analytics for parents, staff, and administrators</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Role-based Access</h3>
                  <p className="text-gray-500 mt-2">Tailored interfaces for parents, staff, and administrators</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Bell className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Notification Alerts</h3>
                  <p className="text-gray-500 mt-2">Instant alerts for transactions and low balance</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Reward System</h3>
                  <p className="text-gray-500 mt-2">Points earned for transactions that can be redeemed</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <School className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Institution Control</h3>
                  <p className="text-gray-500 mt-2">Complete control for institutions over user management</p>
                </div>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                Advantages
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">No Cash Handling</h3>
                    <p className="text-gray-500 mt-2">Eliminates the need for students to carry physical cash</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Parental Supervision</h3>
                    <p className="text-gray-500 mt-2">Parents can monitor spending and add funds remotely</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Time-saving for Staff</h3>
                    <p className="text-gray-500 mt-2">Quick and efficient transaction processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Eco-friendly</h3>
                    <p className="text-gray-500 mt-2">Reduces paper receipts and physical currency handling</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Emergency Blocking</h3>
                    <p className="text-gray-500 mt-2">Instantly block QR codes in case of loss or suspicious activity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Secure Transactions</h3>
                    <p className="text-gray-500 mt-2">Multi-layer security with OTP verification</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Reviews */}
          <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                User Reviews
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "Zero Cash has transformed how we handle transactions in our school. Students no longer need to carry
                    cash, and parents have complete visibility."
                  </p>
                  <div>
                    <p className="font-bold">Dr. Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">Principal, Delhi Public School</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "As a parent, I love being able to monitor my child's spending and add funds remotely. The
                    notification system gives me peace of mind."
                  </p>
                  <div>
                    <p className="font-bold">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Parent</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "The system is incredibly easy to use. Scanning QR codes and processing payments takes seconds, which
                    has reduced queues in our canteen."
                  </p>
                  <div>
                    <p className="font-bold">Anand Patel</p>
                    <p className="text-sm text-gray-500">Canteen Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who It's For */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                Who It's For
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <School className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Institutions</h3>
                  <p className="text-gray-500">
                    Schools and colleges looking to modernize their payment systems and provide a safer environment for
                    students.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Parents</h3>
                  <p className="text-gray-500">
                    Parents who want visibility and control over their children's spending while ensuring they don't need
                    to carry cash.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Staff</h3>
                  <p className="text-gray-500">
                    School staff who need an efficient way to process payments and manage transactions across campus
                    facilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Screenshots/Demos */}
          <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                System Preview
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg shadow-sm">
                  <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Dashboard Preview"
                      className="w-full h-auto"
                      width={400}
                      height={300}
                  />
                  <div className="bg-white p-4">
                    <h3 className="font-bold">Parent Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time balance and transaction monitoring</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-sm">
                  <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="QR Code Scanning"
                      className="w-full h-auto"
                      width={400}
                      height={300}
                  />
                  <div className="bg-white p-4">
                    <h3 className="font-bold">QR Code Transaction</h3>
                    <p className="text-sm text-gray-500">Secure and quick payment processing</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg shadow-sm">
                  <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Admin Panel"
                      className="w-full h-auto"
                      width={400}
                      height={300}
                  />
                  <div className="bg-white p-4">
                    <h3 className="font-bold">Admin Management</h3>
                    <p className="text-sm text-gray-500">Comprehensive user and transaction management</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Future Plans */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                Future Plans
              </h2>
              <div className="mx-auto max-w-3xl">
                <ul className="grid gap-4 md:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>UPI/Card Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Mobile Apps for All Platforms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Enhanced Loyalty Program</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>AI Fraud Detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Multi-institution Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Advanced Analytics Dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="py-12 md:py-16 lg:py-20" id="contact">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
                  Contact Us
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <p className="flex items-center gap-2">
                        <span className="font-bold">Email:</span> info@zerocash.edu
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-bold">Phone:</span> +91 98765 43210
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-bold">Address:</span> Tech Park, Bangalore, India
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input id="name" className="w-full rounded-md border border-gray-300 p-2" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-gray-300 p-2"
                          placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                          id="message"
                          className="w-full rounded-md border border-gray-300 p-2"
                          rows={4}
                          placeholder="Your message"
                      ></textarea>
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-gray-50">
          <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Zero Cash</span>
              </div>
              <p className="text-sm text-gray-500">
                Enabling secure, cashless transactions for educational institutions.
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="#about" className="hover:underline">
                  About Us
                </Link>
                <Link href="#contact" className="hover:underline">
                  Contact Us
                </Link>
              </nav>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
          <div className="border-t py-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Zero Cash. All rights reserved.</p>
          </div>
        </footer>
      </div>
  )
}
