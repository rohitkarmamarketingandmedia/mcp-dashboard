// components/KitGenerator.js
import { useState } from 'react'

export default function KitGenerator({ apiUrl, aiStatus }) {
  const [formData, setFormData] = useState({
    keyword: '',
    quote: 'play here, build here',
    geo: 'Sarasota',
    industry: 'vr_gaming'
  })
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const industries = [
    { value: 'vr_gaming', label: '🎮 VR/Gaming Studios', desc: 'Immersive tech & gaming' },
    { value: 'tech_startups', label: '💻 Tech Startups', desc: 'SaaS & software dev' },
    { value: 'construction', label: '🏗️ Construction', desc: 'Real estate development' },
    { value: 'healthcare', label: '🏥 Healthcare', desc: 'Medical practices' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGenerating(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${apiUrl}/generate_relo_kit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Generation failed')

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Industry Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Industry Template
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <button
                key={industry.value}
                type="button"
                onClick={() => setFormData({...formData, industry: industry.value})}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  formData.industry === industry.value
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-2">{industry.label.split(' ')[0]}</div>
                <div className="font-semibold text-sm text-gray-900">
                  {industry.label.split(' ').slice(1).join(' ')}
                </div>
                <div className="text-xs text-gray-600 mt-1">{industry.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Keyword / Topic
            </label>
            <input
              type="text"
              value={formData.keyword}
              onChange={(e) => setFormData({...formData, keyword: e.target.value})}
              placeholder="e.g., VR Gaming Studios"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand Quote
            </label>
            <input
              type="text"
              value={formData.quote}
              onChange={(e) => setFormData({...formData, quote: e.target.value})}
              placeholder="e.g., play here, build here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Geographic Focus
          </label>
          <input
            type="text"
            value={formData.geo}
            onChange={(e) => setFormData({...formData, geo: e.target.value})}
            placeholder="e.g., Sarasota"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={generating}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            generating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {generating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Generating Kit... ({aiStatus === 'active' ? 'AI Mode' : 'Template Mode'})
            </span>
          ) : (
            '⚡ Generate Relocator Kit'
          )}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">❌ Error: {error}</p>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-bold text-green-800 mb-2">✅ Kit Generated Successfully!</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Word Count</div>
                <div className="text-xl font-bold text-green-700">{result.outputs.blog.word_count}</div>
              </div>
              <div>
                <div className="text-gray-600">Method</div>
                <div className="text-sm font-semibold text-green-700">
                  {result.outputs.blog.generation_method === 'openai_gpt4' ? '🤖 AI' : '📝 Template'}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Social Posts</div>
                <div className="text-xl font-bold text-green-700">4</div>
              </div>
              <div>
                <div className="text-gray-600">Est. Value</div>
                <div className="text-xl font-bold text-green-700">$750</div>
              </div>
            </div>
          </div>

          {/* Blog Preview */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800">📝 Blog Content Preview</h4>
            </div>
            <div className="p-4 bg-white max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {result.outputs.blog.content.substring(0, 1000)}...
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              📄 View Full Content
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              ✅ Approve & Publish
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              📱 View Social Kit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
