Meteor.publish('projects', function() { 
    return Projects.find();
});

Meteor.publish('hubs', function() { 
    return Hubs.find();
});

Meteor.publish('teams', function() { 
    return Teams.find();
});

Meteor.publish('comments', function() { 
    return Comments.find();
});

Meteor.publish('prjPhotos', function() { 
    return Photos.find();
});

Meteor.publish('licences', function() { 
    return Licences.find();
});

Meteor.publish('instructions', function() { 
    return Instructions.find();
});

Meteor.publish('singleUser', function(userId) {
	return Meteor.users.find(userId);
});

Meteor.publish('usersData', function () {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile.thumblink':1}});
});

// I need to publish only the id field
Meteor.publish('userphotos', function() { 
    return userPhotos.find();
});
