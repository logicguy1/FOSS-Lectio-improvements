function generateRandomColor(seed) {
    const brightHues = [30, 60, 120, 180, 240, 270]; // Bright hues in degrees (green, yellow, cyan, blue, magenta, purple)
    const hue = brightHues[Math.floor(Math.abs(hashCode(seed)) % brightHues.length)]; // Select a random bright hue
    
    const saturation = 30 + Math.abs(hashCode(seed + "s") % 20); // Adjust saturation (50-100)
    let lightness = 50 + Math.abs(hashCode(seed + "l") % 35); // Adjust lightness (50-80)

    if (hue === 240) {
    lightness = lightness + 10
  }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash;
}

var elements = document.getElementsByClassName("s2skemabrikcontent");

for (let i = 0; i < elements.length; i++) {
  var color = "";

  let index = 0;
  for (let x = 0; x < elements[i].children.length; x++) {
    if(index === 0 && elements[i].children[x].hasAttribute("data-lectiocontextcard")){
      color = generateRandomColor(elements[i].children[x].innerText);
      console.log(color, elements[i].children[x].innerText);
      index++;
    }
  }

  if (color !== "") {
    elements[i].parentNode.style.backgroundColor = color;
    elements[i].parentNode.style.backgroundImage = "none";
  }
  elements[i].style.color = "#000";
}
