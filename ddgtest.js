// ==UserScript==
// @name        DDG test
// @namespace   Violentmonkey Scripts

// @grant       none
// @version     2020.02.05.17.53
// @include https://duckduckgo.com/*
// @include http://duckduckgo.com/*
// @author      jccalhoun
// @description 2/1/2020, 3:12:41 PM
// ==/UserScript==
//so none of this works yet. 
var results = document.querySelector("#zero_click_wrapper"); //this puts it at the top

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

//based on DuckDuckGo - Add Google links with current query, change and it puts "google" before the settings
//instead of var ds = document.getElementById('duckbar_static');
  //use:
//  var ds = document.getElementById('duckbar_dropdowns');

//and instead of ds.parentNode.appendChild(link);
  //my try:
 // ds.before(link);
