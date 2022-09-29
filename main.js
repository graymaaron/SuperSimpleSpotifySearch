var clientId = 'b4821faf687d4137ae12b735034ab9fd';
var clientSecret = '8d1bc161e3ca4267ba35d2efb710f3c6';

var payload = {
  grant_type: "client_credentials",
  client_id: clientId,
  client_secret: clientSecret,
  code: "code",
  json: true
};

var spotifyAuth = function () {
    $.ajax({
        url: 'https://accounts.spotify.com/api/token',
        type: "POST",
        data: payload,
        success: function (response) {
            searchArtists(document.getElementById('query').value, response.access_token);
        },
        error: function () {
            document.getElementById('results').innerHTML = "Unable to authenticate and get access token from Spotify API.";
        }
    });
};

var searchArtists = function (query, token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist',
            limit: 1,
            access_token: token
        },
        success: function (response) {
            if (response.artists.total === 0)
                document.getElementById('results').innerHTML = "No artist found by that name.";
            else
            {
                var prettyPrint = "{ 'artist_id' : '" + response.artists.items[0].id + "', 'artist_name' : '" + response.artists.items[0].name + "' }";
                document.getElementById('results').innerHTML = prettyPrint;
            }
        }
    });
};

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('results').innerHTML = 'Searching...';
    spotifyAuth();
}, false);