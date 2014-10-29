Template.largeHubItem.rendered = function() {
    
},

String.prototype.truncate = function() {
    var re = this.match(/^.{0,230}[\S]*/);
    var l = re[0].length;
    var re = re[0].replace(/\s$/,'');
    if(l < this.length)
        re = re + " ...";
    return re;
};

Template.largeHubItem.helpers({ 
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
    shortDescription: function() {
        var descr = this.description; 
        return descr.truncate(); 
    },
});