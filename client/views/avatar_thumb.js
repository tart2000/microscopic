Template.avatarThumb.helpers({
    getUserPhoto: function() {

        if (!this.profile)
        	return false;

        var thumbId = this.profile.thumblink;

        if (!thumbId)
        	return false;

        var thumb = userPhotos.findOne(thumbId).url();

        return thumb;
    },

});

Template.avatarThumb.rendered = function() {
    $(".avatar-thumb img").tooltip();
}


