const STORAGE_KEY = "vacation-tracker-requests";

const form = document.getElementById("vacation-form");
const requestList = document.getElementById("request-list");
const clearAllBtn = document.getElementById("clear-all");

let requests = loadRequests();
renderRequests();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = {
    id: crypto.randomUUID(),
    name: document.getElementById("employee-name").value.trim(),
    team: document.getElementById("employee-team").value.trim(),
    allowance: Number(document.getElementById("annual-allowance").value),
    requestedDays: Number(document.getElementById("days-requested").value),
    startDate: document.getElementById("start-date").value,
    endDate: document.getElementById("end-date").value,
  };

  if (!validatePayload(payload)) {
    return;
  }

  requests.push(payload);
  persistRequests();
  renderRequests();
  form.reset();
  document.getElementById("annual-allowance").value = 25;
});

clearAllBtn.addEventListener("click", () => {
  if (!requests.length) {
    return;
  }

  requests = [];
  persistRequests();
  renderRequests();
});

function validatePayload(payload) {
  if (payload.endDate < payload.startDate) {
    alert("End date must be on or after the start date.");
    return false;
  }

  if (payload.requestedDays > payload.allowance) {
    alert("Requested days cannot exceed annual allowance.");
    return false;
  }

  return true;
}

function loadRequests() {
  const fromStorage = localStorage.getItem(STORAGE_KEY);
  return fromStorage ? JSON.parse(fromStorage) : [];
}

function persistRequests() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function removeRequest(id) {
  requests = requests.filter((request) => request.id !== id);
  persistRequests();
  renderRequests();
}

function statusFromRemaining(remaining) {
  if (remaining > 10) {
    return ["Healthy", "ok"];
  }

  if (remaining > 5) {
    return ["Watch", "warn"];
  }

  return ["Low", "alert"];
}

function renderRequests() {
  if (!requests.length) {
    requestList.innerHTML = '<tr><td colspan="7" class="empty">No vacation requests yet.</td></tr>';
    return;
  }

  requestList.innerHTML = requests
    .map((request) => {
      const remaining = request.allowance - request.requestedDays;
      const [statusLabel, statusClass] = statusFromRemaining(remaining);

      return `
        <tr>
          <td data-label="Employee">${escapeHtml(request.name)}</td>
          <td data-label="Team">${escapeHtml(request.team)}</td>
          <td data-label="Dates">${formatDate(request.startDate)} → ${formatDate(request.endDate)}</td>
          <td data-label="Requested">${request.requestedDays} days</td>
          <td data-label="Remaining">${remaining} days</td>
          <td data-label="Status"><span class="badge ${statusClass}">${statusLabel}</span></td>
          <td data-label="Action"><button class="delete-btn" data-remove-id="${request.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");

  requestList.querySelectorAll("[data-remove-id]").forEach((button) => {
    button.addEventListener("click", () => removeRequest(button.dataset.removeId));
  });
}

function formatDate(rawDate) {
  const date = new Date(`${rawDate}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
