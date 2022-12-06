# InjectJS
Tool to inject javascript into any website.
## How to download
First, you need to have the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) extension. After that you can use which ever method you'd like.
### Greasyfork
Go to [Greasyfork](https://greasyfork.org/en/scripts/455718-injectjs) and download the script. This should automatically install it and it should be ready.
### Manual
Go to your Tampermonkey dashboard and create a new script. After that copy the code from [main.js](https://github.com/YTXaos/InjectJS/blob/main/main.js). However, you will need to manually update this script.
### Fetching
Go to your Tampermonkey dashboard and create a new script. Then copy this script into the script.
```js
// ==UserScript==
// @name             InjectJS
// @namespace        http://tampermonkey.net/
// @version          1
// @description      Inject Javascript into almost any website.
// @description:es   Inyecte Javascript en casi cualquier sitio web
// @description:fr   Injectez Javascript dans presque tous les sites Web
// @description:de   Fügen Sie Javascript in fast jede Website ein
// @description:ja   ほぼすべてのウェブサイトにジャバスクリとを挿入する
// @description:la   Javascript in inject paene omnem website
// @description:ru   Внедрите Javascript практически в любой веб-сайт
// @author           YTXaos
// @grant            GM_addElement
// @match            *://*/*
// @icon             https://raw.githubusercontent.com/YTXaos/InjectJS/main/assets/logo.png
// ==/UserScript==

(function() {
    "use strict";
    fetch("https://raw.githubusercontent.com/YTXaos/InjectJS/main/main.js").then(get => get.text()).then(set => GM_addElement("script", { textContent: set });
})();
```
