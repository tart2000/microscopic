Template.modifyUserProfile.helpers({ 
    getUserPhoto: function() {
        /*var userPhoto = userPhotos.findOne(this.profile.thumblink).url();

        if (userPhoto !== undefined)
          return userPhotos.findOne(this.profile.thumblink).url();
        else
            return '';*/
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

        switch(medium) {
            case 'facebook':
                if (this.profile.social)
                    return this.profile.social.facebook;
                break;
            case 'twitter':
                if (this.profile.social)
                    return this.profile.social.twitter;
                break;
            case 'linkedin':
                if (this.profile.social)
                    return this.profile.social.linkedin;
                break;
            case 'instagram':
                if (this.profile.social)
                    return this.profile.social.instagram;
                break;
            case 'tumblr':
                if (this.profile.social)
                    return this.profile.social.tumblr;
                break;
            case 'website':
                if (this.profile.social)
                    return this.profile.social.website;
                break;
        }
    }

});

Template.modifyUserProfile.events({
    /*'change #upload': function(event, template) {
        var userPhoto = this.profile.thumblink;

        if (userPhoto) 
            userPhotos.remove(userPhoto);

        var handle = userPhotos.insert(event.target.files[0], function (err, fileObj) {
            //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        });

        Meteor.users.update(this._id, {$set : {"profile.thumblink" : handle._id} })
        
    }, 
    'click .cancel':function() {
        Router.go('userProfile', {_id: this._id});
    },
    'submit': function(e) {
        e.preventDefault();
        var currentUser = this._id;
        var properties = {
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
        Meteor.users.update(this._id, {$set: properties});         
        Router.go('userProfile', {_id: currentUser});
        Alert.add('your profile has been edited', 'success');
    },*/
    
});

