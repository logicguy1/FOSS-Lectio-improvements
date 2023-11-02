console.log("Yay");
const divelm = document.getElementById("printareaDiplomaLines");
const table = divelm.children[0];
const tablerows = Array.from(table.children[0].children);

// Remove two first elements
tablerows.shift();
tablerows.shift();

for (let i = 0; i < tablerows.length; i++) {
  const row = tablerows[i].children;

  row[2].style.backgroundColor = 
      row[2].innerText === "12" ? "#4CAF50" 
    : row[2].innerText === "10" ? "#8BC34A"
    : row[2].innerText === "7" ?  "#FFC107"
    : row[2].innerText === "4" ?  "#FF9800"
    : row[2].innerText === "2" ?  "#FF5722"
    : row[2].innerText === "00" ? "#F44336" 
    : row[2].innerText === "-3" ? "#FF0000" : "";

  row[3].style.backgroundColor = 
      row[3].innerText === "A" ? "#4CAF50" 
    : row[3].innerText === "B" ? "#8BC34A"
    : row[3].innerText === "C" ?  "#FFC107"
    : row[3].innerText === "D" ?  "#FF9800"
    : row[3].innerText === "E" ?  "#FF5722"
    : row[3].innerText === "F" ? "#F44336" 
    : row[3].innerText === "F" ? "#FF0000" : "";

  row[5].style.backgroundColor = 
      row[5].innerText === "12" ? "#4CAF50" 
    : row[5].innerText === "10" ? "#8BC34A"
    : row[5].innerText === "7" ?  "#FFC107"
    : row[5].innerText === "4" ?  "#FF9800"
    : row[5].innerText === "2" ?  "#FF5722"
    : row[5].innerText === "00" ? "#F44336" 
    : row[5].innerText === "-3" ? "#FF0000" : "";

  row[6].style.backgroundColor = 
      row[6].innerText === "A" ? "#4CAF50" 
    : row[6].innerText === "B" ? "#8BC34A"
    : row[6].innerText === "C" ?  "#FFC107"
    : row[6].innerText === "D" ?  "#FF9800"
    : row[6].innerText === "E" ?  "#FF5722"
    : row[6].innerText === "F" ? "#F44336" 
    : row[6].innerText === "F" ? "#FF0000" : "";
}

const divelm2 = document.getElementById("printareaprotocolgrades");
const table2 = divelm2.children[0].children[0];
const tablerows2 = Array.from(table2.children[0].children);

console.log(tablerows2)
tablerows2.shift();

for (let i = 0; i < tablerows2.length; i++) {
  const row = tablerows2[i].children;

  row[7].style.backgroundColor = 
      row[7].innerText === "12" ? "#4CAF50" 
    : row[7].innerText === "10" ? "#8BC34A"
    : row[7].innerText === "7" ?  "#FFC107"
    : row[7].innerText === "4" ?  "#FF9800"
    : row[7].innerText === "2" ?  "#FF5722"
    : row[7].innerText === "00" ? "#F44336" 
    : row[7].innerText === "-3" ? "#FF0000" : "";
}
