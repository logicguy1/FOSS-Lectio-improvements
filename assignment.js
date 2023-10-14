const assignmentContainer = document.getElementById("printStudentAssignmentsArea");
const assignmentsMenuBar = assignmentContainer.getElementsByClassName("textMid");

console.log(assignmentsMenuBar);

const completedAssignmentsToggleField = createToggleField();

assignmentsMenuBar[0].append(completedAssignmentsToggleField);

function createToggleField () {
    const completedAssignmentsToggleField = document.createElement("span");
    const toggleLabel = document.createElement("label");
    const toggleButton = document.createElement("input")

    completedAssignmentsToggleField.style.marginLeft = "1rem"

    toggleButton.type = "checkbox";
    toggleButton.checked = getInitialState();

    toggleButton.addEventListener("change", () => {
        if (toggleButton.checked) {
            localStorage.setItem("hideAssignments", "true");
        } else {
            localStorage.setItem("hideAssignments", "false");
        }
        showHideCompletedAssignments();
    })

    toggleLabel.innerText = "Skjul afleveret opgaver";

    completedAssignmentsToggleField.append(toggleLabel);
    completedAssignmentsToggleField.append(toggleButton);

    showHideCompletedAssignments()
    return completedAssignmentsToggleField;
}

function getInitialState() {
    localStorage.setItem("hideAssignments", "true");
    return true
}

function showHideCompletedAssignments() {
    const assignmentsTable = document.getElementById("s_m_Content_Content_ExerciseGV");
    const assignmentsTBody = assignmentsTable.getElementsByTagName("tbody");
    const assignmentElements = assignmentsTBody[0].getElementsByTagName("tr");

    console.log(localStorage.getItem("hideAssignments"));

    let assignmentState = "table-row";

    if (localStorage.getItem("hideAssignments") === "true") {
        assignmentState = "none";
    } else {
        assignmentState = "table-row";
    }

    console.log(assignmentState);

    for (let i = 1; i < assignmentElements.length; i++) {
        const assignmentTD = assignmentElements[i].getElementsByTagName("td");
        if (assignmentTD[5].innerText === "Afleveret") {
            assignmentElements[i].style.display = assignmentState;
        }
    }
}
