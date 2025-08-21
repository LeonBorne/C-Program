// --- State ---
let username = "";
let isAdmin = false;

// --- UI elements ---
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("text-box");
const whoami = document.getElementById("whoami");

// --- Update status display ---
function updateWhoAmI() {
  whoami.textContent = username
    ? `Signed in as: ${username}${isAdmin ? " (Admin)" : ""}`
    : "Not signed in";
}

// --- Modal helpers (null-safe) ---
function showModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "flex";
}
function hideModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// --- Finish login: show chat form ---
function finishLogin() {
  localStorage.setItem("username", username);
  localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
  chatForm.style.display = "block";
  updateWhoAmI();
}

// --- Username flow ---
function submitUsername() {
  const inputEl = document.getElementById("username-input");
  const errorEl = document.getElementById("username-error");
  const input = inputEl.value.trim();

  errorEl.textContent = "";

  if (!input) {
    errorEl.textContent = "Please enter a username.";
    return;
  }

  if (input === "TheFoolAdmin") {
    // exact wording per your request
    errorEl.textContent = "Username Unavailabe";
    return;
  }

  username = input;
  isAdmin = false;

  hideModal("username-modal");
  finishLogin();
}

// --- QoL: allow Enter key in username input ---
document.getElementById("username-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitUsername();
  }
});

// --- Enforce correct modal on load ---
(function enforceLoginFlowOnLoad() {
  username = "";
  isAdmin = false;
  chatForm.style.display = "none";

  hideModal("username-modal");

  // Clear reserved username if stored
  const savedUsername = localStorage.getItem("username");
  const savedIsAdmin = localStorage.getItem("isAdmin") === "true";

  if (savedUsername === "TheFoolAdmin") {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
  }

  if (savedUsername && savedUsername !== "TheFoolAdmin") {
    username = savedUsername;
    isAdmin = savedIsAdmin;
    finishLogin();
  } else {
    showModal("username-modal");
  }

  updateWhoAmI();
})();

// --- Helpers ---
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// --- Send message ---
function sendMessage(e) {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;

  messagesRef.push({
    username,
    text: msg,
    timestamp: Date.now(),
    admin: isAdmin
  });

  chatInput.value = "";
}

// --- Render messages ---
messagesRef.orderByChild("timestamp").on("child_added", (snap) => {
  const m = snap.val();
  const container = document.getElementById("messages-container");

  const wrapper = document.createElement("div");
  wrapper.className = "message";

  const isMsgAdmin = m.admin === true || m.admin === "true" || m.admin === 1;
  if (isMsgAdmin) {
    wrapper.classList.add("admin");
  } else if (m.username === username) {
    wrapper.classList.add("self");
  } else {
    wrapper.classList.add("other");
  }

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${m.username} (${formatTime(m.timestamp)})`;

  const text = document.createElement("div");
  text.textContent = m.text;

  wrapper.appendChild(meta);
  wrapper.appendChild(text);
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
});
