import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft } from 'react-icons/fa'
import courseService from '../services/courseService'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']

export default function CourseForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    level: 'Beginner',
    description: '',
    image: null
  })

  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(isEditing)

  const fetchCourse = useCallback(async () => {
    try {
      setFetchLoading(true)
      const course = await courseService.getById(id)
      setFormData({
        name: course.name || '',
        duration: course.duration || '',
        price: course.price || '',
        level: course.level || 'Beginner',
        description: course.description || '',
        image: null // Don't set the image file for editing, keep it as URL
      })
      setCurrentImageUrl(course.image || '')
    } catch (err) {
      setError('Failed to fetch course')
      console.error('Error fetching course:', err)
    } finally {
      setFetchLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEditing) {
      fetchCourse()
    }
  }, [isEditing, fetchCourse])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate image for new courses
    if (!isEditing && !formData.image) {
      setError('Please select an image file')
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        await courseService.update(id, formData)
      } else {
        await courseService.create(formData)
      }
      navigate('/courses')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} course`)
      console.error('Error saving course:', err)
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
            {isEditing ? 'Edit Course' : 'Add New Course'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate('/courses')}
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
              Course Name *
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
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 4 weeks"
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

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Level *
            </label>
            <select
              name="level"
              id="level"
              required
              value={formData.level}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {LEVELS.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
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
                  alt="Current course"
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
              {isEditing ? 'Upload a new image to replace the current one (optional)' : 'Select an image file for the course'}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/courses')}
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
            {isEditing ? 'Update' : 'Create'} Course
          </button>
        </div>
      </form>
    </div>
  )
}