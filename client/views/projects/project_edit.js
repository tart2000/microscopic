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
    'submit': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var projectProperties = {
            title: $(e.target).find('[name=title]').val(), 
            baseline: $(e.target).find('[name=baseline]').val(),
            hub: $(e.target).find('[id=hub]').val(),
            licence:  $(e.target).find('[id=licences]').val(),
            url: $(e.target).find('[name=url]').val(), 
            description: $(e.target).find('[id=projectdescription]').val(),
            instructions: $(e.target).find('[id=projectinstructions]').val(),
            videolink: $(e.target).find('[name=projectvideo]').val(),
        };
        Projects.update(currentProjectId, {$set: projectProperties}, function(error) { if (error) {
            // display the error to the user
            alert(error.reason); } else {
                Router.go('projectPage', {_id: currentProjectId});
                Alert.add('your project has been edited', 'success');
            }
        }); },
    'click .delete': function(e) { 
        e.preventDefault();
        if (confirm("Delete this project?")) {
            var currentProjectId = this._id;
            Projects.remove(currentProjectId);
            Router.go('projectsList');
            Alert.add('your project has been deleted...', 'success');
        }
    },
    'click .cancel': function(e) { 
        e.preventDefault();
        Router.go('projectPage', {_id: this._id});
    },
    'click .add-tag': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var new_tag = $(e.target).parent().find('[id=tagbox]').val();
        Projects.update({_id:currentProjectId}, {$addToSet: {tags: new_tag}});
        $('#tagbox').val('');
    }, 
    'click .remove-tag': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var old_tag = $(e.target).parent().parent().text();
        Projects.update({_id:currentProjectId}, {$pull: {tags: old_tag}});
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
        var photoRank = getPhotoNumber(this._id, 'instruction') + 1;

        var prjPhoto = new FS.File(event.target.files[0]);
        prjPhoto.metadata = {projectID: this._id, type: 'instruction', rank: photoRank};

        prjPhotos.insert(prjPhoto, function (err, fileObj) {});
    }, 
    'change #add-photo-descriptions': function(event) {
        var photoRank = getPhotoNumber(this._id, 'description') + 1;

        var prjPhoto = new FS.File(event.target.files[0]);
        prjPhoto.metadata = {projectID: this._id, type: 'description', rank: photoRank};

        prjPhotos.insert(prjPhoto, function (err, fileObj) {});
    }, 
});


Template.projectEdit.helpers({ 
    getPhotos: function(type) {
        switch(type) {
            case 'instruction':
                return prjPhotos.find({"metadata.projectID": this._id, "metadata.type": 'instruction'}, {sort: {"metadata.rank": 1}});
            case 'description':
                return prjPhotos.find({"metadata.projectID": this._id, "metadata.type": 'description'}, {sort: {"metadata.rank": 1}});
        }
        
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
        var length = tags.length; 
        var thetags = "";
        for (var i=0; i < length; i++) {
            thetags = thetags + '<div class="tag">' + tags[i] + '<a href="#" class="remove-tag"><i class="fa fa-times" style="margin-left:5px"></i></a></div>';
        };
        return thetags;
    },
    isLicence: function(currentProjectId) {
        var thisProject = Projects.findOne(currentProjectId);
        var thisProjectLicence = thisProject.licence;
        var licenceOption = this.name;
        if (licenceOption === thisProjectLicence) {
            return 'selected';
        };
    },
    isHub: function(currentProjectId) {
        var thisProject = Projects.findOne(currentProjectId);
        var thisProjectHub = thisProject.hub;
        var hubOption = this.name;
        if (hubOption === thisProjectHub) {
            return 'selected';
        };
    },
});


