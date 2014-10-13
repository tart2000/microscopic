/****** Publications for the modification of user profiles ******/
Meteor.publish('modifySingleUser', function(userId) {
    return Meteor.users.find(userId, {fields:{emails:true, profile: true, username: true}});
});

Meteor.publish('subscribeToHub', function() { 
    return Hubs.find({}, {fields: {name: true}});
});

Meteor.publish('modifyUserPhoto', function(userID) { 
    // This needs to be fixed.. A user can see anyone's photo
    return userPhotos.find({}, {fields: {"original": false}});
});



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
    return Meteor.users.find({}, {fields: {'username': 1, 'profile.thumblink':1, 'profile.hub':1}});
});

// I need to publish only the id field
Meteor.publish('userphotos', function() { 
    return userPhotos.find();
});

// I need to publish only the id field
Meteor.publish('prjphotos', function() { 
    return prjPhotos.find({});
});

