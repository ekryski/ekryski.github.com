var Site = {
  marker: {
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
      type: 'Point',
      // coordinates here are in longitude, latitude order because
      // x, y is the standard for GeoJSON and many formats
      coordinates: [-114.063096, 51.044473]
    },
    properties: {
      title: 'Calgary',
      description: 'The place I call home',
      // one can customize markers by adding simplestyle properties
      // http://mapbox.com/developers/simplestyle/
      'marker-size': 'medium',
      'marker-color': '#E25667',
      'marker-symbol': 'star'
    }
  },

  init: function(){
    this.startCounting();
    this.loadYoutube();
    this.insertMap();

    this.$modal = $('.player-modal');

    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;

    $('a.play').click($.proxy(this.playVideo, this));
    $('a.close').click($.proxy(this.stopVideo, this));
  },

  loadYoutube: function(){
    var tag = document.createElement('script');

    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  onPlayerReady: function(event) {
    event.target.playVideo();
  },

  playVideo: function(event){
    event.preventDefault();

    this.$modal.removeClass('hidden');

    if (this.player) {
      this.player.playVideo();
      return;
    }

    this.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'L82_jHs8FgA',
      events: {
        'onReady': $.proxy(this.onPlayerReady, this),
      }
    });
  },

  stopVideo: function(event){
    event.preventDefault();

    this.player.stopVideo();
    this.$modal.addClass('hidden');
  },

  onYouTubeIframeAPIReady: function(){},

  startCounting: function(){
    $('.counter').counterUp({
        delay: 10,
        time: 1500
    });
  },

  insertMap: function(){
    var self = this;

    this.map = L.mapbox.map('map', 'ekryski.i0naei2f')
        .setView([51.044473, -114.063096], 12);

    L.mapbox.featureLayer(this.marker).addTo(this.map);

    this.map.featureLayer.on('click', function(e) {
        self.map.panTo(e.layer.getLatLng());
    });
  }
};

$(document).ready(function(){
    Site.init();
});