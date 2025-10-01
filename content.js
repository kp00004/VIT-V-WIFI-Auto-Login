(async () => {
  try {
    const credsResult = await chrome.storage.local.get('creds');
    const creds = credsResult.creds || [];

    const normalize = url => (url || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();

    const currentDomain = window.location.origin; // e.g. "https://phc.prontonetworks.com"
    const normalizedDomain = normalize(currentDomain);

    const matchedCred = creds.find(c => normalize(c.domain) === normalizedDomain);

    if (!matchedCred) {
      console.log('No matching credential found for this domain.');
      return;
    }

    // Your rest of the logic: find inputs, fill, submit
    const userInput = document.querySelector('input[name="userId"], input[id="userId"]');
    const passInput = document.querySelector('input[name="password"], input[id="password"]');

    if (!userInput || !passInput) {
      console.log('Username or password input not found!');
      return;
    }

    userInput.value = matchedCred.username;
    passInput.value = matchedCred.password;

    const form = userInput.closest('form');
    if (form) {
      setTimeout(() => form.submit(), 1000);
      console.log('Auto login form submitted with stored credentials');
    }
  } catch (err) {
    console.error('Error in content script:', err);
  }
})();
