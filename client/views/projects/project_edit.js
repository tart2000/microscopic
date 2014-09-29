
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
            instructions: $(e.target).find('[id=projectinstructions]').val()
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
        console.log(old_tag);
        console.log(currentProjectId);
    }
});


Template.projectEdit.helpers({ 
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
        console.log(length);
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


