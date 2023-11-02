var schoolId = document.location.href.match(/\/lectio\/(?<id>\d*)\/beskeder/).groups.id
var msgThreadBoxes = [...document.querySelectorAll('#GridRowMessage')]

// Removes the compose message box
msgThreadBoxes.pop();

msgThreadBoxes.forEach(async threadBox => {
  var messageSender = threadBox.querySelector(".message-thread-message-sender");
  var senderSpan = messageSender.querySelector("span");
  var id = senderSpan.getAttribute('data-lectiocontextcard');

  var headerMenu = threadBox.querySelector("div.message-replysum-header-menu");
  headerMenu.style = "padding-bottom: 0.5em; justify-content: flex-start";

  var messageMenu = headerMenu.querySelector(".message-menu").parentNode;
  messageMenu.style = "margin-left: auto";

  var header = threadBox.querySelector(".message-thread-message-header").parentNode;
  header.appendChild(senderSpan);
  messageSender.innerText = messageSender.innerText.replace(", ", "");
  messageSender.style = "padding: 0";
  header.appendChild(messageSender);


  headerMenu.innerHTML =
    `<div style="padding-right: 0.5em;" id="imgcell${id}">
      <img onclick="ThumbViewer.Show(event);" data-lectiocontextcard="1" alt="" src="/lectio/img/defaultfoto_small.jpg" title="Vis større foto" class="" id="ctl00_Content_ImageCtrlthumbimage">
    </div>` + headerMenu.innerHTML

  var card = await (await fetch(`https://www.lectio.dk/lectio/${schoolId}/contextcard/contextcard.aspx?lectiocontextcard=` + id)).text();
  var img = card.match(/<img.*>/)[0];

  var imgElm = headerMenu.querySelector("#imgcell" + id);
  imgElm.innerHTML = img;
});

