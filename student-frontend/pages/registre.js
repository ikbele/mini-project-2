import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Register() {
  const [departements, setDepartements] = useState([])
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    departement_id: '',
  })

  useEffect(() => {
    axios.get('http://localhost:8000/departements')
      .then(res => setDepartements(res.data))
      .catch(err => console.error('Axios error:', err));
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://127.0.0.1:8000/etudiants/register", {
        nom: formData.nom,
        email: formData.email,
        password: formData.password,
        departement_id: formData.departement_id
      })
      alert('Inscription réussie !')
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err)
      alert("Erreur lors de l'inscription.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nom" onChange={handleChange} placeholder="Nom" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Mot de passe" />
      <select name="departement_id" onChange={handleChange}>
        <option value="">Sélectionner un département</option>
        {departements.map(dep => (
          <option key={dep.id} value={dep.id}>{dep.nom}</option>
        ))}
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  )
}
