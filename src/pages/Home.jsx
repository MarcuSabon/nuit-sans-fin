import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="hero">
      <h1>Titre du site</h1>
      <p className="lead">Le thème sera révélé le jour J. Cette page est un point de départ.</p>
      <Link className="btn" to="/demo">
        Tester la base de données
      </Link>
    </section>
  )
}
