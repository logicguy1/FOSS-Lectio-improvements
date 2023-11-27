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

/*
 * Colors specified fields within a table identified by a given selector.
 *
 * This function takes a selector for a table element, shifts the rows by a specified
 * amount, and colors specific fields indicated by an array of indexes.
 *
 * @param {string} tableSelector - The selector for the table element (CSS selector).
 * @param {number} shiftsAmount - The number of times the rows should be shifted. This is used to remove headers.
 * @param {number[]} arrayIndex - An array of indexes, specifying a fields index to be colored.
 *                                e.g., [2, 3, 5, 6] colors the 3rd, 4th, 6th, and 7th fields.
 *
 * @returns {void} - The function doesn't return a value.
 *
 * @example
 * colorFields("#printareaDiplomaLines>table>tbody", 2, [2, 3, 5, 6]);
 */
function colorFields(tableSelector, shiftsAmount, arrayIndex) {
  const divElm = document.querySelector(tableSelector);
  const tablerows = [...divElm.children];

  // Remove first n elements
  for (let n = 0; n < shiftsAmount; n++) {
    tablerows.shift();
  }

  // This colors each provided field index from arrayIndex if it exists.
  tablerows.forEach(row => {
    arrayIndex.forEach(index => {
      if (row.children[index]) {
        row.children[index].style.backgroundColor = get_color(row.children[index]);
      }
    });
  });
}

colorFields("#printareaDiplomaLines>table>tbody", 2, [2, 3, 5, 6]);
colorFields("table#s_m_Content_Content_ProtokolLinierGrid>tbody", 1, [9]);
colorFields("#s_m_Content_Content_karakterView_KarakterNoterGrid>tbody", 1, [2]);
colorFields("#s_m_Content_Content_karakterView_KarakterGV>tbody", 1, [2]);
