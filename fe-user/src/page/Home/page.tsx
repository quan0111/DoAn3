import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Features } from "@/components/feature"
import { Templates } from "@/components/Cv-templates"
import { Testimonials } from "@/components/Testimonial"
import { CTA } from "@/components/cta"
import { Pricing } from "@/components/pricing"
import JobListings from "@/components/Job-list"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Templates />
        <JobListings></JobListings>
        <Testimonials />
        <CTA />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
