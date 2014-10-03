Template.modifyUserProfile.helpers({ 
    getUserPhoto: function() {
        var userPhoto = userPhotos.findOne(this.profile.thumblink).url();

        if (userPhoto !== undefined)
          return userPhotos.findOne(this.profile.thumblink).url();
        else
            return '';
    },
    currentUser: function() {
        return this;
    },
    getHubs: function() {
        return Hubs.find(); 
    }, 
    getUserName: function() {
        return this.profile.name;
    },
    isHub: function(currentUser) {
        var thisUserHub = currentUser.profile.hub;
        var hubOption = this._id;
        if (hubOption === thisUserHub) {
            return 'selected';
        };
    },
    hasRole: function(role) {
        console.log(role + ', ', this.profile.role);
        if (this.profile.role == role)
            return 'selected';
        else
            return '';
    },
    getSocial: function(medium) {

        switch(medium) {
            case 'facebook':
                return this.profile.social.facebook;
            case 'twitter':
                return this.profile.social.twitter;
            case 'linkedin':
                return this.profile.social.linkedin;
            case 'instagram':
                return this.profile.social.instagram;
            case 'tumblr':
                return this.profile.social.tumblr;
            case 'website':
                return this.profile.social.website;
        }
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

