// ==UserScript==
// @name         bing menu 2
// @namespace    http://tampermonkey.net/
// @version      0.12.24.2020
// @description  inserts dropdown into bing
// @author       You
// @include	http://www.bing.com*
// @include	https://www.bing.com*
// @grant        GM_addStyle
// ==/UserScript==
//for bing if the .dropdown is position:relative the menu hides behind the content. taking it out seems not to matter.
GM_addStyle (".dropbtn {border: none; cursor: pointer; background-color: #fff !important; color: #666666; font-size: 11px !important; line-height: 30px !important;}" +
             ".dropdown {display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1;}" +
   ".dropdown-content a {color: 666; padding: 12px 16px !important; text-decoration: none; display: block;}" +
             ".dropdown:hover .dropdown-content {display: block;}"+

".dropdown-content a:hover {background-color: #f2f2f2}"+

".dropdown:hover .dropdown-content {    display: block;}"+

".dropdown:hover .dropbtn {    background-color: #3e8e41;}");
var addSearchElement = 'searchListener';

    var results = function() {
        var result = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
    if (window.location.href.indexOf('#q=') > -1) {
        result =  window.location.href.match(/#q=[^&]*/gi)[0].substr(3);}
    return result;
    };




//so I think i'm going to need to do getelementbyclassname and then append adacenthtml after i do the outerhtml?
//this creates it in the bing menu before the pipe 
var bingInsert = function() {
    console.log(results);
    var newItem = document.createElement("LI");
  
newItem.id = addSearchElement;
    var googleLink = '<a href =\"https://www.google.com/search?q=' + results() + '\">Google</a>';
var bingLink = "<a href =\"http://www.bing.com/search?q=" + results() + "\">Bing</a>";
    var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results() + "\">Yahoo</a>";
    var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results() + "\">Swagbucks</a>";
    var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results() + "\">DuckDuckGo</a>";
    var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results()+ "\">WolframAlpha</a>";
    var twitterLink = "<a href =\"http://twitter.com/search?q=" + results() + "\">Twitter</a>";
    var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results() + "\">Google Scholar</a>";
    var msAcademicLink = "<a href =\"https://academic.microsoft.com/#/search?iq=" + results() + "\">MS Academic</a>";
links = `<div class="dropdown">
<button class="dropbtn">ALT SEARCH</button>
<div class="dropdown-content">`+ googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + `</div></div>`;
newItem.innerHTML = links;

var newItem2 = newItem.outerHTML;
var something = document.querySelector(".scopebar_pipe");
something.insertAdjacentHTML('beforebegin', newItem2);
};

//i might be able to get this to update by running an update check when you hover over the menu?


var watchSearchElement = function() {
    // Whenever the query changes without changing the window href, our node
    // is removed, so use a MutationObserver to update and put us back.
    new MutationObserver(function(mutations) {
        var len = mutations.length;
        for (var i = 0; i < len; i++) {
            // Normally the link bar is removed then added, along 
            // with search results, so just check additions.
            if (mutations[i].addedNodes) {
                if (!document.getElementById(addSearchElement)) {
                     
                    bingInsert();
                }
                break;
            }
        }
    }).observe(document.body, {'childList': true, 'subtree': true});
};

bingInsert();
watchSearchElement();


