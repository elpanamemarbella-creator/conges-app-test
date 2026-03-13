import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const CODE_MANAGER = "2005";

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
    birth_date_label: "Date de naissance (JJ/MM)",
    confirm_birth_date_label: "Confirmez votre date de naissance (JJ/MM)",
    birth_date_placeholder: "ex. 18/03",
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
    history_hint: "Cliquer sur un salarié pour afficher l'historique complet de ses demandes.",
    days_col: "Nombre de jours",
    employee_history_title: "Historique des congés - {name}",
    no_employee_history: "Ce salarié n'a aucune demande de congé.",
    status_validated: "Validé",
    status_refused: "Refusé",
    status_pending: "En attente",
    no_employee_registered: "Aucun employé enregistré",
    no_employee_matching: "Aucun employé ne correspond au filtre",
    new_paid_leave_request_title: "Nouvelle demande de congé payé",
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
    archived_employees_title: "Employés archivés",
    archived_show: "▼ afficher",
    archived_hide: "▲ masquer",
    no_archived_employee: "Aucun employé archivé",
    reactivate: "Réactiver",
    delete: "Supprimer",
    browser_data_load_error: "Impossible de charger les données. Vérifie la connexion Firebase.",
    delete_error: "Suppression impossible pour le moment.",
    reactivate_error: "Réactivation impossible pour le moment.",
    manager_prompt: "Entrer le code manager",
    manager_code_required: "Code manager requis",
    cancel: "Annuler",
    wrong_code: "Code incorrect",
    leave_update_error: "Impossible de mettre à jour la demande de congé.",
    add_employee_error: "Impossible d'ajouter l'employé.",
    select_employee_error: "Veuillez choisir un employé.",
    select_dates_error: "Veuillez renseigner la date de début et la date de fin.",
    invalid_range_error: "La date de fin doit être après ou égale à la date de début.",
    leave_created_email_sent: "Demande créée et email envoyé",
    leave_created_email_failed: "Demande créée, mais email non envoyé",
    leave_add_error: "Impossible d'ajouter la demande de congé.",
    fill_all_fields_error: "Veuillez remplir tous les champs.",
    valid_team_error: "Veuillez sélectionner une équipe valide.",
    invalid_hire_date_error: "Date d'embauche invalide.",
    hire_date_future_error: "La date d'embauche ne peut pas être dans le futur.",
    used_leave_negative_error: "Les congés pris doivent être supérieurs ou égaux à 0.",
    birth_date_format_error: "Date de naissance invalide. Utilisez le format JJ/MM.",
    birth_date_incorrect_error: "Date de naissance incorrecte. La demande ne peut pas être envoyée.",
    birth_date_setup_prompt: "Pour sécuriser votre compte, veuillez confirmer votre date de naissance (JJ/MM).",
    excel_lib_missing_error: "La librairie d'export Excel n'est pas disponible.",
    team_bar_morning: "Bar matin",
    team_floor_morning: "Salle matin",
    team_bar_evening: "Bar soir",
    team_floor_evening: "Salle soir",
    team_kitchen: "Cuisine",
    team_extra: "Extra",
    team_cleaning: "Nettoyage et entretien",
    email_leave_request_title: "Nouvelle demande de congé",
    email_employee_label: "Employé",
    email_start_label: "Début",
    email_end_label: "Fin",
    email_days_label: "Nombre de jours",
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
    birth_date_label: "Fecha de nacimiento (DD/MM)",
    confirm_birth_date_label: "Confirma tu fecha de nacimiento (DD/MM)",
    birth_date_placeholder: "ej. 18/03",
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
    history_hint: "Haz clic en un empleado para mostrar su historial completo de solicitudes.",
    days_col: "Número de días",
    employee_history_title: "Historial de vacaciones - {name}",
    no_employee_history: "Este empleado no tiene solicitudes de vacaciones.",
    status_validated: "Validado",
    status_refused: "Rechazado",
    status_pending: "En espera",
    no_employee_registered: "Ningún empleado registrado",
    no_employee_matching: "Ningún empleado coincide con el filtro",
    new_paid_leave_request_title: "Nueva solicitud de vacaciones pagadas",
    new_leave_request_title: "Nueva solicitud de vacaciones",
    no_employee_available: "No hay empleados disponibles",
    start_date_label: "Fecha inicio",
    end_date_label: "Fecha fin",
    add_request_button: "Añadir solicitud",
    pending_requests_title: "Solicitudes de vacaciones pendientes",
    loading: "Cargando...",
    no_pending_request: "No hay solicitudes pendientes",
    unknown_employee: "Empleado desconocido",
    validate: "Aprobar",
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
    delete: "Eliminar",
    browser_data_load_error: "No se pueden cargar los datos. Verifica la conexión Firebase.",
    delete_error: "Eliminación imposible por el momento.",
    reactivate_error: "Reactivación imposible por el momento.",
    manager_prompt: "Introduce el código del manager",
    manager_code_required: "Código de manager requerido",
    cancel: "Cancelar",
    wrong_code: "Código incorrecto",
    leave_update_error: "No se puede actualizar la solicitud de vacaciones.",
    add_employee_error: "No se puede añadir el empleado.",
    select_employee_error: "Seleccione un empleado.",
    select_dates_error: "Indique la fecha de inicio y de fin.",
    invalid_range_error: "La fecha de fin debe ser posterior o igual a la fecha de inicio.",
    leave_created_email_sent: "Solicitud creada y email enviado",
    leave_created_email_failed: "Solicitud creada, pero email no enviado",
    leave_add_error: "No se puede añadir la solicitud de vacaciones.",
    fill_all_fields_error: "Complete todos los campos.",
    valid_team_error: "Seleccione un equipo válido.",
    invalid_hire_date_error: "Fecha de incorporación no válida.",
    hire_date_future_error: "La fecha de incorporación no puede estar en el futuro.",
    used_leave_negative_error: "Las vacaciones disfrutadas deben ser mayores o iguales a 0.",
    birth_date_format_error: "Fecha de nacimiento no válida. Usa el formato DD/MM.",
    birth_date_incorrect_error: "Fecha de nacimiento incorrecta. La solicitud no se puede enviar.",
    birth_date_setup_prompt: "Para proteger tu cuenta, confirma tu fecha de nacimiento (DD/MM).",
    excel_lib_missing_error: "La librería de exportación Excel no está disponible.",
    team_bar_morning: "Bar mañana",
    team_floor_morning: "Sala mañana",
    team_bar_evening: "Bar noche",
    team_floor_evening: "Sala noche",
    team_kitchen: "Cocina",
    team_extra: "Extra",
    team_cleaning: "Limpieza y mantenimiento",
    email_leave_request_title: "Nueva solicitud de vacaciones",
    email_employee_label: "Empleado",
    email_start_label: "Inicio",
    email_end_label: "Fin",
    email_days_label: "Días",
  },
  en: {
    app_title: "Employee leave management",
    dashboard_title: "Dashboard",
    add_employee_title: "Add employee",
    employee_name_label: "Employee name",
    employee_name_placeholder: "e.g. Alex Martin",
    team_label: "Team",
    team_select_placeholder: "Select a team",
    hire_date_label: "Hire date",
    used_leave_label: "Leave already taken",
    birth_date_label: "Birth date (DD/MM)",
    confirm_birth_date_label: "Confirm your birth date (DD/MM)",
    birth_date_placeholder: "e.g. 18/03",
    add_employee_button: "Add employee",
    employees_title: "Employees",
    team_filter_label: "Team filter",
    all_teams: "All teams",
    employee_search_label: "Employee search",
    employee_search_placeholder: "Search an employee",
    export_excel: "Export Excel",
    employee_col: "Employee",
    team_col: "Team",
    hire_date_col: "Hire date",
    earned_leave_col: "Leave earned",
    taken_leave_col: "Leave taken",
    remaining_leave_col: "Leave remaining",
    leave_history_col: "Leave history",
    status_col: "Status",
    action_col: "Action",
    history_hint: "Click an employee to display the full request history.",
    days_col: "Number of days",
    employee_history_title: "Leave history - {name}",
    no_employee_history: "This employee has no leave requests.",
    status_validated: "Approved",
    status_refused: "Rejected",
    status_pending: "Pending",
    no_employee_registered: "No employee registered",
    no_employee_matching: "No employee matches the filter",
    new_paid_leave_request_title: "New paid leave request",
    new_leave_request_title: "New leave request",
    no_employee_available: "No employee available",
    start_date_label: "Start date",
    end_date_label: "End date",
    add_request_button: "Add request",
    pending_requests_title: "Pending leave requests",
    loading: "Loading...",
    no_pending_request: "No pending request",
    unknown_employee: "Unknown employee",
    validate: "Approve",
    refuse: "Reject",
    summary_title: "Summary",
    name_col: "Name",
    entry_date_col: "Entry date",
    save_title: "Backup",
    save_auto_message: "Backup is handled automatically by the existing system.",
    calendar_title: "Leave calendar",
    no_validated_leave_month: "No approved leave in the current month.",
    no_leave: "No leave",
    day_singular: "day",
    day_plural: "days",
    status_ok: "OK",
    status_attention: "Attention",
    status_low: "Low",
    kpi_employees: "Employees",
    kpi_pending_requests: "Pending requests",
    kpi_on_leave_today: "On leave today",
    archived_employees_title: "Archived employees",
    archived_show: "▼ show",
    archived_hide: "▲ hide",
    no_archived_employee: "No archived employee",
    reactivate: "Reactivate",
    delete: "Delete",
    browser_data_load_error: "Unable to load data. Please check the Firebase connection.",
    delete_error: "Unable to delete employee for now.",
    reactivate_error: "Unable to reactivate employee for now.",
    manager_prompt: "Enter manager code",
    manager_code_required: "Manager code required",
    cancel: "Cancel",
    wrong_code: "Wrong code",
    leave_update_error: "Unable to update leave request.",
    add_employee_error: "Unable to add employee.",
    select_employee_error: "Please select an employee.",
    select_dates_error: "Please provide start and end dates.",
    invalid_range_error: "End date must be after or equal to start date.",
    leave_created_email_sent: "Request created and email sent",
    leave_created_email_failed: "Request created, but email was not sent",
    leave_add_error: "Unable to add leave request.",
    fill_all_fields_error: "Please fill in all fields.",
    valid_team_error: "Please select a valid team.",
    invalid_hire_date_error: "Invalid hire date.",
    hire_date_future_error: "Hire date cannot be in the future.",
    used_leave_negative_error: "Taken leave must be greater than or equal to 0.",
    birth_date_format_error: "Invalid birth date. Use DD/MM format.",
    birth_date_incorrect_error: "Incorrect birth date. The request cannot be sent.",
    birth_date_setup_prompt: "To secure your account, please confirm your birth date (DD/MM).",
    excel_lib_missing_error: "Excel export library is not available.",
    team_bar_morning: "Bar – morning shift",
    team_floor_morning: "Service – morning shift",
    team_bar_evening: "Bar – evening shift",
    team_floor_evening: "Service – evening shift",
    team_kitchen: "Kitchen",
    team_extra: "Extra",
    team_cleaning: "Cleaning and maintenance",
    email_leave_request_title: "New leave request",
    email_employee_label: "Employee",
    email_start_label: "Start",
    email_end_label: "End",
    email_days_label: "Days",
  },
};

const ORDRE_EQUIPES = ["Bar matin", "Salle matin", "Bar soir", "Salle soir", "Cuisine", "Extra", "Nettoyage et entretien"];
const CLES_EQUIPE = {
  "Bar matin": "team_bar_morning",
  "Salle matin": "team_floor_morning",
  "Bar soir": "team_bar_evening",
  "Salle soir": "team_floor_evening",
  Cuisine: "team_kitchen",
  Extra: "team_extra",
  "Nettoyage et entretien": "team_cleaning",
};
const PALETTE_COULEURS = ["#2f80ed", "#eb5757", "#27ae60", "#f2994a", "#9b51e0", "#00b8d9", "#e84393", "#6c5ce7"];

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
const birthDateEmployeInput = document.getElementById("birth-date-employe");
const birthDateDemandeInput = document.getElementById("demande-birth-date");
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
const historiqueSalarieBloc = document.getElementById("historique-salarie");
const historiqueSalarieTitre = document.getElementById("historique-salarie-titre");
const historiqueSalarieListe = document.getElementById("historique-salarie-liste");
const calendrierCongesMois = document.getElementById("calendrier-conges-mois");
const managerModal = document.getElementById("manager-modal");
const managerCodeInput = document.getElementById("manager-code-input");
const managerModalErreur = document.getElementById("manager-modal-erreur");
const managerModalValider = document.getElementById("manager-modal-valider");
const managerModalAnnuler = document.getElementById("manager-modal-annuler");
const noteTooltip = document.getElementById("noteTooltip");
const menuOnglets = document.querySelectorAll(".menu-onglet");
const zonesOnglets = document.querySelectorAll("[data-zone]");
const boutonsLangue = document.querySelectorAll("[data-langue]");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

if (noteTooltip) {
  if (!isMobile) {
    document.addEventListener("mouseover", (event) => {
      const icon = event.target.closest(".note-icon");

      if (!icon) {
        return;
      }

      noteTooltip.textContent = icon.dataset.note || "";
      noteTooltip.style.display = "block";
    });

    document.addEventListener("mousemove", (event) => {
      if (noteTooltip.style.display !== "block") {
        return;
      }

      noteTooltip.style.left = `${event.clientX + 15}px`;
      noteTooltip.style.top = `${event.clientY + 15}px`;
    });

    document.addEventListener("mouseout", (event) => {
      if (event.target.closest(".note-icon")) {
        noteTooltip.style.display = "none";
      }
    });
  }

  if (isMobile) {
    document.addEventListener("click", (event) => {
      const icon = event.target.closest(".note-icon");

      if (!icon) {
        return;
      }

      alert(icon.dataset.note || "");
    });
  }
}

let employes = [];
let conges = [];
let employesFiltres = [];
let employesActifs = [];
let employesArchives = [];
let archivesOuvertes = false;
let langueCourante = detecterLangueInitiale();
let employeSelectionneId = "";

function t(cle) {
  return TRADUCTIONS[langueCourante]?.[cle] || TRADUCTIONS.fr[cle] || cle;
}

function tEquipe(equipe) {
  return t(CLES_EQUIPE[equipe] || "team_extra");
}

function detecterLangueInitiale() {
  const langueEmail = localStorage.getItem("language");
  if (TRADUCTIONS[langueEmail]) {
    return langueEmail;
  }

  const langueSauvegardee = localStorage.getItem("langue-app");
  if (TRADUCTIONS[langueSauvegardee]) {
    return langueSauvegardee;
  }

  const browserLang = (navigator.language || navigator.userLanguage || "fr").toLowerCase();
  if (browserLang.startsWith("es")) {
    return "es";
  }

  if (browserLang.startsWith("en")) {
    return "en";
  }

  return "fr";
}

function rafraichirSelecteursEquipes() {
  const selecteurs = [document.getElementById("equipe-employe"), filtreEquipeSelect].filter(Boolean);
  selecteurs.forEach((selecteur) => {
    selecteur.querySelectorAll("option[data-equipe-value]").forEach((option) => {
      option.textContent = tEquipe(option.dataset.equipeValue);
    });
  });
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

  rafraichirSelecteursEquipes();
}

function changerLangue(langue) {
  if (!TRADUCTIONS[langue]) {
    return;
  }
  langueCourante = langue;
  localStorage.setItem("langue-app", langue);
  localStorage.setItem("language", langue);
  appliquerTraductionsStatiques();
  afficherEmployes();
  mettreAJourLibelleArchives();
  afficherBlocDemandeConge();
  afficherDemandesEnAttente();
  afficherResume();
  afficherTableauBord();
  afficherCalendrierMensuel();
  afficherHistoriqueSalarieSelectionne();
}

function recupererLangueActive() {
  const langueStockee = localStorage.getItem("language") || localStorage.getItem("langue-app") || "fr";
  return TRADUCTIONS[langueStockee] ? langueStockee : "fr";
}

function normaliserEquipe(equipe) {
  if (equipe === "Extras") {
    return "Extra";
  }
  return ORDRE_EQUIPES.includes(equipe) ? equipe : "Extra";
}

function normaliserStatut(statut) {
  const statutNormalise = String(statut || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (["valide", "validee", "approved"].includes(statutNormalise)) {
    return "valide";
  }

  if (["refuse", "refusee", "rejected"].includes(statutNormalise)) {
    return "refuse";
  }

  if (["annule", "annulee", "cancelled", "canceled"].includes(statutNormalise)) {
    return "annule";
  }

  if (["en_attente", "en attente", "pending"].includes(statutNormalise)) {
    return "en_attente";
  }

  return "en_attente";
}

function normaliserConge(id, conge) {
  const idEmploye = conge.idEmploye || conge.employeId || "";
  const dateDebut = conge.dateDebut || "";
  const dateFin = conge.dateFin || "";
  const jours = calculJoursCalendaires(dateDebut, dateFin);

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
  const misesAJourJours = [];

  querySnapshot.forEach((entry) => {
    const donneesBrutes = entry.data();
    const joursStockes = Number(donneesBrutes.jours);
    const conge = normaliserConge(entry.id, donneesBrutes);
    if (!conge.idEmploye || !conge.dateDebut || !conge.dateFin || conge.jours <= 0) {
      return;
    }

    if (joursStockes !== conge.jours) {
      misesAJourJours.push(
        setDoc(
          doc(db, "conges", conge.id),
          {
            jours: conge.jours,
          },
          { merge: true },
        ),
      );
    }

    liste.push(conge);
  });

  if (misesAJourJours.length) {
    await Promise.all(misesAJourJours);
  }

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
      note: typeof employe.note === "string" ? employe.note : "",
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

  return liste.map((emp) => ({
    ...emp,
    note: typeof emp.note === "string" ? emp.note : "",
  }));
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
  afficherHistoriqueSalarieSelectionne();
}

async function initApp() {
  try {
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur Firebase / Firestore au chargement :", erreur);
    alert(t("browser_data_load_error"));
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

listeEmployes.addEventListener("click", async (event) => {
  const celluleCongesPris = event.target.closest(".cellule-conges-pris");
  if (celluleCongesPris) {
    const ligneCible = celluleCongesPris.closest(".ligne-employe[data-employe-id]");
    const employe = employes.find((entry) => entry.id === ligneCible?.dataset.employeId);

    if (!employe) {
      return;
    }

    const code = prompt("Code manager requis");
    if (code !== CODE_MANAGER) {
      alert("Code manager incorrect");
      return;
    }

    const nouveau = window.prompt("Modifier les congés pris :", employe.congesPris);
    if (nouveau === null) {
      return;
    }

    const congesPris = Number(nouveau);
    if (Number.isNaN(congesPris)) {
      return;
    }

    employe.congesPris = congesPris;
    await sauvegarderEmployes(employe);
    afficherEmployes();
    return;
  }

  const boutonSuppression = event.target.closest("[data-supprimer-id]");
  if (boutonSuppression) {
    const id = boutonSuppression.dataset.supprimerId;
    const codeValide = await demanderCodeManager();
    if (!codeValide) {
      return;
    }

    try {
      await supprimerEmploye(id);
      await rafraichirDonnees();
    } catch (erreur) {
      console.error("Erreur suppression employé :", erreur);
      alert(t("delete_error"));
    }
    return;
  }

  const ligneEmploye = event.target.closest(".ligne-employe[data-employe-id]");
  if (!ligneEmploye) {
    return;
  }

  employeSelectionneId = ligneEmploye.dataset.employeId || "";
  afficherEmployes();
  afficherHistoriqueSalarieSelectionne();
});

listeEmployesArchives?.addEventListener("click", async (event) => {
  const btn = event.target.closest("[data-reactiver-id]");
  if (!btn) return;

  try {
    await reactiverEmploye(btn.dataset.reactiverId);
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur réactivation employé :", erreur);
    alert(t("reactivate_error"));
  }
});

function demanderCodeManager() {
  const code = prompt("Code manager requis");
  if (code !== CODE_MANAGER) {
    alert("Code manager incorrect");
    return false;
  }

  return true;
}

function structurerNote(texte) {
  const phrases = texte
    .replace(/[,;]/g, ".")
    .split(".")
    .map((phrase) => phrase.trim())
    .filter((phrase) => phrase.length > 0)
    .map((phrase) => phrase.charAt(0).toUpperCase() + phrase.slice(1));

  return phrases.join(".\n");
}

function ouvrirFenetreNote(employe) {
  const modalExistant = document.getElementById("noteModal");
  if (modalExistant) {
    modalExistant.remove();
  }

  const noteModal = document.createElement("div");
  noteModal.id = "noteModal";
  noteModal.className = "note-modal";
  noteModal.innerHTML = `
    <div class="note-modal__overlay"></div>
    <div class="noteBox" role="dialog" aria-modal="true" aria-labelledby="noteModalTitle">
      <h3 id="noteModalTitle">Note pour ${echapperHtml(employe.nom)}</h3>
      <textarea id="noteTextarea" class="note-modal__textarea"></textarea>
      <div class="note-tools">
        <button id="dictateNote" type="button">🎤 Dicter</button>
        <button id="structureNote" type="button">✨ Structurer la note</button>
      </div>
      <div class="buttons note-modal__buttons">
        <button id="saveNote" type="button">Enregistrer</button>
        <button id="cancelNote" type="button" class="note-modal__cancel">Annuler</button>
      </div>
    </div>
  `;

  document.body.append(noteModal);

  const noteTextarea = noteModal.querySelector("#noteTextarea");
  const boutonDictee = noteModal.querySelector("#dictateNote");
  const boutonStructurer = noteModal.querySelector("#structureNote");
  const boutonEnregistrer = noteModal.querySelector("#saveNote");
  const boutonAnnuler = noteModal.querySelector("#cancelNote");

  noteTextarea.value = employe.note || "";
  noteTextarea.focus();

  const fermer = () => {
    noteModal.remove();
  };

  boutonAnnuler.addEventListener("click", fermer);
  noteModal.querySelector(".note-modal__overlay")?.addEventListener("click", fermer);

  boutonDictee?.addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("La dictée vocale n'est pas supportée sur ce navigateur. Utilisez le micro du clavier.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "fr-FR";
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const texte = event.results[0][0].transcript;
      noteTextarea.value += `\n${texte}`;
    };

    recognition.start();
  });

  boutonStructurer?.addEventListener("click", () => {
    noteTextarea.value = structurerNote(noteTextarea.value);
  });

  boutonEnregistrer.addEventListener("click", async () => {
    employe.note = noteTextarea.value;
    await sauvegarderEmployes(employe);
    afficherEmployes();
    fermer();
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
  const code = prompt("Code manager requis");
  if (code !== CODE_MANAGER) {
    alert("Code manager incorrect");
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
    alert(t("leave_update_error"));
  }
});

formulaireEmploye.addEventListener("submit", async (event) => {
  event.preventDefault();

  const birthCode = normaliserCodeNaissance(birthDateEmployeInput?.value);

  if (!birthCode) {
    alert(t("birth_date_format_error"));
    return;
  }

  const nouvelEmploye = {
    id: "",
    nom: document.getElementById("nom-employe").value.trim(),
    equipe: normaliserEquipe(document.getElementById("equipe-employe").value),
    dateEmbauche: document.getElementById("date-embauche").value,
    congesPris: Number(document.getElementById("conges-pris").value),
    birthCode,
    historiqueConges: [],
    note: "",
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
    alert(t("add_employee_error"));
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
  const codeSaisi = normaliserCodeNaissance(birthDateDemandeInput?.value);

  if (!idEmploye) {
    alert(t("select_employee_error"));
    return;
  }

  if (!dateDebut || !dateFin) {
    alert(t("select_dates_error"));
    return;
  }

  if (!codeSaisi) {
    alert(t("birth_date_format_error"));
    return;
  }

  const jours = calculJoursCalendaires(dateDebut, dateFin);

  if (jours <= 0) {
    alert(t("invalid_range_error"));
    return;
  }

  const employe = employes.find((entry) => entry.id === idEmploye);

  if (!employe) {
    alert(t("select_employee_error"));
    return;
  }

  const codeValide = await garantirCodeNaissanceEmploye(employe, codeSaisi);
  if (!codeValide) {
    alert(t("birth_date_incorrect_error"));
    return;
  }

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
      afficherMessageDemandeConge(t("leave_created_email_sent"), "success");
    } catch (emailErreur) {
      console.error("Erreur envoi email demande de congé :", emailErreur);
      afficherMessageDemandeConge(t("leave_created_email_failed"), "error");
    }

    formulaireDemandeConge.reset();
    await rafraichirDonnees();
  } catch (erreur) {
    console.error("Erreur ajout congé :", erreur);
    alert(t("leave_add_error"));
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

  const language = recupererLangueActive();
  let subject;
  let message;

  if (language === "en") {
    subject = "New leave request";
    message = [
      "New leave request",
      "",
      `Employee : ${employeeName}`,
      `Start : ${startDate}`,
      `End : ${endDate}`,
      `Days : ${daysRequested}`,
    ].join("\n");
  } else if (language === "es") {
    subject = "Nueva solicitud de vacaciones";
    message = [
      "Nueva solicitud de vacaciones",
      "",
      `Empleado : ${employeeName}`,
      `Inicio : ${startDate}`,
      `Fin : ${endDate}`,
      `Días : ${daysRequested}`,
    ].join("\n");
  } else {
    subject = "Nouvelle demande de congé";
    message = [
      "Nouvelle demande de congé",
      "",
      `Employé : ${employeeName}`,
      `Début : ${startDate}`,
      `Fin : ${endDate}`,
      `Nombre de jours : ${daysRequested}`,
    ].join("\n");
  }

  return window.emailjs
    .send("service_ikwskjo", "template_108z5ht", {
      subject,
      message,
      employee_name: employeeName,
      start_date: startDate,
      end_date: endDate,
      days_requested: daysRequested,
    })
    .then((response) => {
      console.log("Email envoyé", response.status);
      return response;
    })
    .catch((error) => {
      console.error("Erreur EmailJS :", error);
      throw error;
    });
}

function normaliserCodeNaissance(valeur) {
  const correspondance = String(valeur || "").trim().match(/^(\d{2})\s*[\/\-\.]?\s*(\d{2})$/);

  if (!correspondance) {
    return "";
  }

  const jour = Number(correspondance[1]);
  const mois = Number(correspondance[2]);

  if (jour < 1 || jour > 31 || mois < 1 || mois > 12) {
    return "";
  }

  return `${String(jour).padStart(2, "0")}${String(mois).padStart(2, "0")}`;
}

async function garantirCodeNaissanceEmploye(employe, codeSaisi) {
  if (employe.birthCode) {
    return employe.birthCode === codeSaisi;
  }

  alert(t("birth_date_setup_prompt"));

  await setDoc(
    doc(db, "employes", employe.id),
    {
      birthCode: codeSaisi,
    },
    { merge: true },
  );

  employe.birthCode = codeSaisi;
  return true;
}

function validerEmploye(employe) {
  if (!employe.nom || !employe.equipe || !employe.dateEmbauche || !employe.birthCode) {
    alert(t("fill_all_fields_error"));
    return false;
  }

  if (!ORDRE_EQUIPES.includes(employe.equipe)) {
    alert(t("valid_team_error"));
    return false;
  }

  const dateEmbauche = new Date(`${employe.dateEmbauche}T00:00:00`);
  const aujourdHui = new Date();

  if (Number.isNaN(dateEmbauche.getTime())) {
    alert(t("invalid_hire_date_error"));
    return false;
  }

  if (dateEmbauche > aujourdHui) {
    alert(t("hire_date_future_error"));
    return false;
  }

  if (employe.congesPris < 0) {
    alert(t("used_leave_negative_error"));
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

async function sauvegarderEmployes(employe) {
  if (!employe?.id) {
    return;
  }

  await setDoc(
    doc(db, "employes", employe.id),
    {
      congesPris: Number(employe.congesPris) || 0,
      note: employe.note || "",
    },
    { merge: true },
  );
}

function calculJoursCalendaires(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 0;
  }

  const diffTime = end - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
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
  const equipeFiltre = filtreEquipeSelect?.value || "";
  const recherche = (rechercheEmployeInput?.value || "").trim().toLowerCase();

  return trierEmployesParEquipe().filter((employe) => {
    const correspondEquipe = !equipeFiltre || employe.equipe === equipeFiltre;
    const correspondRecherche = !recherche || employe.nom.toLowerCase().includes(recherche);
    return correspondEquipe && correspondRecherche;
  });
}

function afficherEmployes() {
  if (!employesActifs.length) {
    listeEmployes.innerHTML = `<tr><td colspan="9" class="vide">${t("no_employee_registered")}</td></tr>`;
    employesFiltres = [];
    employeSelectionneId = "";
    afficherEmployesArchives();
    afficherHistoriqueSalarieSelectionne();
    return;
  }

  const employesTries = obtenirEmployesFiltres();
  employesFiltres = employesTries;

  if (!employesTries.length) {
    listeEmployes.innerHTML = `<tr><td colspan="9" class="vide">${t("no_employee_matching")}</td></tr>`;
    afficherEmployesArchives();
    afficherHistoriqueSalarieSelectionne();
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
            ? `<tr class="ligne-groupe"><td colspan="9">=== ${echapperHtml(tEquipe(employe.equipe).toUpperCase())} ===</td></tr>`
            : ""
        }
        <tr class="ligne-employe equipe-${classeEquipe} ${employeSelectionneId === employe.id ? "selectionne" : ""}" data-employe-id="${employe.id}">
          <td data-label="${t("employee_col")}">
            ${echapperHtml(employe.nom)}
            ${
              employe.note
                ? `<span class="note-indicator note-icon" aria-label="Note" data-note="${echapperHtml(employe.note)}">📝</span>`
                : ""
            }
          </td>
          <td data-label="${t("team_col")}"><span class="badge-equipe equipe-${classeEquipe}">${echapperHtml(tEquipe(employe.equipe))}</span></td>
          <td data-label="${t("hire_date_col")}">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="${t("earned_leave_col")}">${congesAcquis.toFixed(1)}</td>
          <td data-label="${t("taken_leave_col")}" class="cellule-conges-pris">${congesPris.toFixed(1)}</td>
          <td data-label="${t("remaining_leave_col")}">${congesRestants.toFixed(1)}</td>
          <td data-label="${t("leave_history_col")}">${afficherHistorique(employe.historiqueConges)}</td>
          <td data-label="${t("status_col")}"><span class="pastille ${classeStatut}">${libelleStatut}</span></td>
          <td data-label="${t("action_col")}" class="cellule-actions">
            <button class="bouton-supprimer" data-supprimer-id="${employe.id}">${t("delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const lignesEmployes = listeEmployes.querySelectorAll(".ligne-employe[data-employe-id]");
  lignesEmployes.forEach((ligne) => {
    const employe = employes.find((entry) => entry.id === ligne.dataset.employeId);
    if (!employe) {
      return;
    }

    ligne.addEventListener("dblclick", async () => {
      const codeValide = demanderCodeManager();
      if (!codeValide) {
        return;
      }

      ouvrirFenetreNote(employe);
    });
  });

  if (employeSelectionneId && !employesTries.some((employe) => employe.id === employeSelectionneId)) {
    employeSelectionneId = "";
  }

  afficherEmployesArchives();
  afficherHistoriqueSalarieSelectionne();
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
        <td>${echapperHtml(tEquipe(employe.equipe))}</td>
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

  let compteur = 0;

  employes.forEach((employe) => {
    if (!Array.isArray(employe.historiqueConges)) {
      return;
    }

    const estEnCongeAujourdHui = employe.historiqueConges.some((conge) => {
      if (!conge || !conge.dateDebut || !conge.dateFin) {
        return false;
      }

      const debut = new Date(`${conge.dateDebut}T00:00:00`);
      const fin = new Date(`${conge.dateFin}T00:00:00`);

      if (Number.isNaN(debut.getTime()) || Number.isNaN(fin.getTime())) {
        return false;
      }

      debut.setHours(0, 0, 0, 0);
      fin.setHours(0, 0, 0, 0);

      return aujourdHui >= debut && aujourdHui <= fin;
    });

    if (estEnCongeAujourdHui) {
      compteur++;
    }
  });

  return compteur;
}

function exporterEmployesExcel() {
  if (!window.XLSX) {
    alert(t("excel_lib_missing_error"));
    return;
  }

  const lignes = employesFiltres.map((employe) => {
    const congesAcquis = calculerCongesAcquis(employe.dateEmbauche);
    const congesPris = arrondir1Decimale(Number(employe.congesPris) || 0);
    const congesRestants = arrondir1Decimale(congesAcquis - congesPris);

    return {
      Nom: employe.nom,
      Equipe: tEquipe(employe.equipe),
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
        `<option value="${employe.id}">${echapperHtml(employe.nom)} (${echapperHtml(tEquipe(employe.equipe))})</option>`,
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



function libelleStatutConge(statut) {
  if (statut === "valide") {
    return t("status_validated");
  }

  if (statut === "refuse") {
    return t("status_refused");
  }

  return t("status_pending");
}

function afficherHistoriqueSalarieSelectionne() {
  if (!historiqueSalarieBloc || !historiqueSalarieListe || !historiqueSalarieTitre) {
    return;
  }

  if (!employeSelectionneId) {
    historiqueSalarieBloc.hidden = true;
    historiqueSalarieListe.innerHTML = "";
    return;
  }

  const employe = employesActifs.find((entry) => entry.id === employeSelectionneId);
  if (!employe) {
    historiqueSalarieBloc.hidden = true;
    historiqueSalarieListe.innerHTML = "";
    return;
  }

  historiqueSalarieBloc.hidden = false;
  historiqueSalarieTitre.textContent = t("employee_history_title").replace("{name}", employe.nom);

  const historique = conges
    .filter((conge) => conge.idEmploye === employe.id)
    .sort((a, b) => b.dateDebut.localeCompare(a.dateDebut));

  if (!historique.length) {
    historiqueSalarieListe.innerHTML = `<tr><td colspan="4" class="vide">${t("no_employee_history")}</td></tr>`;
    return;
  }

  historiqueSalarieListe.innerHTML = historique
    .map(
      (conge) => `
      <tr>
        <td data-label="${t("start_date_label")}">${formaterDateFr(conge.dateDebut)}</td>
        <td data-label="${t("end_date_label")}">${formaterDateFr(conge.dateFin)}</td>
        <td data-label="${t("days_col")}">${conge.jours}</td>
        <td data-label="${t("status_col")}">${libelleStatutConge(conge.statut)}</td>
      </tr>
    `,
    )
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
  const date = dateLocaleDepuisTexte(dateBrute);
  if (!date) {
    return "";
  }
  const jour = String(date.getDate()).padStart(2, "0");
  const mois = String(date.getMonth() + 1).padStart(2, "0");
  const annee = date.getFullYear();
  return `${jour}/${mois}/${annee}`;
}

function dateLocaleDepuisTexte(dateBrute) {
  const texte = String(dateBrute || "").split("T")[0];
  const [anneeTexte, moisTexte, jourTexte] = texte.split("-");
  const annee = Number(anneeTexte);
  const mois = Number(moisTexte);
  const jour = Number(jourTexte);

  if (!annee || !mois || !jour) {
    return null;
  }

  return new Date(annee, mois - 1, jour);
}

function echapperHtml(valeur) {
  return String(valeur)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
