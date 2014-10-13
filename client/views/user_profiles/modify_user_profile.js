Template.modifyUserProfile.helpers({ 
    getUserPhoto: function() {

        if (!this.profile)
            return;

        if (!this.profile.thumblink) 
            return;

        if (userPhotos.findOne(this.profile.thumblink))
            return userPhotos.findOne(this.profile.thumblink).url();
    },
    currentUser: function() {
        return this;
    },
    getHubs: function() {
        return Hubs.find(); 
    }, 
    getUserName: function() {
        if (this.profile)
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
        if (this.profile.role == role)
            return 'selected';
        else
            return '';
    },
    getSocial: function(medium) {

        if (!this.profile)
            return;

        if (!this.profile.social)
            return;

        switch(medium) {
            case 'facebook':
                if (this.profile.social.facebook)
                    return this.profile.social.facebook;
                break;
            case 'twitter':
                if (this.profile.social.twitter)
                    return this.profile.social.twitter;
                break;
            case 'linkedin':
                if (this.profile.social.linkedin)
                    return this.profile.social.linkedin;
                break;
            case 'instagram':
                if (this.profile.social.instagram)
                    return this.profile.social.instagram;
                break;
            case 'tumblr':
                if (this.profile.social.tumblr)
                    return this.profile.social.tumblr;
                break;
            case 'website':
                if (this.profile.social.website)
                    return this.profile.social.website;
                break;
        }
    }

});

Template.modifyUserProfile.events({
    'change #upload': function(event, template) {

        // Check if the user already has a photo & remove it
        if (this.profile.thumblink) {
            userPhotos.remove(this.profile.thumblink)
        }

        // Insert the new photo
        var newPhoto = new FS.File(event.target.files[0]);
        newPhoto.metadata = {owner: this._id};
        var handle = userPhotos.insert(newPhoto, function (err, fileObj) {});

        // Update the user info
        var user = {
            thumblink: handle._id,
            id: this._id
        }

        Meteor.call('updateUserPhoto', user, function(error) {
            if (error)
                return alert(error.reason);
        });        
    }, 
    'click .cancel':function() {
        Router.go('userProfile', {_id: this._id});
    },
    'submit': function(e) {
        e.preventDefault();

        var userAttributes = {
            id: this._id,
            'profile.name': $(e.target).find('[id=name]').val(),
            'profile.hub': $(e.target).find('[id=hub]').children(":selected").attr("id"),
            'profile.role': $(e.target).find('[id=role]').children(":selected").val(),
            'profile.social.facebook': $(e.target).find('[id=facebook]').val(),
            'profile.social.twitter': $(e.target).find('[id=twitter]').val(),
            'profile.social.linkedin': $(e.target).find('[id=linkedin]').val(),
            'profile.social.instagram': $(e.target).find('[id=instagram]').val(),
            'profile.social.tumblr': $(e.target).find('[id=tumblr]').val(),
            'profile.social.website': $(e.target).find('[id=website]').val()
        };

        Meteor.call('updateUserInfo', userAttributes, function(error) {
            if (error) {
                Alert.add(error.reason, 'danger');
            }
            else {
                Alert.add('your profile has been edited', 'success');
            }
        }); 
        Router.go('userProfile', {_id:  this._id});
    },
    
});

