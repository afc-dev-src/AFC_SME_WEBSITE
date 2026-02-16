import HeroSlider from '../components/HeroSlider'
import InquiryForm from '../components/InquiryForm'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { properties as allProperties } from '../data/properties'
import remImage from '../Images/RENm.jpg'
import takeoutImage from '../Images/takeout.jpg'
import acquisitionImage from '../Images/acqui.jpg'
import productREM from '../Images/our_products_REM.png'
import productRET from '../Images/our_products_RET.png'
import productREA from '../Images/our_products_REA.png'

const products = [
  {
    title: 'Real Estate Loan',
    description: 'Property financing for SMEs and buyers who need clear terms and practical timelines.',
    href: '/products#product-mortgage',
    icon: productREM,
  },
  {
    title: 'Real Estate Take-out',
    description: 'Refinance existing loans into a structure that better supports your cash flow.',
    href: '/products#product-takeout',
    icon: productRET,
  },
  {
    title: 'Acquisition Loan',
    description: 'Funding support for strategic acquisitions and expansion-driven property purchases.',
    href: '/products#product-acquisition',
    icon: productREA,
  },
]

const steps = [
  { title: 'Initial Inquiry', desc: 'Share your financing goal and preferred structure.' },
  { title: 'Assessment', desc: 'We evaluate eligibility and supporting documents.' },
  { title: 'Approval', desc: 'Receive terms and confirmation once requirements are complete.' },
  { title: 'Release', desc: 'Funds are released based on the finalized loan agreement.' },
]

const faqHighlights = [
  {
    question: 'How long does approval usually take?',
    answer: 'Most applications get an initial decision within 2-3 business days.',
  },
  {
    question: 'Can I refinance an existing loan?',
    answer: 'Yes. Our takeout financing is designed for refinancing with better terms.',
  },
  {
    question: 'What is the typical maximum loan amount?',
    answer: 'Loan amount depends on profile and collateral, usually up to 80% of appraised value.',
  },
]

const differentiators = [
  {
    title: 'Transparent Terms',
    description: "No hidden fees. We lay out everything upfront so you know exactly what you're getting.",
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    title: 'Fast Processing',
    description: 'We know time matters. Our team works to evaluate and process your application quickly.',
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'SME-Focused',
    description: 'We built this company for small and medium businesses. Your needs come first.',
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14c2 0 4 1.2 4 3v2h-4M4 19v-2c0-1.8 2-3 4-3m8 5v-2c0-1.8-2-3-4-3s-4 1.2-4 3v2m7-10a3 3 0 11-6 0 3 3 0 016 0zm7 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Simple Requirements',
    description: 'We keep the paperwork reasonable. No unnecessary documents, no run-around.',
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3h6l4 4v14H6V3h2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h3" />
      </svg>
    ),
  },
  {
    title: 'Competitive Rates',
    description: 'Our rates are designed to be fair and competitive within the market.',
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l5-5 4 4 7-7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8h4v4" />
      </svg>
    ),
  },
  {
    title: 'Personal Service',
    description: "You'll work with real people who actually care about helping you succeed.",
    icon: (
      <svg className="w-6 h-6 text-[#1a1f4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l3 3 3-3m-9 1V9a3 3 0 013-3h.5a2 2 0 001.8-1.1 1 1 0 011.8 0A2 2 0 0015.9 6H16a3 3 0 013 3v4a3 3 0 01-3 3h-1" />
      </svg>
    ),
  },
]

export default function Home() {
  const previewLoanAmount = 1000000
  const previewAnnualRate = 0.9
  const previewTermMonths = 60

  const calculatorResult = useMemo(() => {
    if (previewLoanAmount <= 0 || previewTermMonths <= 0 || previewAnnualRate < 0) return null

    const months = previewTermMonths
    const monthlyRate = previewAnnualRate / 100 / 12

    const monthlyPayment = monthlyRate === 0
      ? previewLoanAmount / months
      : (previewLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
        (Math.pow(1 + monthlyRate, months) - 1)

    const totalRepayment = monthlyPayment * months
    const totalInterest = totalRepayment - previewLoanAmount

    return {
      monthlyPayment,
      totalRepayment,
      totalInterest,
    }
  }, [previewLoanAmount, previewAnnualRate, previewTermMonths])

  const featuredProperties = allProperties
    .filter((property) => property.status === 'Available')
    .slice(0, 3)

  const propertyImages = [remImage, takeoutImage, acquisitionImage]

  const getPropertyCategory = (type) => {
    if (type.toLowerCase().includes('commercial') || type.toLowerCase().includes('office')) {
      return 'Commercial'
    }
    if (type.toLowerCase().includes('lot')) {
      return 'Lot'
    }
    return 'Residential'
  }

  return (
    <div>
      <HeroSlider />

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-3">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e]">Financing that Fits your Needs</h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              We keep things simple. Pick the product that works for your situation, and we'll guide you from there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.title}
                to={product.href}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  <img
                    src={product.icon}
                    alt={`${product.title} icon`}
                    className="w-19 h-19 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-3">{product.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-6">{product.description}</p>
                <span className="inline-flex items-center gap-1.5 text-red-600 font-semibold text-sm hover:text-[#1a1f4e] transition-colors">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white">
        <div className="w-full max-w-[1279px] mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-red-600 text-sm font-semibold tracking-wider uppercase">Why AFC SME</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e] mt-4">What Makes Us Different</h2>
            <p className="text-gray-500 text-base md:text-lg mt-4 leading-relaxed">
              We're not the biggest finance company out there - but we believe that's our strength.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a1f4e] mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#1a1f4e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 border-2 border-white rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 border-2 border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-red-400 text-sm font-semibold tracking-wider uppercase">Loan Calculator</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Estimate Your Monthly Payments</h2>
              <p className="text-white/70 mt-4 max-w-lg leading-relaxed">
                Use our free calculator to get an idea of your monthly amortization, total interest, and repayment schedule.
                It takes less than a minute.
              </p>
              <Link
                to="/calculator"
                className="mt-7 inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold text-base px-7 py-3 rounded-xl shadow-lg shadow-red-600/30"
              >
                Try the Calculator
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {calculatorResult && (
              <div className="flex-1 max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/10 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-md bg-red-500/15 border border-red-400/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth={2} />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Quick Preview</h3>
                  </div>

                  <div className="space-y-3 text-sm md:text-base">
                    <div className="flex justify-between gap-4">
                      <span className="text-white/75">Loan Amount</span>
                      <span className="font-semibold">
                        {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(previewLoanAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/75">Interest Rate</span>
                      <span className="font-semibold">{previewAnnualRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/75">Term</span>
                      <span className="font-semibold">{previewTermMonths} Months</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                    <span className="text-xl md:text-2xl font-semibold text-white/95">Est. Monthly Payment</span>
                    <span className="text-2xl md:text-3xl font-bold text-red-300">
                      {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(calculatorResult.monthlyPayment)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-white/55">*Estimates only. Subject to approval.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-red-600 text-sm font-semibold tracking-wider uppercase">Foreclosed Properties</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e] mt-3">Browse Our Available Properties</h2>
            <p className="text-gray-500 text-base md:text-lg mt-4 leading-relaxed">
              Company-owned real estate at competitive prices. Take a look at what's available.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-72 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${propertyImages[index % propertyImages.length]})` }}
                >
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
                      {property.status}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#1a1f4e] text-white text-sm font-semibold">
                      {getPropertyCategory(property.type)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] leading-tight">{property.name}</h3>
                  <p className="text-gray-500 text-lg mt-2">{property.location}</p>

                  <p className="text-4xl font-bold text-red-600 mt-4">
                    {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(property.price)}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-200 text-base text-gray-500 flex flex-wrap items-center gap-4">
                    <span>{property.size}</span>
                    {property.bedrooms > 0 && <span>{property.bedrooms} BR</span>}
                    {property.bathrooms > 0 && <span>{property.bathrooms} BA</span>}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.features.split(',').slice(0, 3).map((feature) => (
                      <span key={`${property.id}-${feature}`} className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-sm">
                        {feature.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#1a1f4e] bg-white text-[#1a1f4e] font-semibold px-8 py-3 rounded-2xl transition-all duration-200 hover:bg-[#1a1f4e] hover:text-white"
            >
              Browse All Properties
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <p className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-3">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e]">How It Works</h2>
            </div>
            <p className="text-gray-500 max-w-xl">
              We keep lending straightforward, transparent, and responsive from first inquiry to release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a1f4e]/5 flex items-center justify-center shrink-0">
                  <span className="font-bold text-[#1a1f4e]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1f4e] mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-red-600 text-sm font-semibold tracking-wider uppercase">FAQs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e] mt-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-4">
              Quick answers to common loan, refinance, and approval questions.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqHighlights.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1f4e] leading-snug">{faq.question}</h3>
                <p className="text-gray-500 mt-3 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faqs"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#1a1f4e] bg-white text-[#1a1f4e] font-semibold px-7 py-3 rounded-2xl transition-all duration-200 hover:bg-[#1a1f4e] hover:text-white"
            >
              View All FAQs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <InquiryForm />
    </div>
  )
}
