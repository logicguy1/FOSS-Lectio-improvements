
// ---------------- Wide lectio ---------------- 

document.getElementById("masterContent").style.width = "100vw";
document.getElementsByClassName("ls-master-container2")[0].style.width = "100vw";

// Dashbord
const layoutElms = document.getElementsByClassName("ls-std-island-layout-ltr");
if (layoutElms.length !== 0) {
  for (let i = 0; i < layoutElms.length; i++) {
    layoutElms[i].style.width = "calc(100vw - 15px)";

    const children = layoutElms[i].children;
    for (let x = 0; x < children.length; x++) {
      children[x].style.flex = "1";
    }
  }

  // ERROR: This doesn't always exist!
  // layoutElms[0].parentElement.children[2].style.width = "calc(100vw - 25px)";
}


// ---------------- Profile rename ---------------- 

const masterPageNav = document.querySelector("#s_m_HeaderContent_subnav_div.ls-master-pageheader");

if (masterPageNav) {
  // Settings tab rename
  const profileTab = masterPageNav.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
  profileTab.innerText = "Indstillinger";

  const logTab = document.getElementById("s_m_HeaderContent_subnavigator_ctl15");

  if (logTab) {
    logTab.innerText = "Improver Settings";
  }
  // Endblock
}
