// ==UserScript==
// @name        Swagbucks insert element test
// @namespace   Violentmonkey Scripts
// @match       https://www.swagbucks.com/
// @grant       none
// @version     1.0
// @author      -
// @description 2/16/2020, 6:13:41 PM
// ==/UserScript==
var elementGetter = document.getElementById("tab_n")
console.log(elementGetter);
elementGetter.insertAdjacentHTML("afterend", "<span style='color:red'>My span</span>");
