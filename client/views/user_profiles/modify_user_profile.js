Template.modifyUserProfile.helpers({ 
	getUserPhoto: function() {
		return userPhotos.findOne(this.profile.thumblink).url();
	}
});

Template.modifyUserProfile.events({
	'change #upload': function(event, template) {
		var userPhoto = this.profile.thumblink;

		if (userPhoto) 
			userPhotos.remove(userPhoto);

		var handle = userPhotos.insert(event.target.files[0], function (err, fileObj) {
    		//Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
  		});

		Meteor.users.update(this._id, {$set : {"profile.thumblink" : handle._id} })
		
	}
});