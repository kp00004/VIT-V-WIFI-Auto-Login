(async () => {
  try {
    const credsResult = await chrome.storage.local.get('creds');
    const creds = credsResult.creds || [];

    const normalize = url => (url || '').trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/+$/, '')
      .toLowerCase();

    const currentDomain = window.location.origin;
    const normalizedDomain = normalize(currentDomain);

    const matchedCred = creds.find(c => normalize(c.domain) === normalizedDomain);

    if (!matchedCred) return;

    const userInput = document.querySelector('input[name="userId"], input[id="userId"]');
    const passInput = document.querySelector('input[name="password"], input[id="password"]');

    if (!userInput || !passInput) return;

    userInput.value = matchedCred.username;
    passInput.value = matchedCred.password;

    const form = userInput.closest('form');
    if (form) {
      setTimeout(() => {
        try {
          form.submit();
          chrome.runtime.sendMessage({ action: 'closeTab' });
        } catch (e) {}
      }, 1000);
    }
  } catch {}
})();