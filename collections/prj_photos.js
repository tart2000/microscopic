prjPhotos = new FS.Collection("prjphotos", {
    stores: [
      new FS.Store.FileSystem("prjphotos", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image
          var dimensionX = 900;
          var dimensionY = 600;


          gm(readStream, fileObj.name()).size({bufferStream: true }, function (err, size) {
            if (size.width >= size.height) {
              this.resize(null, dimensionY).gravity('Center').extent(dimensionX, dimensionY).stream().pipe(writeStream);
            } else {
              this.resize(dimensionX, null).gravity('Center').extent(dimensionX, dimensionY).stream().pipe(writeStream);
            }
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

/******** THIS IS VERY DANGEROUS! ANYONE CAN MODIFY THE DATA OF OTHER PROJECT PHOTOS!! */
prjPhotos.allow({
  insert: function(userId, doc) {
    //var remains = _.pluck(doc, "id");

    //if (remains.length == 0) 
    //  return true;

    if (userId)
      return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    if (userId)
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