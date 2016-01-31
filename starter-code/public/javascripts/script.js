// API Docs at: 
// https://developer.spotify.com/


function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=artist'
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=track'
}