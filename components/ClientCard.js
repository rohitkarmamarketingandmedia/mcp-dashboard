// components/ClientCard.js
import { useState } from 'react'

export default function ClientCard({ client }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'paused': 'bg-gray-100 text-gray-800'
  }

  const industryIcons = {
    'healthcare': '🏥',
    'construction': '🏗️',
    'tech': '💻',
    'vr_gaming': '🎮',
    'default': '📊'
  }

  const icon = industryIcons[client.industry] || industryIcons.default

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-4xl">{icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[client.status]}`}>
            {client.status.toUpperCase()}
          </span>
        </div>
        <h3 className="text-2xl font-bold">{client.name}</h3>
        <p className="text-blue-100 text-sm mt-1 capitalize">{client.industry || 'General'}</p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{client.kits}</div>
            <div className="text-xs text-gray-600 mt-1">Kits Generated</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">${client.kits * 750}</div>
            <div className="text-xs text-gray-600 mt-1">Revenue Value</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            {isExpanded ? '▼ Hide Details' : '▶ View Details'}
          </button>
          
          {isExpanded && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold capitalize">{client.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Industry:</span>
                <span className="font-semibold capitalize">{client.industry}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Kits:</span>
                <span className="font-semibold">{client.kits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Value:</span>
                <span className="font-semibold">${750}/kit</span>
              </div>
              
              <button className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                + Generate New Kit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
