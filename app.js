import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEtBkoWO_vfn_MgINrumqCqhBmwKU-Sl4",
  authDomain: "conges-paname.firebaseapp.com",
  projectId: "conges-paname",
  storageBucket: "conges-paname.firebasestorage.app",
  messagingSenderId: "941389636961",
  appId: "1:941389636961:web:89088bc495b0521064d120",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ORDRE_EQUIPES = ["Bar matin", "Salle matin", "Bar soir", "Salle soir", "Cuisine", "Extra"];
const PALETTE_COULEURS = ["#2f80ed", "#eb5757", "#27ae60", "#f2994a", "#9b51e0", "#00b8d9", "#e84393", "#6c5ce7"];
const CODE_MANAGER = "2005";

const CLASSES_EQUIPE = {
  "Bar matin": "bar-matin",
  "Salle matin": "salle-matin",
  "Bar soir": "bar-soir",
  "Salle soir": "salle-soir",
  Cuisine: "cuisine",
  Extra: "extras",
};

const formulaireEmploye = document.getElementById("formulaire-employe");
const formulaireDemandeConge = document.getElementById("formulaire-demande-conge");
const listeEmployes = document.getElementById("liste-employes");
const employeDemandeSelect = document.getElementById("employe-demande");
const blocDemandeVide = document.getElementById("bloc-demande-vide");
const listeDemandesEnAttente = document.getElementById("liste-demandes-en-attente");

const listeResume = document.getElementById("liste-resume");
const filtreEquipeSelect = document.getElementById("filtre-equipe");
const rechercheEmployeInput = document.getElementById("recherche-employe");
const tableauBord = document.getElementById("tableau-bord");
const boutonExportExcel = document.getElementById("bouton-export-excel");
const calendrierCongesMois = document.getElementById("calendrier-conges-mois");
const menuOnglets = document.querySelectorAll(".menu-onglet");
const zonesOnglets = document.querySelectorAll("[data-zone]");

let employes = [];
let conges = [];
let employesFiltres = [];

function normaliserEquipe(equipe) {
  if (equipe === "Extras") {
    return "Extra";
  }
  return ORDRE_EQUIPES.includes(equipe) ? equipe : "Extra";
}

function normaliserStatut(statut) {
  if (statut === "en_attente" || statut === "valide" || statut === "refuse") {
    return statut;
  }

  return "valide";
}

function normaliserConge(id, conge) {
  const idEmploye = conge.idEmploye || conge.employeId || "";
  const dateDebut = conge.dateDebut || "";
  const dateFin = conge.dateFin || "";
  const jours = Number(conge.jours) || calculerJoursOuvresInclus(dateDebut, dateFin);

  return {
    id,
    idEmploye,
    dateDebut,
    dateFin,
    jours,
    statut: normaliserStatut(conge.statut),
  };
}

async function chargerConges() {
  const querySnapshot = await getDocs(collection(db, "conges"));
  const liste = [];

  querySnapshot.forEach((entry) => {
    const conge = normaliserConge(entry.id, entry.data());
    if (!conge.idEmploye || !conge.dateDebut || !conge.dateFin || conge.jours <= 0) {
      return;
    }
    liste.push(conge);
  });

  return liste;
}

function construireCongesParEmploye(congesValides) {
  return congesValides.reduce((acc, conge) => {
    if (!acc[conge.idEmploye]) {
      acc[conge.idEmploye] = [];
    }

    acc[conge.idEmploye].push(conge);
    return acc;
  }, {});
}

function fusionnerEmployesEtConges(employesBruts, congesCharges) {
  const congesValides = congesCharges.filter((conge) => conge.statut === "valide");
  const congesParEmploye = construireCongesParEmploye(congesValides);

  return employesBruts.map((employe) => {
    const equipe = normaliserEquipe(employe.equipe);
    const congesEmploye = congesParEmploye[employe.id] || [];
    const historiqueConges = congesEmploye
      .map((conge) => ({
        dateDebut: conge.dateDebut,
        dateFin: conge.dateFin,
        jours: conge.jours,
      }))
      .sort((a, b) => a.dateDebut.localeCompare(b.dateDebut));

    const congesDepuisDemandes = historiqueConges.reduce((total, conge) => total + conge.jours, 0);
    const congesInitial = Number(employe.congesPris) || 0;

    return {
      ...employe,
      equipe,
      historiqueConges,
      congesPris: arrondir1Decimale(congesInitial + congesDepuisDemandes),
      couleur: employe.couleur || "",
    };
  });
}

async function chargerEmployes() {
  const querySnapshot = await getDocs(collection(db, "employes"));
  const liste = [];

  querySnapshot.forEach((entry) => {
    liste.push({
      ...entry.data(),
      id: entry.id,
    });
  });

  return liste;
}

async function garantirCouleursEmployes(employesCharges) {
  const couleursOccupees = new Set(employesCharges.map((employe) => employe.couleur).filter(Boolean));
  const misesAJour = [];

  for (const employe of employesCharges) {
    if (employe.couleur) {
      continue;
    }

    const couleur = trouverCouleurDisponible(couleursOccupees, employe.id);
    couleursOccupees.add(couleur);
    employe.couleur = couleur;
    misesAJour.push(
      setDoc(
        doc(db, "employes", employe.id),
        {
          couleur,
        },
        { merge: true },
      ),
    );
  }

  if (misesAJour.length) {
    await Promise.all(misesAJour);
  }
}

function trouverCouleurDisponible(couleursOccupees, graine = "") {
  const couleurLibre = PALETTE_COULEURS.find((couleur) => !couleursOccupees.has(couleur));
  if (couleurLibre) {
    return couleurLibre;
  }

  let hash = 0;
  for (let index = 0; index < graine.length; index += 1) {
    hash = (hash << 5) - hash + graine.charCodeAt(index);
    hash |= 0;
  }

  return PALETTE_COULEURS[Math.abs(hash) % PALETTE_COULEURS.length];
}

async function rafraichirDonnees() {
  const [employesBruts, congesCharges] = await Promise.all([chargerEmployes(), chargerConges()]);
  await garantirCouleursEmployes(employesBruts);

  employes = fusionnerEmployesEtConges(employesBruts, congesCharges);
  conges = congesCharges;

  afficherEmployes();
  afficherBlocDemandeConge();
  afficherDemandesEnAttente();
  afficherResume();
  afficherTableauBord();
  afficherCalendrierMensuel();
}

async function initApp() {
  try {
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur Firebase / Firestore au chargement :", erreur);
    alert("Impossible de charger les données. Vérifie la connexion Firebase.");
  }
}

initApp();

menuOnglets.forEach((onglet) => {
  onglet.addEventListener("click", () => {
    afficherOnglet(onglet.dataset.onglet || "employes");
  });
});

filtreEquipeSelect?.addEventListener("change", () => {
  afficherEmployes();
});

rechercheEmployeInput?.addEventListener("input", () => {
  afficherEmployes();
});

boutonExportExcel?.addEventListener("click", () => {
  exporterEmployesExcel();
});


listeEmployes.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-supprimer-id]");
  if (!btn) return;

  const id = btn.dataset.supprimerId;

  try {
    await supprimerEmploye(id);
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur suppression employé :", erreur);
    alert("Suppression impossible pour le moment.");
  }
});

listeDemandesEnAttente.addEventListener("click", async (event) => {
  const boutonValidation = event.target.closest("[data-valider-id]");
  const boutonRefus = event.target.closest("[data-refuser-id]");

  const idConge = boutonValidation?.dataset.validerId || boutonRefus?.dataset.refuserId;
  if (!idConge) {
    return;
  }

  const nouveauStatut = boutonValidation ? "valide" : "refuse";
  const codeSaisi = window.prompt("Entrer le code manager");

  if (codeSaisi !== CODE_MANAGER) {
    alert("Code incorrect");
    return;
  }

  try {
    await setDoc(
      doc(db, "conges", idConge),
      {
        statut: nouveauStatut,
      },
      { merge: true },
    );
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur mise à jour du statut :", erreur);
    alert("Impossible de mettre à jour la demande de congé.");
  }
});

formulaireEmploye.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nouvelEmploye = {
    id: "",
    nom: document.getElementById("nom-employe").value.trim(),
    equipe: normaliserEquipe(document.getElementById("equipe-employe").value),
    dateEmbauche: document.getElementById("date-embauche").value,
    congesPris: Number(document.getElementById("conges-pris").value),
    historiqueConges: [],
    couleur: "",
  };

  if (!validerEmploye(nouvelEmploye)) {
    return;
  }

  try {
    const couleursOccupees = new Set(employes.map((entry) => entry.couleur).filter(Boolean));
    nouvelEmploye.couleur = trouverCouleurDisponible(couleursOccupees, nouvelEmploye.nom);

    const ref = await addDoc(collection(db, "employes"), nouvelEmploye);
    nouvelEmploye.id = ref.id;

    formulaireEmploye.reset();
    document.getElementById("conges-pris").value = "0";

    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur ajout employé :", erreur);
    alert("Impossible d'ajouter l'employé.");
  }
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

  try {
    await addDoc(collection(db, "conges"), {
      idEmploye,
      dateDebut,
      dateFin,
      jours,
      statut: "en_attente",
      timestamp: Date.now(),
    });

    formulaireDemandeConge.reset();
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur ajout congé :", erreur);
    alert("Impossible d'ajouter la demande de congé.");
  }
});

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

function obtenirEmployesFiltres() {
  const equipeFiltre = filtreEquipeSelect?.value || "Toutes les équipes";
  const recherche = (rechercheEmployeInput?.value || "").trim().toLowerCase();

  return trierEmployesParEquipe().filter((employe) => {
    const correspondEquipe = equipeFiltre === "Toutes les équipes" || employe.equipe === equipeFiltre;
    const correspondRecherche = !recherche || employe.nom.toLowerCase().includes(recherche);
    return correspondEquipe && correspondRecherche;
  });
}

function afficherEmployes() {
  if (!employes.length) {
    listeEmployes.innerHTML = '<tr><td colspan="9" class="vide">Aucun employé enregistré</td></tr>';
    employesFiltres = [];
    return;
  }

  const employesTries = obtenirEmployesFiltres();
  employesFiltres = employesTries;

  if (!employesTries.length) {
    listeEmployes.innerHTML = '<tr><td colspan="9" class="vide">Aucun employé ne correspond au filtre</td></tr>';
    return;
  }

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
}

function afficherTableauBord() {
  if (!tableauBord) {
    return;
  }

  const totalEmployes = employes.length;
  const demandesEnAttente = conges.filter((conge) => conge.statut === "en_attente").length;
  const employesEnCongeAujourdhui = calculerEmployesEnCongeAujourdHui();

  tableauBord.innerHTML = `
    <article class="tuile-kpi">
      <span class="kpi-titre">Employés</span>
      <strong class="kpi-valeur">${totalEmployes}</strong>
    </article>
    <article class="tuile-kpi">
      <span class="kpi-titre">Demandes en attente</span>
      <strong class="kpi-valeur">${demandesEnAttente}</strong>
    </article>
    <article class="tuile-kpi">
      <span class="kpi-titre">En congé aujourd'hui</span>
      <strong class="kpi-valeur">${employesEnCongeAujourdhui}</strong>
    </article>
  `;
}

function calculerEmployesEnCongeAujourdHui() {
  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);

  const ids = new Set();

  conges
    .filter((conge) => conge.statut === "valide")
    .forEach((conge) => {
      const debut = new Date(`${conge.dateDebut}T00:00:00`);
      const fin = new Date(`${conge.dateFin}T00:00:00`);

      if (aujourdHui >= debut && aujourdHui <= fin) {
        ids.add(conge.idEmploye);
      }
    });

  return ids.size;
}

function exporterEmployesExcel() {
  if (!window.XLSX) {
    alert("La librairie d'export Excel n'est pas disponible.");
    return;
  }

  const lignes = employesFiltres.map((employe) => {
    const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
    const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
    const congesRestants = arrondir1Decimale(congesAcquis - congesPris);

    return {
      Nom: employe.nom,
      Equipe: employe.equipe,
      "Date entrée": formaterDateFr(employe.dateEmbauche),
      "Jours acquis": congesAcquis,
      "Jours pris": congesPris,
      "Jours restants": congesRestants,
    };
  });

  const classeur = window.XLSX.utils.book_new();
  const feuille = window.XLSX.utils.json_to_sheet(lignes);
  window.XLSX.utils.book_append_sheet(classeur, feuille, "Employés");
  window.XLSX.writeFile(classeur, "conges-employes.xlsx");
}

function afficherCalendrierMensuel() {
  if (!calendrierCongesMois) {
    return;
  }

  const dateRef = new Date();
  const mois = dateRef.getMonth();
  const annee = dateRef.getFullYear();
  const debutMois = new Date(annee, mois, 1);
  const finMois = new Date(annee, mois + 1, 0);

  const lignes = employes
    .map((employe) => {
      const joursDansMois = extraireJoursCongeDansMois(employe, debutMois, finMois);
      if (!joursDansMois.length) {
        return "";
      }

      const blocs = joursDansMois
        .map(
          (date) =>
            `<span class="bloc-conge" style="background-color:${echapperHtml(employe.couleur || "#2f80ed")}" title="${formaterDateFr(date)}"></span>`,
        )
        .join("");

      return `
        <div class="ligne-calendrier">
          <strong>${echapperHtml(employe.nom)}</strong>
          <div class="barre-conges">${blocs}</div>
        </div>
      `;
    })
    .filter(Boolean)
    .join("");

  calendrierCongesMois.innerHTML =
    lignes || '<p class="message-vide">Aucun congé validé sur le mois en cours.</p>';
}

function extraireJoursCongeDansMois(employe, debutMois, finMois) {
  const jours = [];

  conges
    .filter((conge) => conge.idEmploye === employe.id && conge.statut === "valide")
    .forEach((conge) => {
      const debutConge = new Date(`${conge.dateDebut}T00:00:00`);
      const finConge = new Date(`${conge.dateFin}T00:00:00`);
      const debut = debutConge > debutMois ? debutConge : debutMois;
      const fin = finConge < finMois ? finConge : finMois;

      if (fin < debut) {
        return;
      }

      const curseur = new Date(debut);
      while (curseur <= fin) {
        const jour = curseur.getDay();
        if (jour !== 0 && jour !== 6) {
          jours.push(curseur.toISOString().split("T")[0]);
        }
        curseur.setDate(curseur.getDate() + 1);
      }
    });

  return [...new Set(jours)].sort();
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

function afficherDemandesEnAttente() {
  const demandesEnAttente = conges
    .filter((conge) => conge.statut === "en_attente")
    .sort((a, b) => a.dateDebut.localeCompare(b.dateDebut));

  if (!demandesEnAttente.length) {
    listeDemandesEnAttente.innerHTML = '<li class="vide">Aucune demande en attente</li>';
    return;
  }

  listeDemandesEnAttente.innerHTML = demandesEnAttente
    .map((conge) => {
      const employe = employes.find((entry) => entry.id === conge.idEmploye);
      const nom = employe?.nom || "Employé inconnu";

      return `
        <li class="demande-item">
          <div><strong>${echapperHtml(nom)}</strong> : ${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)}</div>
          <div class="actions-demande">
            <button data-valider-id="${conge.id}" class="bouton-secondaire">Valider</button>
            <button data-refuser-id="${conge.id}" class="bouton-refuser">Refuser</button>
          </div>
        </li>
      `;
    })
    .join("");
}



function afficherOnglet() {
  zonesOnglets.forEach((zone) => {
    zone.hidden = false;
  });
}

afficherOnglet();

function afficherResume() {
  if (!employes.length) {
    listeResume.innerHTML = '<tr><td colspan="5" class="vide">Aucun employé enregistré</td></tr>';
    return;
  }

  const employesTries = [...employes].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));

  listeResume.innerHTML = employesTries
    .map((employe) => {
      const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
      const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
      const congesRestants = arrondir1Decimale(congesAcquis - congesPris);

      return `
        <tr>
          <td data-label="Nom">${echapperHtml(employe.nom)}</td>
          <td data-label="Date d'entrée">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="Congés acquis">${congesAcquis.toFixed(1)}</td>
          <td data-label="Congés pris">${congesPris.toFixed(1)}</td>
          <td data-label="Congés restants">${congesRestants.toFixed(1)}</td>
        </tr>
      `;
    })
    .join("");
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
  return String(valeur)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
