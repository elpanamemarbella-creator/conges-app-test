const CLE_STOCKAGE = "suivi-conges-demandes";

const formulaire = document.getElementById("formulaire-conge");
const listeDemandes = document.getElementById("liste-demandes");
const boutonToutEffacer = document.getElementById("tout-effacer");

let demandes = chargerDemandes();
afficherDemandes();

formulaire.addEventListener("submit", (evenement) => {
  evenement.preventDefault();

  const donnees = {
    id: crypto.randomUUID(),
    nom: document.getElementById("nom-employe").value.trim(),
    equipe: document.getElementById("equipe-employe").value.trim(),
    allocation: Number(document.getElementById("allocation-annuelle").value),
    joursDemandes: Number(document.getElementById("jours-demandes").value),
    dateDebut: document.getElementById("date-debut").value,
    dateFin: document.getElementById("date-fin").value,
  };

  if (!validerDonnees(donnees)) {
    return;
  }

  demandes.push(donnees);
  sauvegarderDemandes();
  afficherDemandes();
  formulaire.reset();
  document.getElementById("allocation-annuelle").value = 25;
});

boutonToutEffacer.addEventListener("click", () => {
  if (!demandes.length) {
    return;
  }

  demandes = [];
  sauvegarderDemandes();
  afficherDemandes();
});

function validerDonnees(donnees) {
  if (donnees.dateFin < donnees.dateDebut) {
    alert("La date de fin doit être postérieure ou égale à la date de début.");
    return false;
  }

  if (donnees.joursDemandes > donnees.allocation) {
    alert("Les jours demandés ne peuvent pas dépasser l'allocation annuelle.");
    return false;
  }

  return true;
}

function chargerDemandes() {
  const donneesStockees = localStorage.getItem(CLE_STOCKAGE);
  return donneesStockees ? JSON.parse(donneesStockees) : [];
}

function sauvegarderDemandes() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(demandes));
}

function supprimerDemande(id) {
  demandes = demandes.filter((demande) => demande.id !== id);
  sauvegarderDemandes();
  afficherDemandes();
}

function determinerStatut(joursRestants) {
  if (joursRestants > 10) {
    return ["Confortable", "bon"];
  }

  if (joursRestants > 5) {
    return ["À surveiller", "vigilance"];
  }

  return ["Faible", "critique"];
}

function afficherDemandes() {
  if (!demandes.length) {
    listeDemandes.innerHTML = '<tr><td colspan="7" class="vide">Aucune demande de congé pour le moment.</td></tr>';
    return;
  }

  listeDemandes.innerHTML = demandes
    .map((demande) => {
      const joursRestants = demande.allocation - demande.joursDemandes;
      const [libelleStatut, classeStatut] = determinerStatut(joursRestants);

      return `
        <tr>
          <td data-label="Nom de l'employé">${echapperHtml(demande.nom)}</td>
          <td data-label="Équipe">${echapperHtml(demande.equipe)}</td>
          <td data-label="Dates">${formaterDate(demande.dateDebut)} → ${formaterDate(demande.dateFin)}</td>
          <td data-label="Demandé">${demande.joursDemandes} jours</td>
          <td data-label="Jours restants">${joursRestants} jours</td>
          <td data-label="Statut"><span class="pastille ${classeStatut}">${libelleStatut}</span></td>
          <td data-label="Action"><button class="bouton-supprimer" data-supprimer-id="${demande.id}">Supprimer</button></td>
        </tr>
      `;
    })
    .join("");

  listeDemandes.querySelectorAll("[data-supprimer-id]").forEach((bouton) => {
    bouton.addEventListener("click", () => supprimerDemande(bouton.dataset.supprimerId));
  });
}

function formaterDate(dateBrute) {
  const date = new Date(`${dateBrute}T00:00:00`);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function echapperHtml(valeur) {
  return valeur
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
