// ==UserScript==
// @name             InjectJS
// @namespace        http://github.com/YTXaos/InjectJS
// @version          1.24
// @description      Inject Javascript into almost any website.
// @description:es   Inyecte Javascript en casi cualquier sitio web
// @description:fr   Injectez Javascript dans presque tous les sites Web
// @description:de   Fügen Sie Javascript in fast jede Website ein
// @description:ja   ほぼすべてのウェブサイトにジャバスクリとを挿入する
// @description:la   Javascript in inject paene omnem website
// @description:ru   Внедрите Javascript практически в любой веб-сайт
// @author           YTXaos
// @match            *://*/*
// @match            file:///*
// @icon             https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/logo.png
// @grant            GM_addElement
// @license          MIT
// @downloadURL      https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// @updateURL        https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js
// @require          https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    "use strict";
    const url = location.href,
        origin = location.origin;
    function Option(item) {
        if(localStorage.getItem(`inject-js:${item}`)) {
            return localStorage.getItem(`inject-js:${item}`).toString();
        } else {
            return false;
        }
    }
    function onURL(page, mode) {
        switch(mode) {
            case "exact":
                return url === `${origin}${page}`;
            case "relative":
                return url.includes(page);
            default:
                console.error("InjectJS: Specify a matching mode.");
        }
    }
    if(Option("disable") == "true") {
        document.addEventListener("keyup", function(e) {
            e.preventDefault();
            if(e.ctrlKey && e.key === "q") {
                location = "/inject-js/options";
            }
        });
        return;
    }
    if(onURL("/inject-js/", "exact")) {
        location = "https://github.com/YTXaos/InjectJS";
    }
    Option("startup_log") == "true" && (console.info("InjectJS Loaded. Press Ctrl + Q to topen"));
    const popup = document.createElement("div"),
        style = document.createElement("style");
    fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/main.css").then(get => get.text()).then(set => style.innerHTML = set);
    popup.setAttribute("class", "js-injector-popup");
    popup.style.display = "none";
    popup.innerHTML = `<label class="js-inject-header">
            <div class="js-logo-needle">.....</div>
            Inject<span class="js-logo">JS</span>
        </label>
        <textarea placeholder="Your code here" class="js-code-inject" spellcheck="false" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" id="js-code-inject"></textarea>
    <div class="js-btns-section">
        <button class="execute-code" disabled>Execute</button>
        <button class="js-options-btn">Options</button>
    </div>`;
    document.head.prepend(style);
    document.body.prepend(popup);

    function OptionsPage() {
        $("link[rel=stylesheet], style, script").remove();
        document.title = "InjectJS Options";
        fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/pages/options.html").then(get => get.text()).then(set => document.body.innerHTML = set);
        fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/options.js").then(get => get.text()).then(set => GM_addElement(document.head, "script", {
            textContent: set
        }));
    }
    const code = document.querySelector(".js-code-inject"),
        btn = document.querySelector(".execute-code"), option_btn = document.querySelector(".js-options-btn");
    code.addEventListener("input", CheckCode);
    if(Option("syntax") != "false") { code.addEventListener("keydown", Syntax); }
    btn.addEventListener("click", InjectCode);
    option_btn.addEventListener("click", () => { location = "/inject-js/options"; });

    function Syntax(e) {
        if(e.key === "{") {
            e.preventDefault();
            const start = code.selectionStart,
              end = code.selectionEnd,
              selection = code.value.substring(start, end),
              replace = `${code.value.substring(0, start)}{\n${selection}\n}${code.value.substring(end)}`;
            code.value = replace;
            code.focus();
            code.selectionEnd = end + 2;
          }
          if(e.key === "(") {
            e.preventDefault();
            const start = code.selectionStart,
              end = code.selectionEnd,
              selection = code.value.substring(start, end),
              replace = `${code.value.substring(0, start)}(${selection})${code.value.substring(end)}`;
            code.value = replace;
            code.focus();
            code.selectionEnd = end + 1;
          }
          if(e.which === 222) {
            e.preventDefault();
            const start = code.selectionStart,
              end = code.selectionEnd,
              selection = code.value.substring(start, end),
              replace = `${code.value.substring(0, start)}${e.key}${selection}${e.key}${code.value.substring(end)}`;
            code.value = replace;
            code.focus();
            code.selectionEnd = end + 1;
          }
    }
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
        try {
            eval(code);
        } catch (e) {
            if(Option("alert_errors") == "true") {
                alert(e.message);
            } else {
                console.error(`InjectJS: ${e.message}`);
            }
        }
    }

    function ShowInjector() {
        dragElement(document.querySelector(".js-injector-popup"));
        function dragElement(elmnt) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if(document.querySelector(".js-inject-header")) {
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
    if(onURL("/inject-js/options", "exact")) {
        OptionsPage();
    }
    document.addEventListener("keyup", function(e) {
        e.preventDefault();
        if(e.ctrlKey && e.key === "q") {
            ShowInjector();
        }
    });
})();