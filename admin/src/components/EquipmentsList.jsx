import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import equipmentService from '../services/equipmentService'

export default function EquipmentsList() {
  const [equipments, setEquipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEquipments()
  }, [])

  const fetchEquipments = async () => {
    try {
      setLoading(true)
      const data = await equipmentService.getAll()
      setEquipments(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch equipments')
      console.error('Error fetching equipments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await equipmentService.delete(id)
        setEquipments(equipments.filter(equipment => equipment._id !== id))
      } catch (err) {
        setError('Failed to delete equipment')
        console.error('Error deleting equipment:', err)
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
          onClick={fetchEquipments}
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
          <h1 className="text-2xl font-semibold text-gray-900">Equipments</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your equipment inventory
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/equipments/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <FaPlus className="mr-2" />
            Add Equipment
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipments.map((equipment) => (
          <div key={equipment._id} className="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{equipment.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Price:</span>
                  <span className="text-sm text-gray-900">{equipment.price}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 line-clamp-3">{equipment.description}</p>
              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  to={`/equipments/${equipment._id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(equipment._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {equipments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No equipments found.</p>
          <Link
            to="/equipments/new"
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <FaPlus className="mr-2" />
            Add your first equipment
          </Link>
        </div>
      )}
    </div>
  )
}