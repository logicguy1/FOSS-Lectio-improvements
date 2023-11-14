
// ---------------- Wide lectio ---------------- 

document.getElementById("masterContent").style.width = "100vw";
document.getElementsByClassName("ls-master-container2")[0].style.width = "100vw";

// Dashbord
// BUG: The following code affects more elements than intended. See the profile content islands.
const layoutElms = document.getElementsByClassName("ls-std-island-layout-ltr");
if (layoutElms.length !== 0) {
  for (let i = 0; i < layoutElms.length; i++) {
    layoutElms[i].style.width = "calc(100vw - 15px)";

    const children = layoutElms[i].children;
    for (let x = 0; x < children.length; x++) {
      children[x].style.flex = "1";
    }
  }

  // BUG: This isn't the right fix. The element doesn't always exist.
  if (layoutElms[0].parentElement.children[2]) {
    layoutElms[0].parentElement.children[2].style.width = "calc(100vw - 25px)"
  }
}

document.querySelector("#s_m_searchpanel").style.width = "unset";

// ---------------- Master header -----------------

document.querySelector("#s_m_masterHeaderDiv").style.height = "unset";

// ---------------- Profile rename ---------------- 

const masterPageNav = document.querySelector("#s_m_HeaderContent_subnav_div.ls-master-pageheader");

if (masterPageNav) {
  // Settings tab renames
  const profileTab = masterPageNav.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
  profileTab.innerText = "Indstillinger";

  const currentURL = window.location.href;
  const regex = /\/indstillinger\//;

  if (currentURL.match(regex)) {
    console.log("The URL contains 'studentIndstillinger'.");
    const logTab = document.querySelector("#s_m_HeaderContent_subnavigator_ctl15");
    if (logTab) {
      logTab.innerText = "Improver Settings";
    }
  }
  // Endblock
}


// ---------------- Profile content islands -------

var currentURL = window.location.href;
var regex = /\/indstillinger\/studentIndstillinger/;

if (currentURL.match(regex)) {
  var profileContainer = [...document.querySelector(".ls-std-island-layout-ltr").children];
  profileContainer.forEach(elm => {
    elm.style.flex = "";
  });
}
