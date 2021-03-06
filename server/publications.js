/***************************************************************************/
/****** Publications for the home page ******/
Meteor.publish('hubs', function() { 
    return Hubs.find();
});


/***************************************************************************/
/****** Publications for the view / modification of user profiles ******/
Meteor.publish('singleUser', function (userId) {
    return Meteor.users.find(userId, {fields:{emails:true, profile: true, username: true}});
});

Meteor.publish('singleUserPhoto', function (userId) { 
    return userPhotos.find({'metadata.owner':userId}, {fields: {"original": false}});
});

Meteor.publish('subscribeToHub', function() { 
    return Hubs.find({}, {fields: {name: true}});
});
Meteor.publish('userProjects', function(userId) {
    var projectIDs = [];
    var teamCursor = Teams.find({"userID": userId});

    teamCursor.forEach(function(team) {
        projectIDs.push(team.projectID);
    })

    return Projects.find({'_id': {$in: projectIDs}}, {fields: {'title':1, 'baseline':1}, sort: {created: -1}});
});


/***************************************************************************/
/****** Publications for the community ******/
Meteor.publish('usersData', function () {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile.thumblink':1, 'profile.hub':1}});
});

Meteor.publish('allUserPhotos', function() { 
    return userPhotos.find({}, {fields: {"original": false, "metadata": false}});;
});


/***************************************************************************/
/****** Publications for the hub page ******/
Meteor.publish('hubUsers', function (hubID) {
    return Meteor.users.find({"profile.hub": hubID}, {fields: {'username': 1, 'profile.thumblink':1}});
});

Meteor.publish('hubUserPhotos', function (hubID) {
    return userPhotos.find({"metadata.hub": hubID}, {fields: {"original": false, "metadata": false}});
});

Meteor.publish('hubProjects', function (hubID) {
    return Projects.find({'hubID': hubID}, {fields: {'title': 1, 'baseline': 1, 'hub': 1}});
});

Meteor.publish('hubProjectPhotos', function (hubID) { 
    return prjPhotos.find({"metadata.rank":1, "metadata.type":"description", "metadata.hubID": hubID}, {fields: {"original": false}});
});


/***************************************************************************/
/****** Publications for the project page ******/
Meteor.publish('comments', function (projectID) { 
    return Comments.find({"projectId": projectID}, {sort: {submitted: -1}});
});

Meteor.publish('singleProject', function (projectID) { 
    return Projects.find({_id: projectID});
});

Meteor.publish('singleProjectPhotos', function (projectID) { 
    return prjPhotos.find({"metadata.projectID": projectID}, {fields: {"original": false}});
});

Meteor.publish('teams', function (projectID) { 
    return Teams.find({"projectID": projectID});
});

Meteor.publish('commentedUsers', function (projectID) { 
    return Meteor.users.find({}, {fields: {'username': 1, 'profile.thumblink':1}});
});

Meteor.publish('projectTeam', function () {
    return Meteor.users.find({}, {fields: {'username': 1, 'emails':1}});
});

Meteor.publish('projectFiles', function (projectID) {
    return prjFiles.find({"metadata.projectID" : projectID}, {sort: {'createdAt': -1}});
});

/***************************************************************************/
/****** Publications for the view all projects page ******/
Meteor.publish('allProjects', function() { 
    return Projects.find({}, {fields:{title: true, hub: true, thumblink: true, baseline: true}});
});

Meteor.publish('mainProjectPhoto', function() { 
    return prjPhotos.find({"metadata.rank":1, "metadata.type":"description"}, {fields: {"original": false}});
});

Meteor.publish('prjphotos', function() { 
    return prjPhotos.find({}, {fields: {"original": false}});
});

Meteor.publish('licences', function() { 
    return Licences.find();
});


