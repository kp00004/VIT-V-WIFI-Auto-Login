const MAX_USERS = 3;
const DOMAIN = "https://phc.prontonetworks.com/";

const form = document.getElementById('credForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const credsList = document.getElementById('credsList');

async function loadCreds() {
  const result = await chrome.storage.local.get('creds');
  return result.creds || [];
}

function saveCreds(creds) {
  return chrome.storage.local.set({ creds });
}

function maskPassword(pw) {
  return '•'.repeat(pw.length);
}

function renderCreds(creds) {
  credsList.innerHTML = '';
  creds.forEach((cred, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div><strong>Username:</strong> ${cred.username}</div>
      <div><strong>Password:</strong> <span class="masked">${maskPassword(cred.password)}</span></div>
      <div class="actions">
        <button data-index="${index}" class="edit-btn">Edit</button>
        <button data-index="${index}" class="delete-btn">Delete</button>
      </div>
    `;
    credsList.appendChild(li);
  });
}

function clearForm() {
  usernameInput.value = '';
  passwordInput.value = '';
  delete form.dataset.editIndex;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    alert('Please fill both username and password.');
    return;
  }

  let creds = await loadCreds();

  if ('editIndex' in form.dataset) {
    const idx = parseInt(form.dataset.editIndex, 10);
    creds[idx] = { domain: DOMAIN, username, password };
    delete form.dataset.editIndex;
  } else {
    if (creds.length >= MAX_USERS) {
      alert(`You can only save up to ${MAX_USERS} users.`);
      return;
    }
    creds.push({ domain: DOMAIN, username, password });
  }

  await saveCreds(creds);
  renderCreds(creds);
  clearForm();
});

credsList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const idx = parseInt(e.target.dataset.index, 10);
    const creds = await loadCreds();
    const cred = creds[idx];
    usernameInput.value = cred.username;
    passwordInput.value = cred.password;
    form.dataset.editIndex = idx;
  }

  if (e.target.classList.contains('delete-btn')) {
    const idx = parseInt(e.target.dataset.index, 10);
    let creds = await loadCreds();
    creds.splice(idx, 1);
    await saveCreds(creds);
    renderCreds(creds);
    clearForm();
  }
});

(async () => {
  const creds = await loadCreds();
  renderCreds(creds);
})();
