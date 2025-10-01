(async () => {
  try {
    const DOMAIN = "https://phc.prontonetworks.com/";
    const credsResult = await chrome.storage.local.get('creds');
    const creds = credsResult.creds || [];

    const matchedCred = creds.find(c => c.domain === DOMAIN);

    if (matchedCred) {
      const userInput = document.querySelector('input[name="user"], input[id="user"]');
      const passInput = document.querySelector('input[name="password"], input[id="password"]');

      if (userInput && passInput) {
        userInput.value = matchedCred.username;
        passInput.value = matchedCred.password;

        const form = userInput.closest('form');
        if (form) {
          setTimeout(() => form.submit(), 1000);
          console.log('Auto login form submitted with stored credentials');
        }
      }
    } else {
      console.log('No matching credential found for this domain.');
    }
  } catch (err) {
    console.error('Error in content script:', err);
  }
})();
