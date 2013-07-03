@CookieStore = do ->
  createCookie = (key, value, days) ->
    if days
      date = new Date
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = "; expires=" + date.toGMTString()
    else
      expires = ""

    document.cookie = name + "=" + value + expires + "; path=/"

    value

  set: (key, value, days = 365) -> createCookie(key, value, days)

  get: (key) ->
    key = key + "="
    for fragment in document.cookie.split(';')
      fragment = fragment.replace(/^\s+/, '')
      return fragment.substring(key.length + 1, fragment.length) if fragment.indexOf(key) == 0

    null

  expire: (key) ->
    value = Store.get(key)
    createCookie key, '', -1

    value
