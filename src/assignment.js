const assignmentContainer = document.getElementById("printStudentAssignmentsArea");

if (assignmentContainer) {
  const assignmentsMenuBar = assignmentContainer.getElementsByClassName("textMid");

  // Toggle-fields
  const deliveredToggleField = createAssignmentField("Afleveret", "hideDelivered", "Skjul afleveret opgaver", true);
  assignmentsMenuBar[0].append(deliveredToggleField);

  const missingToggleField = createAssignmentField("Mangler", "hideMissing", "Skjul manglende opgaver", false);
  assignmentsMenuBar[0].append(missingToggleField);

  // BUG: This doens't work properly. Please see https://github.com/logicguy1/FOSS-Lectio-improvements/issues/8
  // const waitingToggleField = createAssignmentField("Lærer", "hideWaiting", "Skjul opgaver uden feedback", false);
  // assignmentsMenuBar[0].append(waitingToggleField);

  // Countdown timer
  const assignmentsTable = assignmentContainer.querySelector("#s_m_Content_Content_ExerciseGV");
  const assignmentRows = Array.from(assignmentsTable.querySelector("tbody").children);
  assignmentRows.shift();

  assignmentRows.forEach(row => {
    const rowDateBox = row.children[3];
    const inputDateString = rowDateBox.innerText.trim();

    var timer = setInterval(() => {
      var distance = getCountdownTime(inputDateString);

      if (isNaN(distance)) {
        clearInterval(timer);
        rowDateBox.innerText += "\nFejl Dato";
        return;
      }

      var [days, hours, minutes, seconds] = [
        Math.floor(distance / (1000 * 60 * 60 * 24)),
        Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
        Math.floor(distance % (1000 * 60) / 1000)
      ];

      var dueText = `${distance <= 0 ? "Udløbet" : formatDueText(days, hours, minutes, seconds)}`;
      rowDateBox.innerText = `${inputDateString}\n${dueText}`;

      // TODO: Maybe change the color based on "distance".
      if (distance <= 0) {
        clearInterval(timer);
        return;
      }
    }, 1000);
  });
}

// ------------------------- Timer -------------------------

// Format the date as "YYYY-MM-DDTHH:mm:ss" in Copenhagen time
const fmtOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Europe/Copenhagen'
};

function getCountdownTime(input) {
  // Match the expected format: DD/MM-YYYY HH:mm
  const dateRegex = /^(\d+)\/(\d+)-(\d+) (\d+):(\d+)$/;
  const match = input.match(dateRegex);

  if (!match) {
    console.error("Invalid date format:", input);
    return NaN; // Return NaN for invalid formats
  }

  var [, day, month, year, hour, minute] = match;

  // Ensure two-digit representation for day and month;
  // this D/M-YYYY HH:mm date format causes errors.
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}T${hour}:${minute}:00`;
  const copenhagenDate = new Date(formattedDateString);

  const currentTime = new Date().toLocaleString('da-DK', fmtOptions).replace(/(\d+)\.(\d+)\.(\d+) (\d+)\.(\d+)\.(\d+)/, "$3-$2-$1T$4:$5:$6");
  const today = new Date(currentTime);

  return distance = copenhagenDate.getTime() - today.getTime();
}

function formatDueText(days, hours, minutes, seconds) {
  if (days < 1) {
    return hours < 1 ? `(Om ${minutes}M ${seconds}S)` : `(Om ${hours}H ${minutes}M)`;
  } else if (days < 2) {
    return `(Om ${days}D ${hours}H ${minutes}M)`;
  } else if (days < 14) {
    return `(Om ${days}D ${hours}H)`;
  } else {
    return `(Om ${days}D)`;
  } 
}

// ------------------------- Toggles -------------------------

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
