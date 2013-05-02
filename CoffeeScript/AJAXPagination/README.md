## AJAX Pagination

### Example settings

HTML:
    <div id="gallery"></div>
    <div id="gallery-pagination">
        <a class="page-prev">&lsaquo; Previous</a>
        <a class="page-next">Next &rsaquo;</a>
    </div>

OnLoad Javascript:
    $(function() {
      AJAXPagination.init({
        url: '/gallery.json',
        data: { gallery_id: 1 },
        resultBinding: function(data) {
          return {
            totalPage: data.total_page,
            items: data.photos
          }
        },
        container: '#gallery',
        pagination: '#gallery-pagination',
        template: function(photo) {
          return '<a href="' + photo.original + '" class="thumbnail" rel="gallery-group">' +
                 '<img src="' + photo.thumb + '" alt="' +   photo.title + '" title="' + photo.title + '"/>' +
                 '</a>';
        },
        callback: function() {
          $('a.thumbnail').unbind().fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic'
          });
        }
      });
    });

JSON format:
    {
      "total_page": 35,
      "photos": [{
         "title": "Image 1",
         "thumb": "http://image-url.jpg",
         "original": "http://thumb-url.jpg"
      }, ... ]
    }