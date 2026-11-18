import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Les pages qui utilisent Firebase sont chargées à la demande (accueil plus léger).
const Demo = lazy(() => import('./pages/Demo'))

// Ajouter une page : créer src/pages/MaPage.jsx puis une <Route> ici (et un lien dans Layout).
export default function App() {
  return (
    <Suspense fallback={<p className="container">Chargement…</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
