/***************************************************************************/
/****** Publications for the home page ******/
Meteor.publish('hubs', function() { 
    return Hubs.find();
});

Meteor.publish('mostActiveUsers', function() { 
    // We estimate the "activeness" of a user by how many comments 
    // he/she has written, the number of projects he/she is involved with
    // and whether there is a photo
    var scoreArray = [];
    var userCursor = Meteor.users.find();

    var compare = function compare(a,b) {
      if (a.last_nom < b.last_nom)
         return -1;
      if (a.last_nom > b.last_nom)
        return 1;
      return 0;
    }

    userCursor.forEach(function(user) {

        // If the user has a photo, we give him an extra 10 points
        var photoScore = userPhotos.find({'metadata.userID': user._id}) ? 10 : 0;

        scoreArray.push({
            'user': user._id,
            'score': Comments.find({"userId": user._id}).count() + Teams.find({"userID": user._id}).count() + photoScore
        });        
    });

    // Sort the array
    scoreArray.sort(function(a,b) {
        return (a.score < b.score) ? 1 : ((b.score > a.score) ? -1 : 0);
    });

    // Get the first 6
    var bestFour = [];
    var maxUsers = (Meteor.users.find().count() < 6) ? Meteor.users.find().count() : 6;
    for (var i = 0; i < maxUsers; i++) {
        bestFour.push(scoreArray[i].user);
    }

    // return the cursor for the first 4
    return Meteor.users.find({'_id': {$in: bestFour}}, {fields: {'username': 1, 'profile.thumblink':1, 'profile.hub':1}});
});

Meteor.publish('mostActiveProjects', function() { 
    // We estimate the "activeness" of a project by the number of comments, 
    // & the number of photos.
    var score = [];
    var projectCursor = Projects.find();

    projectCursor.forEach(function(project) {
        score[project._id] = Comments.find({"projectId": project._id}).count() + prjPhotos.find({"metadata.projectID": project._id}).count();
    });

    // Sort the array

    // Get the first 4

    // return the cursor for the first 4

    //console.log(score);

});

/***************************************************************************/
/****** Publications for the sign-in page ******/
Meteor.publish('allUsernames', function () {
    return Meteor.users.find({}, {fields:{username:true}});
});

Meteor.publish('unverifiedTeamMembers', function () {
    return Teams.find({"userID": ""}, {fields:{email:true}});
});

/***************************************************************************/
/****** Publications for the view / modification of user profiles ******/
Meteor.publish('singleUser', function (userId) {
    return Meteor.users.find(userId, {fields:{emails:true, profile: true, username: true}});
});

Meteor.publish('recentComments', function (userId) {
    return Comments.find({"userId": userId}, {fields: { body:true, projectId: true, submitted: true}, sort: {"submited": -1, limit: 5}});
});

Meteor.publish('userTeams', function (userId) {
    return Teams.find({"userID": userId}, {fields: { projectID:true, submitted: true, role: true}, sort: {"submited": -1, limit: 5}});
});

Meteor.publish('userProjects', function(userId) {
    return Projects.find({}, {fields: {'title':true, 'baseline':true}, sort: {created: -1}});
});

Meteor.publish('singleUserPhoto', function (userId) { 
    return userPhotos.find({'metadata.owner':userId}, {fields: {"original": false}});
});

Meteor.publish('subscribeToHub', function() { 
    return Hubs.find({}, {fields: {name: true}});
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


