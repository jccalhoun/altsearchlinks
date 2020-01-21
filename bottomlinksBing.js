// ==UserScript==
// @name	bottom links
// @description	Adds working on adding links to the bottom of bing
// @version	0.0.1

// @include	http://www.bing.com/*
// @include	https://www.bing.com/*

// @grant       none

// ==/UserScript==

//var SEARCH_ON = 'Search on:';
//var POSITION = 'left';



//var PLACEHOLDER_SELECTORS = '#resultStats, #b_results, .b-wordstat__text, .searchresults b, #ext_link, #sidebar, .b-global-wrapper, #gs_ab, #left, #zero_click_wrapper, bing-summary, .bing-summary, #bing-summary';
//var results = document.querySelector(PLACEHOLDER_SELECTORS);
//var results = document.querySelector("#b_results"); this puts it at the top
//this should put it at the bottom because it looks for .b_pag on the page. 
var results = document.querySelector(".b_pag")

var other = document.createElement('div');

other.setAttribute("id", "altsearch");
other.setAttribute("style", "width: 1000px; font-size: small; margin: 10px 10px 5px 159px;");


// tests if the url does have ?query= if it does then indexOf will return a number higher than -1 because that's what indexOf does. then else if the url has ?q= and then elses to the last case. 
//so the regex matches anything starting with the character and matches everything until it gets to the & character. I think the query.replace is for one of the ones that has stuff after that the regex doesn't catch? I'm not sure which search engine that is though. 
//if (window.location.href.indexOf("?query=") > -1) {
  //  query = window.location.href.match(/\?query=[^&]*/gi)[0].substr(7);
//} else if (window.location.href.indexOf("?q=") > -1) {
    query = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
//} else {
  //  query = window.location.href.match(/\?p=[^&]*/gi)[0].substr(3);}
//query = query.replace(/\+filterui%3[^&^+]*/gi,"");
links = "Try this search on " +
    "<a href =\"https://www.google.com/search?q=" + query + "\">Google</a>, " +
    "<a href =\"http://www.bing.com/search?q=" + query + "\">Bing</a>, " +
    "<a href =\"http://search.yahoo.com/search?p=" + query + "\">Yahoo</a>, " +
    "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + query + "\">Swagbucks</a>, " +
    "<a href =\"https://duckduckgo.com/?q=" + query + "\">DuckDuckGo</a>, " +
    "<a href =\"http://www.wolframalpha.com/input/?i=" + query + "\">WolframAlpha</a>, " +
    "<a href =\"http://twitter.com/search?q=" + query + "\">Twitter</a>, " +
    "<a href =\"http://scholar.google.com/scholar?q=" + query + "\">Google Scholar</a>, " +
    "<a href =\"http://academic.research.microsoft.com/Search?query=" + query + "\">MS Academic</a>";
other.innerHTML = links;

//this puts it at the bottom
//if (window.location.host == "www.bing.com") {
//console.log("bing baby!");
//var bingBottomResults = document.querySelector(".b_pag");
//var other2 = other.cloneNode(true);
//bingBottomResults.parentNode.insertBefore(other2, bingBottomResults);
//}

results.parentNode.insertBefore(other, results);
