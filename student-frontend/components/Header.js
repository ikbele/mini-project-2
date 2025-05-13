// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header style={styles.header}>
      <nav>
        <Link href="/index">Accueil</Link> | 
        <Link href="/courses">Cours</Link> | 
        <Link href="/profile">Profil</Link>
      </nav>
    </header>
  )
}

const styles = {
  header: {
    padding: '20px',
    backgroundColor: '#0070f3',
    color: 'white',
  },
}
