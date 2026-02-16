import { useEffect, useState } from 'react'

const moneyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const formatMoney = (value) => {
  return moneyFormatter.format(Number(value) || 0)
}

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [annualRate, setAnnualRate] = useState(0.9)
  const [termMonths, setTermMonths] = useState(60)
  const [result, setResult] = useState(null)
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    const totalMonths = parseInt(termMonths || 0, 10)

    if (loanAmount <= 0 || annualRate < 0 || totalMonths <= 0) {
      setResult(null)
      setSchedule([])
      return
    }

    const monthlyRate = annualRate / 100 / 12
    const monthlyPayment = monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const totalRepayment = monthlyPayment * totalMonths
    const totalInterest = totalRepayment - loanAmount

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    })

    let balance = loanAmount
    const newSchedule = []

    for (let i = 1; i <= Math.min(12, totalMonths); i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      newSchedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      })
    }

    setSchedule(newSchedule)
  }, [loanAmount, annualRate, termMonths])

  return (
    <div>
      <section className="py-12 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Calculator</h1>
          <p className="text-xl text-gray-300">Estimate your monthly payments and total costs</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₱)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  min="100000"
                  step="10000"
                />
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-3 accent-red-600"
                />
                <p className="text-xs text-gray-500 mt-2">{formatMoney(loanAmount)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                  className="w-full mt-3 accent-red-600"
                />
                <p className="text-xs text-gray-500 mt-2">{annualRate}% p.a.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Months)</label>
                <input
                  type="number"
                  value={termMonths}
                  onChange={(e) => setTermMonths(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  min="1"
                  max="360"
                />
                <input
                  type="range"
                  min="1"
                  max="360"
                  step="1"
                  value={termMonths}
                  onChange={(e) => setTermMonths(parseInt(e.target.value, 10) || 0)}
                  className="w-full mt-3 accent-red-600"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {termMonths} month{termMonths !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-navy to-blue-900 text-white p-8 rounded mb-10 text-center">
                <p className="text-sm font-medium text-gray-300 mb-2">MONTHLY PAYMENT</p>
                <h2 className="text-5xl font-bold mb-4">{formatMoney(result.monthlyPayment)}</h2>
                <p className="text-gray-300">
                  Term: {termMonths} month{termMonths !== 1 ? 's' : ''} ({(termMonths / 12).toFixed(1)} years)
                </p>
              </div>
            )}

            {result && (
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-50 p-6 rounded border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Total Interest</p>
                  <p className="text-3xl font-bold text-red-500">{formatMoney(result.totalInterest)}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Total Repayment</p>
                  <p className="text-3xl font-bold text-navy">{formatMoney(result.totalRepayment)}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium mb-2">Loan Amount</p>
                  <p className="text-3xl font-bold text-charcoal">{formatMoney(loanAmount)}</p>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-8">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> These estimates are for informational purposes only. Actual payments may vary based on final loan terms, processing fees, and approval conditions. Subject to approval.
              </p>
            </div>

            {schedule.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4">Amortization Schedule (First 12 Months)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-300">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="border p-3 text-left">Month</th>
                        <th className="border p-3 text-right">Payment</th>
                        <th className="border p-3 text-right">Principal</th>
                        <th className="border p-3 text-right">Interest</th>
                        <th className="border p-3 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row) => (
                        <tr key={row.month} className="hover:bg-gray-50">
                          <td className="border p-3">{row.month}</td>
                          <td className="border p-3 text-right">{formatMoney(row.payment)}</td>
                          <td className="border p-3 text-right">{formatMoney(row.principal)}</td>
                          <td className="border p-3 text-right">{formatMoney(row.interest)}</td>
                          <td className="border p-3 text-right font-bold">{formatMoney(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Use this calculator to explore options, then apply with us for competitive terms.
          </p>
          <a
            href="/#inquiry-form"
            className="inline-block px-8 py-3 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
          >
            Start Your Application
          </a>
        </div>
      </section>
    </div>
  )
}
