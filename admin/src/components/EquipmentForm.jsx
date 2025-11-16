import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft } from 'react-icons/fa'
import equipmentService from '../services/equipmentService'

export default function EquipmentForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  })

  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(isEditing)

  const fetchEquipment = useCallback(async () => {
    try {
      setFetchLoading(true)
      const equipment = await equipmentService.getById(id)
      setFormData({
        name: equipment.name || '',
        description: equipment.description || '',
        price: equipment.price || '',
        image: null // Don't set the image file for editing, keep it as URL
      })
      setCurrentImageUrl(equipment.image || '')
    } catch (err) {
      setError('Failed to fetch equipment')
      console.error('Error fetching equipment:', err)
    } finally {
      setFetchLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEditing) {
      fetchEquipment()
    }
  }, [isEditing, fetchEquipment])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate image for new equipments
    if (!isEditing && !formData.image) {
      setError('Please select an image file')
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        await equipmentService.update(id, formData)
      } else {
        await equipmentService.create(formData)
      }
      navigate('/equipments')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} equipment`)
      console.error('Error saving equipment:', err)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate('/equipments')}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" />
            Back to List
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Equipment Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <input
              type="text"
              name="price"
              id="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., $299"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image *
            </label>
            {isEditing && currentImageUrl && (
              <div className="mt-2 mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={currentImageUrl}
                  alt="Current equipment"
                  className="h-32 w-32 object-cover rounded-md border"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              required={!isEditing}
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              {isEditing ? 'Upload a new image to replace the current one (optional)' : 'Select an image file for the equipment'}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/equipments')}
            className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <FaSave className="mr-2" />
            )}
            {isEditing ? 'Update' : 'Create'} Equipment
          </button>
        </div>
      </form>
    </div>
  )
}