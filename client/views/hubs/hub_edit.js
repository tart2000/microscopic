Template.hubEdit.rendered = function() {

};

Template.hubEdit.events({ 
    'submit': function(e) {
        e.preventDefault();
        var currentHubId = this._id;
        var newHubProperties = {
            'name': $(e.target).find('[name=hub-name]').val(),
            'description': $(e.target).find('[id=hubdescription]').val(), 
            'teams': $(e.target).find('[name=teams]').val(),
            'social.facebook': $(e.target).find('[id=facebook]').val(),
            'social.twitter': $(e.target).find('[id=twitter]').val(),
            'social.linkedin': $(e.target).find('[id=linkedin]').val(),
            'social.instagram': $(e.target).find('[id=instagram]').val(),
            'social.tumblr': $(e.target).find('[id=tumblr]').val(),
            'social.website': $(e.target).find('[id=website]').val(),
        };
        Hubs.update(currentHubId, {$set: newHubProperties}, function(error) { 
            if (error) {
                // display the error to the user
                alert(error.reason); } else {
                Router.go('hubPage', {_id: currentHubId});
                Alert.add('your hub has been edited', 'success');
            }

        }); 
    },
    'click .cancel': function(e) {
        e.preventDefault();
        Router.go('hubPage', {_id: this._id});
    },
});

Template.hubEdit.helpers({ 
    getSocial: function(medium) {
        if (!this)
            return;

        if (!this.social)
            return;

        switch(medium) {
            case 'facebook':
                if (this.social.facebook)
                    return this.social.facebook;
                break;
            case 'twitter':
                if (this.social.twitter)
                    return this.social.twitter;
                break;
            case 'linkedin':
                if (this.social.linkedin)
                    return this.social.linkedin;
                break;
            case 'instagram':
                if (this.social.instagram)
                    return this.social.instagram;
                break;
            case 'tumblr':
                if (this.social.tumblr)
                    return this.social.tumblr;
                break;
            case 'website':
                if (this.social.website)
                    return this.social.website;
                break;
        }
    },
});