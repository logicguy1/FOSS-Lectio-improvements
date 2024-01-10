function generateRandomColor(seed) {
  const hues = [
    120, // Green
    180, // cyan
    200,
    220,
    240, // Blue
    270 // Purple
  ]; 
  const hue = hues[Math.floor(Math.abs(hashCode(seed)) % hues.length)]; 

  const sats = [30, 35, 40, 45, 50]; 
  let saturation = sats[Math.floor(Math.abs(hashCode(seed)) % sats.length)];
  const lightss = [57, 59, 61, 63, 65, 67, 69, 72]; 
  let lightness = lightss[Math.floor(Math.abs(hashCode(seed)) % lightss.length)];

  if (hue === 240) { // Blue
    lightness += 10
  } else if (hue == 120) { // Green
    lightness += 10
  } else if (hue == 270) { // purple 
    lightness += 10
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

// The schedule recoloring lies here because schedule bricks is everywhere.
var currentURL = window.location.href;
var regex = /\/SkemaNy/;

var elements;
if (currentURL.match(regex)) {
  var scheduleCells = document.querySelectorAll(".s2skema > tbody > tr:last-child")[0];
  elements = scheduleCells.querySelectorAll(".s2skemabrikcontent");
} else {
  elements = document.querySelectorAll(".s2skemabrikcontent");
}

if (elements.length > 0) {
  for (let i = 0; i < elements.length; i++) {
      const colorscheme = SettingsStore.get("schedule_colorscheme", "colorful");
      if (colorscheme === "basic") {
        if (elements[i].classList.contains("s2cancelled")) {
          // Schema cancelled
          elements[i].parentNode.parentNode.style.color = "#000"; // Sets the time to a black color 
          elements[i].parentNode.style.backgroundColor = "rgb(252, 81, 81)";
          elements[i].parentNode.style.backgroundImage = "none";
        } else if (elements[i].classList.contains("s2changed")) {
          // Schema changed
          elements[i].parentNode.style.backgroundColor = "rgb(163, 220, 163)";
          elements[i].parentNode.style.backgroundImage = "none";
        } else {
          // Everything else
          elements[i].parentNode.style.backgroundColor = "rgb(113, 145, 208)";
          // elements[i].parentNode.style.backgroundColor = "rgb(211, 229, 245)";
          elements[i].parentNode.style.backgroundImage = "none";
        }
      } else if (colorscheme === "colorful") {
        var color = "";

        let index = 0;
        for (let x = 0; x < elements[i].children.length; x++) {
          if(index === 0 && elements[i].children[x].hasAttribute("data-lectiocontextcard")){
            color = generateRandomColor(elements[i].children[x].innerText);
            index++;
          }
        }

        if (color !== "") {
          if (elements[i].classList.contains("s2cancelled")) {
            // Schema cancelled
            elements[i].parentNode.parentNode.style.color = "#000"; // Sets the time to a black color 
            elements[i].parentNode.style.backgroundColor = "rgb(252, 81, 81)";
            elements[i].parentNode.style.backgroundImage = "none";
          } else {
            // Everything else
            elements[i].parentNode.style.backgroundColor = color;
            elements[i].parentNode.style.backgroundImage = "none";
          }
        }
      } else if (colorscheme === "none") {
        break;
      }
    elements[i].style.color = "#000";
  }
}


// The functions below are used to easily style headers
function setStyles(selector, backgroundImage, backgroundColor) {
  // Use null to remove the styling (uses default) or "none" to "forbid" the styling.
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements.forEach(function(element) {
      element.style.backgroundImage = backgroundImage;
      if (backgroundColor) {
        element.style.backgroundColor = backgroundColor;
      }
    });
  }
}

function setChildStyles(selector, backgroundImage, backgroundColor) {
  // Use null to remove the styling (uses default) or "none" to "forbid" the styling.
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements.forEach(function(element) {
      const childElements = element.children;
      for (let i = 0; i < childElements.length; i++) {
        childElements[i].style.backgroundImage = backgroundImage;
        if (backgroundColor) {
          childElements[i].style.backgroundColor = backgroundColor;
        }
        //
        // Check if it's the first-child td within the first tr
        if (i === 0 && element.tagName === 'TR') {
          childElements[i].style.borderTopLeftRadius = '10px';
        }

        // Check if it's the last-child td within the first tr
        if (i === childElements.length - 1 && element.tagName === 'TR') {
          childElements[i].style.borderTopRightRadius = '10px';
        }
      }
    });
  }
}

const headerColor = "#d3e5f5";


setChildStyles(".s2weekHeader", "none", headerColor);
setChildStyles(".islandHeaderRow", "none", headerColor);

setStyles(".activityHeader", "none", headerColor);
setStyles(".ls-master-header-logo", "none", null);
setStyles(".ls-master-header", "none", headerColor);
setStyles(".islandHeaderContainer", "none", headerColor);
setStyles(".islandHeaderRow", "none", null);

setStyles("#s_m_mastermenu", "url('/lectio/img/gradlink.png')", "#d3dae0");
setStyles("#s_m_mastersearchbtn", "url('/lectio/img/gradlink.png')", null);

// Dialog headers
const dialogs = document.querySelectorAll(".ui-dialog");

if (dialogs.length > 0) {
  dialogs.forEach(dialog => {
    dialog.querySelector(".ui-dialog-titlebar").style = `background-image: none; background-color: ${headerColor}`;
  });
}
