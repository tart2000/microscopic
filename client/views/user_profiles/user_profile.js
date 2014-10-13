Template.userProfile.helpers({ 
	getUserPhoto: function() {
		return userPhotos.findOne(this.profile.thumblink).url();
	},
	getHub: function() {
		return Hubs.findOne(this.profile.hub).name;
	},
	getSocial: function(medium) {
		var socialLink = null;
		switch(medium) {
            case 'facebook':
                socialLink = this.profile.social.facebook;
                break;
            case 'twitter':
                socialLink = this.profile.social.twitter;
                break;
            case 'linkedin':
                socialLink = this.profile.social.linkedin;
                break;
            case 'instagram':
                socialLink = this.profile.social.instagram;
                break;
            case 'tumblr':
                socialLink = this.profile.social.tumblr;
                break;
            case 'website':
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

        if (currentUser._id !== this._id)
            return false

        return true;
    }
});