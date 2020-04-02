// ==UserScript==
// @name        ddg run-at document-idle
// @namespace   Violentmonkey Scripts
// @match           *://duckduckgo.com/*
// @grant       none
// @version     2020.04.01
// @author      -
// @description 3/28/2020, 4:40:57 PM
// @run-at document-idle
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle (".sDropbtn {border: none; cursor: pointer; background-color: #fafafa; font-family: inherit;}" +
    ".sDropdown {display: inline-block;}" +
    ".sDropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1; box-shadow: 0 3px 5px rgba(0,0,0,0.19), 0 1px 1px rgba(0,0,0,0.23)}" +
    ".sDropdown-content a {color: 666; padding: 12px 16px !important; text-decoration: none; display: block;}" +
    ".sDropdown:hover .sDropdown-content {display: block;}" +
    ".sDropdown-content a:hover {background-color: #f2f2f2}" +
    ".sDropdown:hover .sDropdown-content {display: block;}" +
    //this next one doesn't seem to do anything?
       //      ".sDropdown:hover .sDropbtn {background-color: #fafafa;}" +
             //needed on ddg
    ".zcm-wrap {position: static !important;}" +
    //this li stype is necessary for ddg
    "li {list-style-type: none;}"
);

console.log(document.querySelector('#duckbar_dropdowns'));
//document.getElementById("duckbar_dropdowns").addEventListener("load", myAlert);
//function myAlert() {
//  console.log("hello butts");
//}
//this works but the above doesn't? 
//window.addEventListener('load', 
//  function() { 
//    alert('hello!');
//  }, false);
//may also be able to use run-at document-idle https://violentmonkey.github.io/api/metadata-block/

//yes! that works! 
var ddgResults = document.querySelector('#duckbar_dropdowns');
    //window.location.search returns null for some reason
    var ddgSearchTerms = function () {
        var ddgResult = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
        //  this also errors
        //  var ddgResult = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
        return ddgResult;
    };

    var addSearchElement = 'searchListener';

    var googleLink = '<a href =\"https://www.google.com/search?q=' + ddgSearchTerms() + '\">Google</a>';
    var bingLink = "<a href =\"http://www.bing.com/search?q=" + ddgSearchTerms() + "\">Bing</a>";
    var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + ddgSearchTerms() + "\">Yahoo</a>";
    var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + ddgSearchTerms() + "\">Swagbucks</a>";
    var duckLink = "<a href =\"https://duckduckgo.com/?q=" + ddgSearchTerms() + "\">DuckDuckGo</a>";
    var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + ddgSearchTerms() + "\">WolframAlpha</a>";
    var twitterLink = "<a href =\"http://twitter.com/search?q=" + ddgSearchTerms() + "\">Twitter</a>";
    var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + ddgSearchTerms() + "\">Google Scholar</a>";
    var msAcademicLink = "<a href =\"https://academic.microsoft.com/#/search?iq=" + ddgSearchTerms() + "\">MS Academic</a>";
    var wikipedia = "<a href =\"https://www.bing.com/search?q=site%3Aen.wikipedia.org+" + ddgSearchTerms() + "\">Wikipedia</a>";


    //on bing I am putting it inside a ul so i create a li. here there is no ul so if i use li it creates it with a bullet point. but if i change it to ul it moves. so maybe leave it at li with list-style-type: none
    var ddgInsert = function () {
        console.log(ddgSearchTerms());
        var newItem = document.createElement("li");

        newItem.id = addSearchElement;
        var links = `<div class="sDropdown">
<button class="sDropbtn zcm__link  js-zci-link">Alt Search</button>
<div class="sDropdown-content">` + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + wikipedia + `</div></div>`;
        newItem.innerHTML = links;

        var newItem2 = newItem.outerHTML;
        ddgResults.insertAdjacentHTML('beforebegin', newItem2);
    };

    //ddgInsert();

    //end of drop down stuff
    ddgInsert();