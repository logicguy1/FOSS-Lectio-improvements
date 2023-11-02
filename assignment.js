const assignmentContainer = document.getElementById("printStudentAssignmentsArea");

if (assignmentContainer) {
  const assignmentsMenuBar = assignmentContainer.getElementsByClassName("textMid");

  const deliveredToggleField = createAssignmentField("Afleveret", "hideDelivered", "Skjul afleveret opgaver", true);
  assignmentsMenuBar[0].append(deliveredToggleField);

  const missingToggleField = createAssignmentField("Mangler", "hideMissing", "Skjul manglende opgaver", false);
  assignmentsMenuBar[0].append(missingToggleField);

  const waitingToggleField = createAssignmentField("Lærer", "hideWaiting", "Skjul opgaver uden feedback", false);
  assignmentsMenuBar[0].append(waitingToggleField);
}

function createAssignmentField(checkFor, item, fieldText, defaultState) {
  const assignmentsToggleField = document.createElement("span");
  assignmentsToggleField.style.marginLeft = "1rem"

  const toggleButton = document.createElement("input");
  toggleButton.id = `${item}-${checkFor}`;
  toggleButton.type = "checkbox";

  toggleButton.checked = getInitialState(item, defaultState);


  const toggleLabel = document.createElement("label");
  toggleLabel.setAttribute("for", toggleButton.id);

  toggleLabel.innerText = fieldText;


  showHideAssignments(checkFor, item);

  toggleButton.addEventListener("change", function () {
    if (toggleButton.checked) {
      toggleButton.setAttribute("checked", true);
      localStorage.setItem(item, true);
    } else {
      toggleButton.setAttribute("checked", false);
      localStorage.setItem(item, false);
    }

    showHideAssignments(checkFor, item);
  });

  assignmentsToggleField.append(toggleButton);
  assignmentsToggleField.append(toggleLabel);


  return assignmentsToggleField;
}

function getInitialState(item, defaultState) {
  const itemState = localStorage.getItem(item);

  if (itemState === "true") {
    return true;
  } else if (itemState === "false") {
    return false;
  }

  localStorage.setItem(item, defaultState);
  return defaultState;
}

function showHideAssignments(checkFor, item) {
  const assignmentsTable = document.getElementById("s_m_Content_Content_ExerciseGV");
  const assignmentsTBody = assignmentsTable.getElementsByTagName("tbody");
  const assignmentElements = assignmentsTBody[0].getElementsByTagName("tr");

  let assignmentState = "table-row";

  if (localStorage.getItem(item) === "true") {
    assignmentState = "none";
  } else {
    assignmentState = "table-row";
  }

  for (let i = 1; i < assignmentElements.length; i++) {
    const assignmentTD = assignmentElements[i].getElementsByTagName("td");
    if (assignmentTD[5].innerText === checkFor) {
      assignmentElements[i].style.display = assignmentState;
    } else if (assignmentTD[7].innerText === checkFor) {
      assignmentElements[i].style.display = assignmentState;
    }
  }
}
