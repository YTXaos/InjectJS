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
    function OptionsPage() {
        
    }
    alert("hi");
    const url = location.href;
    if(url.includes("/javascript-injector")) {
        return "hi";
    }
})();