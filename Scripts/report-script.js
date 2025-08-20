// --- UI elements ---
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("text-box");
const whoami = document.getElementById("whoami");


// --- Add Enter key support ---
document.getElementById("username-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submitUsername();
  }
});

document.getElementById("password-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submitPassword();
  }
});


// --- State (no local/session storage) ---
let username = "";
let isAdmin = false;

function updateWhoAmI() {
  whoami.textContent = username
    ? `Signed in as: ${username}${isAdmin ? " (Admin)" : ""}`
    : "Not signed in";
}

// hide chat until login complete
chatForm.style.display = "none";

// --- Modals helpers ---
function showModal(id) { document.getElementById(id).style.display = "flex"; }
function hideModal(id) { document.getElementById(id).style.display = "none"; }

// --- Finish login: show chat form ---
function finishLogin() {
  chatForm.style.display = "block";
  updateWhoAmI();
}

// --- Username flow ---
function submitUsername() {
  const inputEl = document.getElementById("username-input");
  const errorEl = document.getElementById("username-error");
  const input = inputEl.value.trim();

  // clear previous error
  errorEl.textContent = "";

  if (!input) {
    errorEl.textContent = "Please enter a username.";
    return;
  }

  username = input;
  isAdmin = false; // reset

  hideModal("username-modal");

  if (username === "TheFoolAdmin") {
    showModal("password-modal");
  } else {
    finishLogin(); // regular user, skip password
  }
}

// --- Password flow ---
function submitPassword() {
  const pwdEl = document.getElementById("password-input");
  const errorEl = document.getElementById("password-error");
  const pwd = pwdEl.value;

  // clear previous error
  errorEl.textContent = "";

  if (pwd === "Admin") {
    isAdmin = true;
    hideModal("password-modal");
    finishLogin();
  } else {
    isAdmin = false;
    errorEl.textContent = "Wrong password. Try again or continue as regular user.";
  }
}

// --- Toggle password visibility ---
document.getElementById("toggle-password").addEventListener("click", () => {
  const pwdInput = document.getElementById("password-input");
  const eye = document.getElementById("toggle-password");
  if (pwdInput.type === "password") {
    pwdInput.type = "text";
    eye.textContent = "🙈"; // switch icon
  } else {
    pwdInput.type = "password";
    eye.textContent = "👁"; // back to eye
  }
});


//Switch to Username from Password
function showUsernameModal(){
    username = "";
    isAdmin = false;
    chatForm.style.display = "none";

    hideModal("password-modal");
    showModal("username-modal");

}

// --- Enforce correct modal on load ---
(function enforceLoginFlowOnLoad() {
  // reset state
  username = "";
  isAdmin = false;
  chatForm.style.display = "none";

  // make sure both modals are hidden first
  hideModal("password-modal");
  hideModal("username-modal");

  // always start with username modal
  showModal("username-modal");
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
