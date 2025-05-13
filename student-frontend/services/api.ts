 const API_URL = "http://localhost:3005";

export async function getFormations() {
  const res = await fetch(`${API_URL}/formations`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des formations");
  return res.json();
}

export async function getEtudiant(id: number) {
  const res = await fetch(`${API_URL}/etudiants/${id}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération de l'étudiant");
  return res.json();
}

