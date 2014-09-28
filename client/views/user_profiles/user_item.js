Template.userItem.helpers({ 
	getUserPhoto: function() {
		return userPhotos.findOne(this.profile.thumblink).url();
	}
});