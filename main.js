// ==UserScript==
// @name         InjectJS
// @namespace    http://tampermonkey.net/
// @version      1.11
// @description  Inject javascript into almost every website you visit.
// @author       YTXaos
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/logo.png
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// @downloadURL  https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    "use strict";
    const url = location.href, origin = location.origin;
    function onURL(page) {
        return url === `${origin}${page}`;
    }
    if(onURL("/inject-js/")) {
        location = "https://github.com/YTXaos/InjectJS";
    }
    console.info("InjectJS Loaded. Press Ctrl + Q to topen");
    const popup = document.createElement("div"), style = document.createElement("style");
    fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/main.css").then(get => get.text()).then(set => style.innerHTML = set);
    popup.setAttribute("class", "js-injector-popup");
    popup.setAttribute("style", "display: none;");
    popup.innerHTML = `
    <label class="js-inject-header">
    <div class="js-logo-needle">.....</div>
    Inject<span class="js-logo">JS</span></label>
    <textarea placeholder="Your code here" class="js-code-inject" spellcheck="off" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
    <button class="execute-code" disabled>Execute</button>`;
    document.head.prepend(style);
    document.body.prepend(popup);
    function OptionsPage() {
        $("link[rel=stylesheet], style").remove();
        document.title = "InjectJS Options";
        const script = document.createElement("script"), jquery = document.createElement("script");
        fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/pages/options.html").then(get => get.text()).then(set => document.body.innerHTML = set);
        fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/options.js").then(get => get.text()).then(set => script.innerHTML = set);
        fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/jquery.js").then(get => get.text()).then(set => jquery.innerHTML = set);
        document.head.append(script);
        document.head.append(jquery);
    }
    const code = document.querySelector(".js-code-inject"), btn = document.querySelector(".execute-code");
    code.addEventListener("input", CheckCode);
    btn.addEventListener("click", InjectCode);
    function CheckCode() {
        const code = document.querySelector(".js-code-inject");
        if(code.value.length < 5) {
            btn.setAttribute("disabled", "disabled");
        } else {
            btn.removeAttribute("disabled");
        }
    }
    function InjectCode() {
        const code = document.querySelector(".js-code-inject").value;
        const show_alerts = false;
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
    if(onURL("/inject-js/options")) {
        OptionsPage();
    }
    document.addEventListener("keyup", function(e) {
        e.preventDefault();
        if(e.ctrlKey && e.which === 81) {
            ShowInjector();
        }
   });
})();
