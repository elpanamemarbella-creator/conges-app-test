// version 2
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, addDoc, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAEtBkoWO_vfn_MgINrumqCqhBmwKU-Sl4",
  authDomain: "conges-paname.firebaseapp.com",
  projectId: "conges-paname",
  storageBucket: "conges-paname.firebasestorage.app",
  messagingSenderId: "941389636961",
  appId: "1:941389636961:web:89088bc495b0521064d120"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const CLE_STOCKAGE_V4 = "conges-employes-v4";
const CLE_STOCKAGE_V3 = "conges-employes-v3";
const CLE_STOCKAGE_V2 = "conges-employes-v2";

const ORDRE_EQUIPES = ["Bar matin", "Salle matin", "Bar soir", "Salle soir", "Cuisine", "Extras"];

const CLASSES_EQUIPE = {
  "Bar matin": "bar-matin",
  "Salle matin": "salle-matin",
  "Bar soir": "bar-soir",
  "Salle soir": "salle-soir",
  Cuisine: "cuisine",
  Extras: "extras",
};

const formulaireEmploye = document.getElementById("formulaire-employe");
const formulaireDemandeConge = document.getElementById("formulaire-demande-conge");
const listeEmployes = document.getElementById("liste-employes");
const employeDemandeSelect = document.getElementById("employe-demande");
const blocDemandeVide = document.getElementById("bloc-demande-vide");

let employes = [];

async function initApp() {
  employes = await chargerEmployes();
  afficherEmployes();
  afficherBlocDemandeConge();
}

initApp();

formulaireDemandeConge.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Demande de congé envoyée");

});

listeEmployes.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-supprimer-id]");
  if (!btn) return;

  const id = btn.dataset.supprimerId;

  await supprimerEmploye(id);

  employes = await chargerEmployes();
  afficherEmployes();
  afficherBlocDemandeConge();
});

formulaireEmploye.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nouvelEmploye = {
    id: "",
    nom: document.getElementById("nom-employe").value.trim(),
    equipe: document.getElementById("equipe-employe").value,
    dateEmbauche: document.getElementById("date-embauche").value,
    congesPris: Number(document.getElementById("conges-pris").value),
    historiqueConges: [],
  };

  if (!validerEmploye(nouvelEmploye)) {
    return;
  }

  const ref = await addDoc(collection(db, "employes"), nouvelEmploye);

nouvelEmploye.id = ref.id;

employes = await chargerEmployes();

afficherEmployes();
afficherBlocDemandeConge();

  formulaireEmploye.reset();
  document.getElementById("conges-pris").value = "0";
});

formulaireDemandeConge.addEventListener("submit", async (event) => {
  event.preventDefault();

  const idEmploye = employeDemandeSelect.value;
  const dateDebut = document.getElementById("demande-date-debut").value;
  const dateFin = document.getElementById("demande-date-fin").value;

  if (!idEmploye) {
    alert("Veuillez choisir un employé.");
    return;
  }

  if (!dateDebut || !dateFin) {
    alert("Veuillez renseigner la date de début et la date de fin.");
    return;
  }

  const jours = calculerJoursOuvresInclus(dateDebut, dateFin);

  if (jours <= 0) {
    alert("La date de fin doit être après ou égale à la date de début.");
    return;
  }


await addDoc(collection(db, "conges"), {
idEmploye,
dateDebut,
dateFin,
jours
});

afficherEmployes();
formulaireDemandeConge.reset();

});
function normaliserEmployes(donnees) {
  try {
    const employesCharges = JSON.parse(donnees);
    if (!Array.isArray(employesCharges)) {
      return [];
    }

    return employesCharges.map((employe) => ({
      ...employe,
      equipe: ORDRE_EQUIPES.includes(employe.equipe) ? employe.equipe : "Extras",
      historiqueConges: Array.isArray(employe.historiqueConges) ? employe.historiqueConges : [],
      congesPris: Number(employe.congesPris) || 0,
    }));
  } catch {
    return [];
  }
}

function sauvegarderEmployes() {
  localStorage.setItem(CLE_STOCKAGE_V4, JSON.stringify(employes));
}

function validerEmploye(employe) {
  if (!employe.nom || !employe.equipe || !employe.dateEmbauche) {
    alert("Veuillez remplir tous les champs.");
    return false;
  }

  if (!ORDRE_EQUIPES.includes(employe.equipe)) {
    alert("Veuillez sélectionner une équipe valide.");
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
async function supprimerEmploye(id) {

await deleteDoc(doc(db, "employes", id));

employes = await chargerEmployes();

afficherEmployes();
afficherBlocDemandeConge();

}
function calculerJoursOuvresInclus(dateDebut, dateFin) {
  const debut = new Date(`${dateDebut}T00:00:00`);
  const fin = new Date(`${dateFin}T00:00:00`);

  if (Number.isNaN(debut.getTime()) || Number.isNaN(fin.getTime()) || fin < debut) {
    return 0;
  }

  let compteur = 0;
  const curseur = new Date(debut);

  while (curseur <= fin) {
    const jourSemaine = curseur.getDay();
    if (jourSemaine !== 0 && jourSemaine !== 6) {
      compteur += 1;
    }
    curseur.setDate(curseur.getDate() + 1);
  }

  return compteur;
}

function trierEmployesParEquipe() {
  return [...employes].sort((a, b) => {
    const indexA = ORDRE_EQUIPES.indexOf(a.equipe);
    const indexB = ORDRE_EQUIPES.indexOf(b.equipe);

    if (indexA !== indexB) {
      return indexA - indexB;
    }

    return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
  });
}

function afficherEmployes() {
  if (!employes.length) {
    listeEmployes.innerHTML = '<tr><td colspan="9" class="vide">Aucun employé enregistré</td></tr>';
    return;
  }

  const employesTries = trierEmployesParEquipe();
  let equipeEnCours = "";

  listeEmployes.innerHTML = employesTries
    .map((employe) => {
      const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
      const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
      const congesRestants = arrondir1Decimale(congesAcquis - congesPris);
      const [libelleStatut, classeStatut] = determinerStatut(congesRestants);
      const classeEquipe = CLASSES_EQUIPE[employe.equipe] || "extras";
      const ajouterTitre = equipeEnCours !== employe.equipe;

      if (ajouterTitre) {
        equipeEnCours = employe.equipe;
      }

      return `
        ${
          ajouterTitre
            ? `<tr class="ligne-groupe"><td colspan="9">=== ${echapperHtml(employe.equipe.toUpperCase())} ===</td></tr>`
            : ""
        }
        <tr class="ligne-employe equipe-${classeEquipe}">
          <td data-label="Employé">${echapperHtml(employe.nom)}</td>
          <td data-label="Equipe"><span class="badge-equipe equipe-${classeEquipe}">${echapperHtml(employe.equipe)}</span></td>
          <td data-label="Date embauche">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="Congés acquis">${congesAcquis.toFixed(1)}</td>
          <td data-label="Congés pris">${congesPris.toFixed(1)}</td>
          <td data-label="Congés restants">${congesRestants.toFixed(1)}</td>
          <td data-label="Historique des congés">${afficherHistorique(employe.historiqueConges)}</td>
          <td data-label="Statut"><span class="pastille ${classeStatut}">${libelleStatut}</span></td>
          <td data-label="Action" class="cellule-actions">
            <button class="bouton-supprimer" data-supprimer-id="${employe.id}">Supprimer</button>
          </td>
        </tr>
      `;
    })
    .join("");

  listeEmployes.querySelectorAll("[data-supprimer-id]").forEach((bouton) => {
    bouton.addEventListener("click", () => supprimerEmploye(bouton.dataset.supprimerId));
  });
}

function afficherBlocDemandeConge() {
  if (!employes.length) {
    blocDemandeVide.hidden = false;
    formulaireDemandeConge.hidden = true;
    employeDemandeSelect.innerHTML = "";
    return;
  }

  blocDemandeVide.hidden = true;
  formulaireDemandeConge.hidden = false;

  const options = trierEmployesParEquipe()
    .map(
      (employe) =>
        `<option value="${employe.id}">${echapperHtml(employe.nom)} (${echapperHtml(employe.equipe)})</option>`,
    )
    .join("");

  employeDemandeSelect.innerHTML = options;
}

function afficherHistorique(historiqueConges) {
  if (!historiqueConges.length) {
    return '<span class="historique-vide">Aucun congé</span>';
  }

  return historiqueConges
    .map(
      (conge) =>
        `<div class="ligne-historique">${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)} (${conge.jours} jour${conge.jours > 1 ? "s" : ""})</div>`,
    )
    .join("");
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
async function chargerEmployes() {

    const querySnapshot = await getDocs(collection(db, "employes"));

    const liste = [];

    querySnapshot.forEach((doc) => {
    liste.push({
        ...doc.data(),
        id: doc.id
    });
});

    return liste;
}
