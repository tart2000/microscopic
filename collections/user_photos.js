userPhotos = new FS.Collection("userphotos", {
  stores: [new FS.Store.FileSystem("userphotos", FS.Store.rootPath)]
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