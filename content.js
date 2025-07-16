chrome.storage.local.get('creds', (result) => {
  const creds = result.creds || {};
  const domain = window.location.hostname;

  if (creds[domain]) {
    const { username, password } = creds[domain];

    const userField = document.querySelector('input[type="text"], input[name="username"]');
    const passField = document.querySelector('input[type="password"]');

    if (userField && passField) {
      userField.value = username;
      passField.value = password;

      const form = userField.closest('form');
      if (form) {
        setTimeout(() => form.submit(), 1000); // Delay for UI safety
      }
    }
  }
});
