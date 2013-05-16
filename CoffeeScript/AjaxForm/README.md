## AJAX Form

### Example settings

HTML:
```html
    <form id="review-form">
      .. content ..
      <div class="messages"></div>
      <button id="post-review">Post Review</button>
    </form>
```

OnLoad Javascript:
```js
    $(function() {
      ReviewForm = new AjaxForm('#review-form', {
        button: '#post-review',
        message: '.messages',
        callback: function() {
          StarRating.set(0);
        }
      });
    });
```

Backend (Rails):
```ruby
  def create
    @review = ::Review.new(params[:review])
    if @review.save
      render json: @review, :status => :created
    else
      render json: @review.errors, :status => :unprocessable_entity
    end
  end
```

JSON format:
```json
    {
      'field1': ['error1', 'error2'],
      'field2': ['error1'], ...
    }
```