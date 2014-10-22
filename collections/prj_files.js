/*prjFiles = new FS.Collection("prjfiles", {
    stores: [
      new FS.Store.FileSystem("prjphotos", {
      })
    ],
    filter: {
      maxSize: 100000000, //3 MB
      allow: {
        contentTypes: ['image/*'], //allow only images in this FS.Collection
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'tiff']
      },
      onInvalid: function () {
        if (Meteor.isClient) {
          alert('You did a no-no...! Your file is too large (max 100mb).');
        } else {
          console.log('You did a no-no...! Your file is too large (max 100mb).');
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
        'projectID', 
      ), 
    {});

    prjFiles.update({_id: fileMetadata.id}, {$set: {'metadata' : updatedFileMetadata}});
  },
});*/