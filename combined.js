// ==UserScript==
// @name         combined
// @namespace    http://tampermonkey.net/
// @version      2020.04.12
// @description  altsearchrefactored
// @author       You
// @include	http://www.bing.com/*
// @include	https://www.bing.com/*
// @match           *://duckduckgo.com/*
// @match   *://*.swagbucks.com/*
// @run-at document-idle
// @grant        GM_addStyle
// ==/UserScript==
//for bing if the .dropdown is position:relative the menu hides behind the content. taking it out seems not to matter.
//this is from https://www.w3schools.com/Css/css_dropdowns.asp
//universal styles:

GM_addStyle(".dropbtn {border: none; cursor: pointer;}" +
    ".dropdown {display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1; box-shadow: 0 3px 5px rgba(0,0,0,0.19), 0 1px 1px rgba(0,0,0,0.23);}" +
    ".dropdown-content a {color: 666; padding: 12px 16px !important; text-decoration: none; display: block;}" +
    ".dropdown:hover .dropdown-content {display: block;}" +
    ".dropdown-content a:hover {background-color: #f2f2f2;}" +
    ".dropdown:hover .dropdown-content {display: block;}");
// from http://greasemonkey.win-start.de/patterns/add-css.html
function addSiteStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
var siteURL = window.location.hostname;
//unique to bing:
/*addSiteStyle(".dropbtn {background-color: #fff !important; font-family: Arial, Helvetica, sans-serif; color: #444444; font-size: 11px !important; line-height: 30px !important;}"+
    ".dropdown:hover .dropbtn {background-color: #3e8e41;}"); */
var selectorGetter;
switch (siteURL) {
    case "www.bing.com":
        addSiteStyle(".dropbtn {background-color: #fff !important; font-family: Arial, Helvetica, sans-serif; color: #444444; font-size: 11px !important; line-height: 30px !important; text-transform: uppercase;}" + ".dropdown:hover .dropbtn {background-color: #3e8e41;}");
        console.log("switch works");
        selectorGetter = document.querySelector('.b_scopebar li:nth-child(6)');
        //console.log(selectorGetter);
        break;
    case "duckduckgo.com":
        addSiteStyle(".zcm-wrap {position: static !important;}" + "li {list-style-type: none;}" + ".dropbtn {font-size: 14.4px; color: #666666; background-color: #fafafa; font-family: inherit; line-height: 37px; font-weight: 600; }" + ".dropbtn:hover {color:#333333;}" + ".dropdown {position:static !important;}");
        selectorGetter = document.querySelector('#duckbar_new');
        break;
    case "www.swagbucks.com":
        addSiteStyle(".dropbtn {background-color: #fff !important; color: #666666; font-family: 'Open Sans',sans-serif; font-size: 1.4em;}" + ".dropdown-content a {display: block !important;}" + ".dropdown:hover .dropbtn {color: #2d6cae;}");
        selectorGetter = document.querySelector("#tab_n");
        break;
}


/* I will probably need to use something like the original alt search to get it to find the correct selector: //placeholder selector lists the different elements that the different sites have that i want to put stuff after. then the document.querySelector cycles through them until it fins the first match https://www.w3schools.com/jsref/met_document_queryselector.asp

var PLACEHOLDER_SELECTORS = '#resultStats, #b_results, .b-wordstat__text, .searchresults b, #ext_link, #sidebar, .b-global-wrapper, #gs_ab, #left, #zero_click_wrapper, bing-summary, .bing-summary, #bing-summary, #ucs';
var results = document.querySelector(PLACEHOLDER_SELECTORS); */


var addSearchElement = 'searchListener';

var results = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
//function () {
//the match looks for anything after q= and it returns an array so we need the [1]. i am not sure what the (?:\?|&) is for. it tells it not to match that 
//var result = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
//if (window.location.href.indexOf('#q=') > -1) {
//  result =  window.location.href.match(/#q=[^&]*/gi)[0].substr(3);}
//return result;
//};


//the first var results finds the part of the search url after q= I don't know that I need the second one. it finds the thing after #q but I don't know which search engines use that? I think that if I just set results = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1]; then I need to make sure I call "results" NOT results() 



//so all these are in a function currently but I think it should be fine to pull them out since that is how it is in the old alt search but the old one doesn't declare individual variables. Doing it individually could allow for not putting a link to the site you are already on (so a link to bing wouldn't show up if you were already on bing)


var googleLink = '<a href =\"https://www.google.com/search?q=' + results + '\">Google</a>';
var bingLink = "<a href =\"http://www.bing.com/search?q=" + results + "\">Bing</a>";
var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results + "\">Yahoo</a>";
var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results + "\">Swagbucks</a>";
var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results + "\">DuckDuckGo</a>";
var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results + "\">WolframAlpha</a>";
var twitterLink = "<a href =\"http://twitter.com/search?q=" + results + "\">Twitter</a>";
var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results + "\">Google Scholar</a>";
var msAcademicLink = "<a href =\"https://academic.microsoft.com/search?q=" + results + "\">MS Academic</a>";
var wikipedia = "<a href =\"https://www.bing.com/search?q=site%3Aen.wikipedia.org+" + results + "\">Wikipedia</a>";
var reddit = "<a href =\"https://www.reddit.com/search?q=" + results + "\">Reddit</a>";
var gitHub = "<a href =\"https://github.com/search?utf8=✓&q=" + results + "\">GitHub</a>"; 


var bingInsert = function () {
    console.log(results);
    var newItem = document.createElement("li");

    newItem.id = addSearchElement;
    var links = '<div class="dropdown"> <button class="dropbtn">Alt Search</button> <div class="dropdown-content">' + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + wikipedia + '</div></div>';
    newItem.innerHTML = links;

    //var newItem2 = newItem.outerHTML;
    //bing updated to remove scopebar_pipe
    //var something = document.querySelector(".scopebar_pipe");
    // var something = document.querySelector('.b_scopebar li:nth-child(6)');
    //something.insertAdjacentHTML('beforebegin', newItem2);
    //so something.after(newItem2) results in the < being interpreted as less than &lt but it works with newItem. so do I need the outerHTML at all???
    //something.after(newItem2);
    //something.after(newItem);

    selectorGetter.after(newItem);
};

bingInsert();



if (window.location.host == "www.bing.com") {
    console.log("bing bottom baby!");
    var results2 = document.querySelector(".b_pag");

    var other = document.createElement('div');

    other.setAttribute("id", "altsearch");
    other.setAttribute("style", "width: 1000px; font-size: small; margin: 10px 10px 5px 159px;");
    var bottomLinks = "Try this search on " + googleLink + ", " + bingLink + ", " + yahooLink + ", " + swagLink + ", " + duckLink + ", " + wolfLink + ", " + twitterLink + ", " + scholarLink + ", " + msAcademicLink + ", " + wikipedia + ", " + reddit + ", " + gitHub;
    other.innerHTML = bottomLinks;
    //results2.parentNode.insertBefore(other, results2);
    results2.before(other);
}
