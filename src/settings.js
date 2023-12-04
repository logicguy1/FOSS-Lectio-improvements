const mainHeaderTitle = document.querySelector("#s_m_HeaderContent_MainTitle");

if (mainHeaderTitle) {
  mainHeaderTitle.childNodes[1].textContent = "FOSS Improver Settings & Logs";
}

/*
 * Makes a new lectio container.
 *
 * This function takes a tabname param as input and returns a classic lectio container that
 * you can append html into.
 *
 * @param {string} tabName - Container tab name.
 * @returns {object} A lectio container.
 *
 * @example
 * const lsContentContainer = document.querySelector("ls-content-container");
 * lsContentContainer.appendChild(newLectioContainer("Container name"));
 */
function newLectioContainer(tabName) {
  const section = document.createElement("section");
  section.classList = "island";

  const headingContainer = document.createElement("div");
  headingContainer.setAttribute("role", "heading");
  headingContainer.className = "islandHeaderContainer";
  headingContainer.style = "background-image: none; background-color: rgb(211, 229, 245);";

  const spanHeader = document.createElement("span");
  spanHeader.innerText = tabName;
  spanHeader.className = "islandHeader";

  headingContainer.appendChild(spanHeader);

  const contentContainer = document.createElement("div");
  contentContainer.id = "s_m_Content_Content_ils_pa";
  contentContainer.className = "islandContent";

  section.appendChild(headingContainer);
  section.appendChild(contentContainer);

  return section;
}

var lsContentContainer = document.querySelector("#contenttable.ls-content");
// var lsContentContainer = document.querySelector(".ls-content-container");
if (lsContentContainer) {
  // Settings container
  const test = newLectioContainer("Test container");
  lsContentContainer.appendChild(test);
  // Endblock

  //----------------------------------------------------//
  //              Creates a two-column layout           //
  //----------------------------------------------------//

  lsContentContainer.style.display = "grid";
  lsContentContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
  lsContentContainer.style.gap = "10px";

  // Moves the login logs to the bottom.
  const sectionElement = document.querySelector('.ls-mobile-content-fullwidth > section');

  if (sectionElement) {
    // Removes the classes defining size; grid handles it.
    sectionElement.classList.remove("mediumBlock", "defaultBlockHeight");

    // Replace the parent div with the section
    lsContentContainer.removeChild(sectionElement.parentElement);
    lsContentContainer.appendChild(sectionElement);
  }
}
