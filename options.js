window.storage = localStorage;
const storage = window.storage;
function option(id) {
  return document.querySelector(`[option-id=${id}]`);
}
const options = document.querySelectorAll("[option-id]");
options.forEach(elm => {
  const attr = "inject-js:"+elm.getAttribute("option-id");
  if(storage.getItem(attr) !== null) {
    if(storage.getItem(attr).toString() == "true") {
      elm.setAttribute("checked", "checked");
    }
  }
});
options.forEach(elm => {
  elm.addEventListener("click", function () {
    storage.setItem("inject-js:"+this.getAttribute("option-id"), this.checked);
  });
});
dragElement(document.querySelector(".injectjs-options"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(".js-header")) {
    document.querySelector(".js-header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}