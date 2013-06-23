@GMap = ( ->
  _map = null

  _template = (item) ->
    '<b>' + item.user + '</b>:<br/>' + item.message + '<br/>' +
    '<small>' + item.created_at + '</small>'

  _createMarkers = (collection) ->
    # Create the infowindow(popup over marker)
    infowindow = new google.maps.InfoWindow()

    for _, item of collection
      # Drop marker
      marker = new google.maps.Marker
        map: _map
        animation: google.maps.Animation.DROP
        position: new google.maps.LatLng(item.latitude, item.longitude)

      # Bind infowindow on marker
      # using a closure to pass item.message as an argument
      google.maps.event.addListener marker, 'click', ((msg) ->
        ->
          infowindow.setContent(msg)
          infowindow.open(_map, @)
      )(_template(item))

  init: (lat, lng, collection) ->
    currentPosition = new google.maps.LatLng(lat, lng)

    mapOptions =
      center: currentPosition
      zoom: 15
      streetViewControl: false
      panControl: false
      mapTypeId: google.maps.MapTypeId.ROADMAP
      zoomControlOptions:
        style: google.maps.ZoomControlStyle.SMALL
      mapTypeControlOptions:
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']

    # Create the map with above options in div
    _map = new google.maps.Map(document.getElementById('map'), mapOptions)

    # Create current location marker
    new google.maps.Marker
      position: currentPosition
      icon:
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "#0000ff",
        scale: 3,
        strokeOpacity: 0.7,
        strokeWeight: 6
      draggable: true,
      map: _map

    _createMarkers(collection)
)()
