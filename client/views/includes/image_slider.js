Template.imageSlider.rendered = function() {
    $('#myCarousel').carousel({
        interval: 4000
    });

    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click( function(){
      var id_selector = $(this).attr("id");
      var id = id_selector.substr(id_selector.length -1);
      id = parseInt(id);
      console.log(id);
      $('#myCarousel').carousel(id);
      $('[id^=carousel-selector-]').removeClass('selected');
      $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#myCarousel').on('slid.bs.carousel', function (e) {
      var id = $('.item.active').data('slide-number');
      id = parseInt(id);
      $('[id^=carousel-selector-]').removeClass('selected');
      $('[id=carousel-selector-'+id+']').addClass('selected');
    });

    $('#myCarousel .item').first().addClass('active');  

    $('#carousel-selector-1').addClass('selected');
};

Template.imageSlider.helpers({
    projectDescriptionImages: function() {
        var images = prjPhotos.find({"metadata.projectID": this._id, "metadata.type": 'description'}, {sort: {"metadata.rank": 1}});
        return images;
    },
});


