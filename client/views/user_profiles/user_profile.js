Template.userProfile.helpers({ 
	getUserPhoto: function() {
		return userPhotos.findOne(this.profile.thumblink).url();
	},
	getHub: function() {
		return Hubs.findOne(this.profile.hub).name;
	},
	getSocial: function(medium) {

        if (!this.profile)
            return;

        if (!this.profile.social)
            return;

		var socialLink = null;

		switch(medium) {
            case 'facebook':
                if (this.profile.social.facebook)
                    socialLink = this.profile.social.facebook;
                break;
            case 'twitter':
                if (this.profile.social.twitter)
                    socialLink = this.profile.social.twitter;
                break;
            case 'linkedin':
                if (this.profile.social.linkedin)
                    socialLink = this.profile.social.linkedin;
                break;
            case 'instagram':
                if (this.profile.social.instagram)
                    socialLink = this.profile.social.instagram;
                break;
            case 'tumblr':
                if (this.profile.social.tumblr)
                    socialLink = this.profile.social.tumblr;
                break;
            case 'website':
                if (this.profile.social.website)
                    socialLink = this.profile.social.website;
                break;
        }
        if (socialLink)
        	return socialLink;
        else
        	return false;
	},
    isUser: function() {
        var currentUser = Meteor.user();

        if (!currentUser)
            return false;

        if ((currentUser._id !== this._id) && (!Roles.userIsInRole(currentUser, ['admin'])) )
            return false

        return true;
    }
});