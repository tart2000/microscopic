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

userPhotos.allow({
  // Any logged in user can add a profile pic
  insert: function(userId) { if (userId) return true; },

  // Only the user's owner can update it
  update: function(userId, doc) { if (userId == doc.ownner) return true; }, 

  // Only the user's owner can remove it
  remove: function(userId, doc) { if (userId == doc.ownner) return true; }, 

  // Anyone can view the profile pic
  download: function() { return true }
});