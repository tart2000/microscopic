Template.hubsList.helpers({ hubs: function() {
return Hubs.find(); }
});

Template.hubsList.helpers({ 
    hubProjects: function() {
        return Projects.find({edition: this.name}); 
    }
});