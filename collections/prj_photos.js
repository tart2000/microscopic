prjPhotos = new FS.Collection("prjphotos", {
    stores: [
      new FS.Store.FileSystem("prjphotos", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image
          var dimensionX = 900;
          var dimensionY = 600;


          gm(readStream, fileObj.name()).size({bufferStream: true }, function (err, size) {
          	this.resize(null, dimensionY).gravity('Center').extent(dimensionX, dimensionY).stream().pipe(writeStream);
            /*if (size.width >= size.height) {
              this.resize(null, dimensionY).gravity('Center').extent(dimensionX, dimensionY).stream().pipe(writeStream);
            } else {
              this.resize(dimensionX, null).gravity('Center').extent(dimensionX, dimensionY).stream().pipe(writeStream);
            }*/
          })
        }
      })
    ],
    filter: {
      maxSize: 3000000, //3 MB
      allow: {
        contentTypes: ['image/*'], //allow only images in this FS.Collection
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'tiff']
      },
      onInvalid: function () {
        if (Meteor.isClient) {
          alert('You did a no-no...! Your file is too large (max 3mb) or it\'s not an image.');
        } else {
          console.log('You did a no-no...! Your file is too large (max 3mb) or it\'s not an image.');
        }
      }
    }
});

Meteor.methods({
  insertProjectPhoto: function(photoMetadata) {

    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

    var inTeam = Teams.findOne({"userID": user._id, "projectID": photoMetadata.projectID}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
    var projectAuthor = Projects.findOne({_id: photoMetadata.projectID}).author;

    // Check if the user is on the team, the owner or an administrator
    if ( (projectAuthor !== user._id) && (!inTeam) && (!Roles.userIsInRole(user, ['admin'])) )
      throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

    var updatedPhotoMetadata = _.extend(
      _.pick(
        photoMetadata, 
        'projectID', 
        'type', 
        'rank', 
        'hubID'
      ), 
    {});

    prjPhotos.update({_id: photoMetadata.id}, {$set: {'metadata' : updatedPhotoMetadata}});
  },
});

/******** THIS IS VERY DANGEROUS! ANYONE CAN MODIFY THE DATA OF OTHER PROJECT PHOTOS!! */
prjPhotos.deny({
  update: function(userId, doc, fieldNames, modifier) {
    if ( (modifier["$set"].projectID) || (modifier["$set"].type) || (modifier["$set"].hubID) )
      return true;
  }
});

prjPhotos.allow({
  insert: function(userId, doc) {
    if (userId)
      return true;
  },
  update: function(userId, doc, fieldNames, modifier) {

    if ( (fieldNames.length == 1)  && (userId) )
      return true;

  },
  remove: function(userId, doc) {
    if (userId)
      return true;
  },
  download: function(userId) {
      return true;
  }
});