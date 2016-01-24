document.getElementById("movie_categories").addEventListener("change", onCategoryChange);
document.getElementById("tv_categories").addEventListener("change", onCategoryChange);
document.getElementById("reset").addEventListener("click", onResetClicked);

var movie_categories = document.getElementsByName("movie_category");
var tv_categories = document.getElementsByName("tv_category");
var default_options = {
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


function saveOptions() {

}

function onResetClicked() {
  setAllMoviesCheckboxes(true);
  setAllTVCheckboxes(true);
  setSortOption(0);  
}

function setSortOption(id) {
  document.getElementById("sort_options").options[id].selected = "selected";
}

function onCategoryChange(event) {
  if(event.target.name == "movie_category") {
    if(event.target.id == "all_movies")
      setAllMoviesCheckboxes(event.target.checked);
    else
      document.getElementById("all_movies").checked = false;
  }
  else if(event.target.name == "tv_category") {
    if(event.target.id == "all_tv")
      setAllTVCheckboxes(event.target.checked);
    else
      document.getElementById("all_tv").checked = false;
  }
}

function setAllMoviesCheckboxes(checked) {
  for (var i = 0; i < movie_categories.length; i++) {
    movie_categories[i].checked = checked;
    };
}

function setAllTVCheckboxes(checked) {
  for (var i = 0; i < tv_categories.length; i++) {
    tv_categories[i].checked = checked;
  };  
}
