const profilePicture = document.getElementById("s_m_HeaderContent_picctrlthumbimage");

const hideHead = SettingsStore.get("hide_head", "false");
if (hideHead === "true") {
  profilePicture.style.display = "none";
}
