import { useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js'

// Initialize base Supabase client (without auth)
const SUPABASE_URL = 'https://xsprirnoerturuxxvrfn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hmRJCH2x-2KdJNJh78w9Gg_yeZ_aoCm'

export default function MoreDetailsForm({ onSubmit }) {
  const { user } = useUser()
  const { getToken } = useAuth()

  const [userType, setUserType] = useState('User')
  const [degreeName, setDegreeName] = useState('')
  const [digilockerLink, setDigilockerLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleDigilockerChange = (e) => setDigilockerLink(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    if (userType === 'Doctor') {
      if (!degreeName.trim()) {
        setError('Please enter your degree name.')
        setLoading(false)
        return
      }
      if (!digilockerLink.trim()) {
        setError('Please provide your Digilocker link.')
        setLoading(false)
        return
      }
    }

    const payload = { userType }
    if (userType === 'Doctor') {
      payload.degreeName = degreeName.trim()
      payload.digilockerLink = digilockerLink.trim()
    }

    try {
      // ✅ Get Clerk token for Supabase
      const token = await getToken({ template: 'supabase' })
      if (!token) throw new Error('No token from Clerk. Check your Clerk JWT template.')

      // ✅ Create a Supabase client authorized with the Clerk JWT
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      })

      // ✅ If you have a callback (for testing)
      if (typeof onSubmit === 'function') {
        await onSubmit(payload)
      } else {
        if (!user) throw new Error('No authenticated user found')

        const updates = { role: payload.userType }
        if (payload.degreeName) updates.degree_name = payload.degreeName
        if (payload.digilockerLink) updates.digilocker_link = payload.digilockerLink

        // ✅ Update existing user row in Supabase
        const { data, error: updateErr } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()

        if (updateErr) throw updateErr
        if (!data || data.length === 0) {
          throw new Error('No profile row updated. Ensure user.id exists in Supabase.')
        }

        console.log('✅ Profile updated:', data)
      }

      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">More details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="User"
                checked={userType === 'User'}
                onChange={() => setUserType('User')}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">User</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="Doctor"
                checked={userType === 'Doctor'}
                onChange={() => setUserType('Doctor')}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Doctor</span>
            </label>
          </div>
        </div>

        {userType === 'Doctor' && (
          <div className="space-y-3">
            <div>
              <label htmlFor="degreeName" className="block text-sm font-medium text-gray-700">
                Degree name
              </label>
              <input
                id="degreeName"
                name="degreeName"
                type="text"
                value={degreeName}
                onChange={(e) => setDegreeName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="MBBS, MD, DO, etc."
              />
            </div>

            <div>
              <label htmlFor="digilocker" className="block text-sm font-medium text-gray-700">
                Digilocker link
              </label>
              <input
                id="digilocker"
                name="digilocker"
                type="url"
                value={digilockerLink}
                onChange={handleDigilockerChange}
                placeholder="https://digilocker.gov.in/your-document-link"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Details updated successfully.</p>}

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
