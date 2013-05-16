# AjaxForm with error message handling
# Error object: standard rails error
# { key1: ['error1', 'error2'], key2: ['error1'] ... }

@AjaxForm = (id, config) ->
  $cache = {}
  $cache.form = $(id)
  $cache.button = $cache.form.find(config.button)
  $cache.message = $cache.form.find(config.message)
  $cache.button.click -> submit()

  showMessage = (msg, type, empty = true) ->
    emptyMessage() if empty is true
    $cache.message.append('<p class="text-' + type + '">' + msg + '</p>').slideDown()

  emptyMessage = -> $cache.message.empty().hide()

  submit = ->
      $.ajax '/reviews',
        type: 'POST'
        data: $cache.form.serialize()
        dataType: 'json'
        complete: (e, xhr, settings) ->
          switch e.status
            when 201 # :created
              $cache.form.find('input, textarea').val('')
              showMessage("Thank you. Your review is now awaiting moderation", 'success')
              config.callback() unless config.callback is undefined
            when 422 # :unprocessable_entity
              errors = $.parseJSON(e.responseText)
              emptyMessage()

              for key of errors
                error = errors[key]
                for i of error
                  showMessage(' - ' + key + ' field ' + error[i], 'error', false)
            else # other errors
              showMessage("An error occurred in your form submission - please try again later", 'error')
