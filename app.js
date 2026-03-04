import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
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

const TRADUCTIONS = {
  fr: {
    app_title: "Gestion des congés employés",
    dashboard_title: "Tableau de bord",
    add_employee_title: "Ajouter un employé",
    employee_name_label: "Nom de l'employé",
    employee_name_placeholder: "ex. Alex Martin",
    team_label: "Equipe",
    team_select_placeholder: "Sélectionner une équipe",
    hire_date_label: "Date d'embauche",
    used_leave_label: "Congés déjà pris",
    add_employee_button: "Ajouter employé",
    employees_title: "Employés",
    team_filter_label: "Filtre équipe",
    all_teams: "Toutes les équipes",
    employee_search_label: "Recherche employé",
    employee_search_placeholder: "Rechercher un employé",
    export_excel: "Exporter Excel",
    employee_col: "Employé",
    team_col: "Equipe",
    hire_date_col: "Date embauche",
    earned_leave_col: "Congés acquis",
    taken_leave_col: "Congés pris",
    remaining_leave_col: "Congés restants",
    leave_history_col: "Historique des congés",
    status_col: "Statut",
    action_col: "Action",
    no_employee_registered: "Aucun employé enregistré",
    no_employee_matching: "Aucun employé ne correspond au filtre",
    new_leave_request_title: "Nouvelle demande de congé",
    no_employee_available: "Aucun employé disponible",
    start_date_label: "Date de début",
    end_date_label: "Date de fin",
    add_request_button: "Ajouter la demande",
    pending_requests_title: "Demandes de congés en attente",
    loading: "Chargement...",
    no_pending_request: "Aucune demande en attente",
    unknown_employee: "Employé inconnu",
    validate: "Valider",
    refuse: "Refuser",
    summary_title: "Résumé",
    name_col: "Nom",
    entry_date_col: "Date d'entrée",
    save_title: "Sauvegarde",
    save_auto_message: "La sauvegarde est gérée automatiquement par le système existant.",
    calendar_title: "Calendrier des congés",
    no_validated_leave_month: "Aucun congé validé sur le mois en cours.",
    no_leave: "Aucun congé",
    day_singular: "jour",
    day_plural: "jours",
    status_ok: "OK",
    status_attention: "Attention",
    status_low: "Faible",
    kpi_employees: "Employés",
    kpi_pending_requests: "Demandes en attente",
    kpi_on_leave_today: "En congé aujourd'hui",
    archived_employees_title: "Salariés archivés",
    archived_show: "▼ afficher",
    archived_hide: "▲ masquer",
    no_archived_employee: "Aucun employé archivé",
    reactivate: "Réactiver",
  },
  es: {
    app_title: "Gestión de vacaciones empleados",
    dashboard_title: "Panel de control",
    add_employee_title: "Añadir empleado",
    employee_name_label: "Nombre del empleado",
    employee_name_placeholder: "ej. Alex Martin",
    team_label: "Equipo",
    team_select_placeholder: "Selección equipo",
    hire_date_label: "Fecha de incorporación",
    used_leave_label: "Vacaciones ya disfrutadas",
    add_employee_button: "Añadir empleado",
    employees_title: "Empleados",
    team_filter_label: "Filtro equipo",
    all_teams: "Todos los equipos",
    employee_search_label: "Búsqueda empleado",
    employee_search_placeholder: "Buscar empleado",
    export_excel: "Exportar Excel",
    employee_col: "Empleado",
    team_col: "Equipo",
    hire_date_col: "Fecha incorporación",
    earned_leave_col: "Vacaciones acumuladas",
    taken_leave_col: "Vacaciones disfrutadas",
    remaining_leave_col: "Vacaciones restantes",
    leave_history_col: "Historial de vacaciones",
    status_col: "Estado",
    action_col: "Acción",
    no_employee_registered: "Ningún empleado registrado",
    no_employee_matching: "Ningún empleado coincide con el filtro",
    new_leave_request_title: "Nueva solicitud de vacaciones",
    no_employee_available: "No hay empleados disponibles",
    start_date_label: "Fecha inicio",
    end_date_label: "Fecha fin",
    add_request_button: "Añadir solicitud",
    pending_requests_title: "Solicitudes de vacaciones pendientes",
    loading: "Cargando...",
    no_pending_request: "No hay solicitudes pendientes",
    unknown_employee: "Empleado desconocido",
    validate: "Validar",
    refuse: "Rechazar",
    summary_title: "Resumen",
    name_col: "Nombre",
    entry_date_col: "Fecha de incorporación",
    save_title: "Guardar",
    save_auto_message: "La copia de seguridad se gestiona automáticamente por el sistema existente.",
    calendar_title: "Calendario de vacaciones",
    no_validated_leave_month: "No hay vacaciones validadas en el mes actual.",
    no_leave: "Sin vacaciones",
    day_singular: "día",
    day_plural: "días",
    status_ok: "OK",
    status_attention: "Atención",
    status_low: "Bajo",
    kpi_employees: "Empleados",
    kpi_pending_requests: "Solicitudes pendientes",
    kpi_on_leave_today: "De vacaciones hoy",
    archived_employees_title: "Empleados archivados",
    archived_show: "▼ mostrar",
    archived_hide: "▲ ocultar",
    no_archived_employee: "Ningún empleado archivado",
    reactivate: "Reactivar",
  },
};

const ORDRE_EQUIPES = ["Bar matin", "Salle matin", "Bar soir", "Salle soir", "Cuisine", "Extra", "Nettoyage et entretien"];
const PALETTE_COULEURS = ["#2f80ed", "#eb5757", "#27ae60", "#f2994a", "#9b51e0", "#00b8d9", "#e84393", "#6c5ce7"];
const CODE_MANAGER = "2005";

const EMAILJS_PUBLIC_KEY = "cBFH1mPW-cT8LzOBh";

if (window.emailjs && !window.__emailjsInitialized) {
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
  window.__emailjsInitialized = true;
}

window.__sendingEmail = false;

const CLASSES_EQUIPE = {
  "Bar matin": "bar-matin",
  "Salle matin": "salle-matin",
  "Bar soir": "bar-soir",
  "Salle soir": "salle-soir",
  Cuisine: "cuisine",
  Extra: "extras",
  "Nettoyage et entretien": "nettoyage-entretien",
};

const formulaireEmploye = document.getElementById("formulaire-employe");
const formulaireDemandeConge = document.getElementById("formulaire-demande-conge");
const listeEmployes = document.getElementById("liste-employes");
const employeDemandeSelect = document.getElementById("employe-demande");
const blocDemandeVide = document.getElementById("bloc-demande-vide");
const listeDemandesEnAttente = document.getElementById("liste-demandes-en-attente");
const messageDemandeConge = document.getElementById("message-demande-conge");
const boutonSoumettreDemande = formulaireDemandeConge?.querySelector('button[type="submit"]');

const listeResume = document.getElementById("liste-resume");
const listeEmployesArchives = document.getElementById("liste-employes-archives");
const boutonBasculerArchives = document.getElementById("toggleArchived");
const archiveCount = document.getElementById("archivedCount");
const archivedList = document.getElementById("archivedList");
const archivedToggleLabel = document.getElementById("archivedToggleLabel");
const filtreEquipeSelect = document.getElementById("filtre-equipe");
const rechercheEmployeInput = document.getElementById("recherche-employe");
const tableauBord = document.getElementById("tableau-bord");
const boutonExportExcel = document.getElementById("bouton-export-excel");
const calendrierCongesMois = document.getElementById("calendrier-conges-mois");
const managerModal = document.getElementById("manager-modal");
const managerCodeInput = document.getElementById("manager-code-input");
const managerModalErreur = document.getElementById("manager-modal-erreur");
const managerModalValider = document.getElementById("manager-modal-valider");
const managerModalAnnuler = document.getElementById("manager-modal-annuler");
const menuOnglets = document.querySelectorAll(".menu-onglet");
const zonesOnglets = document.querySelectorAll("[data-zone]");
const boutonsLangue = document.querySelectorAll("[data-langue]");

let employes = [];
let conges = [];
let employesFiltres = [];
let employesActifs = [];
let employesArchives = [];
let archivesOuvertes = false;
let langueCourante = "fr";

function t(cle) {
  return TRADUCTIONS[langueCourante]?.[cle] || TRADUCTIONS.fr[cle] || cle;
}

function appliquerTraductionsStatiques() {
  document.documentElement.lang = langueCourante;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  boutonsLangue.forEach((bouton) => {
    bouton.classList.toggle("actif", bouton.dataset.langue === langueCourante);
  });
}

function changerLangue(langue) {
  if (!TRADUCTIONS[langue]) {
    return;
  }
  langueCourante = langue;
  appliquerTraductionsStatiques();
  afficherEmployes();
  mettreAJourLibelleArchives();
  afficherBlocDemandeConge();
  afficherDemandesEnAttente();
  afficherResume();
  afficherTableauBord();
  afficherCalendrierMensuel();
}

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
  employesActifs = employes.filter((employe) => employe.actif !== false);
  employesArchives = employes.filter((employe) => employe.actif === false);
  conges = congesCharges;

  afficherEmployes();
  mettreAJourLibelleArchives();
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
    alert(langueCourante === "es" ? "No se pueden cargar los datos. Verifica la conexión Firebase." : "Impossible de charger les données. Vérifie la connexion Firebase.");
  }
}

appliquerTraductionsStatiques();
initApp();

boutonsLangue.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    changerLangue(bouton.dataset.langue || "fr");
  });
});

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

boutonBasculerArchives?.addEventListener("click", () => {
  basculerArchives();
});

mettreAJourLibelleArchives();

listeEmployes.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-supprimer-id]");
  if (!btn) return;

  const id = btn.dataset.supprimerId;
  const codeValide = await demanderCodeManager();
  if (!codeValide) {
    return;
  }

  try {
    await supprimerEmploye(id);
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur suppression employé :", erreur);
    alert(langueCourante === "es" ? "Eliminación imposible por el momento." : "Suppression impossible pour le moment.");
  }
});

listeEmployesArchives?.addEventListener("click", async (event) => {
  const btn = event.target.closest("[data-reactiver-id]");
  if (!btn) return;

  try {
    await reactiverEmploye(btn.dataset.reactiverId);
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur réactivation employé :", erreur);
    alert(langueCourante === "es" ? "Reactivación imposible por el momento." : "Réactivation impossible pour le moment.");
  }
});

function demanderCodeManager() {
  return new Promise((resolve) => {
    if (!managerModal || !managerCodeInput || !managerModalErreur || !managerModalValider || !managerModalAnnuler) {
      resolve(false);
      return;
    }

    const fermer = (resultat) => {
      managerModal.hidden = true;
      managerCodeInput.value = "";
      managerModalErreur.hidden = true;
      managerCodeInput.removeEventListener("keydown", gererClavier);
      managerModalValider.removeEventListener("click", valider);
      managerModalAnnuler.removeEventListener("click", annuler);
      managerModal.removeEventListener("click", gererFermetureOverlay);
      resolve(resultat);
    };

    const valider = () => {
      if (managerCodeInput.value === CODE_MANAGER) {
        fermer(true);
        return;
      }

      managerModalErreur.hidden = false;
      managerCodeInput.focus();
      managerCodeInput.select();
    };

    const annuler = () => {
      fermer(false);
    };

    const gererClavier = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        valider();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        annuler();
      }
    };

    const gererFermetureOverlay = (event) => {
      if (event.target.hasAttribute("data-modal-close")) {
        annuler();
      }
    };

    managerModal.hidden = false;
    managerCodeInput.value = "";
    managerModalErreur.hidden = true;
    managerModalValider.addEventListener("click", valider);
    managerModalAnnuler.addEventListener("click", annuler);
    managerCodeInput.addEventListener("keydown", gererClavier);
    managerModal.addEventListener("click", gererFermetureOverlay);
    managerCodeInput.focus();
  });
}

listeDemandesEnAttente.addEventListener("click", async (event) => {
  const boutonValidation = event.target.closest("[data-valider-id]");
  const boutonRefus = event.target.closest("[data-refuser-id]");

  const idConge = boutonValidation?.dataset.validerId || boutonRefus?.dataset.refuserId;
  if (!idConge) {
    return;
  }

  const nouveauStatut = boutonValidation ? "valide" : "refuse";
  const codeSaisi = window.prompt(langueCourante === "es" ? "Introduce el código del manager" : "Entrer le code manager");

  if (codeSaisi !== CODE_MANAGER) {
    alert(langueCourante === "es" ? "Código incorrecto" : "Code incorrect");
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
    alert(langueCourante === "es" ? "No se puede actualizar la solicitud de vacaciones." : "Impossible de mettre à jour la demande de congé.");
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
    actif: true,
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
    alert(langueCourante === "es" ? "No se puede añadir el empleado." : "Impossible d'ajouter l'employé.");
  }
});

formulaireDemandeConge.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (window.__sendingEmail) {
    return;
  }

  const idEmploye = employeDemandeSelect.value;
  const dateDebut = document.getElementById("demande-date-debut").value;
  const dateFin = document.getElementById("demande-date-fin").value;

  if (!idEmploye) {
    alert(langueCourante === "es" ? "Seleccione un empleado." : "Veuillez choisir un employé.");
    return;
  }

  if (!dateDebut || !dateFin) {
    alert(langueCourante === "es" ? "Indique la fecha de inicio y de fin." : "Veuillez renseigner la date de début et la date de fin.");
    return;
  }

  const jours = calculerJoursOuvresInclus(dateDebut, dateFin);

  if (jours <= 0) {
    alert(langueCourante === "es" ? "La fecha de fin debe ser posterior o igual a la fecha de inicio." : "La date de fin doit être après ou égale à la date de début.");
    return;
  }

  const employe = employes.find((entry) => entry.id === idEmploye);
  const demande = {
    idEmploye,
    employee_name: employe?.nom || t("unknown_employee"),
    dateDebut,
    dateFin,
    start_date: dateDebut,
    end_date: dateFin,
    start_date_formatted: formatDateFR(dateDebut),
    end_date_formatted: formatDateFR(dateFin),
    days_requested: jours,
    request_id: genererRequestId(),
    status: "EN ATTENTE",
    statut: "en_attente",
    timestamp: Date.now(),
  };

  window.__sendingEmail = true;
  if (boutonSoumettreDemande) {
    boutonSoumettreDemande.disabled = true;
  }

  try {
    await addDoc(collection(db, "conges"), {
      idEmploye: demande.idEmploye,
      dateDebut: demande.dateDebut,
      dateFin: demande.dateFin,
      jours: demande.days_requested,
      statut: demande.statut,
      status: demande.status,
      requestId: demande.request_id,
      timestamp: demande.timestamp,
    });

    try {
      await sendLeaveRequestEmail(demande);
      afficherMessageDemandeConge("Demande créée et email envoyé", "success");
    } catch (emailErreur) {
      console.error("Erreur envoi email demande de congé :", emailErreur);
      afficherMessageDemandeConge("Demande créée, mais email non envoyé", "error");
    }

    formulaireDemandeConge.reset();
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur ajout congé :", erreur);
    alert(langueCourante === "es" ? "No se puede añadir la solicitud de vacaciones." : "Impossible d'ajouter la demande de congé.");
  } finally {
    window.__sendingEmail = false;
    if (boutonSoumettreDemande) {
      boutonSoumettreDemande.disabled = false;
    }
  }
});

function formatDateFR(yyyy_mm_dd) {
  if (!yyyy_mm_dd) {
    return "";
  }

  const [annee, mois, jour] = yyyy_mm_dd.split("-");

  if (!annee || !mois || !jour) {
    return yyyy_mm_dd;
  }

  return `${jour}/${mois}/${annee}`;
}

function genererRequestId() {
  const maintenant = new Date();
  const annee = String(maintenant.getFullYear());
  const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
  const jour = String(maintenant.getDate()).padStart(2, "0");
  const heures = String(maintenant.getHours()).padStart(2, "0");
  const minutes = String(maintenant.getMinutes()).padStart(2, "0");
  const secondes = String(maintenant.getSeconds()).padStart(2, "0");
  const suffixe = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");

  return `LR-${annee}${mois}${jour}-${heures}${minutes}${secondes}-${suffixe}`;
}

function afficherMessageDemandeConge(message, type = "info") {
  if (!messageDemandeConge) {
    return;
  }

  messageDemandeConge.hidden = false;
  messageDemandeConge.textContent = message;
  messageDemandeConge.classList.remove("message-retour-succes", "message-retour-erreur");

  if (type === "success") {
    messageDemandeConge.classList.add("message-retour-succes");
  }

  if (type === "error") {
    messageDemandeConge.classList.add("message-retour-erreur");
  }
}

async function sendLeaveRequestEmail(demande) {
  if (!window.emailjs) {
    throw new Error("EmailJS indisponible : librairie non chargée.");
  }

  const employeeName = demande.employee_name;
  const startDate = demande.start_date;
  const endDate = demande.end_date;
  const daysRequested = demande.days_requested;
  const requestId = demande.request_id;
  const status = demande.status;

  const params = {
    employee_name: employeeName,
    start_date: startDate,
    end_date: endDate,
    days_requested: daysRequested,
    request_id: requestId,
    status,
  };

  return window.emailjs
    .send("service_ikwskjo", "template_108z5ht", params, "cBFH1mPW-cT8LzOBh")
    .then((response) => {
      console.log("Email envoyé", response.status);
      return response;
    })
    .catch((error) => {
      console.error("Erreur EmailJS :", error);
      throw error;
    });
}

function validerEmploye(employe) {
  if (!employe.nom || !employe.equipe || !employe.dateEmbauche) {
    alert(langueCourante === "es" ? "Complete todos los campos." : "Veuillez remplir tous les champs.");
    return false;
  }

  if (!ORDRE_EQUIPES.includes(employe.equipe)) {
    alert(langueCourante === "es" ? "Seleccione un equipo válido." : "Veuillez sélectionner une équipe valide.");
    return false;
  }

  const dateEmbauche = new Date(`${employe.dateEmbauche}T00:00:00`);
  const aujourdHui = new Date();

  if (Number.isNaN(dateEmbauche.getTime())) {
    alert(langueCourante === "es" ? "Fecha de incorporación no válida." : "Date d'embauche invalide.");
    return false;
  }

  if (dateEmbauche > aujourdHui) {
    alert(langueCourante === "es" ? "La fecha de incorporación no puede estar en el futuro." : "La date d'embauche ne peut pas être dans le futur.");
    return false;
  }

  if (employe.congesPris < 0) {
    alert(langueCourante === "es" ? "Las vacaciones disfrutadas deben ser mayores o iguales a 0." : "Les congés pris doivent être supérieurs ou égaux à 0.");
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
    return [t("status_ok"), "bon"];
  }

  if (congesRestants >= 5) {
    return [t("status_attention"), "vigilance"];
  }

  return [t("status_low"), "critique"];
}

async function supprimerEmploye(id) {
  await setDoc(
    doc(db, "employes", id),
    {
      actif: false,
    },
    { merge: true },
  );
}

async function reactiverEmploye(id) {
  await setDoc(
    doc(db, "employes", id),
    {
      actif: true,
    },
    { merge: true },
  );
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
  return [...employesActifs].sort((a, b) => {
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
  if (!employesActifs.length) {
    listeEmployes.innerHTML = `<tr><td colspan="9" class="vide">${t("no_employee_registered")}</td></tr>`;
    employesFiltres = [];
    afficherEmployesArchives();
    return;
  }

  const employesTries = obtenirEmployesFiltres();
  employesFiltres = employesTries;

  if (!employesTries.length) {
    listeEmployes.innerHTML = `<tr><td colspan="9" class="vide">${t("no_employee_matching")}</td></tr>`;
    afficherEmployesArchives();
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
          <td data-label="${t("employee_col")}">${echapperHtml(employe.nom)}</td>
          <td data-label="${t("team_col")}"><span class="badge-equipe equipe-${classeEquipe}">${echapperHtml(employe.equipe)}</span></td>
          <td data-label="${t("hire_date_col")}">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="${t("earned_leave_col")}">${congesAcquis.toFixed(1)}</td>
          <td data-label="${t("taken_leave_col")}">${congesPris.toFixed(1)}</td>
          <td data-label="${t("remaining_leave_col")}">${congesRestants.toFixed(1)}</td>
          <td data-label="${t("leave_history_col")}">${afficherHistorique(employe.historiqueConges)}</td>
          <td data-label="${t("status_col")}"><span class="pastille ${classeStatut}">${libelleStatut}</span></td>
          <td data-label="${t("action_col")}" class="cellule-actions">
            <button class="bouton-supprimer" data-supprimer-id="${employe.id}">${langueCourante === "es" ? "Eliminar" : "Supprimer"}</button>
          </td>
        </tr>
      `;
    })
    .join("");

  afficherEmployesArchives();
}


function mettreAJourLibelleArchives() {
  if (!archivedToggleLabel) {
    return;
  }

  archivedToggleLabel.textContent = archivesOuvertes ? t("archived_hide") : t("archived_show");
}

function basculerArchives() {
  if (!archivedList) {
    return;
  }

  archivesOuvertes = !archivesOuvertes;
  archivedList.style.display = archivesOuvertes ? "block" : "none";
  mettreAJourLibelleArchives();
}

function afficherEmployesArchives() {
  if (!listeEmployesArchives) {
    return;
  }

  if (archiveCount) {
    archiveCount.textContent = String(employesArchives.length);
  }

  if (!employesArchives.length) {
    listeEmployesArchives.innerHTML = `<tr><td colspan="4" class="vide">${t("no_archived_employee")}</td></tr>`;
    return;
  }

  const employesTries = [...employesArchives].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));

  listeEmployesArchives.innerHTML = employesTries
    .map(
      (employe) => `
      <tr>
        <td>${echapperHtml(employe.nom)}</td>
        <td>${echapperHtml(employe.equipe)}</td>
        <td>${formaterDateFr(employe.dateEmbauche)}</td>
        <td class="cellule-actions"><button class="bouton-secondaire" data-reactiver-id="${employe.id}">${t("reactivate")}</button></td>
      </tr>
    `,
    )
    .join("");
}

function afficherTableauBord() {
  if (!tableauBord) {
    return;
  }

  const totalEmployes = employesActifs.length;
  const demandesEnAttente = conges.filter((conge) => conge.statut === "en_attente").length;
  const employesEnCongeAujourdhui = calculerEmployesEnCongeAujourdHui();

  tableauBord.innerHTML = `
    <article class="tuile-kpi">
      <span class="kpi-titre">${t("kpi_employees")}</span>
      <strong class="kpi-valeur">${totalEmployes}</strong>
    </article>
    <article class="tuile-kpi">
      <span class="kpi-titre">${t("kpi_pending_requests")}</span>
      <strong class="kpi-valeur">${demandesEnAttente}</strong>
    </article>
    <article class="tuile-kpi">
      <span class="kpi-titre">${t("kpi_on_leave_today")}</span>
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
    alert(langueCourante === "es" ? "La librería de exportación Excel no está disponible." : "La librairie d'export Excel n'est pas disponible.");
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
    lignes || `<p class="message-vide">${t("no_validated_leave_month")}</p>`;
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
  if (!employesActifs.length) {
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
    listeDemandesEnAttente.innerHTML = `<li class="vide">${t("no_pending_request")}</li>`;
    return;
  }

  listeDemandesEnAttente.innerHTML = demandesEnAttente
    .map((conge) => {
      const employe = employes.find((entry) => entry.id === conge.idEmploye);
      const nom = employe?.nom || t("unknown_employee");

      return `
        <li class="demande-item">
          <div><strong>${echapperHtml(nom)}</strong> : ${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)}</div>
          <div class="actions-demande">
            <button data-valider-id="${conge.id}" class="bouton-secondaire">${t("validate")}</button>
            <button data-refuser-id="${conge.id}" class="bouton-refuser">${t("refuse")}</button>
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
  if (!employesActifs.length) {
    listeResume.innerHTML = `<tr><td colspan="5" class="vide">${t("no_employee_registered")}</td></tr>`;
    return;
  }

  const employesTries = [...employesActifs].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));

  listeResume.innerHTML = employesTries
    .map((employe) => {
      const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
      const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
      const congesRestants = arrondir1Decimale(congesAcquis - congesPris);

      return `
        <tr>
          <td data-label="${t("name_col")}">${echapperHtml(employe.nom)}</td>
          <td data-label="${t("entry_date_col")}">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="${t("earned_leave_col")}">${congesAcquis.toFixed(1)}</td>
          <td data-label="${t("taken_leave_col")}">${congesPris.toFixed(1)}</td>
          <td data-label="${t("remaining_leave_col")}">${congesRestants.toFixed(1)}</td>
        </tr>
      `;
    })
    .join("");
}

function afficherHistorique(historiqueConges) {
  if (!historiqueConges.length) {
    return `<span class="historique-vide">${t("no_leave")}</span>`;
  }

  return historiqueConges
    .map(
      (conge) =>
        `<div class="ligne-historique">${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)} (${conge.jours} ${conge.jours > 1 ? t("day_plural") : t("day_singular")})</div>`,
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
