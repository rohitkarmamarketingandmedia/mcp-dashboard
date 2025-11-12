// components/MetricsPanel.js
export default function MetricsPanel({ metrics }) {
  if (!metrics) return null

  const stats = [
    {
      label: 'IT Growth',
      value: metrics.it_growth,
      icon: '📈',
      color: 'from-green-400 to-emerald-600',
      description: '5-year sector expansion'
    },
    {
      label: 'Tech Firms',
      value: metrics.tech_firms.toLocaleString(),
      icon: '🏢',
      color: 'from-blue-400 to-blue-600',
      description: 'Established companies'
    },
    {
      label: 'Average Wage',
      value: `$${(metrics.avg_wage / 1000).toFixed(0)}K`,
      icon: '💰',
      color: 'from-yellow-400 to-orange-600',
      description: 'Tech sector compensation'
    },
    {
      label: 'Annual Relos',
      value: metrics.annual_relos,
      icon: '🚀',
      color: 'from-purple-400 to-purple-600',
      description: 'Successful relocations'
    },
    {
      label: 'Jobs Created',
      value: metrics.jobs_created,
      icon: '👥',
      color: 'from-indigo-400 to-indigo-600',
      description: 'Through EDC initiatives'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="group">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:scale-105">
            {/* Gradient Header */}
            <div className={`bg-gradient-to-br ${stat.color} p-4 text-center`}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white drop-shadow-lg">
                {stat.value}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.label}</h3>
              <p className="text-xs text-gray-600">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
