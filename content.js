chrome.storage.local.get('creds', (result) => {
  const creds = result.creds || {};
  const domain = "http://phc.prontonetworks.com/cgi-bin/authlogin?URI=http://www.gstatic.com/generate_204";

  if (creds[domain]) {
    const { username, password } = creds[domain];

    const userInput = document.querySelector('input[name="user"]');
    const passInput = document.querySelector('input[name="password"]');

    if (userInput && passInput) {
      userInput.value = username;
      passInput.value = password;

      const form = userInput.closest('form');
      if (form) {
        setTimeout(() => {
          form.submit();

          // Listen for redirect after form submit
          const checkSuccess = () => {
            // Delay a bit to allow navigation
            setTimeout(() => {
              // If the page URL no longer includes authlogin, we assume success
              if (!window.location.href.includes("authlogin")) {
                chrome.runtime.sendMessage({ action: "closeTab" });
              }
            }, 3000);
          };

          checkSuccess();
        }, 1000);
      }
    }
  }
});
