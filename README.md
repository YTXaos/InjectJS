# InjectJS
Tool to inject javascript into any website.
## How to download
First, you need to have the [Tampermonkey extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag). After that you can use which ever method you'd like.
### Greasyfork
Go to [Greasyfork](https://greasyfork.org/en/scripts/455718-injectjs) and download the script. This should automatically install it and it should be ready.
### Manual
Go to your Tampermonkey dashboard and create a new script. After that copy the code from [main.js](https://github.com/YTXaos/InjectJS/blob/main/main.js).
### Fetching
Go to your Tampermonkey dashboard and create a new script. Then copy this script into the script.
```js
// ==UserScript==
// @name         InjectJS
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Inject javascript into almost every website you visit.
// @author       YTXaos
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/logo.png
// ==/UserScript==

(function() {
    "use strict";
    const script = document.createElement("script");
    fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js).then(get => get.text()).then(set => script.innerHTML = set);
    document.head.append(script);
})();
```
