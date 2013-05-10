## Star Rating Radio Input

### Example settings

HTML:
```html
    <div id="star-rating" class="star-rating">
      <span class="star-container"></span>
      <input type="hidden" name="rating" value="0"/>
    </div>
```

JS:
```js
    $(function() {
      StarRating.init('#star-rating', {
        container: '.star-container',
        input: 'input[name=rating]'
      });
    });
```

SCSS:
```scss
    .star-rating {
      display: inline-block;

      .star-container {
        display: block;
        width: 125px;
        height: 23px;
        margin-bottom: -4px;
        cursor: pointer;
        background: url(../mini-site/star-ratings.png) no-repeat 0 -230px;
      }
    }
```