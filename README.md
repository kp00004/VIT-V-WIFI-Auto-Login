# 🔐 Proton Auto Login (VIT-V-WIFI-Auto-Login)

This Chrome Extension automatically logs you into the VIT-V Wi-Fi network by auto-filling your credentials and submitting the login form. After successful login, the extension **automatically closes the login tab**.

---

## ✨ Features

- ✅ Auto-fills username and password for the VIT-V Wi-Fi portal  
- ✅ Automatically submits the login form  
- ✅ Closes the login tab after successful authentication  
- 🔐 Stores credentials locally (per domain)  
- 🧠 Simple and lightweight — runs only when needed  

---

## 📦 Installation

1. Clone or Download this repository:
   git clone https://github.com/kp00004/VIT-V-WIFI-Auto-Login.git

2. Open Google Chrome and go to:
   chrome://extensions/

3. Enable Developer mode (top-right toggle)

4. Click “Load unpacked” and select the folder containing the extension files

---

## 🔧 How to Use

1. Click the extension icon in your browser  
2. Enter:
   - Domain:
     http://phc.prontonetworks.com/cgi-bin/authlogin?URI=http://www.gstatic.com/generate_204
   - Your VIT-WiFi username and password  
3. Click Save  

From now on, whenever you connect to VIT Wi-Fi, the extension will:
- Detect the login page  
- Auto-fill your credentials  
- Submit the form  
- Automatically close the tab after login  

---

## 📁 File Structure

background.js         ← Handles tab monitoring and closes after login  
content.js            ← Autofills and submits the login form  
popup.html            ← UI to save credentials  
popup.js              ← Logic for credential storage  
manifest.json         ← Chrome extension manifest (v3)  
README.md             ← You're here!  

---

## 🛡️ Permissions

The extension uses the following Chrome permissions:
- storage — to save your credentials locally  
- scripting — to inject content scripts for login  
- tabs — to monitor and close login tabs  

---

## 🔐 Security Note

- Your credentials are stored locally using Chrome's extension storage  
- The extension does not send any data externally  
- You can inspect the code to verify privacy and security  

---

## 🧑‍💻 Author

Created by https://github.com/kp00004  

---

## ✅ License

MIT License
