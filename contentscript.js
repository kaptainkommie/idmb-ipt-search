/*	IMDb IPTorrent Search
//
// 	This is a Chrome extension that adds an "Search IPT" link 
//	to IMDb/TVMaze/Next-Episode movie and TV pages.
//
//	By default, clicking the "Search" button from a movie page will search all
//	movie categories on IPT; likewise for TV Shows. The categories searched
//	can be changed from the extension's options dialog. This can be done by
//	navigating to chrome://extensions in the browser, locating this extension
//	and clicking the "options" link.
//
//	By default, the search results are sorted by "newest", but this can be
//	customized as well from the extension options dialog.
//	
// 	Author: kaptainkommie
// 	Version 1.1
//	Website: http://www.redrohn.org
//	Email: rohn.adams@gmail.com
 */

var DEFAULT_OPTIONS = { // options to use if loadOptions fails
    "all_movies": true,
    "movie_3d": true,
    "movie_480p": true,
    "movie_bd-r": true,
    "movie_bd-rip": true,
    "movie_cam": true,
    "movie_dvd-r": true,
    "movie_hd-bluray": true,
    "movie_kids": true,
    "movie_mp4": true,
    "movie_non-english": true,
    "movie_packs": true,
    "movie_web-dl": true,
    "movie_xvid": true,

    "all_tv": true,
    "tv_documentaries": true,
    "tv_sports": true,
    "tv_480p": true,
    "tv_bd": true,
    "tv_dvd-r": true,
    "tv_dvd-rip": true,
    "tv_mp4": true,
    "tv_non-english": true,
    "tv_packs": true,
    "tv_packs-non-english": true,
    "tv_sd-x264": true,
    "tv_web-dl": true,
    "tv_x264": true,
    "tv_xvid": true,

    "sort_options": "newest",
    
    "ipt_url": "iptorrents.com"  
}

var OPTION_VALUES = { // values associated with category
    "all_movies": 72,
    "movie_3d": 87,
    "movie_480p": 77,
    "movie_bd-r": 89,
    "movie_bd-rip": 90,
    "movie_cam": 96,
    "movie_dvd-r": 6,
    "movie_hd-bluray": 48,
    "movie_kids": 54,
    "movie_mp4": 62,
    "movie_non-english": 38,
    "movie_packs": 68,
    "movie_web-dl": 20,
    "movie_xvid": 7,

    "all_tv": 73,
    "tv_documentaries": 26,
    "tv_sports": 55,
    "tv_480p": 78,
    "tv_bd": 23,
    "tv_dvd-r": 24,
    "tv_dvd-rip": 25,
    "tv_mp4": 66,
    "tv_non-english": 82,
    "tv_packs": 65,
    "tv_packs-non-english": 83,
    "tv_sd-x264": 79,
    "tv_web-dl": 22,
    "tv_x264": 5,
    "tv_xvid": 4,    
}

// init
var options = new Object();

loadOptions(options, DEFAULT_OPTIONS, OPTION_VALUES);

// similar function is present in options.js as well, but you can't include
// a js file inside another pure JS file, oh well
function loadOptions(optionsObject, defaultOptions, optionValues) {  
  // TODO: does this execute even when storage sync fails?
  chrome.storage.sync.get(null, function(items) {
    if(!chrome.runtime.lastError) {
      if(Object.getOwnPropertyNames(items).length > 0)
      {
        for(var prop in items) {
          optionsObject[prop] = items[prop];          
        }
      }
      else {
        console.log(chrome.runtime.lastError);
        for(var prop in defaultOptions) {
          optionsObject[prop] = defaultOptions[prop];
        }
      }

      addSearchButton(optionsObject, optionValues);
    }
  })
}

function addSearchButton(opt, optValues) {
  // get movie/tv title
  var itemTitle = document.title.split(" -")[0];
  var domain = document.domain;
  var iptSearchLink;
  var searchAnchor;
  var searchText = document.createTextNode("Search IPT");
  var searchDiv;
  var searchAnchor;
  
  // which site are we on?
  if (domain.indexOf("imdb.com") != -1) {
    var re = /(.*)(\(.+\)$)/g; 
    var m;
         
    if ((m = re.exec(itemTitle)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
      
      itemTitle = m[1].slice(0, -1); // strip trailing space
    }
    
    var parentDiv = document.querySelector("div.showtime");
    
    iptSearchLink = createIPTSearchLink(itemTitle, opt, optValues, isTVSeries());
    
    searchDiv = document.createElement("div");
    searchDiv.className = "watch-option secondary-watch-option";
   
    searchAnchor = document.createElement("a");
    
    searchAnchor.setAttribute("href", iptSearchLink);
    searchAnchor.className = "iptsearch";
    
    searchAnchor.appendChild(searchText);
    searchDiv.appendChild(searchAnchor);
    parentDiv.appendChild(searchDiv);
  }
  else if (domain.indexOf("next-episode.net") != -1) {    
    parentDiv = document.querySelector("#top_section");
    
    iptSearchLink = createIPTSearchLink(itemTitle, opt, optValues, true);
    
    searchDiv = document.createElement("div");
    searchDiv.className = "iptsearch";
    searchDiv.style.float = "none";
    searchDiv.style.clear = "both";
    searchDiv.style.marginRight = "10px";
    
    searchAnchor = document.createElement("a");
    
    searchAnchor.setAttribute("href", iptSearchLink);
    searchAnchor.className = "iptsearch";
    searchAnchor.style.borderRadius = "5px";
    searchAnchor.style.backgroundColor = "blue";
    searchAnchor.style.padding = "5px";
    searchAnchor.style.color = "white";
    searchAnchor.style.paddingLeft = "6px";
    searchAnchor.style.paddingRight = "6px";
    searchAnchor.style.fontSize = "12px";
    searchAnchor.style.textDecoration = "none";
    searchAnchor.style.display = "inline-block";
    searchAnchor.style.marginBottom = "1px";
    
    searchAnchor.appendChild(searchText);
    searchDiv.appendChild(searchAnchor);
    parentDiv.appendChild(searchDiv);    
  }
  else if (domain.indexOf("tvmaze.com") != -1) {
    // strip site title
    itemTitle = itemTitle.split(" |")[0];
    
    parentDiv = document.querySelector("#main-img");
    
    iptSearchLink = createIPTSearchLink(itemTitle, opt, optValues, true);
    
    searchDiv = document.createElement("div");
    searchDiv.className = "radius small button success fa fa-lg";
    searchDiv.style.width = "202px";
    searchDiv.style.backgroundColor = "blue";
    
    searchAnchor = document.createElement("a");
    searchAnchor.setAttribute("href", iptSearchLink);
    searchAnchor.className = "iptsearch";
    searchAnchor.style.color = "white";
    
    searchAnchor.appendChild(searchText);
    searchDiv.appendChild(searchAnchor);
    parentDiv.appendChild(searchDiv);
  }
  else
    console.log("Not a matching site");
  
  console.log("Full Title:" + document.title);
  console.log("Title: " + itemTitle);
  console.log("Link: " + iptSearchLink);
  
}

function stripPunctuation(title) {
  var punctuationless = title.replace(/[',\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  
  return finalString;
}

//create the IPT search link
//return escaped IPT search link for particular title
//TODO: test cases for punctuation removal
function createIPTSearchLink(title, optionsObject, optionValues, tv_show) {
  link = "https://" + optionsObject["ipt_url"] + "/t?";
  
  // strip out punctuation for better results
  strippedTitle = stripPunctuation(title);
  
    // different base depending on title type and options
    if (tv_show) {
      // only care about tv options
      // if all_tv selected, we don't need to loop
      if(optionsObject["all_tv"] == true)
        link += optionValues["all_tv"] + ";";
      else {
        for(var prop in optionsObject) {
          // example multicategory url:
          // https://www.iptorrents.com/t?72;o=size;q=V%20for%20Vendetta#torrents
          // only add category if it is enabled
          if(optionsObject.hasOwnProperty(prop)) {
            if(prop.indexOf("tv_") != -1 && 
                optionsObject[prop] == true) {
              link += optionValues[prop] + ";";
            } 
          }
        }
      }
    }
    else {
      if(optionsObject["all_movies"] == true)
        link += optionValues["all_movies"] + ";";     
      else {
        for(var prop in optionsObject) {
          // only add category if it is enabled
          if(optionsObject.hasOwnProperty(prop)) {
            if(prop.indexOf("movie_") != -1 && 
                optionsObject[prop] == true) {
              link += optionValues[prop] + ";";
            }
          }
        }
      }
    }
  
  // add sort option
  if(optionsObject.hasOwnProperty("sort_options"))
    link += "o=" + optionsObject["sort_options"] + ";";

  // TODO: test that escape works on weird chars in title
  // doesn't encode spaces, but somehow they get escaped when the tab opens
  fullLink = link + "q=" + escape(strippedTitle) + "#torrents"; 

  return fullLink;
}

//Returns 1 for TV Series, 0 for Movie (hopefully - needs testing)
function isTVSeries() {
  // this was pulled from imdb-rottentomatoes script, seems to work
  if (document.title.indexOf('TV Series') < 0 && 
      document.title.indexOf('TV Mini-Series') < 0)
    return 0;
  else
    return 1;
}