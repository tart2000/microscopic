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
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});

prjPhotos.allow({
  insert: function(userId, doc) {
    return true;//(userId && doc.metadata.owner === userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    return false;
  },
  download: function(userId) {
    return true//!!userId;
  }
});