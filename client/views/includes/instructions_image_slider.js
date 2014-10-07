Template.instructionsImageSlider.rendered = function() {
    $('#instCarousel').carousel({
        interval: 4000
    });

    // handles the carousel thumbnails
    $('[id^=inst-carousel-selector-]').click( function(){
      var id_selector = $(this).attr("id");
      var id = id_selector.substr(id_selector.length -1);
      id = parseInt(id);
      $('#instCarousel').carousel(id-1);
      $('[id^=inst-carousel-selector-]').removeClass('selected');
      $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#instCarousel').on('slid.bs.carousel', function (e) {
      var id = $('.item.active').data('slide-number');
      id = parseInt(id);
      $('[id^=inst-carousel-selector-]').removeClass('selected');
      $('[id=inst-carousel-selector-'+id+']').addClass('selected');
    });

    $('#instCarousel .item').first().addClass('active');  

    $('#inst-carousel-selector-1').addClass('selected');
};

Template.instructionsImageSlider.helpers({
    projectInstructionImages: function() {
        var images = prjPhotos.find({"metadata.projectID": this._id, "metadata.type": 'instruction'}, {sort: {"metadata.rank": 1}});
        return images;
    },
});


