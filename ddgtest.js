// ==UserScript==
// @name       ddg dropdown test
// @namespace   Violentmonkey Scripts
// @match       https://duckduckgo.com/
// @grant       none
// @version     2020.02.23
// @author      -
// @description 2/23/2020, 4:40:41 PM
// @grant        GM_addStyle
// ==/UserScript==
//so this puts it behind the content and I can't figure out how to fix it. .zcm-wrap position:relative breaks it. changing that to static fixes it. 
GM_addStyle (".sDropbtn {border: none; cursor: pointer; background-color: #fff !important; color: #666666; font-size: 11px !important; line-height: 30px !important;}" +
            ".sDropdown {display: inline-block;}" +
    ".sDropdown-content {display: none; position: absolute; background-color: #fff !important; z-index: 1;}" +
   ".sDropdown-content a {color: 666; padding: 12px 16px !important; text-decoration: none; display: block;}" +
             ".sDropdown:hover .sDropdown-content {display: block;}"+

".sDropdown-content a:hover {background-color: #f2f2f2}"+

".sDropdown:hover .sDropdown-content {    display: block;}"+

".sDropdown:hover .sDropbtn {    background-color: #3e8e41;}"+
            ".zcm-wrap {position: static !important;}");


//so i need to put ddgInsert into the wait function
//based on https://stackoverflow.com/questions/34863788/how-to-check-if-an-element-has-been-loaded-on-a-page-before-running-a-script 
var counter = 0;
console.log(document.getElementById("duckbar_dropdowns"));
function waitForElement(id, callback){
    var poops = setInterval(function(){
      counter++;
    console.log("Counter is: " + counter);
        if(document.getElementById(id)){
            clearInterval(poops);
          console.log(window.location.href.match(/\?q=[^&]*/gi)[0].substr(3));
          console.log(document.getElementById("duckbar_dropdowns"));
            callback();
        }
    }, 1000);
}

waitForElement("duckbar_dropdowns", function(){
//    alert("element is loaded.. do stuff");
  

  //drop down stuff
var ddgResults = document.getElementById('duckbar_dropdowns');
//window.location.search returns null for some reason
var ddgSearchTerms = function() {
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
    var wolfLink = "<a href =\"http://www.wolframalpha.com/input/?i=" + ddgSearchTerms()+ "\">WolframAlpha</a>";
    var twitterLink = "<a href =\"http://twitter.com/search?q=" + ddgSearchTerms() + "\">Twitter</a>";
    var scholarLink = "<a href =\"http://scholar.google.com/scholar?q=" + ddgSearchTerms() + "\">Google Scholar</a>";
    var msAcademicLink = "<a href =\"https://academic.microsoft.com/#/search?iq=" + ddgSearchTerms() + "\">MS Academic</a>";
    var wikipedia = "<a href =\"https://www.bing.com/search?q=site%3Aen.wikipedia.org+" + ddgSearchTerms() + "\">Wikipedia</a>";
	
	
	//on bing I am putting it inside a ul so i create a li. here there is no ul so if i use li it creates it with a bullet point. but if i change it to ul it moves. so maybe leave it at li with list-style-type: none
var ddgInsert = function() {
    console.log(ddgSearchTerms());
    var newItem = document.createElement("ul");
  
newItem.id = addSearchElement;
links = `<div class="sDropdown">
<button class="sDropbtn">ALT SEARCH</button>
<div class="sDropdown-content">`+ googleLink + bingLink + yahooLink + swagLink + duckLink + wolfLink + twitterLink + scholarLink + msAcademicLink + wikipedia +`</div></div>`;
newItem.innerHTML = links;

var newItem2 = newItem.outerHTML;
  ddgResults.insertAdjacentHTML('beforebegin', newItem2);
  };

//ddgInsert();

//end of drop down stuff
  ddgInsert();
});

//so does all this need to be in the function??
results.parentNode.insertBefore(other, results);

//based on DuckDuckGo - Add Google links with current query, change and it puts "google" before the settings
//instead of var ds = document.getElementById('duckbar_static');
  //use:
//  var ds = document.getElementById('duckbar_dropdowns');

//and instead of ds.parentNode.appendChild(link);
  //my try:
 // ds.before(link);
