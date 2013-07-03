@CookieStore = do ->
  set: (key, value, days = 365) ->
    if days
      date = new Date
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = "; expires=" + date.toGMTString()
    else
      expires = ""

    document.cookie = key + "=" + value + expires + "; path=/"

    value

  get: (key) ->
    key = key + "="
    for fragment in document.cookie.split(';')
      fragment = fragment.replace(/^\s+/, '')
      return fragment.substring(key.length, fragment.length) if fragment.indexOf(key) == 0

    null

  expire: (key) ->
    value = @get(key)
    document.cookie = key + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    value
