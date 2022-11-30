// ==UserScript==
// @name         InjectJS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
    console.info("InjectJS Loaded. Press Ctrl + Q to topen");
    const popup = document.createElement("div");
    const style = document.createElement("style");
    style.innerHTML = `.js-injector-popup {
    position: fixed;
    z-index: 9999;
    background: inherit;
    color: inherit;
    box-sizing: border-box;
    display: none;
    border: 1px solid #e3e1e1;
    padding: 0.5em;
    border-radius: 0.25rem;
    overflow: auto;
    max-height: 500px;
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
}
.js-inject-header {
    display: block;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
}
.js-logo-needle {
    background-image: url(https://cdn2.iconfinder.com/data/icons/blood-donation-21/512/Syringe-512.png);
    background-repeat: no-repeat;
    background-size: 25px;
    display: inline-block;
    color: transparent;
    background-position: center;
}
.js-inject-header .js-logo {
    color: gold;
 }
.js-code-inject {
    resize: both !important;
    box-sizing: border-box;
    padding: 0.3em;
    background: inherit;
    color: white;
    border-radius: 0.25rem;
    outline: none;
    transition: box-shadow .15s ease-in-out;
    font-family: arial;
    display: block;
    height: 7rem;
    margin-bottom: 0.5rem;
 }
.js-code-inject:focus {
    box-shadow: 0 0 0 3px rgb(0 123 255 / 57%);
}
.execute-code {
    all: revert;
    background: #f8e12e;
    border: none;
    color: white;
    padding: 0.3em 0.4em;
    cursor: pointer;
    display: block;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 5px;
    font-size: 1rem;
    position: relative;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}
.execute-code:disabled {
    background: rgb(187, 186, 186);
    color: white;
    pointer-events: none;
}
.execute-code:hover {
    background: #e5d11d;
}
.execute-code:active {
    background: #b1a00c;
}
.js-injector-popup.show {
    display: block;
 }`;
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
        eval(code);
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
    if(url.includes("/InjectJS/options")) {
        OptionsPage();
    }
    document.addEventListener("keyup", function(e) {
        e.preventDefault();
        if(e.ctrlKey && e.which === 81) {
            ShowInjector();
        }
   });
})();