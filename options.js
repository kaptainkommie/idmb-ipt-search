var DEFAULT_OPTIONS = { // options to use if storage.sync fails or doesn't exist
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
  
  "sort_options": "newest"
}

var optionsElements = new Object(); // hold DOM "options" elements
var currentOptions = new Object(); // hold the actual options


function getOptionsElements(elements) {
  options =  {
    "all_movies": document.getElementById("all_movies"),
    "movie_3d": document.getElementById("movie_3d"),
    "movie_480p": document.getElementById("movie_480p"),
    "movie_bd-r": document.getElementById("movie_bd-r"),
    "movie_bd-rip": document.getElementById("movie_bd-rip"),
    "movie_cam": document.getElementById("movie_cam"),
    "movie_dvd-r": document.getElementById("movie_dvd-r"),
    "movie_hd-bluray": document.getElementById("movie_hd-bluray"),
    "movie_kids": document.getElementById("movie_kids"),
    "movie_mp4": document.getElementById("movie_mp4"),
    "movie_non-english": document.getElementById("movie_non-english"),
    "movie_packs": document.getElementById("movie_packs"),
    "movie_web-dl": document.getElementById("movie_web-dl"),
    "movie_xvid": document.getElementById("movie_xvid"),
    
    "all_tv": document.getElementById("all_tv"),
    "tv_documentaries": document.getElementById("tv_documentaries"),
    "tv_sports": document.getElementById("tv_sports"),
    "tv_480p": document.getElementById("tv_480p"),
    "tv_bd": document.getElementById("tv_bd"),
    "tv_dvd-r": document.getElementById("tv_dvd-r"),
    "tv_dvd-rip": document.getElementById("tv_dvd-rip"),
    "tv_mp4": document.getElementById("tv_mp4"),
    "tv_non-english": document.getElementById("tv_non-english"),
    "tv_packs": document.getElementById("tv_packs"),
    "tv_packs-non-english": document.getElementById("tv_packs-non-english"),
    "tv_sd-x264": document.getElementById("tv_sd-x264"),
    "tv_web-dl": document.getElementById("tv_web-dl"),
    "tv_x264": document.getElementById("tv_x264"),
    "tv_xvid": document.getElementById("tv_xvid"),
    
    "sort_options": document.getElementById("sort_options")
  }
  
  // copy options properties, to elements object
  for (var prop in options) {
    elements[prop] = options[prop]
  }
}

function readOptionsPage(elements, optionsObject) {
  for (key in elements) {
    if(elements.hasOwnProperty(key)) {
      if(key != "sort_options")
        optionsObject[key] = elements[key].checked;
      else
        optionsObject[key] = elements[key].value;
    }
  }
}

function writeOptionsPage(elements, optionsObject) {
  for(var key in elements) {
    if(elements.hasOwnProperty(key) && optionsObject.hasOwnProperty(key)) {
      if(key != "sort_options") {
        elements[key].checked = optionsObject[key];
      }
      else
        elements[key].value = optionsObject[key];
    }
  }
}

function initializeOptions(elements, optionsObject, defaultOptions) {
  getOptionsElements(elements);
  loadOptions(elements, optionsObject, defaultOptions);
  
  document.getElementById("movie_categories").addEventListener("change", 
      function(event) {
    onCategoryChange(elements, event);
  });
  
  document.getElementById("tv_categories").addEventListener("change",
      function(event) {
    onCategoryChange(elements, event);
  });
}

function saveOptions(elements, optionsObject) {
  readOptionsPage(elements, optionsObject);
  
  if(optionsObject) {
    chrome.storage.sync.set(optionsObject, function() {
      if(!chrome.runtime.lastError) {
        var status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function() {
          status.textContent = "";
        }, 2000);
      }
    });
  }
}

function loadOptions(elements, optionsObject, defaultOptions) {  
  chrome.storage.sync.get(null, function(items) {
    if(!chrome.runtime.lastError)
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
    writeOptionsPage(elements, optionsObject);
  })
}

function onCategoryChange(elements, event) {
  if(event.target.name == "movie_category") {
    if(event.target.id == "all_movies")
      setAllCheckboxes(elements, true, event.target.checked);
    else
     elements["all_movies"].checked = false;
  }
  else if(event.target.name == "tv_category") {
    if(event.target.id == "all_tv")
      setAllCheckboxes(elements, false, event.target.checked);
    else
      elements["all_tv"].checked = false;
  }
}

function setAllCheckboxes(elements, movies, checked) {
  for(key in elements) {
    if(key != "sort_options" && key != "all_movies" && key != "all_tv") {
      if(elements.hasOwnProperty(key)) {
        // only do movies
        if(movies == true) {
          if(key.indexOf("movie_") != -1)
            elements[key].checked = checked; 
        }
        else { // tv shows
          if(key.indexOf("tv_") != -1)
            elements[key].checked = checked;
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  initializeOptions(optionsElements, currentOptions, DEFAULT_OPTIONS);
});

document.getElementById('save').addEventListener('click', 
    function() {
  saveOptions(optionsElements, currentOptions);
});


