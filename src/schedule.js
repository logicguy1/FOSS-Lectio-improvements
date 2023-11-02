const scheduleTable = document.getElementById("s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel");
if (scheduleTable) {
  scheduleTable.style.width = "calc(100vw - 25px)";
  scheduleTable.style.maxWidth = "none";
}

const skemaContainers = document.getElementsByClassName("s2skemabrikcontainer");
if (skemaContainers.length !== 0) {
  // Set columns width
  for (let i = 0; i < skemaContainers.length; i++) {
    console.log(skemaContainers[i], skemaContainers[i].parentElement.offsetWidth)
    skemaContainers[i].style.width = `15.9vw`;
  }

  const classes = document.getElementsByClassName("s2skemabrik");
  const mapping = { // Schedule entry width vs amount of elements that day
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
    // console.log(classes[i], classes[i].style.width)
  }
}
