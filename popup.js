const DOMAIN = "https://phc.prontonetworks.com/";

const form = document.getElementById('credForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

async function loadCreds() {
  const result = await chrome.storage.local.get('creds');
  return result.creds || [];
}

function saveCreds(creds) {
  return chrome.storage.local.set({ creds });
}

function clearForm() {
  usernameInput.value = '';
  passwordInput.value = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    alert('Please fill both username and password.');
    return;
  }

  const creds = [{ domain: DOMAIN, username, password }];
  await saveCreds(creds);
  alert('Credentials saved.');
});

(async () => {
  const creds = await loadCreds();
  const existing = creds.find(c => c.domain === DOMAIN);
  if (existing) {
    usernameInput.value = existing.username;
    passwordInput.value = existing.password;
  }
})();
