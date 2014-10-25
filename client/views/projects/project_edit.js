Template.projectEdit.rendered = function() {
    getPhotoNumber = function(ID, type) {
        return prjPhotos.find({"metadata.projectID": ID, "metadata.type": type}).count();
    }
    changeRank = function(photo, photoType, changeType, projectID) {
        var photoRank = photo.metadata.rank;

        switch(changeType) {
            case 'increment':
               newPhotoRank = photoRank + 1;
               break;
            case 'decrement':
                newPhotoRank = photoRank - 1;
                break;
        }
        
        /* Check if a previous photo exists */
        var prevPhoto = prjPhotos.findOne({"metadata.projectID":projectID, "metadata.rank": newPhotoRank, "metadata.type": photoType}); // find the next photo (+1)

        if (prevPhoto) {
            /* Decrement current photo's rank */
            prjPhotos.update({_id:photo._id}, {$set: {"metadata.rank": newPhotoRank}}); // Do nothing 

            /* Increment the rank of the previous photo */
            prjPhotos.update({_id:prevPhoto._id}, {$set: {"metadata.rank": photoRank}}); //reduce the next photo by one (-1)

            return prevPhoto;
        }  
    }
},

Template.projectEdit.events({ 
    'keyup .reactive-text':function(e) {

        var updatedProject = {};

        updatedProject[$(e.target).attr('name')] = $(e.target).val();
        updatedProject['id'] = this._id;
        

        Meteor.call('updateProject', updatedProject, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
        })
    },
    'click .reactive-dropdown': function(e) {
        var updatedProject = {};

        updatedProject[$(e.target).attr('name')] = $(e.target).val();
        updatedProject['id'] = this._id;

        if ($(e.target).attr('name') == 'hub')
            updatedProject['hubID'] = $(e.target).children(":selected").attr('id');

        Meteor.call('updateProject', updatedProject, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
        })

    },
    'click .submit': function(e) {
        e.preventDefault();

        var currentProjectId = this._id;

        var projectProperties = {
            id: currentProjectId,
            title: $(e.target).find('[name=title]').val(), 
            baseline: $(e.target).find('[name=baseline]').val(),
            hub: $(e.target).find('[id=hub]').val(),
            hubID: $('#hub').children(":selected").attr('id'),
            licence:  $(e.target).find('[id=licence]').val(),
            url: $(e.target).find('[name=url]').val(), 
            description: $(e.target).find('[id=projectdescription]').val(),
            instructions: $(e.target).find('[id=projectinstructions]').val(),
            videolink: $(e.target).find('[name=projectvideo]').val(),
        };

        Meteor.call('submitProject', projectProperties, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
            else
                Alert.add('your project has been edited', 'success');
        });

        Router.go('projectPage', {_id: currentProjectId});

    },
    'click .delete': function(e) { 
        e.preventDefault();
        if (confirm("Delete this project?")) {
            var currentProjectId = this._id;

            Meteor.call('deleteProject', currentProjectId, function(error){
                if (error)
                    Alert.add(error.reason, 'danger');
                else
                    Alert.add('your project has been deleted...', 'success');
            });

            Router.go('projectsList');
        }
    },
    'click .cancel': function(e) { 
        e.preventDefault();
        Router.go('projectPage', {_id: this._id});
    },
    'click .add-tag': function(e) {
        e.preventDefault();

        var updatedProject = {
            id: this._id,
            newTag: $(e.target).parent().find('[id=tagbox]').val(),
        }

        Meteor.call('addTag', updatedProject, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
            else
                $('#tagbox').val('');
        });
        
    }, 
    'click .remove-tag': function(e) {
        e.preventDefault();
        
        var updatedProject = {
            id: this._id,
            oldTag: $(e.target).parent().parent().text()
        }

         Meteor.call('removeTag', updatedProject, function(error){
            if (error)
                Alert.add(error.reason, 'danger');
        });
    },
    'click .delete-photo': function(e) {
        e.preventDefault();

        if ($(e.target).hasClass("instruction")) 
            var photoType = "instruction";
        else 
            var photoType = "description";
        
        var deletedPhotoID = this._id;
        var photoRank = this.metadata.rank;
        var currentProjectID = Projects.findOne(this.metadata.projectID)._id;
        var photoNumber = getPhotoNumber(currentProjectID, photoType); 

        var currentPhoto = this;

        for (var rank = photoRank; rank < photoNumber; rank++) {
            if (currentPhoto) {

                /* find the next photo */
                var currentPhoto = prjPhotos.findOne({"metadata.projectID": currentProjectID, "metadata.rank": rank + 1, "metadata.type": photoType}); 

                /* Reduce the photo's rank by 1 */
                prjPhotos.update({_id:currentPhoto._id}, {$set: {"metadata.rank": rank}});
            }
        }

        $("#container-" + deletedPhotoID).hide(300, function() {
            prjPhotos.remove(deletedPhotoID);
        });
    },
    'click .rank-up': function(e) {

        var currentProjectID = Projects.findOne(this.metadata.projectID)._id;

        if ($(e.target).hasClass("instruction")) 
            var type = "instruction";
        else 
            var type = "description";

        e.preventDefault();
        changeRank(this, type, 'decrement', currentProjectID);             
    },
     'change #add-photo-instructions': function(event) {

        var currentProject = this._id;

        var photoRank = getPhotoNumber(this._id, 'instruction') + 1;

        var prjPhoto = new FS.File(event.target.files[0]);

        prjPhotos.insert(prjPhoto, function (err, fileObj) {
            if (!err) {
                // Add the photos metadata on the server
                var metadata = {
                    id: fileObj._id,
                    projectID: currentProject, 
                    type: 'instruction', 
                    rank: photoRank,
                    hubID: $('#hub').children(":selected").attr('id'),
                };

                Meteor.call('insertProjectPhoto', metadata, function(error){
                    if (error)
                        Alert.add(error.reason, 'danger');
                });
            }
       });
    },
    'change #add-photo-descriptions': function(event) {

        var currentProject = this._id;

        var photoRank = getPhotoNumber(this._id, 'description') + 1;

        var prjPhoto = new FS.File(event.target.files[0]);

        prjPhotos.insert(prjPhoto, function (err, fileObj) {
            if (!err) {
                // Set the session variable to track upload progress
                Session.set('photoID', fileObj._id);
                
                // Add the photos metadata on the server
                var metadata = {
                    id: fileObj._id,
                    projectID: currentProject, 
                    type: 'description', 
                    rank: photoRank,
                    hubID: $('#hub').children(":selected").attr('id'),
                };

                Meteor.call('insertProjectPhoto', metadata, function(error){
                    if (error)
                        Alert.add(error.reason, 'danger');
                });
            }
        });
    }, 
});


Template.projectEdit.helpers({ 
    getPhotos: function(type) {
        switch(type) {
            case 'instruction':
                return prjPhotos.find({"metadata.type": 'instruction'}, {sort: {"metadata.rank": 1}});
            case 'description':
                return prjPhotos.find({"metadata.type": 'description'}, {sort: {"metadata.rank": 1}});
        }
        
    },
    getPhoto: function() {
        var newPhotoID = Session.get('photoID');
        return prjPhotos.findOne({"_id": newPhotoID});
    },
    currentProjectId: function() {
        return this._id;
    },
    hubs: function() {
        return Hubs.find(); 
    }, 
    licences: function() {
        return Licences.find(); 
    },
    projectTags: function() {
        return this.tags; 
    },
    projectTags2: function() {
        var tags = this.tags;

        if (!tags)
            return;

        var length = tags.length; 
        var thetags = "";
        for (var i=0; i < length; i++) {
            thetags = thetags + '<div class="tag">' + tags[i] + '<a href="#" class="remove-tag"><i class="fa fa-times" style="margin-left:5px"></i></a></div>';
        };
        return thetags;
    },
    isLicence: function(currentProjectId) {
        var thisProject = Projects.findOne(currentProjectId);

        if (!thisProject)
            return;

        var thisProjectLicence = thisProject.licence;

        if (!thisProjectLicence)
            return;

        var licenceOption = this.name;
        if (licenceOption === thisProjectLicence) {
            return 'selected';
        };
    },
    isHub: function(currentProjectId) {
        var thisProject = Projects.findOne(currentProjectId);
        if (!thisProject)
            return;
        
        var thisProjectHub = thisProject.hub;

        if (!thisProjectHub)
            return;

        var hubOption = this.name;
        if (hubOption === thisProjectHub) {
            return 'selected';
        };
    },
});
