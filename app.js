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
    calendar_title: "Calendrier des vacances",
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
    noteTitle: "Note pour",
    save: "Enregistrer",
    dictate: "Dicter",
    structure: "Structurer la note",
    dictate_not_supported: "La dictée vocale n'est pas supportée sur ce navigateur. Utilisez le micro du clavier.",
    edit_taken_leave_prompt: "Modifier les congés pris :",
    note_aria_label: "Note",
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
    planning_status_vacation: "Vacances",
    planning_status_sick: "Maladie",
    planning_status_rest: "Repos",
    planning_status_work: "Travail",
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
    noteTitle: "Nota para",
    save: "Guardar",
    dictate: "Dictar",
    structure: "Estructurar la nota",
    dictate_not_supported: "El dictado por voz no es compatible con este navegador. Utiliza el micrófono del teclado.",
    edit_taken_leave_prompt: "Modificar vacaciones disfrutadas:",
    note_aria_label: "Nota",
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
    planning_status_vacation: "Vacaciones",
    planning_status_sick: "Baja médica",
    planning_status_rest: "Descanso",
    planning_status_work: "Programado",
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
    noteTitle: "Note for",
    save: "Save",
    dictate: "Dictate",
    structure: "Structure note",
    dictate_not_supported: "Voice dictation is not supported in this browser. Use your keyboard microphone.",
    edit_taken_leave_prompt: "Edit taken leave:",
    note_aria_label: "Note",
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
    planning_status_vacation: "Vacation",
    planning_status_sick: "Sick leave",
    planning_status_rest: "Day off",
    planning_status_work: "Scheduled",
  },
};

const TEAM_ORDER = [
  "nettoyage-entretien",
  "bar matin",
  "salle matin",
  "cuisine matin",
  "cuisine soir",
  "salle soir",
  "bar soir",
  "chicha",
  "dj",
  "rp",
  "portier",
  "extra",
];
const TEAMS = {
  "nettoyage-entretien": { id: "nettoyage-entretien", fr: "Nettoyage / Entretien", es: "Limpieza / Mantenimiento", en: "Cleaning / Maintenance", color: "#0ea5e9" },
  "bar matin": { id: "bar matin", fr: "Bar matin", es: "Bar mañana", en: "Morning bar", color: "#1d4ed8" },
  "salle matin": { id: "salle matin", fr: "Salle matin", es: "Sala mañana", en: "Morning floor", color: "#166534" },
  "cuisine matin": { id: "cuisine matin", fr: "Cuisine matin", es: "Cocina mañana", en: "Morning kitchen", color: "#b45309" },
  "cuisine soir": { id: "cuisine soir", fr: "Cuisine soir", es: "Cocina noche", en: "Evening kitchen", color: "#be123c" },
  "salle soir": { id: "salle soir", fr: "Salle soir", es: "Sala noche", en: "Evening floor", color: "#9333ea" },
  "bar soir": { id: "bar soir", fr: "Bar soir", es: "Bar noche", en: "Evening bar", color: "#4338ca" },
  chicha: { id: "chicha", fr: "Chicha", es: "Shisha", en: "Shisha", color: "#15803d" },
  dj: { id: "dj", fr: "DJ", es: "DJ", en: "DJ", color: "#7c3aed" },
  rp: { id: "rp", fr: "RP", es: "RRPP", en: "PR", color: "#0f766e" },
  portier: { id: "portier", fr: "Portier", es: "Portero", en: "Doorman", color: "#9a3412" },
  extra: { id: "extra", fr: "Extra", es: "Extra", en: "Extra", color: "#4b5563" },
};
const TEAM_KEYS = {
  "Nettoyage / Entretien": "nettoyage-entretien",
  "Nettoyage et entretien": "nettoyage-entretien",
  "Bar matin": "bar matin",
  "Salle matin": "salle matin",
  "Cuisine matin": "cuisine matin",
  "Cuisine soir": "cuisine soir",
  Cuisine: "cuisine soir",
  "Salle soir": "salle soir",
  "Bar soir": "bar soir",
  Chicha: "chicha",
  DJ: "dj",
  RP: "rp",
  Portier: "portier",
  Extra: "extra",
  Extras: "extra",
};
const WEEKLY_REST_OPTIONS = [
  { value: 1, label: "Lundi" },
  { value: 2, label: "Mardi" },
  { value: 3, label: "Mercredi" },
  { value: 4, label: "Jeudi" },
  { value: 5, label: "Vendredi" },
  { value: 6, label: "Samedi" },
  { value: 0, label: "Dimanche" },
];

const EMAILJS_PUBLIC_KEY = "cBFH1mPW-cT8LzOBh";

if (window.emailjs && !window.__emailjsInitialized) {
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
  window.__emailjsInitialized = true;
}

window.__sendingEmail = false;

const CLASSES_EQUIPE = {
  "bar matin": "bar-matin",
  "salle matin": "salle-matin",
  "bar soir": "bar-soir",
  "salle soir": "salle-soir",
  "cuisine matin": "cuisine",
  "cuisine soir": "cuisine",
  "nettoyage-entretien": "nettoyage-entretien",
  chicha: "chicha",
  dj: "dj",
  rp: "rp",
  portier: "portier",
  extra: "extras",
  "Bar matin": "bar-matin",
  "Salle matin": "salle-matin",
  "Bar soir": "bar-soir",
  "Salle soir": "salle-soir",
  "Cuisine matin": "cuisine",
  "Cuisine soir": "cuisine",
  Extra: "extras",
  "Nettoyage et entretien": "nettoyage-entretien",
  "Nettoyage / Entretien": "nettoyage-entretien",
  Chicha: "chicha",
  DJ: "dj",
  RP: "rp",
  Portier: "portier",
  extra: "extras",
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
const openPlanningButton = document.getElementById("openPlanning");
const planningView = document.getElementById("planningView");
const planningBody = document.getElementById("planningBody");
const coverageContent = document.getElementById("coverageContent");
const weekLabel = document.getElementById("weekLabel");
const prevWeekButton = document.getElementById("prevWeek");
const nextWeekButton = document.getElementById("nextWeek");
const menuOnglets = document.querySelectorAll(".menu-onglet");
const zonesOnglets = document.querySelectorAll("[data-zone]");
const boutonsLangue = document.querySelectorAll("[data-langue]");
document.addEventListener("click", async (event) => {
  const cell = event.target.closest(".vacation-history");
  if (cell) {
    const historique = JSON.parse(cell.dataset.history || "[]");

    if (!historique.length) {
      alert("Aucun congé enregistré.");
      return;
    }

    let texte = "Historique complet des congés\n\n";

    historique.forEach((conge) => {
      texte += `${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)}\n`;
    });

    alert(texte);
    return;
  }

  const icon = event.target.closest(".note-icon");
  if (!icon) {
    return;
  }

  const ligneEmploye = icon.closest(".ligne-employe[data-employe-id]");
  const employe = employes.find((entry) => entry.id === ligneEmploye?.dataset.employeId);
  if (!employe) {
    return;
  }

  const codeValide = await demanderCodeManager();
  if (!codeValide) {
    return;
  }

  ouvrirFenetreNote(employe);
});

let employes = [];
let conges = [];
let employesFiltres = [];
let employesActifs = [];
let employesArchives = [];
let archivesOuvertes = false;
let langueCourante = detecterLangueInitiale();
let employeSelectionneId = "";
let currentWeek = getStartOfWeek(new Date());

function t(cle) {
  return TRADUCTIONS[langueCourante]?.[cle] || TRADUCTIONS.fr[cle] || cle;
}

function teamLabel(team) {
  return TEAMS[team]?.[langueCourante] || team;
}

function getTeam(team) {
  return TEAMS[normaliserEquipe(team)] || TEAMS.extra;
}

function tEquipe(equipe) {
  return teamLabel(normaliserEquipe(equipe));
}

function getTeamColor(equipe) {
  return getTeam(equipe).color;
}

function getEmployeeTeamId(employe) {
  return normaliserEquipe(employe?.teamId || employe?.team?.id || employe?.equipe);
}

function getEmployeeTeam(employe) {
  return getTeam(getEmployeeTeamId(employe));
}

function hexToRgb(hex) {
  const value = String(hex || "").replace("#", "");
  if (value.length !== 6) {
    return null;
  }

  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);

  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return { r, g, b };
}

function getTeamTint(equipe, alpha = 0.18) {
  const rgb = hexToRgb(getTeamColor(equipe));
  if (!rgb) {
    return `rgba(75, 85, 99, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function getTeamRowClass(equipe) {
  return `team-${getTeamKey(equipe).replace(/\s+/g, "-")}`;
}


function getEmployeeTeamColor(employe) {
  return getEmployeeTeam(employe).color;
}

function getEmployeeTeamTint(employe, alpha = 0.18) {
  const rgb = hexToRgb(getEmployeeTeamColor(employe));
  if (!rgb) {
    return `rgba(75, 85, 99, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
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
  renderCoverageToday();
  afficherHistoriqueSalarieSelectionne();
  renderPlanning(currentWeek);
}

function recupererLangueActive() {
  const langueStockee = localStorage.getItem("language") || localStorage.getItem("langue-app") || "fr";
  return TRADUCTIONS[langueStockee] ? langueStockee : "fr";
}

function normaliserEquipe(equipe) {
  const brute = String(equipe || "").trim();
  if (!brute) {
    return "extra";
  }

  if (TEAM_ORDER.includes(brute)) {
    return brute;
  }

  return TEAM_KEYS[brute] || "extra";
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
    const teamId = getEmployeeTeamId(employe);
    const equipe = teamId;
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
    const team = getTeam(teamId);

    return {
      ...employe,
      teamId,
      equipe,
      team,
      historiqueConges,
      congesPris: arrondir1Decimale(congesInitial + congesDepuisDemandes),
      note: typeof employe.note === "string" ? employe.note : "",
      couleur: team.color,
      restDaysWeekly: Array.isArray(employe.restDaysWeekly) ? employe.restDaysWeekly : [],
      planningExceptions: Array.isArray(employe.planningExceptions) ? employe.planningExceptions : [],
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
    teamId: getEmployeeTeamId(emp),
    equipe: getEmployeeTeamId(emp),
    note: typeof emp.note === "string" ? emp.note : "",
    restDaysWeekly: Array.isArray(emp.restDaysWeekly) ? emp.restDaysWeekly : [],
    planningExceptions: Array.isArray(emp.planningExceptions) ? emp.planningExceptions : [],
  }));
}

async function rafraichirDonnees() {
  const [employesBruts, congesCharges] = await Promise.all([chargerEmployes(), chargerConges()]);
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
  renderCoverageToday();
  afficherHistoriqueSalarieSelectionne();
  renderPlanning(currentWeek);
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

openPlanningButton?.addEventListener("click", () => {
  planningView?.classList.toggle("hidden");
  renderPlanning(currentWeek);
});

prevWeekButton?.addEventListener("click", () => {
  currentWeek.setDate(currentWeek.getDate() - 7);
  renderPlanning(currentWeek);
});

nextWeekButton?.addEventListener("click", () => {
  currentWeek.setDate(currentWeek.getDate() + 7);
  renderPlanning(currentWeek);
});

planningBody?.addEventListener("click", async (event) => {
  const cellule = event.target.closest("td[data-employe-id][data-date]");
  if (!cellule) {
    return;
  }

  const employe = employes.find((entry) => entry.id === cellule.dataset.employeId);
  if (!employe) {
    return;
  }

  const date = cellule.dataset.date;
  if (!date) {
    return;
  }

  const jour = dateLocaleDepuisTexte(date);
  if (!jour || estJourVacances(employe, jour)) {
    return;
  }

  const exceptionExistante = trouverExceptionPlanning(employe, date);
  const prochainStatut = exceptionExistante?.statut === "rest" ? "work" : "rest";

  mettreAJourExceptionPlanning(employe, date, prochainStatut);

  try {
    await sauvegarderEmployes(employe);
    renderPlanning(currentWeek);
  } catch (erreur) {
    console.error("Erreur sauvegarde exception planning :", erreur);
  }
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

    const code = prompt(t("manager_code_required"));
    if (code !== CODE_MANAGER) {
      alert(t("wrong_code"));
      return;
    }

    const nouveau = window.prompt(t("edit_taken_leave_prompt"), employe.congesPris);
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

  const celluleEquipe = event.target.closest(".employee-team[data-id]");
  if (celluleEquipe) {
    if (event.target.closest("select")) {
      return;
    }

    const empId = celluleEquipe.dataset.id;
    const employe = employes.find((entry) => entry.id === empId);

    if (!employe) {
      return;
    }

    const select = document.createElement("select");
    select.className = "select-team-inline";

    TEAM_ORDER.forEach((team) => {
      const option = document.createElement("option");
      option.value = team;
      option.textContent = tEquipe(team);

      if (team === employe.equipe) {
        option.selected = true;
      }

      select.appendChild(option);
    });

    celluleEquipe.innerHTML = "";
    celluleEquipe.appendChild(select);
    select.focus();

    select.addEventListener("change", async () => {
      employe.teamId = select.value;
      employe.equipe = select.value;
      const team = getTeam(employe.teamId);
      employe.team = team;
      employe.couleur = team.color;
      await sauvegarderEmployes(employe);
      afficherEmployes();
      renderPlanning(currentWeek);
      renderCoverageToday();
    });

    select.addEventListener("blur", () => {
      if (!celluleEquipe.contains(select)) {
        return;
      }

      afficherEmployes();
    });

    select.addEventListener("keydown", (keyEvent) => {
      if (keyEvent.key === "Escape") {
        select.blur();
      }
    });

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

  const boutonReposHebdo = event.target.closest("[data-weekly-rest-id]");
  if (boutonReposHebdo) {
    const employe = employes.find((entry) => entry.id === boutonReposHebdo.dataset.weeklyRestId);
    if (!employe) {
      return;
    }

    ouvrirFenetreReposHebdomadaire(employe);
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
  const code = prompt(t("manager_code_required"));
  if (code !== CODE_MANAGER) {
    alert(t("wrong_code"));
    return false;
  }

  return true;
}

function structurerNote(texte) {
  if (!texte) return "";

  const phrases = texte
    .replace(/\n/g, ". ")
    .replace(/[,;]/g, ".")
    .split(".")
    .map((phrase) => phrase.trim())
    .filter((phrase) => phrase.length > 0)
    .map((phrase) => phrase.charAt(0).toUpperCase() + phrase.slice(1));

  return phrases.join(".\n");
}

document.addEventListener("DOMContentLoaded", () => {
  const bouton = document.getElementById("structureNote");
  const textarea = document.getElementById("noteTextarea");

  if (!bouton || !textarea) return;

  bouton.addEventListener("click", () => {
    const texte = textarea.value;
    textarea.value = structurerNote(texte);
  });
});

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
      <h3 id="noteModalTitle">${t("noteTitle")} ${echapperHtml(employe.nom)}</h3>
      <textarea id="noteTextarea"></textarea>
      <div class="note-tools">
        <button id="dictateNote" type="button">🎤 ${t("dictate")}</button>
        <button id="structureNote">✨ ${t("structure")}</button>
      </div>
      <div class="buttons note-modal__buttons">
        <button id="saveNote" type="button">${t("save")}</button>
        <button id="cancelNote" type="button" class="note-modal__cancel">${t("cancel")}</button>
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

  const ajusterHauteurNote = () => {
    noteTextarea.style.height = "auto";
    noteTextarea.style.height = `${noteTextarea.scrollHeight}px`;
  };

  ajusterHauteurNote();
  noteTextarea.addEventListener("input", ajusterHauteurNote);
  noteTextarea.focus();

  const fermer = () => {
    noteModal.remove();
  };

  boutonAnnuler.addEventListener("click", fermer);
  noteModal.querySelector(".note-modal__overlay")?.addEventListener("click", fermer);

  boutonDictee?.addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t("dictate_not_supported"));
      return;
    }

    const recognition = new SpeechRecognition();

    const langueDictee = langueCourante === "es" ? "es-ES" : langueCourante === "en" ? "en-US" : "fr-FR";
    recognition.lang = langueDictee;
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


function ouvrirFenetreReposHebdomadaire(employe) {
  const modalExistant = document.getElementById("weeklyRestModal");
  if (modalExistant) {
    modalExistant.remove();
  }

  const weeklyRestModal = document.createElement("div");
  weeklyRestModal.id = "weeklyRestModal";
  weeklyRestModal.className = "weekly-rest-modal";
  weeklyRestModal.innerHTML = `
    <div class="weekly-rest-modal__overlay"></div>
    <div class="weekly-rest-box" role="dialog" aria-modal="true" aria-labelledby="weeklyRestModalTitle">
      <h3 id="weeklyRestModalTitle">Repos hebdomadaire — ${echapperHtml(employe.nom)}</h3>
      <div class="weekly-rest-options">
        ${WEEKLY_REST_OPTIONS.map(
          (jour) => `
            <label class="weekly-rest-option">
              <input type="checkbox" value="${jour.value}" ${employe.restDaysWeekly.includes(jour.value) ? "checked" : ""} />
              <span>${jour.label}</span>
            </label>
          `,
        ).join("")}
      </div>
      <div class="weekly-rest-actions">
        <button type="button" class="bouton-secondaire" id="weeklyRestCancel">Annuler</button>
        <button type="button" id="weeklyRestSave">Enregistrer</button>
      </div>
    </div>
  `;

  document.body.append(weeklyRestModal);

  const fermer = () => {
    weeklyRestModal.remove();
  };

  weeklyRestModal.querySelector(".weekly-rest-modal__overlay")?.addEventListener("click", fermer);
  weeklyRestModal.querySelector("#weeklyRestCancel")?.addEventListener("click", fermer);
  weeklyRestModal.querySelector("#weeklyRestSave")?.addEventListener("click", async () => {
    const joursSelectionnes = [...weeklyRestModal.querySelectorAll("input[type='checkbox']:checked")]
      .map((input) => Number(input.value))
      .filter((value) => !Number.isNaN(value));

    const joursHebdo = [...new Set(joursSelectionnes)].sort((a, b) => a - b);

    reinitialiserReposHebdomadaireEmploye(employe);
    appliquerReposHebdomadaireEmploye(employe, joursHebdo);
    await sauvegarderEmployes(employe);

    regenererLignePlanningEmploye(employe);
    fermer();
    afficherEmployes();
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
  const code = prompt(t("manager_code_required"));
  if (code !== CODE_MANAGER) {
    alert(t("wrong_code"));
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
    teamId: normaliserEquipe(document.getElementById("equipe-employe").value),
    equipe: normaliserEquipe(document.getElementById("equipe-employe").value),
    dateEmbauche: document.getElementById("date-embauche").value,
    congesPris: Number(document.getElementById("conges-pris").value),
    birthCode,
    historiqueConges: [],
    note: "",
    team: getTeam(normaliserEquipe(document.getElementById("equipe-employe").value)),
    couleur: getTeamColor(normaliserEquipe(document.getElementById("equipe-employe").value)),
    restDaysWeekly: [],
    planningExceptions: [],
    actif: true,
  };

  if (!validerEmploye(nouvelEmploye)) {
    return;
  }

  try {
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

  if (!TEAM_ORDER.includes(normaliserEquipe(employe.equipe))) {
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

  const teamId = getEmployeeTeamId(employe);
  const team = getTeam(teamId);

  await setDoc(
    doc(db, "employes", employe.id),
    {
      congesPris: Number(employe.congesPris) || 0,
      teamId,
      equipe: teamId,
      note: employe.note || "",
      team,
      couleur: team.color,
      restDaysWeekly: Array.isArray(employe.restDaysWeekly) ? employe.restDaysWeekly : [],
      planningExceptions: Array.isArray(employe.planningExceptions) ? employe.planningExceptions : [],
    },
    { merge: true },
  );
}


function trouverExceptionPlanning(employe, dateIso) {
  if (!Array.isArray(employe.planningExceptions)) {
    return null;
  }

  return employe.planningExceptions.find((exception) => exception.date === dateIso) || null;
}

function mettreAJourExceptionPlanning(employe, dateIso, statut) {
  const base = Array.isArray(employe.planningExceptions) ? employe.planningExceptions : [];
  const autresExceptions = base.filter((exception) => exception.date !== dateIso);

  employe.planningExceptions = [...autresExceptions, { date: dateIso, statut }];
}

function reinitialiserReposHebdomadaireEmploye(employe) {
  const exceptionsExistantes = Array.isArray(employe.planningExceptions) ? employe.planningExceptions : [];
  const exceptionsConservees = exceptionsExistantes.filter(
    (exception) => exception?.statut && exception.statut !== "rest" && exception.statut !== "work",
  );

  employe.restDaysWeekly = [];
  employe.planningExceptions = exceptionsConservees;
}

function appliquerReposHebdomadaireEmploye(employe, joursHebdo) {
  employe.restDaysWeekly = Array.isArray(joursHebdo) ? [...joursHebdo] : [];
}

function regenererLignePlanningEmploye(employe) {
  const row = planningBody?.querySelector(`tr td[data-employe-id="${employe.id}"]`)?.closest("tr");
  if (!row) {
    renderPlanning(currentWeek);
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  [...row.querySelectorAll("td[data-date]")].forEach((cell) => {
    const jour = new Date(`${cell.dataset.date}T12:00:00`);
    const statut = getEmployeeStatusForDate(employe, jour);

    cell.classList.remove("status-vacances", "sick-day", "status-repos", "status-travail", "today-column");

    const dayKey = new Date(jour);
    dayKey.setHours(0, 0, 0, 0);
    if (dayKey.getTime() === today.getTime()) {
      cell.classList.add("today-column");
    }

    if (statut === "vacation") {
      cell.classList.add("status-vacances");
      cell.textContent = t("planning_status_vacation");
    } else if (statut === "sick") {
      cell.classList.add("sick-day");
      cell.textContent = t("planning_status_sick");
    } else if (statut === "rest") {
      cell.classList.add("status-repos");
      cell.textContent = t("planning_status_rest");
    } else {
      cell.classList.add("status-travail");
      cell.textContent = t("planning_status_work");
    }
  });

  renderCoverageToday();
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
    const indexA = getTeamOrderIndex(a.equipe);
    const indexB = getTeamOrderIndex(b.equipe);

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
      const teamRowClass = getTeamRowClass(employe.equipe);
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
        <tr class="ligne-employe ${teamRowClass} equipe-${classeEquipe} ${employeSelectionneId === employe.id ? "selectionne" : ""}" data-employe-id="${employe.id}">
          <td data-label="${t("employee_col")}">
            <span class="employee-name">${echapperHtml(employe.nom)}</span>
            ${
              employe.note
                ? `<span class="note-indicator note-icon" aria-label="${t("note_aria_label")}" data-nom="${echapperHtml(employe.nom)}" data-note="${echapperHtml(employe.note)}">📝</span>`
                : ""
            }
          </td>
          <td data-label="${t("team_col")}" class="employee-team" data-id="${employe.id}">${echapperHtml(tEquipe(employe.equipe))}</td>
          <td data-label="${t("hire_date_col")}">${formaterDateFr(employe.dateEmbauche)}</td>
          <td data-label="${t("earned_leave_col")}">${congesAcquis.toFixed(1)}</td>
          <td data-label="${t("taken_leave_col")}" class="cellule-conges-pris">${congesPris.toFixed(1)}</td>
          <td data-label="${t("remaining_leave_col")}">${congesRestants.toFixed(1)}</td>
          <td class="vacation-history" data-label="${t("leave_history_col")}" data-history='${JSON.stringify(employe.historiqueConges)}'>${getDernierConge(employe.historiqueConges)}</td>
          <td data-label="${t("status_col")}" class="status-${classeStatut}">${libelleStatut}</td>
          <td data-label="${t("action_col")}" class="cellule-actions">
            <button class="setWeeklyRest" data-weekly-rest-id="${employe.id}">Repos hebdomadaire</button>
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
      const codeValide = await demanderCodeManager();
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
            `<span class="bloc-conge" style="background-color:${echapperHtml(getEmployeeTeamColor(employe))}" title="${formaterDateFr(date)}"></span>`,
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
          <div>${echapperHtml(nom)} : ${formaterDateFr(conge.dateDebut)} → ${formaterDateFr(conge.dateFin)}</div>
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

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() || 7;

  if (day !== 1) {
    d.setHours(-24 * (day - 1));
  }

  d.setHours(0, 0, 0, 0);
  return d;
}

function formaterLibelleSemaine(semaine) {
  const debut = new Date(semaine);
  const fin = new Date(semaine);
  fin.setDate(fin.getDate() + 6);

  return `${formaterDateFr(debut)} → ${formaterDateFr(fin)}`;
}

function estJourVacances(employe, jour) {
  return getEmployeeStatusForDate(employe, jour) === "vacation";
}

function getEmployeeStatusForDate(employe, date) {
  const target = date instanceof Date ? new Date(date) : new Date(`${date}T12:00:00`);

  if (Number.isNaN(target.getTime())) {
    return "work";
  }

  target.setHours(0, 0, 0, 0);

  if (Array.isArray(employe.historiqueConges)) {
    const enVacances = employe.historiqueConges.some((conge) => {
      if (!conge?.dateDebut || !conge?.dateFin) {
        return false;
      }

      const debut = dateLocaleDepuisTexte(conge.dateDebut);
      const fin = dateLocaleDepuisTexte(conge.dateFin);

      if (!debut || !fin) {
        return false;
      }

      debut.setHours(0, 0, 0, 0);
      fin.setHours(0, 0, 0, 0);

      return target >= debut && target <= fin;
    });

    if (enVacances) {
      return "vacation";
    }
  }

  if (Array.isArray(employe.planningExceptions)) {
    const isoDate = formatDateISO(target);
    const exception = employe.planningExceptions.find((entry) => {
      if (!entry?.date) {
        return false;
      }

      const exDate = dateLocaleDepuisTexte(entry.date);
      if (!exDate) {
        return false;
      }

      exDate.setHours(0, 0, 0, 0);
      return formatDateISO(exDate) === isoDate;
    });

    if (exception?.statut) {
      return exception.statut;
    }
  }

  const day = target.getDay();
  if (Array.isArray(employe.restDaysWeekly) && employe.restDaysWeekly.includes(day)) {
    return "rest";
  }

  return "work";
}

function getTeamKey(equipe) {
  return normaliserEquipe(equipe);
}

function getTeamOrderIndex(equipe) {
  const index = TEAM_ORDER.indexOf(getTeamKey(equipe));
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function renderCoverageToday() {
  if (!coverageContent) {
    return;
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const coverage = {};

  TEAM_ORDER.forEach((team) => {
    coverage[team] = [];
  });

  employesActifs.forEach((emp) => {
    const statut = getEmployeeStatusForDate(emp, today);

    if (statut === "work") {
      const teamKey = getTeamKey(emp.equipe);
      if (teamKey in coverage) {
        coverage[teamKey].push(emp.nom);
      }
    }
  });

  let html = "";

  TEAM_ORDER.forEach((team) => {
    html += `<div class="team-line ${echapperHtml(getTeamRowClass(team))}"><strong>${echapperHtml(teamLabel(team))}</strong> : ${echapperHtml(coverage[team].join(", ") || "-")}</div>`;
  });

  coverageContent.innerHTML = html;
}

function stylePlanningHeaders(semaine) {
  const headers = document.querySelectorAll(".planning-table thead th");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  headers.forEach((header, index) => {
    header.classList.remove("today-column", "weekend-column");
    if (index === 0) {
      return;
    }

    const day = new Date(semaine);
    day.setDate(day.getDate() + index - 1);
    day.setHours(0, 0, 0, 0);

    if (day.getDay() === 0 || day.getDay() === 6) {
      header.classList.add("weekend-column");
    }

    if (day.getTime() === today.getTime()) {
      header.classList.add("today-column");
    }
  });
}

function renderPlanning(semaine) {
  if (!planningBody || !weekLabel) {
    return;
  }

  planningBody.innerHTML = "";
  weekLabel.textContent = formaterLibelleSemaine(semaine);
  renderCoverageToday();
  stylePlanningHeaders(semaine);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const employesPlanning = [...employesActifs].sort((a, b) => {
    const teamDiff = getTeamOrderIndex(a.equipe) - getTeamOrderIndex(b.equipe);
    if (teamDiff !== 0) {
      return teamDiff;
    }

    return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
  });

  let currentTeam = null;

  employesPlanning.forEach((emp) => {
    if (getTeamKey(emp.equipe) !== currentTeam) {
      currentTeam = getTeamKey(emp.equipe);

      const groupRow = document.createElement("tr");
      const cell = document.createElement("td");

      cell.colSpan = 8;
      cell.textContent = tEquipe(emp.equipe).toUpperCase();
      cell.className = "team-header";
      cell.style.background = getEmployeeTeamTint(emp, 0.18);
      cell.style.color = getEmployeeTeamColor(emp);

      groupRow.appendChild(cell);
      planningBody.appendChild(groupRow);
    }

    const tr = document.createElement("tr");
    tr.className = "planning-row";

    const name = document.createElement("td");
    name.textContent = emp.nom;
    tr.appendChild(name);

    for (let i = 0; i < 7; i += 1) {
      const td = document.createElement("td");
      const jour = new Date(semaine);
      jour.setDate(jour.getDate() + i);
      jour.setHours(12, 0, 0, 0);

      const dateIso = formatDateISO(jour);
      td.dataset.employeId = emp.id;
      td.dataset.date = dateIso;

      const dayKey = new Date(jour);
      dayKey.setHours(0, 0, 0, 0);
      if (dayKey.getTime() === today.getTime()) {
        td.classList.add("today-column");
      }

      const statut = getEmployeeStatusForDate(emp, jour);
      if (statut === "vacation") {
        td.classList.add("status-vacances");
        td.textContent = t("planning_status_vacation");
      } else if (statut === "sick") {
        td.classList.add("sick-day");
        td.textContent = t("planning_status_sick");
      } else if (statut === "rest") {
        td.classList.add("status-repos");
        td.textContent = t("planning_status_rest");
      } else {
        td.classList.add("status-travail");
        td.textContent = t("planning_status_work");
      }
      tr.appendChild(td);
    }

    planningBody.appendChild(tr);
  });

  if (!employesPlanning.length) {
    planningBody.innerHTML = '<tr><td colspan="8" class="vide">Aucun employé enregistré</td></tr>';
  }
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

function getDernierConge(historiqueConges) {
  if (!historiqueConges || historiqueConges.length === 0) {
    return "Aucun congé";
  }

  const dernier = historiqueConges[historiqueConges.length - 1];

  return `${formaterDateFr(dernier.dateDebut)} → ${formaterDateFr(dernier.dateFin)}`;
}


function formatDateISO(dateBrute) {
  const date = dateBrute instanceof Date ? dateBrute : dateLocaleDepuisTexte(dateBrute);
  if (!date) {
    return "";
  }

  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, "0");
  const jour = String(date.getDate()).padStart(2, "0");
  return `${annee}-${mois}-${jour}`;
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
