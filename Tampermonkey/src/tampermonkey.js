// ==UserScript==
// @name         调试脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hahaha
// @author       iovitz
// @connect      localhost
// @connect      cdn.jsdelivr.net
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     picoCSS https://cdn.jsdelivr.net/npm/iovitz-cdn@1.0.3/dist/pico.conditional.css
// @require      https://cdn.jsdelivr.net/npm/iovitz-cdn@1.0.3/dist/tampermonkey_loader.js
// ==/UserScript==

GM_addStyle(GM_getResourceText('picoCSS'))

__TAMPERMONKEY_LAOD_SCRIPTS__(['https://cdn.jsdelivr.net/npm/iovitz-cdn@1.0.3/dist/tampermonkey_utils.js', 'http://localhost:3131/main.js']).then(
  () => {
    // YourCode
  }
)
