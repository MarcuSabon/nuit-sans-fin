import { NavLink, Outlet } from 'react-router'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/demo', label: 'Démo base de données' },
]

export default function Layout() {
  return (
    <div className="layout">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <header className="site-header">
        <NavLink to="/" className="brand">
          Nuit de l'Info
        </NavLink>
        <nav aria-label="Navigation principale">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="container">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Nuit de l'Info 2026 — équipe à renommer</p>
      </footer>
    </div>
  )
}
