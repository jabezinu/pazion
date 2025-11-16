import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import gemstoneService from '../services/gemstoneService'

export default function GemstonesList() {
  const [gemstones, setGemstones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGemstones()
  }, [])

  const fetchGemstones = async () => {
    try {
      setLoading(true)
      const data = await gemstoneService.getAll()
      setGemstones(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch gemstones')
      console.error('Error fetching gemstones:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gemstone?')) {
      try {
        await gemstoneService.delete(id)
        setGemstones(gemstones.filter(gemstone => gemstone._id !== id))
      } catch (err) {
        setError('Failed to delete gemstone')
        console.error('Error deleting gemstone:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
        <button
          onClick={fetchGemstones}
          className="ml-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Gemstones</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your gemstone inventory
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/gemstones/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <FaPlus className="mr-2" />
            Add Gemstone
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Image
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Quality
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Certified
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {gemstones.map((gemstone) => (
                    <tr key={gemstone._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <img
                          src={gemstone.image}
                          alt={gemstone.nameKey}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {gemstone.nameKey}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          gemstone.category === 'precious'
                            ? 'bg-yellow-100 text-yellow-800'
                            : gemstone.category === 'semi-precious'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {gemstone.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          gemstone.quality === 'luxury'
                            ? 'bg-purple-100 text-purple-800'
                            : gemstone.quality === 'commercial'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {gemstone.quality}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        ${gemstone.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {gemstone.certified ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/gemstones/${gemstone._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FaEdit className="inline" />
                          <span className="sr-only">Edit {gemstone.nameKey}</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(gemstone._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="inline" />
                          <span className="sr-only">Delete {gemstone.nameKey}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {gemstones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No gemstones found.</p>
          <Link
            to="/gemstones/new"
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <FaPlus className="mr-2" />
            Add your first gemstone
          </Link>
        </div>
      )}
    </div>
  )
}