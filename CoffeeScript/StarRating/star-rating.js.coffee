# Starating radio input

@StarRating = ( ->
  $cache = {}
  _currentStar = 0
  _config =
    imgWidth: 125
    starHeight: 46

  bind = ->
    $cache.container.on "mousemove", (e) -> render(calculate(e))
    $cache.container.on "mouseleave", (e) -> render(_currentStar, true)
    $cache.container.on "click", (e) ->
      star = calculate(e)
      render(star, true)
      setStar(star)

  calculate = (evt) ->
    x = evt.pageX - $cache.container.offset().left
    y = evt.pageY - $cache.container.offset().top
    Math.ceil(x / (_config.imgWidth / 5))

  render = (star, force = false) ->
    if star != _currentStar || force is true
      position = '0 ' + _config.starHeight * (star - 5) + 'px'
      $cache.container.css('background-position', position)

  setStar = (star) ->
    _currentStar = star
    render(star, true)
    $cache.input.val(star)

  set: (star) -> setStar(star)
  init: (id, config) ->
    $cache.elem = $(id)
    $cache.container = $cache.elem.find(config.container)
    $cache.input = $cache.elem.find(config.input)
    bind()
)()
