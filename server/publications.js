Meteor.publish('projects', function() { 
    return Projects.find();
});
Meteor.publish('hubs', function() { 
    return Hubs.find();
});
