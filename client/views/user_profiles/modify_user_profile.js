Template.modifyUserProfile.helpers({ 
	getUserPhoto: function() {
		return userPhotos.findOne(this.profile.thumblink).url();
	},
	hubs: function() {
        return Hubs.find(); 
    }, 
    currentUserId: function() {
        return this._id;
    },
    isHub: function(currentUserId) {
        var thisUser = Meteor.users.findOne(currentUserId);
        var thisUserHub = thisUser.profile.hub;
        var hubOption = this.name;
        if (hubOption === thisUserHub) {
            return 'selected';
        };
    },

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
		
	}, 
    'submit': function(e) {
        e.preventDefault();
        var currentUser = this._id;
        var properties = {
            'profile.hub' : $(e.target).find('[id=hub]').val(),
        };
        Meteor.users.update(this._id, {$set: properties});         
        Router.go('userProfile', {_id: currentUser});
        Alert.add('your profile has been edited', 'success'); 
    },
    
});

