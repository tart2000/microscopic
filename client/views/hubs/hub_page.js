Template.hubPage.helpers({ 
    hubProjects: function() {
        return Projects.find({edition: this.name}); 
    }
});