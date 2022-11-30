// ==UserScript==
// @name         InjectJS
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Inject javascript into almost every website you visit.
// @author       You
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/logo.png
// @grant        none
// @updateURL    https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// @downloadURL  https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// ==/UserScript==

(function() {
    "use strict";
    console.info("InjectJS Loaded. Press Ctrl + Q to topen");
    const popup = document.createElement("div");
    const style = document.createElement("style");
    fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/main.css").then(get => get.text()).then(set => style.innerHTML = set);
    popup.setAttribute("class", "js-injector-popup");
    popup.innerHTML = `
    <label class="js-inject-header">
    <div class="js-logo-needle">.....</div>
    Inject<span class="js-logo">JS</span></label>
    <textarea placeholder="Your code here" class="js-code-inject" spellcheck="off"></textarea>
    <button class="execute-code" disabled>Execute</button>`;
    document.head.prepend(style);
    document.body.prepend(popup);
    function OptionsPage() {
        document.querySelector("link").remove();
        document.querySelector("style").remove();
        document.querySelector("title").innerHTML = `InjectJS Options`;
        const tag = document.createElement("style");
        tag.innerHTML = `:root {
  --background-1: #f7f7f7;
  --background-2: #fff;
  color: black;
}
/*
@media (prefers-color-scheme: dark) {
    :root {
      --background-1: #2d2d2d;
      --background-2: #2e2e2e;
      color: white;
    }
}*/
html {
  all: unset;
}
body {
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 1em;
  width: 100vw;
  height: 100vh;
  background: var(--background-1);
}
.container {
  border: 1px solid #e3e1e1;
  width: 5rem;
  height: 10rem;
  background: var(--background-2);
}
`;
        document.head.append(tag);
        document.body.innerHTML = '<div class="container">InjectJS Options</div>';
    }
    const code = document.querySelector(".js-code-inject"), btn = document.querySelector(".execute-code");
    code.addEventListener("input", CheckCode);
    btn.addEventListener("click", InjectCode);
    function CheckCode() {
        const code = document.querySelector(".js-code-inject");
        const btn = document.querySelector(".execute-code");
        if(code.value.length < 5) {
            btn.setAttribute("disabled", "disabled");
        } else {
            btn.removeAttribute("disabled");
        }
    }
    function InjectCode() {
        const code = document.querySelector(".js-code-inject").value;
        const show_alerts = false; // TEMP
        try {
            eval(code);
        } catch(e) {
            if(show_alerts) {
                alert(e.message);
            } else {
                console.error(e.message);
            }
        }
    }
    function ShowInjector(event) {
        dragElement(document.querySelector(".js-injector-popup"));
        function dragElement(elmnt) {
          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          if (document.querySelector(".js-inject-header")) {
            document.querySelector(".js-inject-header").onmousedown = dragMouseDown;
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
        popup.classList.toggle("show");
    }
    const url = location.href;
    function onURL(url, page) {
        return url === `${url}${page}`;
    }
    if(onURL(url, "/inject-js/options")) {
        OptionsPage();
    }
    document.addEventListener("keyup", function(e) {
        e.preventDefault();
        if(e.ctrlKey && e.which === 81) {
            ShowInjector();
        }
   });
})();
