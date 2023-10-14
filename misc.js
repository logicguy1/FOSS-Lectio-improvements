document.getElementById("masterContent").style.width = "100vw";
document.getElementsByClassName("ls-master-container2")[0].style.width = "100vw";

// Dashbord
const layoutElms = document.getElementsByClassName("ls-std-island-layout-ltr")
if (layoutElms.length !== 0) {
  for (let i = 0; i < layoutElms.length; i++) {
    layoutElms[i].style.width = "calc(100vw - 15px)";
    
    const children = layoutElms[i].children;
    for (let x = 0; x < children.length; x++) {
      children[x].style.flex = "1";
    }
  }

  layoutElms[0].parentElement.children[2].style.width = "calc(100vw - 25px)";
}

// Skema changes
document.getElementById("s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel").style.width = "calc(100vw - 25px)";
document.getElementById("s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel").style.maxWidth = "none";

const skemaContainers = document.getElementsByClassName("s2skemabrikcontainer");
console.log(skemaContainers)
if (skemaContainers.length !== 0) {
  // Set columns width
  for (let i = 0; i < skemaContainers.length; i++) {
    console.log(skemaContainers[i], skemaContainers[i].parentElement.offsetWidth)
    // skemaContainers[i].style.width = skemaContainers[i].parentElement.offsetWidth + "px"
    const width = skemaContainers[i].offsetWidth;
    skemaContainers[i].style.width = `15.9vw`;
  }

  const classes = document.getElementsByClassName("s2skemabrik");
  const mapping = {
    "13.82em": 1,
    "9.09em": 1,
    "6.73em": 2,
    "4.36em": 2,
  }
  for (let i = 0; i < classes.length; i++) {
    // How many classes in one line?
    const mult = mapping[classes[i].style.width];
    classes[i].style.width = `calc(${ 15.9 / mult }vw - ${ 15 / mult }px)`;
    if (mult !== 1 && classes[i].style.left !== "0.55em") {
      classes[i].style.left = `calc(${ 15.9 / 2 * (mult - 1) }vw + 0.55em - ${ 14 / mult }px)`;
    }
    console.log(classes[i], classes[i].style.width)
  }
}
