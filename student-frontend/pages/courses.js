import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Courses() {
  const [formations, setFormations] = useState([])
  const studentId = 1 // À remplacer dynamiquement avec l’authentification

  useEffect(() => {
    axios.get('http://localhost:8000/api/formations').then(res => {
      setFormations(res.data)
    })
  }, [])

  const inscrire = async (formationId) => {
    await axios.post(`http://localhost:8000/api/students/${studentId}/formations/${formationId}`)
    alert('Inscrit à la formation !')
  }

  return (
    <div>
      <h2>Formations disponibles</h2>
      <ul>
        {formations.map(f => (
          <li key={f.id}>
            {f.nom}
            <button onClick={() => inscrire(f.id)}>S'inscrire</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
