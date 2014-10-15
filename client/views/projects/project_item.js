Template.projectItem.helpers({
	getPhoto: function () {

		// Note that we are only subscribing to photos with rank 1
		var photo = prjPhotos.findOne({'metadata.projectID': this._id});

		if (!photo)
			return false;

		return photo.url();
	}
})