Meteor.publish('projects', function() { 
    return Projects.find();
});
Meteor.publish('hubs', function() { 
    return Hubs.find();
});
Meteor.publish('comments', function() { 
    return Comments.find();
});
