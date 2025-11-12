// components/RevenueTracker.js
export default function RevenueTracker({ revenue }) {
  if (!revenue) return null

  // Parse revenue strings
  const monthly = parseInt(revenue.monthly_total.replace(/[$,]/g, ''))
  const annual = parseInt(revenue.annual_projection.replace(/[$,]/g, ''))

  const breakdown = [
    {
      label: 'EDC Subscription',
      value: revenue.edc_subscription,
      color: 'bg-blue-500',
      percentage: (2000 / monthly * 100).toFixed(0)
    },
    {
      label: 'Relocator Kits',
      value: revenue.relo_kits,
      color: 'bg-green-500',
      percentage: (15000 / monthly * 100).toFixed(0)
    }
  ]

  const monthlyTarget = 100000 // $100K/mo goal
  const progressPercentage = (monthly / monthlyTarget * 100).toFixed(1)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Revenue */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
          
          {/* Monthly Total */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-700 font-semibold mb-1">Monthly Revenue</div>
                <div className="text-4xl font-bold text-green-800">${monthly.toLocaleString()}</div>
              </div>
              <div className="text-5xl">💰</div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="text-sm text-green-700 font-semibold mb-1">Annual Projection</div>
              <div className="text-2xl font-bold text-green-800">${annual.toLocaleString()}</div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="space-y-3">
            {breakdown.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{width: `${item.percentage}%`}}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Progress */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Goal: $100K/mo</h3>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
            {/* Circular Progress */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                    className="text-purple-600 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-700">{progressPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-center">
              <div>
                <div className="text-sm text-purple-700 font-semibold">Current</div>
                <div className="text-xl font-bold text-purple-900">${monthly.toLocaleString()}/mo</div>
              </div>
              <div>
                <div className="text-sm text-purple-700 font-semibold">Remaining</div>
                <div className="text-xl font-bold text-purple-900">${(monthlyTarget - monthly).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Growth Path */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-800 mb-2">Growth Path</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Month 1-2:</span>
                <span className="font-semibold">$17K ✅</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Month 3-4:</span>
                <span className="font-semibold">$32K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Month 5-6:</span>
                <span className="font-semibold">$50K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Month 7+:</span>
                <span className="font-semibold text-purple-700">$100K 🎯</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
