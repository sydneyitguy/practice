# AJAX Pagination
#  - page caching
#  - support only prev, next buttons
#
# @author: Sebastian Kim

@AJAXPagination = ( ->
  $cache = {} # selector cache
  _currentPage = null
  _totalPage = null
  _config =
    url: ''
    data: {}
    resultBinding: (data) -> {}
    container: ''
    pagination: ''
    template: (item) -> ''
    callback: undefined

  _render = (items) ->
    page  = '<div class="g-page-' + _currentPage + '">'
    page += _config.template(item) for item in items
    page += '</div>'
    $cache.container.append(page)

  _bindButton = (direction) ->
    $button = $cache.pagination.find('.page-' + direction)
    $button.show().unbind().click ->
      if direction is 'next'
        $button.hide() if ++_currentPage >= _totalPage
      else if direction is 'prev'
        $button.hide() if --_currentPage <= 1

      _load(_currentPage)

  _showCurrentPage = ->
    $cache.pagination.find('a[class^="page-"]').hide()
    _bindButton('next') if _totalPage > _currentPage
    _bindButton('prev') if _currentPage > 1

    # hide other pages (for cache)
    $cache.container.find('div[class^="g-page-"]').hide()
    # show current page
    $cache.container.find('.g-page-' + _currentPage).fadeIn()
    _config.callback() unless _config.callback is undefined

  _load = (page) ->
    if $cache.container.find('.g-page-' + _currentPage).length > 0
      _showCurrentPage() # cache hit
    else
      $.ajax
        url: _config.url
        data: $.extend({ page: page }, _config.data)
        dataType: 'json'

        success: (data, status, settings) ->
          result = _config.resultBinding(data)
          _totalPage = result.totalPage
          _render(result.items)
          _showCurrentPage()

  init: (config) ->
    _config = config
    $cache.container = $(_config.container)
    $cache.pagination = $(_config.pagination)
    _currentPage = 1
    _totalPage = null
    _load(1)
)()