# imdb-ipt-search
IMDb IPTorrents Search is a Chrome Extension that adds an IPTorrents Search Link
to IMDB title pages. Next-Episode.net and TVMaze.com are also supported. 

It should be compatible with all recent versions of Chrome. If you run into any
compatibility issues please add them to the project's GitHub Issues page.

This Chrome Extension simply adds a link in the "Watch Now" bar on IMDb movie 
and TV show pages which, when clicked, opens search results from the
IPTorrents.com website. This same functionality is located under the series
picture for TV Shows on Next-Episode/TVMaze. The purpose of this extension is 
simply to reduce the amount of typing and clicks required to search for a movie
or TV show on IPTorrents after a user has visited its page.

**The only permissions required by this extension is access to 
imdb.com, tvmaze, next-episode.net as well as access to storage, which is simply
used to store the extension's options. 
It collects absolutely NO PERSONAL INFORMATION.**

The source code is freely available under the GNU GPL v3 license. In essence it
is free to use, modify and redistribute so long as the source is made available
with it. The full license can be found at [LICENSE](LICENSE?raw=true).

## Options Menu
The extension does have some options that can be customized. These options allow
the user to specify which TV and movie categories they would like to be included
in their IPTorrents search. By default, all available categories are searched. 
In addition to the categories, the user may customize how the search results are
sorted. By default, they are sorted by newest torrent.

Users can now select which IPTorrents url they wish to use, all options use
HTTPS.

**Screenshot of the options dialog:**

![Options screenshot]
(images/options-screenshot.png?raw=true "Options Dialog")

## Screenshots
**Here is a screenshot of the extension in action on a movie page at IMDb:**

![IMDb movie screenshot]
(images/imdb-screenshot-movie.png?raw=true "IMDb Movie Screenshot")

**On a TV show page:**

![IMDB tv screenshot]
(images/imdb-screenshot-tv.png?raw=true "IMDb TV Screenshot")

**Even works on a movie still in theatres:**

![IMDB theatre screenshot]
(images/imdb-screenshot-theatre.png?raw=true "IMDb Theatre Screenshot")

**Screenshot from Next-Episode.net:**

![Next-Episode screenshot]
(images/next-episode-screenshot.PNG?raw=true "Next-Episode Screenshot")

**Screenshot from TVMaze.com:**

![TVMaze screenshot]
(images/tvmaze-screenshot.png?raw=true "TVMaze Screenshot")

**And a screenshot of the results of clicking the "Search IPT" button:**

![IPTorrents screenshot]
(images/ipt-screenshot.png?raw=true "IPTorrents Screenshot")
