userPhotos = new FS.Collection("userphotos", {
  stores: [new FS.Store.FileSystem("userphotos", FS.Store.rootPath)]
});

userPhotos = new FS.Collection("userPhotos", {
    stores: [
      new FS.Store.FileSystem("userPhotos", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 250x250px thumbnail  
          var THUMBSIZE = 250;

          gm(readStream, fileObj.name()).size({bufferStream: true }, function (err, size) {
            if (size.width >= size.height) {
              //console.log('width greater')
              this.resize(null, THUMBSIZE).gravity('Center').extent(THUMBSIZE, THUMBSIZE).stream().pipe(writeStream);
            } else {
              this.resize(THUMBSIZE, null).gravity('Center').extent(THUMBSIZE, THUMBSIZE).stream().pipe(writeStream);
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

userPhotos.allow({
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