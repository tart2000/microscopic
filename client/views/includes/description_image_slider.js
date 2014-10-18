Template.descriptionImageSlider.rendered = function() {
    $('#descCarousel').carousel({
        interval: 4000
    });

    // handles the carousel thumbnails
    $('[id^=desc-carousel-selector-]').click( function(){
      var id_selector = $(this).attr("id");
      var id = id_selector.substr(id_selector.length -1);
      id = parseInt(id);
      $('#descCarousel').carousel(id-1);
      $('[id^=desc-carousel-selector-]').removeClass('selected');
      $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#descCarousel').on('slid.bs.carousel', function (e) {
      var id = $('.item.active').data('slide-number');
      id = parseInt(id);
      $('[id^=desc-carousel-selector-]').removeClass('selected');
      $('[id=desc-carousel-selector-'+id+']').addClass('selected');
    });

    $('#descCarousel .item').first().addClass('active');  

    $('#desc-carousel-selector-1').addClass('selected');
};

Template.descriptionImageSlider.helpers({
    projectDescriptionImages: function() {
        var images = prjPhotos.find({"metadata.projectID": this._id, "metadata.type": 'description'}, {sort: {"metadata.rank": 1}});
        if (images.count() > 0) {
          return images;
        }
    }
});


