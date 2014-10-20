Template.hubPage.helpers({ 
    hubProjects: function() {
        return Projects.find(); 
    }, 
    hubUsers: function() {
        return Meteor.users.find();
    }, 
    canEdit: function() {
        var currentUser = Meteor.user();

        if (!currentUser)
            return false;

        if (Roles.userIsInRole(currentUser, ['admin']))
            return true;
    },
    getSocial: function(medium) {

        if (!this)
            return;

        if (!this.social)
            return;

        var socialLink = null;

        switch(medium) {
            case 'facebook':
                if (this.social.facebook)
                    socialLink = this.social.facebook;
                break;
            case 'twitter':
                if (this.social.twitter)
                    socialLink = this.social.twitter;
                break;
            case 'linkedin':
                if (this.social.linkedin)
                    socialLink = this.social.linkedin;
                break;
            case 'instagram':
                if (this.social.instagram)
                    socialLink = this.social.instagram;
                break;
            case 'tumblr':
                if (this.social.tumblr)
                    socialLink = this.social.tumblr;
                break;
            case 'website':
                if (this.social.website)
                    socialLink = this.social.website;
                break;
        }
        if (socialLink)
            return socialLink;
        else
            return false;
    },
});