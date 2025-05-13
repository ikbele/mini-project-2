import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
  const [etudiant, setEtudiant] = useState(null)
  const studentId = 1 // À remplacer dynamiquement

  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${studentId}`).then(res => {
      setEtudiant(res.data)
    })
  }, [])

  if (!etudiant) return <div>Chargement...</div>

  return (
    <div>
      <h2>Profil de {etudiant.nom}</h2>
      <p>Email : {etudiant.email}</p>
      <p>Département : {etudiant.departement.nom}</p>
      <h3>Formations suivies :</h3>
      <ul>
        {etudiant.formations.map(f => (
          <li key={f.id}>{f.nom}</li>
        ))}
      </ul>
    </div>
  )
}
