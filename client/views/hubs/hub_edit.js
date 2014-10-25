Template.hubEdit.rendered = function() {

};

Template.hubEdit.events({ 
    'submit': function(e) {
        e.preventDefault();

        var updatedHub = {
            id: this._id,
            'name': $(e.target).find('[name=hub-name]').val(),
            'country': $(e.target).find('[name=country]').val(),
            'description': $(e.target).find('[id=hubdescription]').val(), 
            'teams': $(e.target).find('[name=teams]').val(),
            'museumLogo': $(e.target).find('[name=museumLogo]').val(),
            'museumLink': $(e.target).find('[name=museumLink]').val(),
            'social.facebook': $(e.target).find('[id=facebook]').val(),
            'social.twitter': $(e.target).find('[id=twitter]').val(),
            'social.linkedin': $(e.target).find('[id=linkedin]').val(),
            'social.instagram': $(e.target).find('[id=instagram]').val(),
            'social.tumblr': $(e.target).find('[id=tumblr]').val(),
            'social.website': $(e.target).find('[id=website]').val(),
        };

        Meteor.call('updateHub', updatedHub, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
            else
                Alert.add('your hub has been edited', 'success');
        });

        Router.go('hubPage', {_id: this._id});
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