import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { ModalProvider } from './contexts/ModalContext'
import { DataProvider } from './contexts/DataContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Layout from './components/Layout'

// Lazy load components for better performance
const GemstonesList = lazy(() => import('./components/GemstonesList'))
const GemstoneForm = lazy(() => import('./components/GemstoneForm'))
const CoursesList = lazy(() => import('./components/CoursesList'))
const CourseForm = lazy(() => import('./components/CourseForm'))
const EquipmentsList = lazy(() => import('./components/EquipmentsList'))
const EquipmentForm = lazy(() => import('./components/EquipmentForm'))
const ContactMessagesList = lazy(() => import('./components/ContactMessagesList'))
const VideosList = lazy(() => import('./components/VideosList'))
const VideoForm = lazy(() => import('./components/VideoForm'))

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ModalProvider>
          <Routes>
         <Route path="/login" element={<Login />} />
         <Route
           path="/*"
           element={
             <ProtectedRoute>
               <Layout>
                 <Suspense fallback={
                   <div className="flex justify-center items-center min-h-screen">
                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                   </div>
                 }>
                   <Routes>
                     <Route path="/" element={<GemstonesList />} />
                     <Route path="/gemstones/new" element={<GemstoneForm />} />
                     <Route path="/gemstones/:id/edit" element={<GemstoneForm />} />
                     <Route path="/courses" element={<CoursesList />} />
                     <Route path="/courses/new" element={<CourseForm />} />
                     <Route path="/courses/:id/edit" element={<CourseForm />} />
                     <Route path="/equipments" element={<EquipmentsList />} />
                     <Route path="/equipments/new" element={<EquipmentForm />} />
                     <Route path="/equipments/:id/edit" element={<EquipmentForm />} />
                     <Route path="/contact-messages" element={<ContactMessagesList />} />
                     <Route path="/videos" element={<VideosList />} />
                     <Route path="/videos/new" element={<VideoForm />} />
                     <Route path="/videos/:id/edit" element={<VideoForm />} />
                   </Routes>
                 </Suspense>
               </Layout>
             </ProtectedRoute>
           }
         />
         </Routes>
        </ModalProvider>
      </DataProvider>
    </AuthProvider>
  )
}