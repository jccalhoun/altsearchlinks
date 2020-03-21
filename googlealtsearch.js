// ==UserScript==
// @name         google alt search
// @namespace    http://tampermonkey.net/
// @version      2020-03-20
// @description  Add alt search to google
// @author       You
// @include	http://www.google.com*
// @include	https://*.google.com*
// @include	http://www.google.com*
// @include	https://www.google.com*
// @grant        GM_addStyle
// modified from sergio91pt script http://userscripts.org/users/122653
// ==/UserScript==
//modified by me. see if it is compatiable with existing stuff by me. 
//based on https://greasyfork.org/en/scripts/9496-scholar-on-google-search 
GM_addStyle (".dropbtn {border: none; cursor: pointer; background-color: #ffffff !important; color: #5f6368; font-family: 'Roboto'; line-height:16px; font-size: 13px;}" +
             ".dropbtn:hover {color: #1A73E8}" +
             ".dropdown {position: relative; display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; z-index: 1; background-color: #ffffff !important;}" +
              ".dropdown-content a:hover {background-color: #f2f2f2;}" +
   ".dropdown-content a {color: black; padding: 12px 16px !important; text-decoration: none; display: block  !important;}" +
             ".dropdown:hover .dropdown-content {display: block;}");
var scholarEleId = 'hdtb-us-scholar'; //when I genericize this I will need to make this a generic lable
    var results = function() {
        var result = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
    if (window.location.href.indexOf('#q=') > -1) {
        result =  window.location.href.match(/#q=[^&]*/gi)[0].substr(3);}
    return result;
    };
//adds this in so it can check to see if it exists after the page refreshes
var scholarBeforeMore = function() {
   
    var node = document.createElement("div");
    node.id = scholarEleId;
    node.classList.add('hdtb-mitem');
    node.classList.add('hdtb-imb');
    //creates the div
  
    document.getElementById("hdtb-msb-vis").appendChild(node);
    var googleLink = "<a href =\"https://www.google.com/search?q=" + results() + "\">Google</a>";
    var bingLink = "<a href =\"http://www.bing.com/search?q=" + results() + "\">Bing</a>";
    var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results() + "\">Yahoo</a>";
    var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results() + "\">Swagbucks</a>";
    var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results() + "\">DuckDuckGo</a>";
    var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results() + "\">WolframAlpha</a>";
    var twitterLink = "<a href =\"http://twitter.com/search?q=" + results() + "\">Twitter</a>";
    var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results() + "\">Google Scholar</a>";
    var msAcademicLink = "<a href =\"https://academic.microsoft.com/#/search?iq=" + results() + "\">MS Academic</a>";
    //this next part is the dropdown from https://www.w3schools.com/howto/howto_css_dropdown.asp
    document.getElementById('hdtb-us-scholar').insertAdjacentHTML('afterbegin', `<div class="dropdown">
<button class="dropbtn"><img alt="" width="16" height="16"src="data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0E2LjQ3MSA2LjQ3MSAwIDAgMCAxNiA5LjUgNi41IDYuNSAwIDEgMCA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg==" /> Alt Search</button>
<div class="dropdown-content _dMq">`+ googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + `</div></div>`);
};



var watchScholarLink = function() {
    // Whenever the query changes without changing the window href, our node
    // is removed, so use a MutationObserver to update and put us back.
    new MutationObserver(function(mutations) {
        var len = mutations.length;
        for (var i = 0; i < len; i++) {
            // Normally the link bar is removed then added, along 
            // with search results, so just check additions.
            if (mutations[i].addedNodes) {
                if (!document.getElementById(scholarEleId)) {
                    scholarBeforeMore();
                }
                break;
            }
        }
    }).observe(document.body, {'childList': true, 'subtree': true});
};

scholarBeforeMore();
watchScholarLink();
