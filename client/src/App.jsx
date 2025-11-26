import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
import { ModalProvider } from './contexts/ModalContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const GemstonesPage = lazy(() => import('./pages/GemstonesPage'));
const EquipmentPage = lazy(() => import('./pages/EquipmentPage'));

export default function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <DataProvider>
          <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Suspense fallback={
                <div className="flex justify-center items-center min-h-screen">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/gemstones" element={<GemstonesPage />} />
                  <Route path="/equipment" element={<EquipmentPage />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          </Router>
        </DataProvider>
      </ModalProvider>
    </LanguageProvider>
  );
}