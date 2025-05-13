import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEtudiant } from "../../services/api";
import EtudiantCard from "../../components/StudentCard1";

export default function EtudiantPage() {
  const router = useRouter();
  const { id } = router.query;
  const [etudiant, setEtudiant] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getEtudiant(Number(id)).then(setEtudiant).catch(console.error);
    }
  }, [id]);

  if (!etudiant) return <div className="p-6">Chargement...</div>;

  return (
    <main className="p-6">
      <EtudiantCard etudiant={etudiant} />
    </main>
  );
}

