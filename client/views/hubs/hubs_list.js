Template.hubsList.helpers({ hubs: function() {
return Hubs.find(); }
});

Template.hubsList.helpers({ 
    hub4Projects: function() {
        return Projects.find({edition: this.name}, {limit:4}); 
    }
});