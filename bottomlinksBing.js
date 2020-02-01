// ==UserScript==
// @name	bing bottom links
// @description	Adds working on adding links to the bottom of bing
// @version	0.0.2

// @include	http://www.bing.com/*
// @include	https://www.bing.com/*

// @grant       none

// ==/UserScript==
//this should put it at the bottom because it looks for .b_pag on the page. 
var results = document.querySelector(".b_pag")

var other = document.createElement('div');

other.setAttribute("id", "altsearch");
other.setAttribute("style", "width: 1000px; font-size: small; margin: 10px 10px 5px 159px;");

//so the regex matches anything starting with the character and matches everything until it gets to the & character. It fails though sometimes because the first time you search on bing it uses a different url scheme than this
// if you search from the search box in firefox it gives https://www.bing.com/search?form=MOZSBR&pc=MOZI&q=typing then if you click images and back to search you get this https://www.bing.com/search?q=typing&FORM=HDRSC1
//query = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
//this is from the other one and seems to work. I don't know if the (?:\?|&) is nescessary. it tells the regex not to catch that. maybe it is for if you search and then research and there are two terms in the url?
query = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
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
results.parentNode.insertBefore(other, results);
// when it doesn't work it gives this error in console TypeError: window.location.href.match(...) is null
