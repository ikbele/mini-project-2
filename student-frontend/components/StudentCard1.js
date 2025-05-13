
export default function EtudiantCard({ etudiant }) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold">{etudiant.nom} {etudiant.prenom}</h2>
      <p>Email : {etudiant.email}</p>
    </div>
  );
}


