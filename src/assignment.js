const assignmentContainer = document.getElementById("printStudentAssignmentsArea");

if (assignmentContainer) {
  const assignmentsMenuBar = assignmentContainer.querySelector(".ls-std-rowblock").children;
  assignmentsMenuBar[0].append["buttons"] = []

  // Toggle-fields
  const deliveredToggleField = createAssignmentField([["5", "Afleveret"]], "hideDelivered", "Skjul afleveret opgaver", true);
  assignmentsMenuBar[0].append(deliveredToggleField);

  const missingToggleField = createAssignmentField([["5","Mangler"]], "hideMissing", "Skjul manglende opgaver", false);
  assignmentsMenuBar[0].append(missingToggleField);

  const answeredToggleField = createAssignmentField([["7","Lærer"], ["5","Venter"]], "showAnswered", "Vis kun opgaver med svar", false)
  assignmentsMenuBar[0].append(answeredToggleField);

  localStorage.setItem("items", JSON.stringify(["hideMissing", "hideDelivered", "showAnswered"]))

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
      
      let dueColor;
      if (distance <= 0) {
        const assignmentstate = row.children[5].innerText;
        dueColor = assignmentstate === "Afleveret" ? "" : "#FF0000";
      } else if (days < 1) {
        dueColor = "#FF0000";
      } else if (days < 2) {
        dueColor = "#FFEB3B";
      } else if (days < 14) {
        dueColor = "#8BC34A";
      } else {
        dueColor = "#4CAF50";
      }

      rowDateBox.style["background-color"] = dueColor;

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
  console.log("DEBUG date input:", input);

  // Match D/M-YYYY HH:mm  (e.g., 1/3-2026 12:00)
  const dateRegex = /^(\d{1,2})\/(\d{1,2})-(\d{4}) (\d{1,2}):(\d{2})$/;
  const match = input.match(dateRegex);

  if (!match) {
    console.error("Fejl Dato – invalid format:", input);
    return NaN;
  }

  let [, day, month, year, hour, minute] = match;

  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}T${hour}:${minute}:00`;
  const copenhagenDate = new Date(formattedDateString);

  const now = new Date();
  const distance = copenhagenDate.getTime() - now.getTime();

  if (isNaN(distance)) {
    console.error("Fejl Dato – could not compute:", formattedDateString);
    return NaN;
  }

  return distance;
}

function formatDueText(days, hours, minutes, seconds) {
  // Return a user-friendly Danish text for the remaining time, e.g. "2 dage 3 timer 5 min"
  const parts = [];
  if (days > 0) parts.push(days + (days === 1 ? ' dag' : ' dage'));
  if (hours > 0) parts.push(hours + (hours === 1 ? ' time' : ' timer'));
  if (minutes > 0) parts.push(minutes + (minutes === 1 ? ' min' : ' min'));
  // Only include seconds if nothing else is present
  if (parts.length === 0) parts.push(seconds + (seconds === 1 ? ' sek' : ' sek'));
  return parts.join(' ');
}

// ------------------------- Toggles -------------------------

function createAssignmentField(checkFor, item, fieldText, defaultState) {
  const assignmentsToggleField = document.createElement("span");
  assignmentsToggleField.style.marginLeft = "1rem"

  const toggleButton = document.createElement("input");
  toggleButton.id = `${item}-${checkFor}`;
  toggleButton.type = "checkbox";

  toggleButton.checked = getInitialState(item, defaultState, checkFor);


  const toggleLabel = document.createElement("label");
  toggleLabel.setAttribute("for", toggleButton.id);

  toggleLabel.innerText = fieldText;


  if (defaultState) {
    showHideAssignments();
  }

  toggleButton.addEventListener("change", function () {
    if (toggleButton.checked) {
      toggleButton.setAttribute("checked", true);
      localStorage.setItem(item, JSON.stringify([checkFor,true]));
    } else {
      toggleButton.setAttribute("checked", false);
      localStorage.setItem(item, JSON.stringify([checkFor,false]));
    }

    showHideAssignments();
  });

  assignmentsToggleField.append(toggleButton);
  assignmentsToggleField.append(toggleLabel);


  return assignmentsToggleField;
}

function getInitialState(item, defaultState, checkFor) {
  const itemState = JSON.parse(localStorage.getItem(item))[1];
  if (itemState === "true") {
    return true;
  } else if (itemState === "false") {
    return false;
  }

  localStorage.setItem(item, JSON.stringify([checkFor,defaultState]));
  return defaultState;
}

function showHideAssignments() {
  const assignmentsTable = document.getElementById("s_m_Content_Content_ExerciseGV");
  const assignmentsTBody = assignmentsTable.getElementsByTagName("tbody");
  const assignmentElements = assignmentsTBody[0].getElementsByTagName("tr");

  for (let i = 0; i < assignmentElements.length; i++) {
    const assignmentTD = assignmentElements[i].getElementsByTagName("td");
    assignmentElements[i].style.display = "table-row"
  }

  const elementsToHide = []

  const localStorageItems = JSON.parse(localStorage.getItem("items"));
  
  if (localStorageItems) {
    const items = localStorageItems.map(item => JSON.parse(localStorage.getItem(item)));

    for (let o = 0; o < items.length; o++) {

      const checkFor = items[o][0]
      const state = items[o][1]

      for (let i = 1; i < assignmentElements.length; i++) {
        const assignmentTD = assignmentElements[i].getElementsByTagName("td");
        for (let u = 0; u < checkFor.length; u++) {
          if (assignmentTD[checkFor[u][0]].innerText === checkFor[u][1] && state) {
            elementsToHide.push(assignmentElements[i]); 
          }
        }
      }
    }

    // Hide elements in a batch
    elementsToHide.forEach(element => {
      element.style.display = "none";
    });
  }
}
