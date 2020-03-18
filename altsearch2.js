// ==UserScript==
// @name         bing menu 2 - refactored
// @namespace    http://tampermonkey.net/
// @version      2020.03.17
// @description  inserts dropdown into bing and also puts it at the bottom
// @author       You
// @include	http://www.bing.com/*
// @include	https://www.bing.com/*
// @grant        GM_addStyle
// ==/UserScript==
//for bing if the .dropdown is position:relative the menu hides behind the content. taking it out seems not to matter.
//this is from https://www.w3schools.com/Css/css_dropdowns.asp
/*
From w3schools:
    The .dropdown class uses position:relative, which is needed when we want the dropdown content to be placed right below the dropdown button (using position:absolute).

    The .dropdown-content class holds the actual dropdown content. It is hidden by default, and will be displayed on hover (see below). Note the min-width is set to 160px. Feel free to change this. Tip: If you want the width of the dropdown content to be as wide as the dropdown button, set the width to 100% (and overflow:auto to enable scroll on small screens).

    Instead of using a border, we have used the CSS box-shadow property to make the dropdown menu look like a "card".

    The :hover selector is used to show the dropdown menu when the user moves the mouse over the dropdown button.
*/
/*
.dropbtn:           border: none; hides the button box
                    cursor: pointer; makes the cursor into a pointer to indicate it is a link
.dropdown           display: inline-block; at least on bing, toggling this doesn't seem to do anything
.dropdown-content   position: absolute; without this the dropdown hides behind the content
.dropdown-content a display: block; makes the links in a column
.dropdown-content a:hover 
                    background-color: #f2f2f2; shades the background of the line when hovering over it
.dropdown:hover .dropbtn 
                    background-color: #3e8e41; this is meant to change the background color when hovering over the text but it doesn't seem to work on bing
*/

GM_addStyle(".dropbtn {border: none; cursor: pointer; background-color: #fff !important; color: #666666; font-size: 11px !important; line-height: 30px !important;}" +
    ".dropdown {display: inline-block;}" +
    ".dropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1; box-shadow: 0 3px 5px rgba(0,0,0,0.19), 0 1px 1px rgba(0,0,0,0.23)}" +
    ".dropdown-content a {color: #666; padding: 12px 16px !important; text-decoration: none; display: block;}" +
    ".dropdown:hover .dropdown-content {display: block;}" +

    ".dropdown-content a:hover {background-color: #f2f2f2;}" +

    ".dropdown:hover .dropdown-content {    display: block;}" +

    ".dropdown:hover .dropbtn {    background-color: #3e8e41;}");
var addSearchElement = 'searchListener';

var results = function () {
    //the match looks for anything after q= and it returns an array so we need the [1]. i am not sure what the (?:\?|&) is for. it tells it not to match that 
    var result = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1];
       return result;
};


//the first var results finds the part of the search url after q= I don't know that I need the second one. it finds the thing after #q but I don't know which search engines use that? I think that if I just set results = window.location.search.match(/(?:\?|&)q=([^&]*)/)[1]; then I need to make sure I call "results" NOT results() 



//so all these are in a function currently but I think it should be fine to pull them out since that is how it is in the old alt search but the old one doesn't declare individual variables. Doing it individually could allow for not putting a link to the site you are already on (so a link to bing wouldn't show up if you were already on bing)


var googleLink = '<a href =\"https://www.google.com/search?q=' + results() + '\">Google</a>';
var bingLink = "<a href =\"http://www.bing.com/search?q=" + results() + "\">Bing</a>";
var yahooLink = "<a href =\"http://search.yahoo.com/search?p=" + results() + "\">Yahoo</a>";
var swagLink = "<a href =\"http://www.swagbucks.com/?f=51&t=w&p=1&q=" + results() + "\">Swagbucks</a>";
var duckLink = "<a href =\"https://duckduckgo.com/?q=" + results() + "\">DuckDuckGo</a>";
var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + results() + "\">WolframAlpha</a>";
var twitterLink = "<a href =\"http://twitter.com/search?q=" + results() + "\">Twitter</a>";
var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + results() + "\">Google Scholar</a>";
var msAcademicLink = "<a href =\"https://academic.microsoft.com/search?q=" + results() + "\">MS Academic</a>";
var wikipedia = "<a href =\"https://www.bing.com/search?q=site%3Aen.wikipedia.org+" + results() + "\">Wikipedia</a>";



var bingInsert = function () {
   // console.log(results);
    var newItem = document.createElement("li");

    newItem.id = addSearchElement;
    var links = `<div class="dropdown">
<button class="dropbtn">ALT SEARCH</button>
<div class="dropdown-content">` + googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + wikipedia + `</div></div>`;
    newItem.innerHTML = links;
    var something = document.querySelector('.b_scopebar li:nth-child(6)');
    something.after(newItem);
};

bingInsert();



if (window.location.host == "www.bing.com") {
    console.log("bing bottom baby!");
    var results2 = document.querySelector(".b_pag");

    var other = document.createElement('div');

    other.setAttribute("id", "altsearch");
    other.setAttribute("style", "width: 1000px; font-size: small; margin: 10px 10px 5px 159px;");
    var bottomLinks = "Try this search on " + googleLink + ", " + bingLink + ", " + yahooLink + ", " + swagLink + ", " + duckLink + ", " + wolfLink + ", " + twitterLink + ", " + scholarLink + ", " + msAcademicLink + ", " + wikipedia;
    other.innerHTML = bottomLinks;
    
    results2.before(other);
}
