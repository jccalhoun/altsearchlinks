// ==UserScript==
// @name        Swagbucks insert element test
// @namespace   Violentmonkey Scripts
// @match       *.swagbucks.com/*
// @match https://*.swagbucks.com/*
// @match http://*.swagbucks.com/*

// @grant       GM_addStyle
// @version     2020.03.25
// @author      -
// @description 2/16/2020, 6:13:41 PM
// ==/UserScript==
GM_addStyle(".dropbtn {border: none; cursor: pointer; background-color: #fff !important; color: #666666; font-family: 'Open Sans',sans-serif; font-size: 1.4em;}" +

    ".dropdown {display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1;}" +
            //.dropdown-content a needs !important on display:block for it to display in a vertical menu.
    ".dropdown-content a {color: 666; padding: 12px 16px !important; text-decoration: none; display: block !important;}" +
    ".dropdown:hover .dropdown-content {display: block;}" +

    ".dropdown-content a:hover {background-color: #f2f2f2}" +

    ".dropdown:hover .dropdown-content { display: block;}" +

    ".dropdown:hover .dropbtn {    color: #2d6cae;}");


var addSearchElement = 'searchListener';

var results = function () {
    //the match looks for anything after q= and it returns an array so we need the [1]. i am not sure what the (?:\?|&) is for. it tells it not to match that
    var result = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
    //if (window.location.href.indexOf('#q=') > -1) {
    //  result =  window.location.href.match(/#q=[^&]*/gi)[0].substr(3);}
    return result;
};

var googleLink = "<a href =\"https://www.google.com/search?q=" + results() + "\">Google</a>";
var bingLink = "<a href =\"http://www.bing.com/search?q=" + results() + "\">Bing</a>";
var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results() + "\">Yahoo</a>";
var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results() + "\">Swagbucks</a>";
var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results() + "\">DuckDuckGo</a>";
var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results() + "\">WolframAlpha</a>";
var twitterLink = "<a href =\"http://twitter.com/search?q=" + results() + "\">Twitter</a>";
var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results() + "\">Google Scholar</a>";
var msAcademicLink = "<a href =\"https://academic.microsoft.com/search?q=" + results() + "\">MS Academic</a>";
var wikipedia = "<a href =\"https://www.bing.com/search?q=site%3Aen.wikipedia.org+" + results() + "\">Wikipedia</a>";



var swagInsert = function () {
    console.log(results);
    var newItem = document.createElement("li");

    newItem.id = addSearchElement;
    var links = `<div class="dropdown">
<button class="dropbtn">Alt Search</button>
<div class="dropdown-content">` + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + wikipedia + `</div></div>`;
    newItem.innerHTML = links;

    var elementGetter = document.getElementById("tab_n");
    elementGetter.insertAdjacentElement("afterend", newItem);
};

swagInsert();







//var elementGetter = document.getElementById("tab_n")
//console.log(elementGetter);
//elementGetter.insertAdjacentHTML("afterend", "<span style='color:red'>My span</span>");
