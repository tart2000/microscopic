/****** Publications for the view / modification of user profiles ******/
Meteor.publish('singleUser', function(userId) {
    return Meteor.users.find(userId, {fields:{emails:true, profile: true, username: true}});
});

Meteor.publish('singleUserPhoto', function(userID) { 
    return userPhotos.find({'metadata.owner':userID}, {fields: {"original": false}});
});

Meteor.publish('subscribeToHub', function() { 
    return Hubs.find({}, {fields: {name: true}});
});

/****** Publications for the community ******/
Meteor.publish('usersData', function () {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile.thumblink':1, 'profile.hub':1}});
});

Meteor.publish('allUserPhotos', function() { 
    return userPhotos.find({}, {fields: {"original": false, "metadata": false}});;
});

/****** Publications for the hub page ******/
Meteor.publish('hubUsers', function (hubID) {
    return Meteor.users.find({"profile.hub": hubID}, {fields: {'username': 1, 'profile.thumblink':1}});
});

Meteor.publish('hubUserPhotos', function(hubID) {
    return userPhotos.find({"metadata.hub": hubID}, {fields: {"original": false, "metadata": false}});
});


/****** Publications for the project page ******/
Meteor.publish('comments', function(projectID) { 
    return Comments.find({"projectId": projectID}, {sort: {submitted: -1}});
});

Meteor.publish('singleProject', function(projectID) { 
    return Projects.find({_id: projectID});
});


Meteor.publish('prjphotos', function() { 
    return prjPhotos.find({});
});

Meteor.publish('allProjects', function() { 
    return Projects.find();
});

Meteor.publish('hubs', function() { 
    return Hubs.find();
});

Meteor.publish('teams', function() { 
    return Teams.find();
});




Meteor.publish('licences', function() { 
    return Licences.find();
});

Meteor.publish('instructions', function() { 
    return Instructions.find();
});
/*
Meteor.publish('singleUser', function(userId) {
	return Meteor.users.find(userId);
});*/



// I need to publish only the id field
Meteor.publish('userphotos', function() { 
    return userPhotos.find();
});


