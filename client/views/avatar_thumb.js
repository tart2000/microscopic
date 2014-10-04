Template.avatarThumb.helpers({
    getUserPhoto: function() {
        var user = Meteor.users.findOne(this.userId);
        var thumbId = user.profile.thumblink;
        var thumb = userPhotos.findOne(thumbId).url();
        console.log(thumb);
        return thumb;
    },
})


