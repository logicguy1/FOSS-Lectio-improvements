function get_color(grade) {
  const fantastic = "#4CAF50";
  const great = "#8BC34A";
  const good = "#CDDC39";
  const average = "#FFEB3B";
  const bad = "#FF5722";
  const aweful = "#FF0000";

  return grade.innerText === "12" ? fantastic
    : grade.innerText === "10" ? great
    : grade.innerText === "7"  ? good
    : grade.innerText === "4"  ? average
    : grade.innerText === "02" ? bad
    : grade.innerText === "00" ? bad
    : grade.innerText === "-3" ? aweful

    : grade.innerText === "A" ? fantastic
    : grade.innerText === "B" ? great
    : grade.innerText === "C" ? good
    : grade.innerText === "D" ? average
    : grade.innerText === "E" ? bad
    : grade.innerText === "F" ? bad
    : grade.innerText === "F" ? aweful : "";
}

const divElm = document.getElementById("printareaDiplomaLines");
const table = divElm.children[0];
const tablerows = Array.from(table.children[0].children);

// Remove two first elements
tablerows.shift();
tablerows.shift();

for (let i = 0; i < tablerows.length; i++) {
  const row = tablerows[i].children;

  row[2].style.backgroundColor = get_color(row[2]);
  row[3].style.backgroundColor = get_color(row[3]); 
  row[5].style.backgroundColor = get_color(row[5]); 
  row[6].style.backgroundColor = get_color(row[6]); 
}

const divElm2 = document.getElementById("printareaprotocolgrades");
const table2 = divElm2.children[0].children[0];
const tablerows2 = Array.from(table2.children[0].children);

console.log(tablerows2)
tablerows2.shift();

for (let i = 0; i < tablerows2.length; i++) {
  const row = tablerows2[i].children;

  row[7].style.backgroundColor = get_color(row[7]);
}
