// ==UserScript==
// @name         google alt search
// @namespace    http://tampermonkey.net/
// @version      2020-04-16
// @description  Add alt search to google
// @author       You
// @include	*://*.google.com/*

// @grant        GM_addStyle
// modified from sergio91pt script http://userscripts.org/users/122653
// ==/UserScript==
//modified by me. see if it is compatiable with existing stuff by me. 
//based on https://greasyfork.org/en/scripts/9496-scholar-on-google-search 
GM_addStyle(".dropbtn {border: none; cursor: pointer; }" +
    ".dropdown {display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; z-index: 1; box-shadow: 0 3px 5px rgba(0,0,0,0.19), 0 1px 1px rgba(0,0,0,0.23);}" +
    ".dropdown-content a {color: black; padding: 12px 16px !important; text-decoration: none; display: block !important;}" +
    ".dropdown:hover .dropdown-content {display: block;}" +
    ".dropdown-content a:hover {background-color: #f2f2f2;}");

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

addSiteStyle(".dropbtn {background-color: #ffffff !important; color: #5f6368; font-family: 'Roboto'; line-height:16px; font-size: 13px;}" + ".dropbtn:hover {color: #1A73E8}" + ".dropdown {position: relative;}" + ".dropdown-content {background-color: #ffffff !important;}");

var selectorGetter = document.querySelector("#hdtb-msb-vis");

var scholarEleId = 'hdtb-us-scholar'; //when I genericize this I will need to make this a generic lable
var results = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];

//adds this in so it can check to see if it exists after the page refreshes

var googleLink = "<a href =\"https://www.google.com/search?q=" + results + "\">Google</a>";
var bingLink = "<a href =\"http://www.bing.com/search?q=" + results + "\">Bing</a>";
var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results + "\">Yahoo</a>";
var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results + "\">Swagbucks</a>";
var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results + "\">DuckDuckGo</a>";
var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results + "\">WolframAlpha</a>";
var twitterLink = "<a href =\"http://twitter.com/search?q=" + results + "\">Twitter</a>";
var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results + "\">Google Scholar</a>";
var msAcademicLink = "<a href =\"https://academic.microsoft.com/#/search?iq=" + results + "\">MS Academic</a>";

var scholarBeforeMore = function () {
    //so creating a li vs a div doesn't seem to matter so change this to li to make it the same as combined?
    var newItem = document.createElement("li");
    newItem.id = scholarEleId;
    newItem.classList.add('hdtb-mitem');
    newItem.classList.add('hdtb-imb');
    var links = '<div class="dropdown"> <button class="dropbtn"><img alt="" width="16" height="16" src="data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0E2LjQ3MSA2LjQ3MSAwIDAgMCAxNiA5LjUgNi41IDYuNSAwIDEgMCA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg==" /> Alt Search</button> <div class="dropdown-content _dMq">' + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + '</div></div>';
    newItem.innerHTML = links;
    //creates the div
    //and using after() instead of appendChild() seems to work even though it inserts it after the hdtb-msb-vis div and not in it. so the way it is now it creates the element, but it is empty, adds it to the page, then inserts the content. so i can change it to be like combined as well. 
    selectorGetter.after(newItem);

    //this next part is the dropdown from https://www.w3schools.com/howto/howto_css_dropdown.asp
    /* document.getElementById('hdtb-us-scholar').insertAdjacentHTML('afterbegin', '<div class="dropdown"> <button class="dropbtn"><img alt="" width="16" height="16" src="data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0E2LjQ3MSA2LjQ3MSAwIDAgMCAxNiA5LjUgNi41IDYuNSAwIDEgMCA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg==" /> Alt Search</button> <div class="dropdown-content _dMq">' + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + '</div></div>'); */
};



var watchScholarLink = function () {
    // Whenever the query changes without changing the window href, our node
    // is removed, so use a MutationObserver to update and put us back.
    new MutationObserver(function (mutations) {
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
    }).observe(document.body, {
        'childList': true,
        'subtree': true
    });
};

scholarBeforeMore();
watchScholarLink();
