prjFiles = new FS.Collection("prjfiles", {
    stores: [
      new FS.Store.FileSystem("prjfiles", {
      })
    ],
    filter: {
      maxSize: 20000000, //3 MB
      allow: {
        //allow any type of file in this FS.Collection
      },
      onInvalid: function () {
        if (Meteor.isClient) {
          alert('You did a no-no...! Your file is too large (max 20mb)');
        } else {
          console.log('You did a no-no...! Your file is too large (max 20mb)');
        }
      }
    }
});

Meteor.methods({
  insertProjectFile: function(fileMetadata) {

    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

    var inTeam = Teams.findOne({"userID": user._id, "projectID": fileMetadata.projectID}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
    var projectAuthor = Projects.findOne({_id: fileMetadata.projectID}).author;

    // Check if the user is on the team, the owner or an administrator
    if ( (projectAuthor !== user._id) && (!inTeam) && (!Roles.userIsInRole(user, ['admin'])) )
      throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

    var updatedFileMetadata = _.extend(
      _.pick(
        fileMetadata, 
        'projectID'
      ), 
    {});

    prjFiles.update({_id: fileMetadata.id}, {$set: {'metadata' : updatedFileMetadata}});
  },
  removeFile: function(file) {

    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

    var inTeam = Teams.findOne({"userID": user._id, "projectID": file.projectID}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
    var projectAuthor = Projects.findOne({_id: file.projectID}).author;

    // Check if the user is on the team, the owner or an administrator
    if ( (projectAuthor !== user._id) && (!inTeam) && (!Roles.userIsInRole(user, ['admin'])) )
      throw new Meteor.Error(401, "Dude, this is not your team! Leave!");
  
    prjFiles.remove({'_id': file.id});  
  }
});


/******** THIS IS VERY DANGEROUS! ANYONE CAN MODIFY THE DATA OF OTHER PROJECT FILES!! */
prjFiles.deny({
  update: function(userId, doc, fieldNames, modifier) {
    if ( modifier["$set"].projectID )
      return true;
  }
});

prjFiles.allow({
  insert: function(userId, doc) {
    if (userId)
      return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    if ( (fieldNames.length == 1)  && (userId) )
      return true;
  },
  download: function(userId) {
    if (userId)
      return true;
  }
});