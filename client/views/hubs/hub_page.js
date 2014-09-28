Template.hubPage.helpers({ 
    hubProjects: function() {
        return Projects.find({hub: this.name}); 
    }
});