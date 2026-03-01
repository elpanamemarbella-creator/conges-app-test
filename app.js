const CLE_STOCKAGE = "conges-employes-v2";

const formulaire = document.getElementById("formulaire-employe");
const listeEmployes = document.getElementById("liste-employes");

let employes = chargerEmployes();
afficherEmployes();

formulaire.addEventListener("submit", (event) => {
  event.preventDefault();

  const nouvelEmploye = {
    id: crypto.randomUUID(),
    nom: document.getElementById("nom-employe").value.trim(),
    equipe: document.getElementById("equipe-employe").value.trim(),
    dateEmbauche: document.getElementById("date-embauche").value,
    congesPris: Number(document.getElementById("conges-pris").value),
  };

  if (!validerEmploye(nouvelEmploye)) {
    return;
  }

  employes.push(nouvelEmploye);
  sauvegarderEmployes();
  afficherEmployes();
  formulaire.reset();
  document.getElementById("conges-pris").value = "0";
});

function chargerEmployes() {
  const donnees = localStorage.getItem(CLE_STOCKAGE);
  if (!donnees) {
    return [];
  }

  try {
    const employesCharges = JSON.parse(donnees);
    return Array.isArray(employesCharges) ? employesCharges : [];
  } catch {
    return [];
  }
}

function sauvegarderEmployes() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(employes));
}

function validerEmploye(employe) {
  if (!employe.nom || !employe.equipe || !employe.dateEmbauche) {
    alert("Veuillez remplir tous les champs.");
    return false;
  }

  const dateEmbauche = new Date(`${employe.dateEmbauche}T00:00:00`);
  const aujourdHui = new Date();

  if (Number.isNaN(dateEmbauche.getTime())) {
    alert("Date d'embauche invalide.");
    return false;
  }

  if (dateEmbauche > aujourdHui) {
    alert("La date d'embauche ne peut pas être dans le futur.");
    return false;
  }

  if (employe.congesPris < 0) {
    alert("Les congés pris doivent être supérieurs ou égaux à 0.");
    return false;
  }

  return true;
}

function calculerMoisTravailles(dateEmbauche) {
  const debut = new Date(`${dateEmbauche}T00:00:00`);
  const fin = new Date();
  const differenceMs = fin.getTime() - debut.getTime();
  const joursTravailles = differenceMs / (1000 * 60 * 60 * 24);
  const moisTravailles = joursTravailles / 30.4375;

  return Math.max(0, moisTravailles);
}

function calculerCongesAcquis(dateEmbauche) {
  const mois = calculerMoisTravailles(dateEmbauche);
  const acquis = mois * 2.5;
  return arrondir1Decimale(acquis);
}

function arrondir1Decimale(valeur) {
  return Math.round(valeur * 10) / 10;
}

function determinerStatut(congesRestants) {
  if (congesRestants > 10) {
    return ["OK", "bon"];
  }

  if (congesRestants >= 5) {
    return ["Attention", "vigilance"];
  }

  return ["Faible", "critique"];
}

function supprimerEmploye(id) {
  employes = employes.filter((employe) => employe.id !== id);
  sauvegarderEmployes();
  afficherEmployes();
}

function mettreAJourCongesPris(id, valeur) {
  const congesPris = Number(valeur);
  if (Number.isNaN(congesPris) || congesPris < 0) {
    return;
  }

  employes = employes.map((employe) => (employe.id === id ? { ...employe, congesPris } : employe));
  sauvegarderEmployes();
  afficherEmployes();
}

function afficherEmployes() {
  if (!employes.length) {
    listeEmployes.innerHTML = '<tr><td colspan="8" class="vide">Aucun employé enregistré</td></tr>';
    return;
  }

  listeEmployes.innerHTML = employes
    .map((employe) => {
      const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
      const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
      const congesRestants = arrondir1Decimale(congesAcquis - congesPris);
      const [libelleStatut, classeStatut] = determinerStatut(congesRestants);

      return `
        <tr>
          <td data-label="Employé">${echapperHtml(employe.nom)}</td>
          <td data-label="Equipe">${echapperHtml(employe.equipe)}</td>
          <td data-label="Date embauche">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="Congés acquis">${congesAcquis.toFixed(1)}</td>
          <td data-label="Congés pris">
            <input
              class="champ-tableau"
              type="number"
              min="0"
              step="0.5"
              value="${congesPris.toFixed(1)}"
              data-conges-id="${employe.id}"
            />
          </td>
          <td data-label="Congés restants">${congesRestants.toFixed(1)}</td>
          <td data-label="Statut"><span class="pastille ${classeStatut}">${libelleStatut}</span></td>
          <td data-label="Action"><button class="bouton-supprimer" data-supprimer-id="${employe.id}">Supprimer</button></td>
        </tr>
      `;
    })
    .join("");

  listeEmployes.querySelectorAll("[data-supprimer-id]").forEach((bouton) => {
    bouton.addEventListener("click", () => supprimerEmploye(bouton.dataset.supprimerId));
  });

  listeEmployes.querySelectorAll("[data-conges-id]").forEach((champ) => {
    const id = champ.dataset.congesId;
    champ.addEventListener("change", () => mettreAJourCongesPris(id, champ.value));
    champ.addEventListener("blur", () => mettreAJourCongesPris(id, champ.value));
  });
}

function formaterDateFr(dateBrute) {
  const date = new Date(`${dateBrute}T00:00:00`);
  const jour = String(date.getDate()).padStart(2, "0");
  const mois = String(date.getMonth() + 1).padStart(2, "0");
  const annee = date.getFullYear();
  return `${jour}/${mois}/${annee}`;
}

function echapperHtml(valeur) {
  return valeur
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
