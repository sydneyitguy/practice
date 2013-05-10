# Starating radio input

@StarRating = ( ->
  $cache = {}
  _currentStar = 0
  _config =
    imgWidth: 125
    starHeight: 46

  bindClick = ->
    $cache.container.on "mousemove click", (e) ->
      x = e.pageX - $(this).offset().left
      y = e.pageY - $(this).offset().top

      star = Math.ceil(x / (_config.imgWidth / 5))
      setStar(star) if star != _currentStar

  setStar = (star) ->
    position = '0 ' + _config.starHeight * (star - 5) + 'px'
    $cache.container.css('background-position', position)
    _currentStar = star
    $cache.input.val(star)

  init: (id, config) ->
    $cache.elem = $(id)
    $cache.container = $cache.elem.find(config.container)
    $cache.input = $cache.elem.find(config.input)
    bindClick()
)()
