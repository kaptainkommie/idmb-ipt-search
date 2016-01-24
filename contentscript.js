/*	IMDb IPTorrent Search
//
// 	This is a quick and dirty Chrome extension that adds an "Search IPT" button 
//	to IMDb movie and TV pages. The button should appear to the right of the 
//	yellow "Watchlist" button. The location and style of this button could be
//	changed by editing this script.
//
//	By default, clicking the "Search" button from a movie page will search all
//	movie categories on IPT; likewise for TV Shows. The categories searched
//	can be changed from the extension's options dialog. This can be done by
//	navigating to chrome://extensions in the browser, locating this extension
//	and clicking the "options" link.
//
//	By default, the search results are sorted by "seeds", but this can be
//	customized as well from the extension options dialog.
//	
// 	Author: kaptainkommie
// 	Version 0.1
//	Website: http://www.redrohn.org
//	Email: rohn.adams@gmail.com
 */

//Here comes the kludge; not particuarly well-versed in JS or DOM
//pull the item title, if IMDb layout changes, this might need to as well
var itemTitle = document.querySelector("span.itemprop[itemprop=name]").innerHTML;

//get item year
var itemYear = document.querySelector("span.nobr a").innerHTML;

//get location where button will be placed
//TODO: spacing is off, have to try some things
var buttonWrapper = document.querySelector("span.wlb_wrapper");

var iptSearchLink = createIPTSearchLink(itemTitle, itemYear);

//TODO: there's got to be a better way, even without jQuery
//create the appropriate anchor (a href)
var searchAnchor = document.createElement("a");

searchAnchor.setAttribute("href", iptSearchLink, isTVSeries());
searchAnchor.className = "btn2 btn2_text_on large";

//span for the button text itself
var searchSpan = document.createElement("span");
searchSpan.className = "btn2_text";
searchSpan.textContent = "Search IPT";

//add to the DOM
searchAnchor.appendChild(searchSpan);
buttonWrapper.appendChild(searchAnchor);

//create the IPT search link
//return escaped IPT search link for particular title
//TODO: punctuation general doesn't return good results, option to strip?
function createIPTSearchLink(title, year, tvshow) {
  // different base depending on title type
  // TODO: implement categories from extension options
  if (isTVSeries)
    linkBase = "https://www.iptorrents.com/t?73=&q=";
  else
    linkBase = "https://www.iptorrents.com/t?72=&q=";

  // TODO: test that escape works on weird chars in title
  // doesn't encode spaces, but chrome seems to automatically do that
  fullLink = linkBase + escape(title) + "&qf=#torrents"; 

  return fullLink;
}

//Returns 1 for TV Series, 0 for Movie (hopefully - needs testing)
function isTVSeries() {
  // this was pulled from imdb-rottentomatoes script, seems to work
  if (document.title.indexOf('TV Series') < 0 || 
      document.title.indexOf('TV mini-series') < 0)
    return 0;
  else
    return 1;
}