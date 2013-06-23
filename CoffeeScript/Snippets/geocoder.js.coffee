@Geocoder = (->
  _latitude = null
  _longitude = null

  currentPosition: (callback) ->
    if _latitude && _longitude
      callback(_latitude, _longitude)
    else
      if navigator.geolocation
        navigator.geolocation.getCurrentPosition ((position) -> # success
          _latitude = position.coords.latitude
          _longitude = position.coords.longitude

          callback(_latitude, _longitude)
        ), -> # error
          console.log('Geocoder failed')
)()
