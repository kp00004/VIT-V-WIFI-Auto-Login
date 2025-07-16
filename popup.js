document.getElementById('save').addEventListener('click', () => {
  const domain = document.getElementById('domain').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (domain && username && password) {
    chrome.storage.local.get('creds', (result) => {
      const creds = result.creds || {};
      creds[domain] = { username, password };
      chrome.storage.local.set({ creds }, () => {
        alert('Saved!');
      });
    });
  }
});
