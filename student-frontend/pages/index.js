// pages/index.js
import Link from 'next/link'
import styles from '../styles/Home.css'

export default function Home() {
  return (
    <div className="container">
      <h1>Bienvenue sur l'application étudiant</h1>
      <p>
        Connectez-vous pour accéder à vos cours et informations personnelles.
      </p>
      <Link href="/registre">Se connecter</Link>
    </div>
  )
}
