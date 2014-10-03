Template.hubPage.helpers({ 
    hubProjects: function() {
        return Projects.find({hub: this.name}); 
    }, 
    hubUsers: function() {
        return Meteor.users.find({'profile.hub':this._id});
    }
});