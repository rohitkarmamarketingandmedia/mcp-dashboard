// pages/index.js - MCP Dashboard Main Page
import { useState, useEffect } from 'react'
import Head from 'next/head'
import ClientCard from '../components/ClientCard'
import MetricsPanel from '../components/MetricsPanel'
import KitGenerator from '../components/KitGenerator'
import RevenueTracker from '../components/RevenueTracker'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mcp-framework.onrender.com'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiStatus, setAiStatus] = useState('checking')

  useEffect(() => {
    fetchDashboardData()
    checkAiStatus()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/edc_metrics`)
      const data = await response.json()
      setMetrics(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching metrics:', error)
      setLoading(false)
    }
  }

  const checkAiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      const data = await response.json()
      setAiStatus(data.features.ai_blog_generation ? 'active' : 'template')
    } catch (error) {
      setAiStatus('error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">Loading Innovation Engine...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Head>
        <title>MCP Innovation Engine | EDC Sarasota Dashboard</title>
        <meta name="description" content="AI-powered content generation for economic development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🚀 MCP Innovation Engine
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                EDC Sarasota | AI-Powered Content Generation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* AI Status Badge */}
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                aiStatus === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : aiStatus === 'template'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {aiStatus === 'active' && '🤖 AI Active'}
                {aiStatus === 'template' && '📝 Template Mode'}
                {aiStatus === 'error' && '⚠️ Connection Error'}
              </div>
              <button 
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 EDC Metrics Overview</h2>
          <MetricsPanel metrics={metrics?.metrics} />
        </div>

        {/* Revenue Tracker */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Revenue Tracker</h2>
          <RevenueTracker revenue={metrics?.revenue} />
        </div>

        {/* Active Clients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Active Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics?.clients?.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))}
          </div>
        </div>

        {/* Kit Generator */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Generate New Kit</h2>
          <KitGenerator apiUrl={API_BASE_URL} aiStatus={aiStatus} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>MCP Framework v2.0 | EDC Sarasota Innovation Engine</p>
            <p className="mt-1">Patent Pending | Michael Given, Kyle Ohme, Craig Wallace</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
