import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaBook, FaClock, FaDollarSign, FaLayerGroup, FaFileAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useData } from '../contexts/DataContext'
import courseService from '../services/courseService'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']

export default function CourseForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const { addCourse, updateCourse } = useData()

  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    level: 'Beginner',
    description: ''
  })

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
        description: course.description || ''
      })
    } catch (err) {
      setError('Failed to fetch course')
      toast.error('Failed to fetch course')
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


    try {
      if (isEditing) {
        const updatedCourse = await courseService.update(id, formData)
        updateCourse(id, updatedCourse)
        toast.success('Course updated successfully')
      } else {
        const newCourse = await courseService.create(formData)
        addCourse(newCourse)
        toast.success('Course created successfully')
      }
      navigate('/courses')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} course`)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} course`)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {isEditing ? 'Edit Course' : 'New Course'}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="inline-flex items-center px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 self-start sm:self-auto"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaBook className="mr-2 text-blue-600" />
                  Course Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter course name"
                />
              </div>

              <div>
                <label htmlFor="duration" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaClock className="mr-2 text-green-600" />
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
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaDollarSign className="mr-2 text-yellow-600" />
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 10,000 ETB"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="level" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaLayerGroup className="mr-2 text-purple-600" />
                  Level *
                </label>
                <select
                  name="level"
                  id="level"
                  required
                  value={formData.level}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900 bg-white"
                >
                  {LEVELS.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaFileAlt className="mr-2 text-indigo-600" />
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-900 placeholder-gray-500 resize-vertical"
                  placeholder="Describe the course content, objectives, and what students will learn..."
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 order-1 sm:order-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isEditing ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}