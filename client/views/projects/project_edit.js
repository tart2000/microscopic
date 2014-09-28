Template.projectEdit.events({ 
    'submit': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var projectProperties = {
            title: $(e.target).find('[name=title]').val(), 
            baseline: $(e.target).find('[name=baseline]').val(),
            hub: $(e.target).find('[id=hub]').val(),
            licence:  $(e.target).find('[id=licences]').val(),
            url: $(e.target).find('[name=url]').val()
        };
        Projects.update(currentProjectId, {$set: projectProperties}, function(error) { if (error) {
            // display the error to the user
            alert(error.reason); } else {
                Router.go('projectPage', {_id: currentProjectId});
                Alert.add('your project has been edited', 'success');
            }
        }); },
    'click .delete': function(e) { e.preventDefault();
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
        var currentProjectId = this._id;
        var new_tag = $(e.target).parent().find('[id=tagbox]').val();
        Projects.update({_id:currentProjectId}, {$push: {tags: new_tag}});
        $('#tagbox').val('');
    }
});

Template.projectEdit.helpers({ 
    hubs: function() {
        return Hubs.find(); 
    }, 
    licences: function() {
        return Licences.find(); 
    },
    projectTags: function() {
        return this.tags; 
    },
    isLicence: function() {
        var thisProject = Projects.findOne();
        var thisProjectLicence = thisProject.licence;
        var licenceOption = this.name;
        if (licenceOption === thisProjectLicence) {
            return 'selected';
        };
    },
    isHub: function() {
        var thisProject = Projects.findOne();
        var thisProjectHub = thisProject.hub;
        var hubOption = this.name;
        if (hubOption === thisProjectHub) {
            return 'selected';
        };
    },
});


