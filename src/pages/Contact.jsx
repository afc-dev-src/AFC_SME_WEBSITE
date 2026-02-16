import { useState } from 'react'

// Placeholder email function
function sendEmailNotification(formData) {
  console.log('Contact form submitted:', formData)
  return { success: true, message: 'Your message has been received.' }
}

export default function Contact() {
  const officeAddress = 'Unit 309 3F AIC Gold Tower Emerald Avenue cor. Garnet Road Ortigas, Pasig City'
  const mapQuery = encodeURIComponent(officeAddress)
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const result = sendEmailNotification(formData)
    if (result.success) {
      setSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div>
      <section className="py-12 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">We're here to help. Reach out anytime.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Get in Touch</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">Address</h3>
                  <p className="text-gray-600">
                    Unit 309 3F AIC Gold Tower
                    <br />
                    Emerald Avenue cor. Garnet Road
                    <br />
                    Ortigas, Pasig City
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">Phone</h3>
                  <p className="text-gray-600">+63 (9) 178215815 (Mobile)</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">Email</h3>
                  <p className="text-gray-600">customersupport@afcsme.com.ph</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 3:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  <p className="font-bold">Thank you!</p>
                  <p>We've received your message and will respond within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="Your name"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Visit Our Office</h2>
          <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <iframe
              title="AFC SME Office Location"
              src={mapEmbedUrl}
              className="w-full h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
