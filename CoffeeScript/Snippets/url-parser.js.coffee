# Module pattern

@urlParser = ( ->
  params = window.location.search.substring(1).split("&")

  # publics
  get: (name) ->
    while param = params.shift()
      pair = param.split("=")
      return decodeURIComponent(pair[1])  if decodeURIComponent(pair[0]) is name
)()
