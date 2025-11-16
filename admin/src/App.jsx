import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import GemstonesList from './components/GemstonesList'
import GemstoneForm from './components/GemstoneForm'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<GemstonesList />} />
        <Route path="/gemstones/new" element={<GemstoneForm />} />
        <Route path="/gemstones/:id/edit" element={<GemstoneForm />} />
      </Routes>
    </Layout>
  )
}